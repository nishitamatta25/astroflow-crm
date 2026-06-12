import Appointment from "../models/Appointment.js";
import Customer from "../models/Customer.js";
import Lead from "../models/Lead.js";
import Payment from "../models/Payment.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ok } from "../utils/respond.js";

function rangeFilter(req, field = "createdAt") {
  const filter = {};
  if (req.query.from || req.query.to) {
    filter[field] = {};
    if (req.query.from) filter[field].$gte = new Date(req.query.from);
    if (req.query.to) filter[field].$lte = new Date(req.query.to);
  }
  return filter;
}

export const revenueReport = asyncHandler(async (req, res) => {
  const filter = { ...rangeFilter(req, "paidAt"), status: "paid" };
  const payments = await Payment.find(filter).populate({
    path: "appointmentId",
    populate: "astrologerId"
  });
  const totalRevenue = payments.reduce((sum, item) => sum + item.amount, 0);
  const byMethod = Object.values(payments.reduce((acc, item) => {
    acc[item.method] ||= { name: item.method, value: 0 };
    acc[item.method].value += item.amount;
    return acc;
  }, {}));
  return ok(res, { totalRevenue, count: payments.length, byMethod, payments });
});

export const appointmentReport = asyncHandler(async (req, res) => {
  const filter = rangeFilter(req, "date");
  if (req.user.role === "astrologer" && req.astrologer) filter.astrologerId = req.astrologer._id;
  const appointments = await Appointment.find(filter);
  const byStatus = Object.values(appointments.reduce((acc, item) => {
    acc[item.status] ||= { name: item.status, value: 0 };
    acc[item.status].value += 1;
    return acc;
  }, {}));
  return ok(res, { count: appointments.length, byStatus, appointments });
});

export const leadReport = asyncHandler(async (req, res) => {
  const leads = await Lead.find(rangeFilter(req));
  const byStatus = Object.values(leads.reduce((acc, item) => {
    acc[item.status] ||= { name: item.status, value: 0 };
    acc[item.status].value += 1;
    return acc;
  }, {}));
  return ok(res, { count: leads.length, byStatus });
});

export const customerReport = asyncHandler(async (req, res) => {
  const customers = await Customer.find(rangeFilter(req));
  return ok(res, { count: customers.length, customers });
});

export const paymentReport = asyncHandler(async (req, res) => {
  const filter = rangeFilter(req);
  if (req.query.status) filter.status = req.query.status;
  const payments = await Payment.find(filter);
  const byStatus = Object.values(payments.reduce((acc, item) => {
    acc[item.status] ||= { name: item.status, value: 0 };
    acc[item.status].value += 1;
    return acc;
  }, {}));
  return ok(res, { count: payments.length, byStatus, payments });
});
