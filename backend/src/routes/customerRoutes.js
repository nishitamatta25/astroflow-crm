import express from "express";
import { createCustomer, deleteCustomer, getCustomer, listCustomers, updateCustomer } from "../controllers/customerController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.use(requireAuth);
router.get("/", listCustomers);
router.get("/:id", getCustomer);
router.post("/", requireRole("admin"), createCustomer);
router.put("/:id", requireRole("admin"), updateCustomer);
router.delete("/:id", requireRole("admin"), deleteCustomer);

export default router;
