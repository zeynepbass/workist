import Message from '../models/message.js';
import mongoose from 'mongoose';
export const getMessage = async (req, res) => {
  const { gonderenId, aliciId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { gonderenId, aliciId },
        { gonderenId: aliciId, aliciId: gonderenId }
      ]
    }).sort({ time: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const deleteMessagesBetweenUsers = async (req, res) => {
  const { gonderenId, aliciId } = req.params;
  try {
    await Message.deleteMany({
      $or: [
        { gonderenId, aliciId },
        { gonderenId: aliciId, aliciId: gonderenId }
      ]
    });

    res.status(200).json({ message: "Mesajlar başarıyla silindi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getConversations = async (req, res) => {
  const { userId } = req.params;
  try {
    const objectUserId = new mongoose.Types.ObjectId(userId); // burada new var

    const messages = await Message.find({
      $or: [
        { gonderenId: objectUserId },
        { aliciId: objectUserId }
      ]
    }).sort({ createdAt: -1 });

    const conversations = {};
    messages.forEach(msg => {
      const otherUser = msg.gonderenId.toString() === userId ? msg.aliciId.toString() : msg.gonderenId.toString();
      conversations[otherUser] = msg;
    });

    res.json(Object.values(conversations));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};