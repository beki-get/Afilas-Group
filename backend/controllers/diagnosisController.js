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

export const createDiagnosisBooking = asyncHandler(async (req, res, next) => {
  const {
    fullName,
    phone,
    email,
    testType,
    preferredDate,
    preferredTime,
    notes,
  } = req.body;

  if (
    !fullName ||
    !phone ||
    !email ||
    !testType ||
    !preferredDate ||
    !preferredTime
  ) {
    return next(new AppError("Missing required fields", 400));
  }

  const idempotencyKey = req.headers["idempotency-key"];
  if (!idempotencyKey) {
    return next(new AppError("Missing Idempotency-Key header", 400));
  }

  const existing = await prisma.diagnosisBooking.findUnique({
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
      purpose: "diagnosis",
      verified: true,
      createdAt: { gte: new Date(Date.now() - 15 * 60 * 1000) },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!verification) {
    return next(new AppError("Phone number not verified", 403));
  }

  // Diagnosis bookings aren't tied to a specific doctor, so no per-doctor conflict check —
  // just capacity-per-slot could be added later (e.g. max 10 tests per time slot).
  const booking = await prisma.diagnosisBooking.create({
    data: {
      fullName,
      phone,
      email,
      testType,
      preferredDate: new Date(preferredDate),
      preferredTime,
      notes,
      idempotencyKey,
    },
  });

  try {
    const date = new Date(preferredDate).toISOString().split("T")[0];
    const ethiopianDate = getEthiopianDate(preferredDate);
    await sendSms(
      phone,
      `Your ${testType} booking with Afilas Diagnosis Center on ${date} (${ethiopianDate}) at ${preferredTime} has been received. We'll contact you to confirm.`,
    );
  } catch (error) {
    console.error("Diagnosis booking confirmation SMS failed:", error);
  }

  res.status(201).json({ success: true, data: booking });
});
