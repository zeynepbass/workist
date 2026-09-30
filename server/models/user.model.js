import mongoose from "mongoose";

import { ratingSchema } from "./rating.schema.js";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    phone: { type: String, trim: true },
    about: { type: String, default: "" },
    avatarKey: { type: String },
    title: { type: String, trim: true },
    skills: [{ type: String }],
    certificates: [{ type: String }],
    rating: { type: ratingSchema, default: () => ({}) },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
