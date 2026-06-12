import { fail } from "../utils/respond.js";

export function notFound(req, res) {
  return fail(res, 404, `Route not found: ${req.originalUrl}`);
}

export function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.name === "ValidationError") {
    return fail(res, 400, "Validation failed", Object.values(err.errors).map((item) => item.message));
  }

  if (err.code === 11000) {
    return fail(res, 409, "Duplicate value already exists");
  }

  return fail(res, err.statusCode || 500, err.message || "Server error");
}
