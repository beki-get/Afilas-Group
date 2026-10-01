import { Router } from "express";
import {
  createService,
  deleteService,
  listServicesAdmin,
  updateService,
} from "../controllers/adminServiceController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authMiddleware);
router.post("/", createService);
router.get("/", listServicesAdmin);
router.patch("/:id", updateService);
router.delete("/:id", deleteService);

export default router;
