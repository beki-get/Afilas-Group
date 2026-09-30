import { Router } from "express";
import { getActiveTestTypes } from "../controllers/testTypeController.js";

const router = Router();
router.get("/", getActiveTestTypes);

export default router;
