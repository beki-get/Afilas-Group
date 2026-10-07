import AppError from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../utils/prisma.js";

export const getActiveServicesByDepartment = asyncHandler(async (req, res) => {
  const { departmentId } = req.query;

  if (typeof departmentId !== "string" || !departmentId.trim()) {
    throw new AppError("departmentId is required", 400);
  }

  const services = await prisma.service.findMany({
    where: {
      departmentId: departmentId.trim(),
      isActive: true,
    },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  res.status(200).json({ success: true, data: services });
});
export const getAllActiveServices = asyncHandler(async (req, res) => {
  const services = await prisma.service.findMany({
    where: {
      isActive: true,
    },
    select: {
      id: true,
      name: true,
      description: true,
      departmentId: true,
      department: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  res.status(200).json({
    success: true,
    data: services,
  });
});
