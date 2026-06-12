import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipientUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ["appointment", "payment", "lead", "system"], default: "system" },
    isRead: { type: Boolean, default: false },
    relatedEntityType: String,
    relatedEntityId: mongoose.Schema.Types.ObjectId
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
