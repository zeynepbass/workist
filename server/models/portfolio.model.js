import mongoose from "mongoose";

export const PORTFOLIO_STATUSES = Object.freeze(["published", "unpublished"]);

const portfolioSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    status: { type: String, enum: PORTFOLIO_STATUSES, default: "published" },
    price: { type: Number, required: true, min: 0 },
    imageKey: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
  },
  { timestamps: true },
);

portfolioSchema.index({ owner: 1, createdAt: -1 });
portfolioSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model("Portfolio", portfolioSchema);
