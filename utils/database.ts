import mongoose from "mongoose";
let isConnected = false;
export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoDB is Connected");
    return;
  }
  if (!process.env.MONGODB_URI) {
    console.log("MongoDB URI Not Found");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: "share_prompt" });
    isConnected = true;
    console.log("MongoDB is Connected");
  } catch (error) {
    console.log(error);
  }
};
