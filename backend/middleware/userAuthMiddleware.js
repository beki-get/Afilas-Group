import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

export const userAuthMiddleware = (req, res, next) => {
  const token = req.cookies?.user_token;

  if (!token || !process.env.USER_JWT_SECRET) {
    return next(new AppError("Not authorized", 401));
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.USER_JWT_SECRET
    );

    req.user = {
      userId: payload.userId,
      email: payload.email,
    };

    return next();
  } catch {
    return next(new AppError("Not authorized", 401));
  }
};