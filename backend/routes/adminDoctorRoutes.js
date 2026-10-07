import { Router } from "express";
import {
  createDoctor,
  deleteDoctor,
  listDoctorsAdmin,
  updateDoctor,
} from "../controllers/adminDoctorController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import uploadDoctor from "../middleware/uploadDoctor.js";

const router = Router();

router.use(authMiddleware);

router.post("/", uploadDoctor.single("image"), createDoctor);
router.get("/", listDoctorsAdmin);
router.patch("/:id", uploadDoctor.single("image"), updateDoctor);
router.delete("/:id", deleteDoctor);

export default router;