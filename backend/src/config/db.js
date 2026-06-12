import mongoose from "mongoose";

export async function connectDB() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("MONGO_URI is missing");
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected");
  } catch (error) {
    const localUri = "mongodb://127.0.0.1:27017/astrologer_crm";
    if (mongoUri !== localUri) {
      console.warn("Primary MongoDB URI failed, trying local MongoDB fallback...");
      await mongoose.connect(localUri);
      console.log("MongoDB connected using local fallback");
      return;
    }

    throw new Error(
      `Failed to connect to MongoDB at ${mongoUri}. Start MongoDB locally or update MONGO_URI to a reachable Atlas cluster.`
    );
  }
}
