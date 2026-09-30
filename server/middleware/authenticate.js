import { unauthorized } from "../utils/AppError.js";
import { verifyAccessToken } from "../utils/tokens.js";

export function readBearerToken(header) {
  const [scheme, token] = String(header ?? "").split(" ");
  return scheme === "Bearer" && token ? token : null;
}

export default function requireAuth(req, res, next) {
  const token = readBearerToken(req.headers.authorization);

  if (!token) {
    return next(unauthorized());
  }

  try {
    req.user = { id: verifyAccessToken(token).userId };
    return next();
  } catch {
    return next(unauthorized("Oturumun süresi doldu, lütfen tekrar giriş yapın."));
  }
}
