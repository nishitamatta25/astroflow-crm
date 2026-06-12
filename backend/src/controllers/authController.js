import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { fail, ok } from "../utils/respond.js";

function signToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
  });
}

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return fail(res, 400, "Email and password are required");
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user || user.status !== "active") {
    return fail(res, 401, "Invalid credentials");
  }

  const matches = await bcrypt.compare(password, user.passwordHash);
  if (!matches) {
    return fail(res, 401, "Invalid credentials");
  }

  user.lastLoginAt = new Date();
  await user.save();

  return ok(res, {
    token: signToken(user),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  }, "Login successful");
});

export const me = asyncHandler(async (req, res) => {
  return ok(res, { user: req.user });
});
