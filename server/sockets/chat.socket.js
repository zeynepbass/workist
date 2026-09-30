import logger from "../config/logger.js";
import Message from "../models/message.model.js";

export function registerChatHandlers(io) {
  io.on("connection", (socket) => {
    socket.on("sendMessage", async (payload) => {
      try {
        const message = await Message.create(payload);
        io.emit("receiveMessage", message);
      } catch (error) {
        logger.warn({ err: error, socketId: socket.id }, "Failed to persist chat message");
      }
    });
  });
}
