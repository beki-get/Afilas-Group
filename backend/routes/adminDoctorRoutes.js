import { Router } from "express";
import {
  createDoctor,
  deleteDoctor,
  listDoctorsAdmin,
  updateDoctor,
} from "../controllers/adminDoctorController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();
router.use(authMiddleware);
router.post("/", createDoctor);
router.get("/", listDoctorsAdmin);
router.patch("/:id", updateDoctor);
router.delete("/:id", deleteDoctor);

export default router;
