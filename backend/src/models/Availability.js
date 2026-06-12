import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema(
  {
    astrologerId: { type: mongoose.Schema.Types.ObjectId, ref: "Astrologer", required: true },
    dayOfWeek: { type: Number, min: 0, max: 6, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    slotDurationMinutes: { type: Number, default: 30 },
    breaks: [{ startTime: String, endTime: String }],
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Availability", availabilitySchema);
