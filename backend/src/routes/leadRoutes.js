import express from "express";
import { convertLead, createLead, deleteLead, getLead, listLeads, updateLead } from "../controllers/leadController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.use(requireAuth, requireRole("admin"));
router.route("/").get(listLeads).post(createLead);
router.post("/:id/convert", convertLead);
router.route("/:id").get(getLead).put(updateLead).delete(deleteLead);

export default router;
