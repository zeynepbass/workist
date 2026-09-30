import mongoose from "mongoose";

import { ORDER_ACTIONS, ORDER_STATUSES } from "../services/orderStateMachine.js";

const fileSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    size: { type: Number, required: true },
    contentType: { type: String, required: true },
  },
  { _id: true },
);

const deliverySchema = new mongoose.Schema(
  {
    note: { type: String, default: "" },
    files: [fileSchema],
    deliveredAt: { type: Date, default: Date.now },
  },
  { _id: true },
);

const eventSchema = new mongoose.Schema(
  {
    action: { type: String, enum: [...ORDER_ACTIONS, "create"], required: true },
    actor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fromStatus: { type: String, enum: ORDER_STATUSES },
    toStatus: { type: String, enum: ORDER_STATUSES, required: true },
    note: { type: String, default: "" },
    at: { type: Date, default: Date.now },
  },
  { _id: true },
);

const orderSchema = new mongoose.Schema(
  {
    ad: { type: mongoose.Schema.Types.ObjectId, ref: "Ad", required: true },
    adTitle: { type: String, required: true },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ORDER_STATUSES, default: "requested" },
    requirements: { type: String, required: true },
    offer: {
      price: { type: Number, min: 0 },
      deliveryDays: { type: Number, min: 1 },
      note: { type: String },
    },
    dueAt: { type: Date },
    revisionLimit: { type: Number, default: 0, min: 0 },
    revisionsUsed: { type: Number, default: 0, min: 0 },
    deliveries: [deliverySchema],
    events: [eventSchema],
    reviewed: { type: Boolean, default: false },
  },
  { timestamps: true },
);

orderSchema.index({ buyer: 1, createdAt: -1, _id: -1 });
orderSchema.index({ seller: 1, createdAt: -1, _id: -1 });
orderSchema.index({ seller: 1, status: 1 });

export default mongoose.model("Order", orderSchema);
