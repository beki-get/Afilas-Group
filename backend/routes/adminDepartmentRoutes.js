import { Router } from "express";
import {
  createDepartment,
  deleteDepartment,
  listDepartmentsAdmin,
  updateDepartment,
} from "../controllers/adminDepartmentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();
router.use(authMiddleware);
router.post("/", createDepartment);
router.get("/", listDepartmentsAdmin);
router.patch("/:id", updateDepartment);
router.delete("/:id", deleteDepartment);

export default router;
