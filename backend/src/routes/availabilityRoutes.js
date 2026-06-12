import express from "express";
import { createAvailability, deleteAvailability, listAvailability, updateAvailability } from "../controllers/availabilityController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.use(requireAuth);
router.route("/").get(listAvailability).post(createAvailability);
router.route("/:id").put(updateAvailability).delete(deleteAvailability);

export default router;
