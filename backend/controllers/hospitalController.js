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

export const checkDoctorAvailability = asyncHandler(async (req, res) => {
  const { doctorId, date, time } = req.query;

  if (!doctorId || !date || !time) {
    return res.status(200).json({
      success: true,
      data: {
        available: false,
        reason: "Doctor, date, and time are required.",
      },
    });
  }

  const doctor = await prisma.doctor.findUnique({
    where: { id: doctorId },
  });

  if (!doctor || !doctor.isActive) {
    return res.status(200).json({
      success: true,
      data: {
        available: false,
        reason: "This doctor is no longer available.",
      },
    });
  }

  const requestedDate = new Date(`${date}T00:00:00.000Z`);
  if (Number.isNaN(requestedDate.getTime())) {
    return res.status(200).json({
      success: true,
      data: {
        available: false,
        reason: "A valid date is required.",
      },
    });
  }

  const workingHours = Array.isArray(doctor.workingHours)
    ? doctor.workingHours
    : [];

  if (workingHours.length > 0) {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const requestedWeekday = weekdays[requestedDate.getUTCDay()];
    const worksOnRequestedDay = workingHours.some(
      (entry) =>
        typeof entry?.day === "string" &&
        entry.day.toLowerCase() === requestedWeekday.toLowerCase(),
    );

    if (!worksOnRequestedDay) {
      return res.status(200).json({
        success: true,
        data: {
          available: false,
          reason: `Dr. ${doctor.name} is not available on this day. Please choose another date.`,
        },
      });
    }
  }

  const conflict = await prisma.hospitalBooking.findFirst({
    where: {
      doctorId,
      preferredDate: requestedDate,
      preferredTime: time,
      status: { in: ["PENDING", "CONFIRMED"] },
    },
  });

  if (conflict) {
    return res.status(200).json({
      success: true,
      data: {
        available: false,
        reason: `This time slot is already booked for Dr. ${doctor.name}. Please choose a different time.`,
      },
    });
  }

  return res.status(200).json({
    success: true,
    data: { available: true },
  });
});

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
