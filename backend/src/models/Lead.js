import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    source: { type: String, enum: ["website", "referral", "social_media", "walk_in", "other"], default: "website" },
    interest: String,
    status: { type: String, enum: ["new", "contacted", "qualified", "converted", "lost"], default: "new" },
    assignedAstrologerId: { type: mongoose.Schema.Types.ObjectId, ref: "Astrologer" },
    followUpDate: Date,
    notes: String,
    convertedCustomerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);
