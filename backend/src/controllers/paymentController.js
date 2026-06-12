import PDFDocument from "pdfkit";
import Appointment from "../models/Appointment.js";
import Payment from "../models/Payment.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { created, ok } from "../utils/respond.js";

function invoiceNumber() {
  return `INV-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`;
}

async function syncAppointmentPayment(payment) {
  await Appointment.findByIdAndUpdate(payment.appointmentId, { paymentStatus: payment.status });
}

export const listPayments = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.customerId) filter.customerId = req.query.customerId;
  const payments = await Payment.find(filter).populate("customerId").populate("appointmentId").sort({ createdAt: -1 });
  return ok(res, { payments });
});

export const createPayment = asyncHandler(async (req, res) => {
  const data = { ...req.body, createdBy: req.user._id };
  if (data.status === "paid" && !data.invoiceNumber) data.invoiceNumber = invoiceNumber();
  const payment = await Payment.create(data);
  await syncAppointmentPayment(payment);
  return created(res, { payment });
});

export const getPayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id).populate("customerId").populate({
    path: "appointmentId",
    populate: ["astrologerId", "customerId"]
  });
  return ok(res, { payment });
});

export const updatePayment = asyncHandler(async (req, res) => {
  if (req.body.status === "paid" && !req.body.invoiceNumber) req.body.invoiceNumber = invoiceNumber();
  const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  await syncAppointmentPayment(payment);
  return ok(res, { payment }, "Payment updated");
});

export const invoicePdf = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id).populate("customerId").populate({
    path: "appointmentId",
    populate: ["astrologerId", "customerId"]
  });

  const doc = new PDFDocument({ margin: 48 });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${payment.invoiceNumber || "invoice"}.pdf"`);
  doc.pipe(res);

  doc.fontSize(20).text(process.env.BUSINESS_NAME || "Astrologer CRM");
  doc.fontSize(10).text(process.env.BUSINESS_EMAIL || "");
  doc.text(process.env.BUSINESS_PHONE || "");
  doc.moveDown();
  doc.fontSize(16).text("Invoice");
  doc.fontSize(10).text(`Invoice No: ${payment.invoiceNumber || "Pending"}`);
  doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`);
  doc.moveDown();
  doc.text(`Customer: ${payment.customerId?.name || ""}`);
  doc.text(`Phone: ${payment.customerId?.phone || ""}`);
  doc.text(`Astrologer: ${payment.appointmentId?.astrologerId?.name || ""}`);
  doc.text(`Consultation: ${payment.appointmentId?.consultationType || ""}`);
  doc.text(`Appointment: ${payment.appointmentId?.date?.toDateString() || ""} ${payment.appointmentId?.startTime || ""}`);
  doc.moveDown();
  doc.fontSize(14).text(`Amount: INR ${payment.amount}`);
  doc.fontSize(10).text(`Method: ${payment.method}`);
  doc.text(`Status: ${payment.status}`);
  doc.text(`Transaction ID: ${payment.transactionId || "-"}`);
  doc.end();
});
