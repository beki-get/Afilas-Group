import AppError from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../utils/prisma.js";

export const createDepartment = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  if (typeof name !== "string" || !name.trim()) {
    return next(new AppError("Department name is required", 400));
  }

  const department = await prisma.department.create({
    data: { name: name.trim() },
  });
  res.status(201).json({ success: true, data: department });
});

export const listDepartmentsAdmin = asyncHandler(async (req, res) => {
  const departments = await prisma.department.findMany({
    select: { id: true, name: true, isActive: true },
    orderBy: { name: "asc" },
  });
  res.status(200).json({ success: true, data: departments });
});

export const updateDepartment = asyncHandler(async (req, res, next) => {
  const { name, isActive } = req.body;
  const data = {};

  if (name !== undefined) {
    if (typeof name !== "string" || !name.trim()) {
      return next(new AppError("Department name cannot be empty", 400));
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

  const department = await prisma.department.update({
    where: { id: req.params.id },
    data,
  });
  res.status(200).json({ success: true, data: department });
});

export const deleteDepartment = asyncHandler(async (req, res) => {
  const department = await prisma.department.update({
    where: { id: req.params.id },
    data: { isActive: false },
  });
  res.status(200).json({ success: true, data: department });
});
