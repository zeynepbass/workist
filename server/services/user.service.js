import bcrypt from "bcrypt";
import mongoose from "mongoose";

import Ad from "../models/ad.model.js";
import Message from "../models/message.model.js";
import Portfolio from "../models/portfolio.model.js";
import User from "../models/user.model.js";
import { removeQuietly } from "../storage/index.js";
import { notFound, unauthorized } from "../utils/AppError.js";
import { PASSWORD_SALT_ROUNDS, revokeAllForUser } from "./auth.service.js";
import { storeImage } from "./file.service.js";

export async function getUser(userId) {
  const user = await User.findById(userId);

  if (!user) {
    throw notFound("Kullanıcı bulunamadı.");
  }

  return user;
}

export async function updateProfile(userId, changes) {
  const user = await getUser(userId);
  user.set(changes);
  return user.save();
}

export async function updateAvatar(userId, file, { log } = {}) {
  const user = await getUser(userId);
  const previousKey = user.avatarKey;

  user.avatarKey = await storeImage(file, { folder: "avatars", ownerId: userId });
  await user.save();
  await removeQuietly(previousKey, log);

  return user;
}

async function verifyPassword(userId, password) {
  const user = await User.findById(userId).select("+password");

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw unauthorized("Parola hatalı.");
  }

  return user;
}

export async function changePassword(userId, { currentPassword, newPassword }) {
  const user = await verifyPassword(userId, currentPassword);
  user.password = await bcrypt.hash(newPassword, PASSWORD_SALT_ROUNDS);
  await user.save();
  await revokeAllForUser(userId);
}

export async function deleteAccount(userId, { password }, { log } = {}) {
  const user = await verifyPassword(userId, password);
  const [ads, portfolios] = await Promise.all([
    Ad.find({ owner: userId }).select("imageKey"),
    Portfolio.find({ owner: userId }).select("imageKey"),
  ]);

  await Promise.all([
    Ad.deleteMany({ owner: userId }),
    Portfolio.deleteMany({ owner: userId }),
    Message.deleteMany({ $or: [{ sender: userId }, { recipient: userId }] }),
    revokeAllForUser(userId),
  ]);
  await User.deleteOne({ _id: user._id });

  const keys = [
    user.avatarKey,
    ...ads.map((ad) => ad.imageKey),
    ...portfolios.map((p) => p.imageKey),
  ];
  await Promise.all(keys.map((key) => removeQuietly(key, log)));
}

export async function findPublicUsers(ids) {
  const validIds = ids.filter((id) => mongoose.Types.ObjectId.isValid(id));
  return User.find({ _id: { $in: validIds } });
}
