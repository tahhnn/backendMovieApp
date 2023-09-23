import mongoose from "mongoose";

async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/nodejsTuVA");
    console.log("Connected to MongoDB");
  } catch (e) {
    console.log("Error connecting");
  }
}
export { connect };
