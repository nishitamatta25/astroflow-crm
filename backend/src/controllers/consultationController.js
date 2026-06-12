import Appointment from "../models/Appointment.js";
import Consultation from "../models/Consultation.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { created, fail, ok } from "../utils/respond.js";

export const listConsultations = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.user.role === "astrologer" && req.astrologer) filter.astrologerId = req.astrologer._id;
  if (req.query.customerId) filter.customerId = req.query.customerId;
  if (req.query.appointmentId) filter.appointmentId = req.query.appointmentId;
  const consultations = await Consultation.find(filter).populate("customerId").populate("appointmentId").sort({ createdAt: -1 });
  return ok(res, { consultations });
});

export const createConsultation = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.body.appointmentId);
  if (!appointment) return fail(res, 404, "Appointment not found");
  if (req.user.role === "astrologer" && String(appointment.astrologerId) !== String(req.astrologer?._id)) {
    return fail(res, 403, "You can add notes only for your own appointment");
  }
  const consultation = await Consultation.create({
    ...req.body,
    problemsDiscussed: Array.isArray(req.body.problemsDiscussed)
      ? req.body.problemsDiscussed
      : String(req.body.problemsDiscussed || "").split(",").map((item) => item.trim()).filter(Boolean),
    customerId: appointment.customerId,
    astrologerId: appointment.astrologerId,
    createdBy: req.user._id
  });
  appointment.status = "completed";
  await appointment.save();
  return created(res, { consultation });
});

export const getConsultation = asyncHandler(async (req, res) => {
  const consultation = await Consultation.findById(req.params.id).populate("customerId").populate("appointmentId");
  return ok(res, { consultation });
});

export const updateConsultation = asyncHandler(async (req, res) => {
  const consultation = await Consultation.findById(req.params.id);
  if (req.user.role === "astrologer" && String(consultation.astrologerId) !== String(req.astrologer?._id)) {
    return fail(res, 403, "You can edit only your own notes");
  }
  Object.assign(consultation, req.body);
  await consultation.save();
  return ok(res, { consultation }, "Consultation updated");
});
