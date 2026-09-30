import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../utils/prisma.js";

const COOKIE_NAME = "admin_token";
const COOKIE_MAX_AGE = 8 * 60 * 60 * 1000;

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: COOKIE_MAX_AGE,
};

export const loginAdmin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Email and password are required", 400));
  }

  if (!process.env.ADMIN_JWT_SECRET) {
    return next(new AppError("Admin authentication is not configured", 500));
  }

  const admin = await prisma.admin.findUnique({ where: { email } });
  const passwordMatches = admin
    ? await bcrypt.compare(password, admin.passwordHash)
    : false;

  if (!admin || !passwordMatches) {
    return next(new AppError("Invalid email or password", 401));
  }

  const token = jwt.sign(
    { adminId: admin.id, email: admin.email },
    process.env.ADMIN_JWT_SECRET,
    { expiresIn: "8h" },
  );

  res.cookie(COOKIE_NAME, token, cookieOptions);
  res.status(200).json({ success: true, data: { email: admin.email } });
});

export const logoutAdmin = asyncHandler(async (req, res) => {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.status(200).json({ success: true });
});

export const getCurrentAdmin = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: { email: req.admin.email } });
});
