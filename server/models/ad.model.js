import mongoose from "mongoose";

const adSchema = new mongoose.Schema(
  {
    serviceType: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    deliveryTime: { type: String, required: true },
    revisionCount: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
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
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ownerName: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model("Ad", adSchema);
