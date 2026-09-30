import mongoose from "mongoose";

import Message from "../models/message.model.js";

function betweenUsers(firstUserId, secondUserId) {
  return {
    $or: [
      { senderId: firstUserId, recipientId: secondUserId },
      { senderId: secondUserId, recipientId: firstUserId },
    ],
  };
}

export const listMessagesBetweenUsers = async (req, res) => {
  const { senderId, recipientId } = req.params;

  try {
    const messages = await Message.find(betweenUsers(senderId, recipientId)).sort({ sentAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMessagesBetweenUsers = async (req, res) => {
  const { senderId, recipientId } = req.params;

  try {
    await Message.deleteMany(betweenUsers(senderId, recipientId));
    res.status(200).json({ message: "Mesajlar başarıyla silindi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const listConversations = async (req, res) => {
  const { userId } = req.params;

  try {
    const objectUserId = new mongoose.Types.ObjectId(userId);
    const messages = await Message.find({
      $or: [{ senderId: objectUserId }, { recipientId: objectUserId }],
    }).sort({ sentAt: -1 });

    const latestMessageByPartner = new Map();

    for (const message of messages) {
      const partnerId =
        message.senderId.toString() === userId
          ? message.recipientId.toString()
          : message.senderId.toString();

      if (!latestMessageByPartner.has(partnerId)) {
        latestMessageByPartner.set(partnerId, message);
      }
    }

    res.json([...latestMessageByPartner.values()]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
