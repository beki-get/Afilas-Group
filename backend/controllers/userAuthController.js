import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma.js";
import AppError from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const USER_COOKIE_NAME = "user_token";

const setUserCookie = (res, token) => {
  res.cookie(USER_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !password) {
    return next(new AppError("Name, email, and password are required", 400));
  }

  if (password.length < 8) {
    return next(
      new AppError("Password must be at least 8 characters", 400)
    );
  }

  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (existingUser) {
    return next(new AppError("An account with this email already exists", 409));
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name: name.trim(),
      email: normalizedEmail,
      phone: phone?.trim() || null,
      passwordHash,
    },
  });

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.USER_JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  setUserCookie(res, token);

  return res.status(201).json({
    success: true,
    message: "Registration successful",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Email and password are required", 400));
  }

  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (!user) {
    return next(new AppError("Invalid email or password", 401));
  }

  if (!user.isActive) {
    return next(new AppError("Your account is inactive", 403));
  }

  const passwordMatches = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!passwordMatches) {
    return next(new AppError("Invalid email or password", 401));
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.USER_JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  setUserCookie(res, token);

  return res.status(200).json({
    success: true,
    message: "Login successful",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie(USER_COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});

export const getCurrentUser = asyncHandler(async (req, res, next) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      isActive: true,
      createdAt: true,
    },
  });

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  if (!user.isActive) {
    return next(new AppError("Your account is inactive", 403));
  }

  return res.status(200).json({
    success: true,
    user,
  });
});