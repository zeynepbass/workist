import bcrypt from "bcrypt";

import env from "../config/env.js";
import RefreshToken from "../models/refreshToken.model.js";
import User from "../models/user.model.js";
import { conflict, unauthorized } from "../utils/AppError.js";
import {
  generateRefreshToken,
  hashToken,
  newTokenFamily,
  signAccessToken,
} from "../utils/tokens.js";

export const PASSWORD_SALT_ROUNDS = env.NODE_ENV === "test" ? 4 : 12;
const DAY_IN_MS = 24 * 60 * 60 * 1000;
const INVALID_CREDENTIALS = "E-posta veya parola hatalı.";
const TIMING_SAFE_HASH = bcrypt.hashSync("timing-safe-placeholder", 4);

async function issueRefreshToken(userId, familyId) {
  const token = generateRefreshToken();

  await RefreshToken.create({
    user: userId,
    tokenHash: hashToken(token),
    familyId,
    expiresAt: new Date(Date.now() + env.REFRESH_TOKEN_TTL_DAYS * DAY_IN_MS),
  });

  return token;
}

async function issueSession(user, familyId = newTokenFamily()) {
  return {
    user,
    accessToken: signAccessToken(user._id),
    refreshToken: await issueRefreshToken(user._id, familyId),
  };
}

export async function register({ email, password, firstName, lastName }) {
  if (await User.exists({ email })) {
    throw conflict("Bu e-posta adresi zaten kayıtlı.");
  }

  try {
    return await User.create({
      email,
      firstName,
      lastName,
      password: await bcrypt.hash(password, PASSWORD_SALT_ROUNDS),
    });
  } catch (error) {
    if (error?.code === 11000) {
      throw conflict("Bu e-posta adresi zaten kayıtlı.");
    }

    throw error;
  }
}

export async function login({ email, password }) {
  const user = await User.findOne({ email }).select("+password");
  const isValid = await bcrypt.compare(password, user?.password ?? TIMING_SAFE_HASH);

  if (!user || !isValid) {
    throw unauthorized(INVALID_CREDENTIALS);
  }

  return issueSession(user);
}

export async function refresh(presentedToken, { log } = {}) {
  if (!presentedToken) {
    throw unauthorized();
  }

  const stored = await RefreshToken.findOne({ tokenHash: hashToken(presentedToken) });

  if (!stored || stored.expiresAt <= new Date()) {
    throw unauthorized();
  }

  if (stored.revokedAt) {
    await revokeFamily(stored.familyId);
    log?.warn(
      { userId: String(stored.user), familyId: stored.familyId },
      "Refresh token reuse detected",
    );
    throw unauthorized();
  }

  const user = await User.findById(stored.user);

  if (!user) {
    await revokeFamily(stored.familyId);
    throw unauthorized();
  }

  const session = await issueSession(user, stored.familyId);

  const rotated = await RefreshToken.updateOne(
    { _id: stored._id, revokedAt: { $exists: false } },
    { $set: { revokedAt: new Date(), replacedByHash: hashToken(session.refreshToken) } },
  );

  if (rotated.modifiedCount === 0) {
    await revokeFamily(stored.familyId);
    throw unauthorized();
  }

  return session;
}

export async function logout(presentedToken) {
  if (!presentedToken) {
    return;
  }

  const stored = await RefreshToken.findOne({ tokenHash: hashToken(presentedToken) });

  if (stored) {
    await revokeFamily(stored.familyId);
  }
}

export async function revokeFamily(familyId) {
  await RefreshToken.updateMany(
    { familyId, revokedAt: { $exists: false } },
    { $set: { revokedAt: new Date() } },
  );
}

export async function revokeAllForUser(userId) {
  await RefreshToken.updateMany(
    { user: userId, revokedAt: { $exists: false } },
    { $set: { revokedAt: new Date() } },
  );
}
