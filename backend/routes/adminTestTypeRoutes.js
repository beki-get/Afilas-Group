import { Router } from "express";
import {
  createTestType,
  deleteTestType,
  listTestTypesAdmin,
  updateTestType,
} from "../controllers/adminTestTypeController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();
router.use(authMiddleware);
router.post("/", createTestType);
router.get("/", listTestTypesAdmin);
router.patch("/:id", updateTestType);
router.delete("/:id", deleteTestType);

export default router;
