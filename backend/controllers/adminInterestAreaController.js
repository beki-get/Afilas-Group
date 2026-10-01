import AppError from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../utils/prisma.js";

export const createInterestArea = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;
  if (typeof name !== "string" || !name.trim()) {
    return next(new AppError("Interest area name is required", 400));
  }

  const interestArea = await prisma.interestArea.create({
    data: {
      name: name.trim(),
      ...(description !== undefined ? { description } : {}),
    },
  });
  res.status(201).json({ success: true, data: interestArea });
});

export const listInterestAreasAdmin = asyncHandler(async (req, res) => {
  const interestAreas = await prisma.interestArea.findMany({
    select: { id: true, name: true, description: true, isActive: true },
    orderBy: { name: "asc" },
  });
  res.status(200).json({ success: true, data: interestAreas });
});

export const updateInterestArea = asyncHandler(async (req, res, next) => {
  const { name, description, isActive } = req.body;
  const data = {};

  if (name !== undefined) {
    if (typeof name !== "string" || !name.trim()) {
      return next(new AppError("Interest area name cannot be empty", 400));
    }
    data.name = name.trim();
  }
  if (isActive !== undefined) {
    if (typeof isActive !== "boolean") {
      return next(new AppError("isActive must be a boolean", 400));
    }
    data.isActive = isActive;
  }
  if (description !== undefined) data.description = description;
  if (!Object.keys(data).length) {
    return next(new AppError("At least one field is required", 400));
  }

  const interestArea = await prisma.interestArea.update({
    where: { id: req.params.id },
    data,
  });
  res.status(200).json({ success: true, data: interestArea });
});

export const deleteInterestArea = asyncHandler(async (req, res) => {
  const interestArea = await prisma.interestArea.update({
    where: { id: req.params.id },
    data: { isActive: false },
  });
  res.status(200).json({ success: true, data: interestArea });
});
