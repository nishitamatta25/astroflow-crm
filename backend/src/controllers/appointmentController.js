import Appointment from "../models/Appointment.js";
import Availability from "../models/Availability.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { created, fail, ok } from "../utils/respond.js";

function minutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

async function validateSlot({ astrologerId, date, startTime, endTime, ignoreId }) {
  const start = minutes(startTime);
  const end = minutes(endTime);
  const dayOfWeek = new Date(date).getDay();
  const availability = await Availability.findOne({ astrologerId, dayOfWeek, isActive: true });

  if (!availability) return "Astrologer is not available on this day";
  if (start < minutes(availability.startTime) || end > minutes(availability.endTime)) {
    return "Appointment is outside astrologer availability";
  }

  const inBreak = availability.breaks.some((item) => start < minutes(item.endTime) && end > minutes(item.startTime));
  if (inBreak) return "Appointment overlaps with a break";

  const filter = {
    astrologerId,
    date: new Date(date),
    status: { $in: ["pending", "confirmed"] }
  };
  if (ignoreId) filter._id = { $ne: ignoreId };

  const existing = await Appointment.find(filter);
  const overlaps = existing.some((item) => start < minutes(item.endTime) && end > minutes(item.startTime));
  return overlaps ? "Appointment overlaps with another booking" : null;
}

export const listAppointments = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.user.role === "astrologer" && req.astrologer) filter.astrologerId = req.astrologer._id;
  if (req.query.status) filter.status = req.query.status;
  if (req.query.astrologerId && req.user.role === "admin") filter.astrologerId = req.query.astrologerId;
  if (req.query.customerId) filter.customerId = req.query.customerId;
  if (req.query.date) filter.date = new Date(req.query.date);

  const appointments = await Appointment.find(filter)
    .populate("customerId")
    .populate("astrologerId")
    .sort({ date: 1, startTime: 1 });
  return ok(res, { appointments });
});

export const createAppointment = asyncHandler(async (req, res) => {
  const error = await validateSlot(req.body);
  if (error) return fail(res, 409, error);
  const appointment = await Appointment.create({ ...req.body, createdBy: req.user._id });
  return created(res, { appointment });
});

export const getAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id).populate("customerId").populate("astrologerId");
  return ok(res, { appointment });
});

export const updateAppointment = asyncHandler(async (req, res) => {
  if (req.body.date || req.body.startTime || req.body.endTime || req.body.astrologerId) {
    const current = await Appointment.findById(req.params.id);
    const candidate = { ...current.toObject(), ...req.body, ignoreId: req.params.id };
    const error = await validateSlot(candidate);
    if (error) return fail(res, 409, error);
  }
  const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  return ok(res, { appointment }, "Appointment updated");
});

export const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (req.user.role === "astrologer" && String(appointment.astrologerId) !== String(req.astrologer?._id)) {
    return fail(res, 403, "You can update only your own appointments");
  }
  appointment.status = req.body.status;
  await appointment.save();
  return ok(res, { appointment }, "Appointment status updated");
});

export const deleteAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findByIdAndUpdate(req.params.id, { status: "cancelled" }, { new: true });
  return ok(res, { appointment }, "Appointment cancelled");
});
