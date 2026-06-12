import express from "express";
import { login, me } from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);
router.get("/me", requireAuth, me);
router.post("/logout", requireAuth, (req, res) => res.json({ success: true, message: "Logged out", data: {} }));

export default router;
