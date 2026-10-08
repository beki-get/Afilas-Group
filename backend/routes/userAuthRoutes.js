import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../controllers/userAuthController.js";
import { userAuthMiddleware } from "../middleware/userAuthMiddleware.js";

const router = Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Protected route
router.get("/me", userAuthMiddleware, getCurrentUser);

export default router;