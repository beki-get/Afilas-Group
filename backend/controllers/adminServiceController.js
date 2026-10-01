import AppError from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../utils/prisma.js";

const getPagination = (query) => {
  const page = Math.max(Number.parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(
    Math.max(Number.parseInt(query.limit, 10) || 10, 1),
    100,
  );
  return { page, limit, skip: (page - 1) * limit };
};

const ensureDepartmentExists = async (departmentId) => {
  if (!departmentId) {
    throw new AppError("departmentId is required", 400);
  }

  const department = await prisma.department.findUnique({
    where: { id: departmentId },
    select: { id: true },
  });

  if (!department) {
    throw new AppError("Department not found", 404);
  }
};

export const createService = asyncHandler(async (req, res, next) => {
  const { name, description, departmentId } = req.body;

  if (typeof name !== "string" || !name.trim()) {
    return next(new AppError("Service name is required", 400));
  }

  await ensureDepartmentExists(departmentId);

  const service = await prisma.service.create({
    data: {
      ...(description !== undefined ? { description } : {}),
      departmentId,
      name: name.trim(),
    },
    include: { department: { select: { name: true } } },
  });

  res.status(201).json({ success: true, data: service });
});

export const listServicesAdmin = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const { search, departmentId } = req.query;
  const where = {
    ...(search ? { name: { contains: search, mode: "insensitive" } } : {}),
    ...(departmentId ? { departmentId } : {}),
  };

  const [services, total] = await prisma.$transaction([
    prisma.service.findMany({
      where,
      skip,
      take: limit,
      orderBy: { name: "asc" },
      include: { department: { select: { name: true } } },
    }),
    prisma.service.count({ where }),
  ]);

  res.status(200).json({
    success: true,
    data: { services, total, page, totalPages: Math.ceil(total / limit) },
  });
});

export const updateService = asyncHandler(async (req, res, next) => {
  const { name, description, departmentId, isActive } = req.body;
  const data = {};

  if (name !== undefined) {
    if (typeof name !== "string" || !name.trim()) {
      return next(new AppError("Service name cannot be empty", 400));
    }
    data.name = name.trim();
  }
  if (description !== undefined) data.description = description;
  if (departmentId !== undefined) {
    const departmentError = await ensureDepartmentExists(departmentId, next);
    if (departmentError) return departmentError;
    data.departmentId = departmentId;
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

  const service = await prisma.service.update({
    where: { id: req.params.id },
    data,
    include: { department: { select: { name: true } } },
  });

  res.status(200).json({ success: true, data: service });
});

export const deleteService = asyncHandler(async (req, res) => {
  const service = await prisma.service.update({
    where: { id: req.params.id },
    data: { isActive: false },
    include: { department: { select: { name: true } } },
  });

  res.status(200).json({ success: true, data: service });
});
