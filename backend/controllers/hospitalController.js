import Kenat, { monthNames } from "kenat";
import AppError from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSms } from "../utils/sendSms.js";
import { prisma } from "../utils/prisma.js";

const getEthiopianDate = (dateValue) => {
  const [year, month, day] = dateValue.split("-").map(Number);
  const ethiopianDate = new Kenat(
    new Date(year, month - 1, day),
  ).getEthiopian();

  return `${monthNames.english[ethiopianDate.month - 1]} ${ethiopianDate.day}, ${ethiopianDate.year} E.C.`;
};

export const createHospitalBooking = asyncHandler(async (req, res, next) => {
  const {
    fullName,
    phone,
    email,
    department,
    doctorId,
    preferredDate,
    preferredTime,
    notes,
  } = req.body;

  if (
    !fullName ||
    !phone ||
    !email ||
    !department ||
    !doctorId ||
    !preferredDate ||
    !preferredTime
  ) {
    return next(new AppError("Missing required fields", 400));
  }

  const idempotencyKey = req.headers["idempotency-key"];
  if (!idempotencyKey) {
    return next(new AppError("Missing Idempotency-Key header", 400));
  }

  const existing = await prisma.hospitalBooking.findUnique({
    where: { idempotencyKey },
  });
  if (existing) {
    return res
      .status(200)
      .json({ success: true, data: existing, idempotent: true });
  }

  const verification = await prisma.otpVerification.findFirst({
    where: {
      phone,
      purpose: "hospital",
      verified: true,
      createdAt: { gte: new Date(Date.now() - 15 * 60 * 1000) },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!verification) {
    return next(new AppError("Phone number not verified", 403));
  }

  const doctor = await prisma.doctor.findUnique({ where: { id: doctorId } });
  if (!doctor || !doctor.isActive) {
    return next(new AppError("Selected doctor is not available", 404));
  }

  const booking = await prisma.$transaction(async (tx) => {
    const conflict = await tx.hospitalBooking.findFirst({
      where: {
        doctorId,
        preferredDate: new Date(preferredDate),
        preferredTime,
        status: { in: ["PENDING", "CONFIRMED"] },
      },
    });

    if (conflict) {
      throw new AppError(
        "This doctor is already booked for the selected date and time",
        409,
      );
    }

    return tx.hospitalBooking.create({
      data: {
        fullName,
        phone,
        email,
        department,
        doctorId,
        preferredDate: new Date(preferredDate),
        preferredTime,
        notes,
        idempotencyKey,
      },
    });
  });

  try {
    const date = new Date(preferredDate).toISOString().split("T")[0];
    const ethiopianDate = getEthiopianDate(preferredDate);
    await sendSms(
      phone,
      `Your appointment with Afilas General Hospital (${department}) on ${date} (${ethiopianDate}) at ${preferredTime} has been received. We'll contact you to confirm.`,
    );
  } catch (error) {
    console.error("Hospital booking confirmation SMS failed:", error);
  }

  res.status(201).json({ success: true, data: booking });
});
