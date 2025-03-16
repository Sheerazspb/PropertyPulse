import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  // if database is already connected, don't connect again
  if (connected) {
    console.log("Already connected to MongoDB");
    return;
  }
  // connect to database
  try {
    await mongoose.connect(process.env.MONGODB_URI), (connected = true);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;
