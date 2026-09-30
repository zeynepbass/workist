import cors from "cors";
import express from "express";

import adRoutes from "./routes/ad.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import messageRoutes from "./routes/message.routes.js";
import portfolioRoutes from "./routes/portfolio.routes.js";
import userRoutes from "./routes/user.routes.js";

const BODY_LIMIT = "200mb";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json({ limit: BODY_LIMIT }));
  app.use(express.urlencoded({ limit: BODY_LIMIT, extended: true }));

  app.use(categoryRoutes);
  app.use(portfolioRoutes);
  app.use(adRoutes);
  app.use(userRoutes);
  app.use(messageRoutes);

  return app;
}
