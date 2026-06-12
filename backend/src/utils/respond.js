export function ok(res, data = {}, message = "Request completed successfully") {
  return res.json({ success: true, message, data });
}

export function created(res, data = {}, message = "Created successfully") {
  return res.status(201).json({ success: true, message, data });
}

export function fail(res, status, message, errors = []) {
  return res.status(status).json({ success: false, message, errors });
}
