import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    gender: { type: String, enum: ["male", "female", "other", "prefer_not_to_say"] },
    dateOfBirth: Date,
    timeOfBirth: String,
    placeOfBirth: String,
    address: String,
    tags: [String],
    notes: String,
    sourceLeadId: { type: mongoose.Schema.Types.ObjectId, ref: "Lead" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export default mongoose.model("Customer", customerSchema);
