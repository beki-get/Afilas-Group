import { Router } from "express";
import { checkDoctorAvailability } from "../controllers/hospitalController.js";

const router = Router();

router.get("/check-availability", checkDoctorAvailability);

export default router;
