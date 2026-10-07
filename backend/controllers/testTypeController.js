import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../utils/prisma.js";

export const getActiveTestTypes = asyncHandler(async (req, res) => {
  const testTypes = await prisma.testType.findMany({
    where: { isActive: true },
    select: { id: true, name: true, description: true },
    orderBy: { name: "asc" },
  });
  res.status(200).json({ success: true, data: testTypes });
});

export const getActiveTestTypeById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const testType = await prisma.testType.findFirst({
    where: {
      id,
      isActive: true,
    },
    select: {
      id: true,
      name: true,
      description: true,
    },
  });

  if (!testType) {
    return res.status(404).json({
      success: false,
      message: "Diagnosis service not found.",
    });
  }

  res.status(200).json({
    success: true,
    data: testType,
  });
});