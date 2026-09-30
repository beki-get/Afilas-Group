import { Router } from "express";
import {
  getCurrentAdmin,
  loginAdmin,
  logoutAdmin,
} from "../controllers/adminAuthController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/me", authMiddleware, getCurrentAdmin);

export default router;
