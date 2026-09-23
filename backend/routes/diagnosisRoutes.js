// routes/diagnosisRoutes.js
import { Router } from "express";
import { createDiagnosisBooking } from "../controllers/diagnosisController.js";

const router = Router();
router.post("/", createDiagnosisBooking);

export default router;