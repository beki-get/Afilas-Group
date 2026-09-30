import { Router } from "express";
import { getActiveDepartments } from "../controllers/departmentController.js";

const router = Router();
router.get("/", getActiveDepartments);

export default router;
