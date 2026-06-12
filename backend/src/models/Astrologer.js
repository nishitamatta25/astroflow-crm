import mongoose from "mongoose";

const astrologerSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true },
    specialization: String,
    experienceYears: Number,
    bio: String,
    consultationFee: { type: Number, default: 0 },
    languages: [String],
    status: { type: String, enum: ["active", "inactive"], default: "active" }
  },
  { timestamps: true }
);

export default mongoose.model("Astrologer", astrologerSchema);
