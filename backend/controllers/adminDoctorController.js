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
  const {
    name,
    department,
    phone,
    photoUrl,
    experienceYears,
    bio,
  } = req.body;
  const workingHours = req.body.workingHours
    ? JSON.parse(req.body.workingHours)
    : undefined;

  if (!name || !department || !phone) {
    return next(
      new AppError("Name, department, and phone are required", 400)
    );
  }

  // If an image was uploaded, use its generated URL.
  // Otherwise, keep using the existing photoUrl field.
  const finalPhotoUrl = req.file
    ? `/uploads/doctors/${req.file.filename}`
    : photoUrl;

  const doctor = await prisma.doctor.create({
    data: {
      name,
      department,
      phone,

      ...(finalPhotoUrl !== undefined
        ? { photoUrl: finalPhotoUrl }
        : {}),

      ...(workingHours !== undefined
        ? {
            workingHours:
              workingHours === null ? Prisma.DbNull : workingHours,
          }
        : {}),

      ...(experienceYears !== undefined
        ? { experienceYears: Number(experienceYears) }
        : {}),

      ...(bio !== undefined ? { bio } : {}),
    },
  });

  res.status(201).json({
    success: true,
    data: doctor,
  });
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
  const {
    name,
    department,
    phone,
    isActive,
    photoUrl,
    experienceYears,
    bio,
  } = req.body;

  const data = {};

  if (name !== undefined) data.name = name;
  if (department !== undefined) data.department = department;
  if (phone !== undefined) data.phone = phone;
  if (isActive !== undefined) data.isActive = isActive;

  // Uploaded image takes priority over Photo URL.
  if (req.file) {
    data.photoUrl = `/uploads/doctors/${req.file.filename}`;
  } else if (photoUrl !== undefined) {
    data.photoUrl = photoUrl || null;
  }

  if (req.body.workingHours !== undefined) {
    data.workingHours =
      req.body.workingHours === ""
        ? Prisma.DbNull
        : JSON.parse(req.body.workingHours);
  }

  if (experienceYears !== undefined) {
    data.experienceYears =
      experienceYears === "" ? null : Number(experienceYears);
  }

  if (bio !== undefined) {
    data.bio = bio || null;
  }

  if (!Object.keys(data).length) {
    return next(new AppError("At least one field is required", 400));
  }

  const doctor = await prisma.doctor.update({
    where: { id: req.params.id },
    data,
  });

  res.status(200).json({
    success: true,
    data: doctor,
  });
});

export const deleteDoctor = asyncHandler(async (req, res) => {
  const doctor = await prisma.doctor.update({
    where: { id: req.params.id },
    data: { isActive: false },
  });

  res.status(200).json({ success: true, data: doctor });
});
