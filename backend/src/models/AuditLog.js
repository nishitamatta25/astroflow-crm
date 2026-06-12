import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    actorUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    action: { type: String, required: true },
    entityType: { type: String, required: true },
    entityId: mongoose.Schema.Types.ObjectId,
    before: Object,
    after: Object,
    ipAddress: String
  },
  { timestamps: true }
);

export default mongoose.model("AuditLog", auditLogSchema);
