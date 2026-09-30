import mongoose from "mongoose";

import logger from "./logger.js";

export async function connectDatabase(uri) {
  mongoose.connection.on("disconnected", () => logger.warn("MongoDB disconnected"));
  mongoose.connection.on("reconnected", () => logger.info("MongoDB reconnected"));
  mongoose.connection.on("error", (error) => logger.error({ err: error }, "MongoDB error"));

  await mongoose.connect(uri);
  logger.info("MongoDB connected");
}
