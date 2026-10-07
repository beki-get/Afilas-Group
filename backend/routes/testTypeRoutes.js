import { Router } from "express";
import {
  getActiveTestTypes,
  getActiveTestTypeById,
} from "../controllers/testTypeController.js";

const router = Router();

router.get("/", getActiveTestTypes);
router.get("/:id", getActiveTestTypeById);

export default router;