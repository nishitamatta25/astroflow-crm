import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Astrologer from "../models/Astrologer.js";
import { fail } from "../utils/respond.js";

export async function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : req.query.token;

  if (!token) {
    return fail(res, 401, "Authentication token is required");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select("-passwordHash");

    if (!user || user.status !== "active") {
      return fail(res, 401, "User is not authorized");
    }

    req.user = user;
    if (user.role === "astrologer") {
      req.astrologer = await Astrologer.findOne({ userId: user._id });
    }
    next();
  } catch {
    return fail(res, 401, "Invalid or expired token");
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return fail(res, 403, "You do not have permission to perform this action");
    }
    next();
  };
}
