import mongoose from "mongoose";

import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { badRequest, notFound } from "../utils/AppError.js";
import { cursorFilter, paginate } from "../utils/pagination.js";

const toObjectId = (id) => new mongoose.Types.ObjectId(String(id));

function between(userId, partnerId) {
  return {
    $or: [
      { sender: userId, recipient: partnerId },
      { sender: partnerId, recipient: userId },
    ],
  };
}

export async function sendMessage(senderId, { recipientId, text }) {
  if (String(senderId) === String(recipientId)) {
    throw badRequest("Kendinize mesaj gönderemezsiniz.");
  }

  if (!(await User.exists({ _id: recipientId }))) {
    throw notFound("Alıcı bulunamadı.");
  }

  return Message.create({ sender: senderId, recipient: recipientId, text });
}

export async function listMessages(userId, partnerId, { cursor, limit }) {
  const filter = { $and: [between(userId, partnerId), cursorFilter(cursor, { field: "sentAt" })] };
  const page = await paginate(Message.find(filter), { limit, field: "sentAt" });

  return { ...page, items: page.items.reverse() };
}

export async function listConversations(userId) {
  const me = toObjectId(userId);

  const rows = await Message.aggregate([
    { $match: { $or: [{ sender: me }, { recipient: me }] } },
    { $sort: { sentAt: -1 } },
    {
      $group: {
        _id: { $cond: [{ $eq: ["$sender", me] }, "$recipient", "$sender"] },
        lastMessage: { $first: "$$ROOT" },
      },
    },
    { $sort: { "lastMessage.sentAt": -1 } },
    { $limit: 100 },
  ]);

  const partners = await User.find({ _id: { $in: rows.map((row) => row._id) } });
  const partnersById = new Map(partners.map((partner) => [String(partner._id), partner]));

  return rows
    .filter((row) => partnersById.has(String(row._id)))
    .map((row) => ({ partner: partnersById.get(String(row._id)), lastMessage: row.lastMessage }));
}

export async function deleteConversation(userId, partnerId) {
  const { deletedCount } = await Message.deleteMany(between(userId, partnerId));
  return deletedCount;
}
