import  { PrismaClient } from "@prisma/client";
import AppError from "../utils/AppError.js";
import {asyncHandler} from "../utils/asyncHandler.js";

const prisma = new PrismaClient();

export const createDiagnosisBooking = asyncHandler(async (req, res, next) => {
  const { fullName, phone, email, testType, preferredDate, preferredTime, notes } = req.body;

  if (!fullName || !phone || !email || !testType || !preferredDate || !preferredTime) {
    return next(new AppError("Missing required fields", 400));
  }

  const idempotencyKey = req.headers["idempotency-key"];
  if (!idempotencyKey) {
    return next(new AppError("Missing Idempotency-Key header", 400));
  }

  const existing = await prisma.diagnosisBooking.findUnique({ where: { idempotencyKey } });
  if (existing) {
    return res.status(200).json({ success: true, data: existing, idempotent: true });
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

  res.status(201).json({ success: true, data: booking });
});
