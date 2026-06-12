import express from "express";
import { createAstrologer, deleteAstrologer, getAstrologer, listAstrologers, updateAstrologer } from "../controllers/astrologerController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.use(requireAuth, requireRole("admin"));
router.route("/").get(listAstrologers).post(createAstrologer);
router.route("/:id").get(getAstrologer).put(updateAstrologer).delete(deleteAstrologer);

export default router;
