import  { PrismaClient } from "@prisma/client";
import AppError from "../utils/AppError.js";
import  {asyncHandler} from "../utils/asyncHandler.js";

const prisma = new PrismaClient();

export const createPharmaInquiry = asyncHandler(async (req, res, next) => {
  const { companyName, contactPerson, businessEmail, phone, interestArea, estimatedQuantity, message } = req.body;

  if (!companyName || !contactPerson || !businessEmail || !phone || !interestArea || !message) {
    return next(new AppError("Missing required fields", 400));
  }

  const idempotencyKey = req.headers["idempotency-key"];
  if (!idempotencyKey) {
    return next(new AppError("Missing Idempotency-Key header", 400));
  }

  const existing = await prisma.pharmaInquiry.findUnique({ where: { idempotencyKey } });
  if (existing) {
    return res.status(200).json({ success: true, data: existing, idempotent: true });
  }

  // No slot/conflict logic — this is a lead capture form, not a reservation (see earlier discussion).
  const inquiry = await prisma.pharmaInquiry.create({
    data: { companyName, contactPerson, businessEmail, phone, interestArea, estimatedQuantity, message, idempotencyKey },
  });

  res.status(201).json({ success: true, data: inquiry });
});

