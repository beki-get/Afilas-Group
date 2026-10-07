import { Router } from "express";

import {
  getActiveServicesByDepartment,
  getAllActiveServices,
} from "../controllers/serviceController.js";

const router = Router();

router.get("/", getAllActiveServices);
router.get("/by-department", getActiveServicesByDepartment);

export default router;