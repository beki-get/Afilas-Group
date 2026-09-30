// routes/pharmaRoutes.js
import { Router } from "express";
import { createPharmaInquiry } from "../controllers/pharmaController.js";

const router = Router();
router.post("/pharma", createPharmaInquiry);

export default router;