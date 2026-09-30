import AppError from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../utils/prisma.js";
import { Prisma } from "@prisma/client";

const getPagination = (query) => {
  const page = Math.max(Number.parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(
    Math.max(Number.parseInt(query.limit, 10) || 10, 1),
    100,
  );
  return { page, limit, skip: (page - 1) * limit };
};

export const createDoctor = asyncHandler(async (req, res, next) => {
  const { name, department, phone, photoUrl, workingHours } = req.body;

  if (!name || !department || !phone) {
    return next(new AppError("Name, department, and phone are required", 400));
  }

  const doctor = await prisma.doctor.create({
    data: {
      name,
      department,
      phone,
      ...(photoUrl !== undefined ? { photoUrl } : {}),
      ...(workingHours !== undefined
        ? { workingHours: workingHours === null ? Prisma.DbNull : workingHours }
        : {}),
    },
  });

  res.status(201).json({ success: true, data: doctor });
});

export const listDoctorsAdmin = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const { search, department } = req.query;
  const where = {
    ...(search ? { name: { contains: search, mode: "insensitive" } } : {}),
    ...(department ? { department } : {}),
  };

  const [doctors, total] = await prisma.$transaction([
    prisma.doctor.findMany({
      where,
      skip,
      take: limit,
      orderBy: { name: "asc" },
    }),
    prisma.doctor.count({ where }),
  ]);

  res.status(200).json({
    success: true,
    data: { doctors, total, page, totalPages: Math.ceil(total / limit) },
  });
});

export const updateDoctor = asyncHandler(async (req, res, next) => {
  const { name, department, phone, isActive, photoUrl, workingHours } =
    req.body;
  const data = {};

  if (name !== undefined) data.name = name;
  if (department !== undefined) data.department = department;
  if (phone !== undefined) data.phone = phone;
  if (isActive !== undefined) data.isActive = isActive;
  if (photoUrl !== undefined) data.photoUrl = photoUrl;
  if (workingHours !== undefined) {
    data.workingHours = workingHours === null ? Prisma.DbNull : workingHours;
  }

  if (!Object.keys(data).length) {
    return next(new AppError("At least one field is required", 400));
  }

  const doctor = await prisma.doctor.update({
    where: { id: req.params.id },
    data,
  });
  res.status(200).json({ success: true, data: doctor });
});

export const deleteDoctor = asyncHandler(async (req, res) => {
  const doctor = await prisma.doctor.update({
    where: { id: req.params.id },
    data: { isActive: false },
  });

  res.status(200).json({ success: true, data: doctor });
});
