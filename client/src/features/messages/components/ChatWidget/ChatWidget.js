import { useState } from "react";

import { useMessages } from "../../hooks/useMessages";
import { useChatSocket } from "../../hooks/useChatSocket";
import ChatMessageList from "../ChatMessageList";
import ChatInput from "../ChatInput";

export default function ChatWidget({ partnerName, open, userId, partnerId, onClose }) {
  const [newMessage, setNewMessage] = useState("");

  const { messages, addMessageToCache, isMessagesLoading } = useMessages(userId, partnerId);

  const { sendMessage } = useChatSocket({
    userId,
    partnerId,
    enabled: open,
    onMessage: addMessageToCache,
  });

  const handleSend = (e) => {
    e.preventDefault();

    const text = newMessage.trim();

    if (!text || !userId || !partnerId) {
      return;
    }

    sendMessage(text);
    setNewMessage("");
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-10 z-50 flex h-[30vh] w-[400px] flex-col rounded-t-xl bg-gray-100 font-sans shadow-lg">
      <div className="flex items-center justify-between border-b bg-white p-4">
        <p className="font-bold">{partnerName}</p>

        <button
          type="button"
          aria-label="Sohbeti kapat"
          onClick={() => onClose(false)}
          className="text-xl font-bold text-gray-400 hover:text-red-500"
        >
          ×
        </button>
      </div>

      <ChatMessageList messages={messages} currentUserId={userId} isLoading={isMessagesLoading} />

      <ChatInput
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onSubmit={handleSend}
        disabled={!partnerId}
      />
    </div>
  );
}
