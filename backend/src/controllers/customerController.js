import Appointment from "../models/Appointment.js";
import Consultation from "../models/Consultation.js";
import Customer from "../models/Customer.js";
import Payment from "../models/Payment.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { created, ok } from "../utils/respond.js";

function customerAccessFilter(req) {
  if (req.user.role !== "astrologer" || !req.astrologer) return {};
  return { astrologerId: req.astrologer._id };
}

export const listCustomers = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.search) {
    filter.$or = [{ name: new RegExp(req.query.search, "i") }, { phone: new RegExp(req.query.search, "i") }, { email: new RegExp(req.query.search, "i") }];
  }

  if (req.user.role === "astrologer" && req.astrologer) {
    const appointments = await Appointment.find({ astrologerId: req.astrologer._id }).select("customerId");
    filter._id = { $in: appointments.map((item) => item.customerId) };
  }

  const customers = await Customer.find(filter).sort({ createdAt: -1 });
  return ok(res, { customers });
});

export const createCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.create({ ...req.body, createdBy: req.user._id });
  return created(res, { customer });
});

export const getCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  const access = customerAccessFilter(req);
  const appointments = await Appointment.find({ customerId: req.params.id, ...access }).populate("astrologerId").sort({ date: -1 });
  const consultations = await Consultation.find({ customerId: req.params.id, ...access }).populate("appointmentId").sort({ createdAt: -1 });
  const payments = req.user.role === "admin" ? await Payment.find({ customerId: req.params.id }).sort({ createdAt: -1 }) : [];
  return ok(res, { customer, appointments, consultations, payments });
});

export const updateCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  return ok(res, { customer }, "Customer updated");
});

export const deleteCustomer = asyncHandler(async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  return ok(res, {}, "Customer deleted");
});
