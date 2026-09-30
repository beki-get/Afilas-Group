import { Router } from "express";
import rateLimit from "express-rate-limit";
import { sendOtp, verifyOtp } from "../controllers/otpController.js";

const router = Router();

const rateLimitHandler = (req, res) => {
  res.status(429).json({
    success: false,
    error: "Too many requests. Please try again later.",
  });
};

const phoneOtpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 3,
  keyGenerator: (req) => req.body?.phone || "unknown-phone",
  handler: rateLimitHandler,
});

const ipOtpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 10,
  handler: rateLimitHandler,
});

router.post("/send", phoneOtpLimiter, ipOtpLimiter, sendOtp);
router.post("/verify", verifyOtp);

export default router;
