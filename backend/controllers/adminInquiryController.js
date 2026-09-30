import AppError from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../utils/prisma.js";

const inquiryStatuses = ["NEW", "CONTACTED", "CLOSED"];

const getPagination = (query) => {
  const page = Math.max(Number.parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(
    Math.max(Number.parseInt(query.limit, 10) || 10, 1),
    100,
  );
  return { page, limit, skip: (page - 1) * limit };
};

export const listPharmaInquiriesAdmin = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const { status, search } = req.query;
  const where = {
    ...(status ? { status } : {}),
    ...(search
      ? {
          OR: [
            { companyName: { contains: search, mode: "insensitive" } },
            { contactPerson: { contains: search, mode: "insensitive" } },
            { phone: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const [inquiries, total] = await prisma.$transaction([
    prisma.pharmaInquiry.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.pharmaInquiry.count({ where }),
  ]);

  res.status(200).json({
    success: true,
    data: { inquiries, total, page, totalPages: Math.ceil(total / limit) },
  });
});

export const updateInquiryStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;
  if (!inquiryStatuses.includes(status)) {
    return next(new AppError("Invalid inquiry status", 400));
  }

  const inquiry = await prisma.pharmaInquiry.update({
    where: { id: req.params.id },
    data: { status },
  });

  res.status(200).json({ success: true, data: inquiry });
});
