import express from "express";
import { createPayment, getPayment, invoicePdf, listPayments, updatePayment } from "../controllers/paymentController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.use(requireAuth, requireRole("admin"));
router.route("/").get(listPayments).post(createPayment);
router.get("/:id/invoice", invoicePdf);
router.route("/:id").get(getPayment).put(updatePayment);

export default router;
