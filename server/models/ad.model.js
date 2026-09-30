import mongoose from "mongoose";

import { ratingSchema } from "./rating.schema.js";

const adSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    serviceType: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    deliveryTime: { type: String, required: true },
    revisionCount: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true, min: 0 },
    imageKey: { type: String, required: true },
    addons: {
      logo: { type: Boolean, default: false },
      sourceCode: { type: Boolean, default: false },
      backgroundMusic: { type: Boolean, default: false },
    },
    extras: {
      fastDelivery: { type: Boolean, default: false },
      fullHd: { type: Boolean, default: false },
    },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    rating: { type: ratingSchema, default: () => ({}) },
  },
  { timestamps: true },
);

adSchema.index({ createdAt: -1, _id: -1 });
adSchema.index({ owner: 1, createdAt: -1 });
adSchema.index({ category: 1, createdAt: -1 });
adSchema.index({ subcategory: 1, createdAt: -1 });

export default mongoose.model("Ad", adSchema);
