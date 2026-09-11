import { useState } from "react";

import { useMessages } from "../hooks/useMessages";
import { useChatSocket } from "../hooks/useChatSocket";

import ChatMessageList from "../components/ChatMessageList";
import ChatInput from "../components/ChatInput";

export default function MessagingUI({
    adi,
    open,
    gonderenId,
    aliciId,
    onClose,
}) {
    const [newMessage, setNewMessage] = useState("");

    const {
        messages,
        isMessagesLoading,
    } = useMessages(gonderenId, aliciId);

    useChatSocket({
        open,
        gonderenId,
        aliciId,
    });

    const handleSend = (e) => {
        e.preventDefault();

        if (
            !newMessage.trim() ||
            !gonderenId ||
            !aliciId
        ) {
            return;
        }

        const msgData = {
            gonderenId,
            aliciId,
            text: newMessage.trim(),
        };

        socket.emit("sendMessage", msgData);

        setNewMessage("");
    };

    if (!open) {
        return null;
    }

    return (
        <div className="fixed bottom-5 right-10 z-50 flex h-[30vh] w-[400px] flex-col rounded-t-xl bg-gray-100 font-sans shadow-lg">

            <div className="flex items-center justify-between border-b bg-white p-4">
                <p className="font-bold">
                    {adi}
                </p>

                <button
                    type="button"
                    onClick={() => onClose(false)}
                    className="text-xl font-bold text-gray-400 hover:text-red-500"
                >
                    ×
                </button>
            </div>

            <ChatMessageList
                messages={messages}
                currentUserId={gonderenId}
                isLoading={isMessagesLoading}
            />

            <ChatInput
                value={newMessage}
                onChange={(e) =>
                    setNewMessage(e.target.value)
                }
                onSubmit={handleSend}
                disabled={!aliciId}
            />

        </div>
    );
}