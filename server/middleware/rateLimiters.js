import rateLimit from "express-rate-limit";

const MINUTE = 60 * 1000;

const limiter = (limit, windowMs = MINUTE) =>
  rateLimit({
    windowMs,
    limit,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    handler: (req, res) =>
      res.status(429).json({
        error: {
          code: "TOO_MANY_REQUESTS",
          message: "Çok fazla deneme yaptınız, lütfen biraz sonra tekrar deneyin.",
          requestId: req.id,
        },
      }),
  });

export const DEFAULT_AUTH_LIMITS = Object.freeze({ credentials: 10, refresh: 30 });

export function createAuthLimiters(limits = DEFAULT_AUTH_LIMITS) {
  return {
    credentials: limiter(limits.credentials),
    refresh: limiter(limits.refresh),
  };
}
