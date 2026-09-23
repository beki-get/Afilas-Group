// routes/hospitalRoutes.js
import { Router } from "express";
import { createHospitalBooking } from "../controllers/hospitalController.js";

const router = Router();
router.post("/", createHospitalBooking);

export default router;