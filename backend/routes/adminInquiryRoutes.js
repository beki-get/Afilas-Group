import { Router } from "express";
import {
  listPharmaInquiriesAdmin,
  updateInquiryStatus,
} from "../controllers/adminInquiryController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();
router.use(authMiddleware);
router.get("/", listPharmaInquiriesAdmin);
router.patch("/:id/status", updateInquiryStatus);

export default router;
