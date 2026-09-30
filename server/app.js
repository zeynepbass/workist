import { randomUUID } from "node:crypto";
import path from "node:path";

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { pinoHttp } from "pino-http";

import { corsOptions } from "./config/cors.js";
import env from "./config/env.js";
import logger from "./config/logger.js";
import requireAuth from "./middleware/authenticate.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { createAuthLimiters } from "./middleware/rateLimiters.js";
import sanitizeBody from "./middleware/sanitizeBody.js";
import { mountApiDocs } from "./openapi/docs.js";
import adRoutes from "./routes/ad.routes.js";
import { createAuthRouter } from "./routes/auth.routes.js";
import conversationRoutes from "./routes/conversation.routes.js";
import metaRoutes from "./routes/meta.routes.js";
import orderRoutes from "./routes/order.routes.js";
import portfolioRoutes from "./routes/portfolio.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import userRoutes from "./routes/user.routes.js";
import storage from "./storage/index.js";

const JSON_BODY_LIMIT = "100kb";
const REQUEST_ID_PATTERN = /^[\w-]{1,64}$/;

function requestId(req, res) {
  const incoming = req.headers["x-request-id"];
  const id =
    typeof incoming === "string" && REQUEST_ID_PATTERN.test(incoming) ? incoming : randomUUID();
  res.setHeader("X-Request-Id", id);
  return id;
}

export function createApp({ authLimits } = {}) {
  const app = express();
  const limiters = createAuthLimiters(authLimits);

  app.set("trust proxy", env.TRUST_PROXY);
  app.disable("x-powered-by");

  app.use(
    pinoHttp({
      logger,
      genReqId: requestId,
      autoLogging: { ignore: (req) => req.url === "/health" },
    }),
  );
  app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }));
  app.use(cors(corsOptions));
  app.use(express.json({ limit: JSON_BODY_LIMIT }));
  app.use(cookieParser());
  app.use(sanitizeBody);

  if (storage.driver === "local") {
    app.use(
      "/uploads/public",
      express.static(path.join(storage.rootDir, "public"), { fallthrough: false, index: false }),
    );
  }

  app.use(metaRoutes);
  mountApiDocs(app);

  app.use("/api/auth", createAuthRouter({ limiters }));
  app.use("/api/users", requireAuth, userRoutes);
  app.use("/api/ads", requireAuth, adRoutes);
  app.use("/api/portfolios", requireAuth, portfolioRoutes);
  app.use("/api/conversations", requireAuth, conversationRoutes);
  app.use("/api/orders", requireAuth, orderRoutes);
  app.use("/api/reviews", requireAuth, reviewRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
