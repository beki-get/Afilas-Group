import { Router } from "express";
import { createContactNotification } from "../controllers/contactController.js";

const router = Router();

router.post("/", createContactNotification);

export default router;