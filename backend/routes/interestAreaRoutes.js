import { Router } from "express";
import { getActiveInterestAreas } from "../controllers/interestAreaController.js";

const router = Router();
router.get("/", getActiveInterestAreas);

export default router;
