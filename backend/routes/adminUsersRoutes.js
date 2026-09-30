import { Router } from "express";
import {
  getDiagnosisUsers,
  getHospitalUsers,
  getPharmaUsers,
} from "../controllers/adminUsersController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();
router.use(authMiddleware);
router.get("/hospital", getHospitalUsers);
router.get("/diagnosis", getDiagnosisUsers);
router.get("/pharma", getPharmaUsers);

export default router;
