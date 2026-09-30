import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  phone: { type: String },
  about: { type: String, default: "" },
  avatar: { type: String },
  title: { type: String },
  skills: [{ type: String }],
  certificates: [{ type: String }],
});

export default mongoose.model("User", userSchema);
