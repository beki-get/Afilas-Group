import { Router } from "express";
import {
  listDiagnosisBookingsAdmin,
  listHospitalBookingsAdmin,
  updateDiagnosisBookingStatus,
  updateHospitalBookingStatus,
} from "../controllers/adminBookingController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();
router.use(authMiddleware);
router.get("/hospital", listHospitalBookingsAdmin);
router.patch("/hospital/:id/status", updateHospitalBookingStatus);
router.get("/diagnosis", listDiagnosisBookingsAdmin);
router.patch("/diagnosis/:id/status", updateDiagnosisBookingStatus);

export default router;
