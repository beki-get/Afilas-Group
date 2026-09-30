import crypto from "node:crypto";
import AppError from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSms } from "../utils/sendSms.js";
import { prisma } from "../utils/prisma.js";

export const createPharmaInquiry = asyncHandler(async (req, res, next) => {
  const {
    companyName,
    contactPerson,
    businessEmail,
    phone,
    interestArea,
    estimatedQuantity,
    message,
  } = req.body;

  if (
    !companyName ||
    !contactPerson ||
    !businessEmail ||
    !phone ||
    !interestArea ||
    !message
  ) {
    return next(new AppError("Missing required fields", 400));
  }

  const idempotencyKey = req.headers["idempotency-key"];
  if (!idempotencyKey) {
    return next(new AppError("Missing Idempotency-Key header", 400));
  }

  const existing = await prisma.pharmaInquiry.findUnique({
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
      purpose: "pharma",
      verified: true,
      createdAt: { gte: new Date(Date.now() - 15 * 60 * 1000) },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!verification) {
    return next(new AppError("Phone number not verified", 403));
  }

  const referenceId = `AFL-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;

  // No slot/conflict logic — this is a lead capture form, not a reservation (see earlier discussion).
  const inquiry = await prisma.pharmaInquiry.create({
    data: {
      companyName,
      contactPerson,
      businessEmail,
      phone,
      interestArea,
      estimatedQuantity,
      message,
      idempotencyKey,
      referenceId,
    },
  });

  try {
    await sendSms(
      phone,
      `Thank you for your inquiry with Afilas Drug Manufacturing regarding ${interestArea}. Our team will contact you shortly to discuss details.`,
    );
  } catch (error) {
    console.error("Pharma inquiry confirmation SMS failed:", error);
  }

  res.status(201).json({ success: true, data: inquiry });
});
