import  { PrismaClient } from "@prisma/client";
import  AppError from "../utils/AppError.js";
import  {asyncHandler} from "../utils/asyncHandler.js";

const prisma = new PrismaClient();

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

  if (!fullName || !phone || !email || !department || !doctorId || !preferredDate || !preferredTime) {
    return next(new AppError("Missing required fields", 400));
  }

  const idempotencyKey = req.headers["idempotency-key"];
  if (!idempotencyKey) {
    return next(new AppError("Missing Idempotency-Key header", 400));
  }

  const existing = await prisma.hospitalBooking.findUnique({ where: { idempotencyKey } });
  if (existing) {
    return res.status(200).json({ success: true, data: existing, idempotent: true });
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
      throw new AppError("This doctor is already booked for the selected date and time", 409);
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

  res.status(201).json({ success: true, data: booking });
});

