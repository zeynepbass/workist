import mongoose from "mongoose";

export const MESSAGE_MAX_LENGTH = 2000;

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true, maxlength: MESSAGE_MAX_LENGTH },
  sentAt: { type: Date, default: Date.now },
});

messageSchema.index({ sender: 1, recipient: 1, sentAt: -1 });
messageSchema.index({ recipient: 1, sentAt: -1 });

export default mongoose.model("Message", messageSchema);
