import express from "express";
import { appointmentReport, customerReport, leadReport, paymentReport, revenueReport } from "../controllers/reportController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.use(requireAuth);
router.get("/appointments", appointmentReport);
router.get("/revenue", requireRole("admin"), revenueReport);
router.get("/leads", requireRole("admin"), leadReport);
router.get("/customers", requireRole("admin"), customerReport);
router.get("/payments", requireRole("admin"), paymentReport);
router.get("/export", requireRole("admin"), async (req, res) => {
  res.json({ success: true, message: "Export endpoint ready. Connect CSV/XLSX writer here.", data: { type: req.query.type || "revenue" } });
});

export default router;
