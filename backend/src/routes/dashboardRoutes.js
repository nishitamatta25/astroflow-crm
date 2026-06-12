import express from "express";
import { adminDashboard, astrologerDashboard } from "../controllers/dashboardController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.get("/admin", requireAuth, requireRole("admin"), adminDashboard);
router.get("/astrologer", requireAuth, requireRole("astrologer"), astrologerDashboard);

export default router;
