import express from "express";
import { createAppointment, deleteAppointment, getAppointment, listAppointments, updateAppointment, updateAppointmentStatus } from "../controllers/appointmentController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.use(requireAuth);
router.get("/", listAppointments);
router.get("/:id", getAppointment);
router.post("/", requireRole("admin"), createAppointment);
router.put("/:id", requireRole("admin"), updateAppointment);
router.patch("/:id/status", updateAppointmentStatus);
router.delete("/:id", requireRole("admin"), deleteAppointment);

export default router;
