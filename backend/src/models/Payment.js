import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true },
    amount: { type: Number, required: true },
    method: { type: String, enum: ["cash", "upi", "card", "bank_transfer"], required: true },
    status: { type: String, enum: ["pending", "paid", "failed", "refunded"], default: "pending" },
    transactionId: String,
    paidAt: Date,
    invoiceNumber: { type: String, unique: true, sparse: true },
    invoiceUrl: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
