import { useMemo, useState } from "react";

import { useMessages } from "../hooks/useMessages";
import { useChatSocket } from "../hooks/useChatSocket";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";

import ChatUserList from "../components/ChatUserList";
import ChatMessageList from "../components/ChatMessageList";
import ChatInput from "../components/ChatInput";

function partnerIdOf(message, userId) {
  return message.senderId === userId ? message.recipientId : message.senderId;
}

export default function Chat() {
  const { userId } = useCurrentUser();

  const [partnerId, setPartnerId] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const { messages, users, conversations, addMessageToCache, isMessagesLoading, isUsersLoading } =
    useMessages(userId, partnerId);

  const { sendMessage } = useChatSocket({ userId, partnerId, onMessage: addMessageToCache });

  const conversationPartners = useMemo(() => {
    const partnerIds = new Set(conversations.map((message) => partnerIdOf(message, userId)));

    return users.filter((user) => partnerIds.has(user.id));
  }, [users, conversations, userId]);

  const handleSend = (e) => {
    e.preventDefault();

    const text = newMessage.trim();

    if (!text || !partnerId || !userId) {
      return;
    }

    sendMessage(text);
    setNewMessage("");
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <div className="w-1/3 border-r bg-white p-4">
        <h2 className="mb-4 text-xl font-semibold">Gelen Kutusu</h2>

        <ChatUserList
          users={conversationPartners}
          selectedUserId={partnerId}
          onSelect={setPartnerId}
          isLoading={isUsersLoading}
        />
      </div>

      <div className="flex flex-1 flex-col bg-gray-50 p-6">
        <h3 className="mb-4 text-lg font-semibold">Mesajlar</h3>

        {partnerId ? (
          <ChatMessageList
            messages={messages}
            currentUserId={userId}
            isLoading={isMessagesLoading}
          />
        ) : (
          <p className="italic text-gray-500">Mesajlaşmak için bir kullanıcı seçin.</p>
        )}

        <ChatInput
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onSubmit={handleSend}
          disabled={!partnerId}
        />
      </div>
    </div>
  );
}
