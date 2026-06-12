import express from "express";
import { createConsultation, getConsultation, listConsultations, updateConsultation } from "../controllers/consultationController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.use(requireAuth);
router.route("/").get(listConsultations).post(createConsultation);
router.route("/:id").get(getConsultation).put(updateConsultation);

export default router;
