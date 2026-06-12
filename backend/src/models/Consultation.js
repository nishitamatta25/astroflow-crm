import mongoose from "mongoose";

const consultationSchema = new mongoose.Schema(
  {
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true, unique: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    astrologerId: { type: mongoose.Schema.Types.ObjectId, ref: "Astrologer", required: true },
    summary: { type: String, required: true },
    problemsDiscussed: [String],
    remediesSuggested: String,
    followUpRecommendation: String,
    privateNotes: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export default mongoose.model("Consultation", consultationSchema);
