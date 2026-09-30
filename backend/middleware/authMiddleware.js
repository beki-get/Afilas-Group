import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies?.admin_token;

  if (!token || !process.env.ADMIN_JWT_SECRET) {
    return next(new AppError("Not authorized", 401));
  }

  try {
    const payload = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
    req.admin = { adminId: payload.adminId, email: payload.email };
    return next();
  } catch {
    return next(new AppError("Not authorized", 401));
  }
};
