import { useEffect } from "react";

import { socket } from "@/shared/socket";
import messageAdapter from "../adapters/message.adapter";

function belongsToConversation(message, userId, partnerId) {
  return (
    (message.senderId === userId && message.recipientId === partnerId) ||
    (message.senderId === partnerId && message.recipientId === userId)
  );
}

export function useChatSocket({ userId, partnerId, enabled = true, onMessage }) {
  useEffect(() => {
    if (!enabled || !userId || !partnerId) {
      return undefined;
    }

    const handleReceiveMessage = (payload) => {
      const message = messageAdapter(payload);

      if (belongsToConversation(message, userId, partnerId)) {
        onMessage(message);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [enabled, userId, partnerId, onMessage]);

  const sendMessage = (text) => {
    socket.emit("sendMessage", { senderId: userId, recipientId: partnerId, text });
  };

  return { sendMessage };
}
