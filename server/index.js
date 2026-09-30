import http from "node:http";

import mongoose from "mongoose";

import logger from "./config/logger.js";

const SHUTDOWN_TIMEOUT_MS = 10_000;

async function start() {
  const { default: env } = await import("./config/env.js");
  const { connectDatabase } = await import("./config/db.js");
  const { createApp } = await import("./app.js");
  const { createSocketServer } = await import("./sockets/index.js");

  await connectDatabase(env.MONGO_URI);

  const server = http.createServer(createApp());
  const io = createSocketServer(server);

  server.listen(env.PORT, () => logger.info({ port: env.PORT }, "Server listening"));

  let shuttingDown = false;

  const shutdown = async (signal) => {
    if (shuttingDown) return;
    shuttingDown = true;
    logger.info({ signal }, "Shutting down");

    const forceExit = setTimeout(() => {
      logger.error("Graceful shutdown timed out");
      process.exit(1);
    }, SHUTDOWN_TIMEOUT_MS);
    forceExit.unref();

    await new Promise((resolve) => io.close(() => resolve()));
    await new Promise((resolve) => server.close(() => resolve()));
    await mongoose.disconnect();
    logger.info("Shutdown complete");
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

process.on("unhandledRejection", (reason) => {
  logger.error({ err: reason }, "Unhandled promise rejection");
});

start().catch((error) => {
  logger.fatal({ err: error }, error.message);
  process.exitCode = 1;
});
