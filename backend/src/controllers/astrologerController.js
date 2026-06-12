import bcrypt from "bcryptjs";
import Astrologer from "../models/Astrologer.js";
import User from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { created, ok } from "../utils/respond.js";

export const listAstrologers = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.search) {
    filter.$or = [
      { name: new RegExp(req.query.search, "i") },
      { phone: new RegExp(req.query.search, "i") },
      { specialization: new RegExp(req.query.search, "i") }
    ];
  }
  const astrologers = await Astrologer.find(filter).sort({ createdAt: -1 });
  return ok(res, { astrologers });
});

export const createAstrologer = asyncHandler(async (req, res) => {
  const passwordHash = await bcrypt.hash(req.body.password || "Astro@123", 10);
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    passwordHash,
    role: "astrologer"
  });

  const astrologer = await Astrologer.create({
    userId: user._id,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    specialization: req.body.specialization,
    experienceYears: req.body.experienceYears,
    bio: req.body.bio,
    consultationFee: req.body.consultationFee,
    languages: req.body.languages || []
  });

  return created(res, { astrologer });
});

export const getAstrologer = asyncHandler(async (req, res) => {
  const astrologer = await Astrologer.findById(req.params.id);
  return ok(res, { astrologer });
});

export const updateAstrologer = asyncHandler(async (req, res) => {
  const astrologer = await Astrologer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  return ok(res, { astrologer }, "Astrologer updated");
});

export const deleteAstrologer = asyncHandler(async (req, res) => {
  const astrologer = await Astrologer.findByIdAndUpdate(req.params.id, { status: "inactive" }, { new: true });
  if (astrologer) {
    await User.findByIdAndUpdate(astrologer.userId, { status: "inactive" });
  }
  return ok(res, { astrologer }, "Astrologer deactivated");
});
