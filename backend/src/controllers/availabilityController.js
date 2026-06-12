import Availability from "../models/Availability.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { created, fail, ok } from "../utils/respond.js";

export const listAvailability = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.user.role === "astrologer" && req.astrologer) filter.astrologerId = req.astrologer._id;
  if (req.query.astrologerId && req.user.role === "admin") filter.astrologerId = req.query.astrologerId;
  const availability = await Availability.find(filter).populate("astrologerId").sort({ dayOfWeek: 1 });
  return ok(res, { availability });
});

export const createAvailability = asyncHandler(async (req, res) => {
  const astrologerId = req.user.role === "astrologer" ? req.astrologer?._id : req.body.astrologerId;
  if (!astrologerId) return fail(res, 400, "Astrologer is required");
  const availability = await Availability.create({ ...req.body, astrologerId });
  return created(res, { availability });
});

export const updateAvailability = asyncHandler(async (req, res) => {
  const current = await Availability.findById(req.params.id);
  if (req.user.role === "astrologer" && String(current.astrologerId) !== String(req.astrologer?._id)) {
    return fail(res, 403, "You can update only your own availability");
  }
  const availability = await Availability.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  return ok(res, { availability }, "Availability updated");
});

export const deleteAvailability = asyncHandler(async (req, res) => {
  const availability = await Availability.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
  return ok(res, { availability }, "Availability disabled");
});
