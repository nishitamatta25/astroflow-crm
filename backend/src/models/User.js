import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: String,
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin", "astrologer"], required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    lastLoginAt: Date
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
