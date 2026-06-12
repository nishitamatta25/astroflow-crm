import Astrologer from "../models/Astrologer.js";
import Appointment from "../models/Appointment.js";
import Consultation from "../models/Consultation.js";
import Customer from "../models/Customer.js";
import Lead from "../models/Lead.js";
import Payment from "../models/Payment.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ok } from "../utils/respond.js";

export const adminDashboard = asyncHandler(async (req, res) => {
  const [leads, customers, astrologers, appointments, pendingPayments, paidPayments] = await Promise.all([
    Lead.countDocuments(),
    Customer.countDocuments(),
    Astrologer.countDocuments({ status: "active" }),
    Appointment.find().populate("customerId").populate("astrologerId").sort({ date: 1 }).limit(10),
    Payment.countDocuments({ status: "pending" }),
    Payment.find({ status: "paid" })
  ]);

  const revenue = paidPayments.reduce((sum, item) => sum + item.amount, 0);
  const appointmentStatus = await Appointment.aggregate([{ $group: { _id: "$status", value: { $sum: 1 } } }]);

  return ok(res, {
    metrics: { leads, customers, astrologers, todaysAppointments: appointments.length, pendingPayments, revenue },
    appointmentStatus: appointmentStatus.map((item) => ({ name: item._id, value: item.value })),
    revenueTrend: paidPayments.map((item) => ({ name: item.createdAt.toISOString().slice(0, 10), revenue: item.amount })),
    appointments
  });
});

export const astrologerDashboard = asyncHandler(async (req, res) => {
  const astrologerId = req.astrologer?._id;
  const appointments = await Appointment.find({ astrologerId }).populate("customerId").sort({ date: 1 });
  const completed = appointments.filter((item) => item.status === "completed").length;
  const notes = await Consultation.countDocuments({ astrologerId });
  return ok(res, {
    metrics: {
      todaysAppointments: appointments.length,
      upcomingAppointments: appointments.filter((item) => ["pending", "confirmed"].includes(item.status)).length,
      completedConsultations: completed,
      pendingNotes: Math.max(completed - notes, 0)
    },
    appointments,
    completedChart: [{ name: "Completed", value: completed }, { name: "Pending", value: appointments.length - completed }]
  });
});
