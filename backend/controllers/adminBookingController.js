import AppError from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSms } from "../utils/sendSms.js";
import { prisma } from "../utils/prisma.js";

const bookingStatuses = ["PENDING", "CONFIRMED", "CANCELLED", "ARRIVED"];

const getPagination = (query) => {
  const page = Math.max(Number.parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(
    Math.max(Number.parseInt(query.limit, 10) || 10, 1),
    100,
  );
  return { page, limit, skip: (page - 1) * limit };
};

const getDateFilter = (dateFrom, dateTo) => ({
  ...(dateFrom ? { gte: new Date(`${dateFrom}T00:00:00.000Z`) } : {}),
  ...(dateTo
    ? {
        lt: new Date(
          new Date(`${dateTo}T00:00:00.000Z`).getTime() + 24 * 60 * 60 * 1000,
        ),
      }
    : {}),
});

const validateBookingStatus = (status) => {
  if (status && !bookingStatuses.includes(status)) {
    throw new AppError("Invalid booking status", 400);
  }
  return status;
};

export const listHospitalBookingsAdmin = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const { status, department, search, dateFrom, dateTo } = req.query;
  validateBookingStatus(status);
  const where = {
    ...(status ? { status } : {}),
    ...(department ? { department } : {}),
    ...(search
      ? {
          OR: [
            { fullName: { contains: search, mode: "insensitive" } },
            { phone: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
    ...(dateFrom || dateTo
      ? { preferredDate: getDateFilter(dateFrom, dateTo) }
      : {}),
  };

  const [bookings, total] = await prisma.$transaction([
    prisma.hospitalBooking.findMany({
      where,
      skip,
      take: limit,
      include: { doctor: { select: { id: true, name: true, phone: true } } },
      orderBy: { preferredDate: "desc" },
    }),
    prisma.hospitalBooking.count({ where }),
  ]);

  res.status(200).json({
    success: true,
    data: { bookings, total, page, totalPages: Math.ceil(total / limit) },
  });
});

export const listDiagnosisBookingsAdmin = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const { status, testType, search, dateFrom, dateTo } = req.query;
  validateBookingStatus(status);
  const where = {
    ...(status ? { status } : {}),
    ...(testType ? { testType } : {}),
    ...(search
      ? {
          OR: [
            { fullName: { contains: search, mode: "insensitive" } },
            { phone: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
    ...(dateFrom || dateTo
      ? { preferredDate: getDateFilter(dateFrom, dateTo) }
      : {}),
  };

  const [bookings, total] = await prisma.$transaction([
    prisma.diagnosisBooking.findMany({
      where,
      skip,
      take: limit,
      orderBy: { preferredDate: "desc" },
    }),
    prisma.diagnosisBooking.count({ where }),
  ]);

  res.status(200).json({
    success: true,
    data: { bookings, total, page, totalPages: Math.ceil(total / limit) },
  });
});

export const updateHospitalBookingStatus = asyncHandler(
  async (req, res, next) => {
    const { status } = req.body;
    if (!bookingStatuses.includes(status)) {
      return next(new AppError("Invalid booking status", 400));
    }

    const existing = await prisma.hospitalBooking.findUnique({
      where: { id: req.params.id },
      include: { doctor: { select: { phone: true } } },
    });
    if (!existing) return next(new AppError("Hospital booking not found", 404));

    const booking = await prisma.hospitalBooking.update({
      where: { id: req.params.id },
      data: { status },
    });

    if (
      status === "CONFIRMED" &&
      existing.status !== "CONFIRMED" &&
      existing.doctor.phone
    ) {
      try {
        const date = existing.preferredDate.toISOString().split("T")[0];
        await sendSms(
          existing.doctor.phone,
          `You have a confirmed appointment with ${existing.fullName} on ${date} at ${existing.preferredTime} (${existing.department}).`,
        );
      } catch (error) {
        console.error("Hospital confirmation SMS failed:", error);
      }
    }

    res.status(200).json({ success: true, data: booking });
  },
);

export const updateDiagnosisBookingStatus = asyncHandler(
  async (req, res, next) => {
    const { status } = req.body;
    if (!bookingStatuses.includes(status)) {
      return next(new AppError("Invalid booking status", 400));
    }

    const existing = await prisma.diagnosisBooking.findUnique({
      where: { id: req.params.id },
    });
    if (!existing)
      return next(new AppError("Diagnosis booking not found", 404));

    const booking = await prisma.diagnosisBooking.update({
      where: { id: req.params.id },
      data: { status },
    });

    if (
      status === "CONFIRMED" &&
      existing.status !== "CONFIRMED" &&
      process.env.DIAGNOSIS_NOTIFY_PHONE
    ) {
      try {
        const date = existing.preferredDate.toISOString().split("T")[0];
        await sendSms(
          process.env.DIAGNOSIS_NOTIFY_PHONE,
          `New confirmed diagnosis booking: ${existing.testType} for ${existing.fullName} on ${date} at ${existing.preferredTime}.`,
        );
      } catch (error) {
        console.error("Diagnosis notification SMS failed:", error);
      }
    }

    res.status(200).json({ success: true, data: booking });
  },
);
