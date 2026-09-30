import mongoose from "mongoose";

export const PORTFOLIO_STATUSES = Object.freeze(["published", "unpublished"]);

const portfolioSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: PORTFOLIO_STATUSES, default: "published" },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

export default mongoose.model("Portfolio", portfolioSchema);
