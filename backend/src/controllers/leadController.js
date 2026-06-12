import Customer from "../models/Customer.js";
import Lead from "../models/Lead.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { created, fail, ok } from "../utils/respond.js";

export const listLeads = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.assignedAstrologerId) filter.assignedAstrologerId = req.query.assignedAstrologerId;
  if (req.query.search) {
    filter.$or = [{ name: new RegExp(req.query.search, "i") }, { phone: new RegExp(req.query.search, "i") }];
  }
  const leads = await Lead.find(filter).populate("assignedAstrologerId").sort({ createdAt: -1 });
  return ok(res, { leads });
});

export const createLead = asyncHandler(async (req, res) => {
  const lead = await Lead.create({ ...req.body, createdBy: req.user._id });
  return created(res, { lead });
});

export const getLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id).populate("assignedAstrologerId");
  return ok(res, { lead });
});

export const updateLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  return ok(res, { lead }, "Lead updated");
});

export const deleteLead = asyncHandler(async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  return ok(res, {}, "Lead deleted");
});

export const convertLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) return fail(res, 404, "Lead not found");
  if (lead.status === "converted" && lead.convertedCustomerId) {
    return fail(res, 409, "Lead is already converted");
  }

  const customer = await Customer.create({
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    notes: lead.notes,
    sourceLeadId: lead._id,
    createdBy: req.user._id
  });

  lead.status = "converted";
  lead.convertedCustomerId = customer._id;
  await lead.save();

  return created(res, { customer, lead }, "Lead converted to customer");
});
