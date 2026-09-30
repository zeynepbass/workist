import { createHash, randomBytes, randomUUID } from "node:crypto";

import jwt from "jsonwebtoken";

import env from "../config/env.js";

const ACCESS_TOKEN_ALGORITHM = "HS256";

export function signAccessToken(userId) {
  return jwt.sign({ sub: String(userId) }, env.JWT_ACCESS_SECRET, {
    algorithm: ACCESS_TOKEN_ALGORITHM,
    expiresIn: env.ACCESS_TOKEN_TTL,
  });
}

export function verifyAccessToken(token) {
  const payload = jwt.verify(token, env.JWT_ACCESS_SECRET, {
    algorithms: [ACCESS_TOKEN_ALGORITHM],
  });

  return { userId: payload.sub };
}

export function generateRefreshToken() {
  return randomBytes(32).toString("base64url");
}

export function hashToken(token) {
  return createHash("sha256").update(token).digest("hex");
}

export function newTokenFamily() {
  return randomUUID();
}
