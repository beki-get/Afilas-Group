import AppError from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSms } from "../utils/sendSms.js";
import { prisma } from "../utils/prisma.js";

const validPurposes = ["hospital", "diagnosis", "pharma"];

export const sendOtp = asyncHandler(async (req, res, next) => {
  const { phone, purpose } = req.body;

  if (!phone || !validPurposes.includes(purpose)) {
    return next(new AppError("Phone and valid purpose are required", 400));
  }

  const code = String(Math.floor(100000 + Math.random() * 900000));
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await prisma.otpVerification.create({
    data: { phone, code, purpose, expiresAt },
  });

  await sendSms(
    phone,
    `Your Afilas verification code is: ${code}. It expires in 5 minutes.`,
  );

  res.status(200).json({ success: true, message: "OTP sent" });
});

export const verifyOtp = asyncHandler(async (req, res, next) => {
  const { phone, purpose, code } = req.body;

  if (!phone || !validPurposes.includes(purpose) || !code) {
    return next(new AppError("Phone, purpose, and code are required", 400));
  }

  const verification = await prisma.otpVerification.findFirst({
    where: {
      phone,
      purpose,
      code,
      verified: false,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!verification) {
    return next(new AppError("Invalid or expired code", 400));
  }

  await prisma.otpVerification.update({
    where: { id: verification.id },
    data: { verified: true },
  });

  res.status(200).json({ success: true, verified: true });
});
