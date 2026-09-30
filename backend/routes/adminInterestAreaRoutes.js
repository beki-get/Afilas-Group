import { Router } from "express";
import {
  createInterestArea,
  deleteInterestArea,
  listInterestAreasAdmin,
  updateInterestArea,
} from "../controllers/adminInterestAreaController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();
router.use(authMiddleware);
router.post("/", createInterestArea);
router.get("/", listInterestAreasAdmin);
router.patch("/:id", updateInterestArea);
router.delete("/:id", deleteInterestArea);

export default router;
