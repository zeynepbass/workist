import { Server } from "socket.io";

import { corsOptions } from "../config/cors.js";
import logger from "../config/logger.js";
import { verifyAccessToken } from "../utils/tokens.js";
import { registerChatHandlers } from "./chat.handlers.js";
import { attachNotifier, userRoom } from "./notifier.js";

export function authenticateSocket(socket, next) {
  const token = socket.handshake.auth?.token;

  if (!token) {
    return next(new Error("UNAUTHORIZED"));
  }

  try {
    socket.data.userId = verifyAccessToken(token).userId;
    return next();
  } catch {
    return next(new Error("UNAUTHORIZED"));
  }
}

export function createSocketServer(httpServer) {
  const io = new Server(httpServer, { cors: corsOptions });

  io.use(authenticateSocket);

  io.on("connection", (socket) => {
    socket.join(userRoom(socket.data.userId));
    registerChatHandlers(socket, { logger });
  });

  attachNotifier(io);
  return io;
}
