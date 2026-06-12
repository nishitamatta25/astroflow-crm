import Notification from "../models/Notification.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ok } from "../utils/respond.js";

export const listNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ recipientUserId: req.user._id }).sort({ createdAt: -1 });
  return ok(res, { notifications });
});

export const markRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, recipientUserId: req.user._id },
    { isRead: true },
    { new: true }
  );
  return ok(res, { notification });
});

export const markAllRead = asyncHandler(async (req, res) => {
  await Notification.updateMany({ recipientUserId: req.user._id }, { isRead: true });
  return ok(res, {}, "All notifications marked as read");
});
