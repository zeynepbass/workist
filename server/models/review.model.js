import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true, unique: true },
    ad: { type: mongoose.Schema.Types.ObjectId, ref: "Ad", required: true },
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, default: "", maxlength: 1000 },
  },
  { timestamps: true },
);

reviewSchema.index({ seller: 1, createdAt: -1 });
reviewSchema.index({ ad: 1, createdAt: -1 });

export default mongoose.model("Review", reviewSchema);
