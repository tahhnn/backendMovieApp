import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "guest" },
});
const User = mongoose.model("user", userSchema);

export default User;
