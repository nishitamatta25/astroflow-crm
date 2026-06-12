import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import Appointment from "./models/Appointment.js";
import Astrologer from "./models/Astrologer.js";
import Availability from "./models/Availability.js";
import Consultation from "./models/Consultation.js";
import Customer from "./models/Customer.js";
import Lead from "./models/Lead.js";
import Notification from "./models/Notification.js";
import Payment from "./models/Payment.js";
import User from "./models/User.js";

dotenv.config();

async function seed() {
  await connectDB();
  await Promise.all([
    User.deleteMany({}),
    Astrologer.deleteMany({}),
    Lead.deleteMany({}),
    Customer.deleteMany({}),
    Appointment.deleteMany({}),
    Availability.deleteMany({}),
    Consultation.deleteMany({}),
    Payment.deleteMany({}),
    Notification.deleteMany({})
  ]);

  const admin = await User.create({
    name: "Admin User",
    email: "admin@astrocrm.com",
    phone: "9000000000",
    passwordHash: await bcrypt.hash("Admin@123", 10),
    role: "admin"
  });

  const astrologerUser = await User.create({
    name: "Rahul Sharma",
    email: "rahul@astrocrm.com",
    phone: "9876543210",
    passwordHash: await bcrypt.hash("Astro@123", 10),
    role: "astrologer"
  });

  const astrologer = await Astrologer.create({
    userId: astrologerUser._id,
    name: "Rahul Sharma",
    email: "rahul@astrocrm.com",
    phone: "9876543210",
    specialization: "Vedic Astrology",
    experienceYears: 8,
    consultationFee: 1500,
    languages: ["Hindi", "English"],
    bio: "Specialist in career and relationship consultations."
  });

  await Availability.create([
    { astrologerId: astrologer._id, dayOfWeek: 1, startTime: "10:00", endTime: "18:00", slotDurationMinutes: 45, breaks: [{ startTime: "13:00", endTime: "14:00" }] },
    { astrologerId: astrologer._id, dayOfWeek: 6, startTime: "10:00", endTime: "18:00", slotDurationMinutes: 45, breaks: [{ startTime: "13:00", endTime: "14:00" }] }
  ]);

  const lead = await Lead.create({
    name: "Priya Gupta",
    phone: "9123456780",
    email: "priya.gupta@example.com",
    source: "website",
    interest: "Career Guidance",
    status: "qualified",
    assignedAstrologerId: astrologer._id,
    followUpDate: new Date("2026-08-10"),
    notes: "Interested in career consultation",
    createdBy: admin._id
  });

  const customer = await Customer.create({
    name: "Priya Gupta",
    phone: "9123456780",
    email: "priya.gupta@example.com",
    gender: "female",
    dateOfBirth: new Date("1996-04-18"),
    timeOfBirth: "07:45",
    placeOfBirth: "Jaipur, Rajasthan",
    address: "Jaipur, Rajasthan",
    tags: ["career", "premium"],
    sourceLeadId: lead._id,
    createdBy: admin._id
  });

  lead.status = "converted";
  lead.convertedCustomerId = customer._id;
  await lead.save();

  const appointment = await Appointment.create({
    customerId: customer._id,
    astrologerId: astrologer._id,
    date: new Date("2026-08-15"),
    startTime: "16:00",
    endTime: "16:45",
    consultationType: "Career Guidance",
    status: "confirmed",
    fee: 1500,
    paymentStatus: "paid",
    meetingLink: "https://meet.example.com/session",
    createdBy: admin._id
  });

  await Consultation.create({
    appointmentId: appointment._id,
    customerId: customer._id,
    astrologerId: astrologer._id,
    summary: "Discussed career transition and suitable timing.",
    problemsDiscussed: ["Career", "Job stability"],
    remediesSuggested: "Suggested weekly mantra practice and follow-up after 30 days.",
    followUpRecommendation: "Follow up after 30 days",
    privateNotes: "Customer prefers evening calls",
    createdBy: astrologerUser._id
  });

  await Payment.create({
    customerId: customer._id,
    appointmentId: appointment._id,
    amount: 1500,
    method: "upi",
    status: "paid",
    transactionId: "UPI20260815001",
    paidAt: new Date("2026-08-15T16:50:00.000Z"),
    invoiceNumber: "INV-2026-000001",
    createdBy: admin._id
  });

  await Notification.create({
    recipientUserId: astrologerUser._id,
    title: "Appointment confirmed",
    message: "Priya Gupta has a confirmed appointment on 15 Aug 2026 at 4:00 PM.",
    type: "appointment",
    relatedEntityType: "Appointment",
    relatedEntityId: appointment._id
  });

  console.log("Seed completed");
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
