import express from "express";
import { listNotifications, markAllRead, markRead } from "../controllers/notificationController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.use(requireAuth);
router.get("/", listNotifications);
router.patch("/read-all", markAllRead);
router.patch("/:id/read", markRead);

export default router;
