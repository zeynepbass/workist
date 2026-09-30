import http from "node:http";

import { Server } from "socket.io";

import logger from "./config/logger.js";

async function start() {
  const { default: env } = await import("./config/env.js");
  const { connectDatabase } = await import("./config/db.js");
  const { createApp } = await import("./app.js");
  const { registerChatHandlers } = await import("./sockets/chat.socket.js");

  await connectDatabase(env.MONGO_URI);

  const server = http.createServer(createApp());
  const io = new Server(server, {
    cors: { origin: env.CLIENT_URL, methods: ["GET", "POST"], credentials: true },
  });

  registerChatHandlers(io);

  server.listen(env.PORT, () => logger.info({ port: env.PORT }, "Server listening"));
}

start().catch((error) => {
  logger.fatal({ err: error }, error.message);
  process.exitCode = 1;
});
