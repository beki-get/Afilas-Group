import { Router } from "express";
import {
  getDiagnosisAnalytics,
  getDiagnosisOverview,
  getGroupAnalytics,
  getGroupOverview,
  getHospitalAnalytics,
  getHospitalOverview,
  getPharmaAnalytics,
  getPharmaOverview,
} from "../controllers/adminOverviewController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();
router.use(authMiddleware);
router.get("/group", getGroupOverview);
router.get("/hospital", getHospitalOverview);
router.get("/diagnosis", getDiagnosisOverview);
router.get("/pharma", getPharmaOverview);
router.get("/group-analytics", getGroupAnalytics);
router.get("/hospital-analytics", getHospitalAnalytics);
router.get("/diagnosis-analytics", getDiagnosisAnalytics);
router.get("/pharma-analytics", getPharmaAnalytics);

export default router;
