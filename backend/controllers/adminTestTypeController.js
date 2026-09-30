import AppError from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../utils/prisma.js";

export const createTestType = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  if (typeof name !== "string" || !name.trim()) {
    return next(new AppError("Test type name is required", 400));
  }

  const testType = await prisma.testType.create({
    data: { name: name.trim() },
  });
  res.status(201).json({ success: true, data: testType });
});

export const listTestTypesAdmin = asyncHandler(async (req, res) => {
  const testTypes = await prisma.testType.findMany({
    select: { id: true, name: true, isActive: true },
    orderBy: { name: "asc" },
  });
  res.status(200).json({ success: true, data: testTypes });
});

export const updateTestType = asyncHandler(async (req, res, next) => {
  const { name, isActive } = req.body;
  const data = {};

  if (name !== undefined) {
    if (typeof name !== "string" || !name.trim()) {
      return next(new AppError("Test type name cannot be empty", 400));
    }
    data.name = name.trim();
  }
  if (isActive !== undefined) {
    if (typeof isActive !== "boolean") {
      return next(new AppError("isActive must be a boolean", 400));
    }
    data.isActive = isActive;
  }
  if (!Object.keys(data).length) {
    return next(new AppError("At least one field is required", 400));
  }

  const testType = await prisma.testType.update({
    where: { id: req.params.id },
    data,
  });
  res.status(200).json({ success: true, data: testType });
});

export const deleteTestType = asyncHandler(async (req, res) => {
  const testType = await prisma.testType.update({
    where: { id: req.params.id },
    data: { isActive: false },
  });
  res.status(200).json({ success: true, data: testType });
});
