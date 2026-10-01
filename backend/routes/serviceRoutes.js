import { Router } from "express";
import { getActiveServicesByDepartment } from "../controllers/serviceController.js";

const router = Router();

router.get("/", getActiveServicesByDepartment);

export default router;
