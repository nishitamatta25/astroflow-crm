import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    astrologerId: { type: mongoose.Schema.Types.ObjectId, ref: "Astrologer", required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    consultationType: String,
    status: { type: String, enum: ["pending", "confirmed", "completed", "cancelled"], default: "pending" },
    fee: { type: Number, required: true },
    paymentStatus: { type: String, enum: ["pending", "paid", "failed", "refunded"], default: "pending" },
    meetingLink: String,
    location: String,
    notes: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

appointmentSchema.index({ astrologerId: 1, date: 1, startTime: 1, endTime: 1 });

export default mongoose.model("Appointment", appointmentSchema);
