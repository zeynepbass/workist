import { useEffect, useState } from "react";
import io from "socket.io-client";

import { useMessages } from "../hooks/useMessages";
import { messageAdapter } from "../adapters/messageAdapter";

import ChatMessageList from "../components/ChatMessageList";
import ChatInput from "../components/ChatInput";

const socket = io(process.env.REACT_APP_BASE_URL);

export default function MessagingUI({
    adi,
    open,
    gonderenId,
    aliciId,
    onClose,
}) {
    const [newMessage, setNewMessage] =
        useState("");

    const {
        messages,
        addMessageToCache,
        isMessagesLoading,
    } = useMessages(
        gonderenId,
        aliciId
    );

    useEffect(() => {
        if (
            !open ||
            !gonderenId ||
            !aliciId
        ) {
            return;
        }

        const handleReceiveMessage = (
            msg
        ) => {
            const isCurrentConversation =
                (
                    msg.gonderenId ===
                        gonderenId &&
                    msg.aliciId ===
                        aliciId
                ) ||
                (
                    msg.gonderenId ===
                        aliciId &&
                    msg.aliciId ===
                        gonderenId
                );

            if (isCurrentConversation) {
                addMessageToCache(
                    messageAdapter(msg)
                );
            }
        };

        socket.on(
            "receiveMessage",
            handleReceiveMessage
        );

        return () => {
            socket.off(
                "receiveMessage",
                handleReceiveMessage
            );
        };
    }, [
        open,
        gonderenId,
        aliciId,
        addMessageToCache,
    ]);

    const handleSend = (e) => {
        e.preventDefault();

        const text =
            newMessage.trim();

        if (
            !text ||
            !gonderenId ||
            !aliciId
        ) {
            return;
        }

        socket.emit(
            "sendMessage",
            {
                gonderenId,
                aliciId,
                text,
            }
        );

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
                    onClick={() =>
                        onClose(false)
                    }
                    className="text-xl font-bold text-gray-400 hover:text-red-500"
                >
                    ×
                </button>
            </div>

            <ChatMessageList
                messages={messages}
                currentUserId={gonderenId}
                isLoading={
                    isMessagesLoading
                }
            />

            <ChatInput
                value={newMessage}
                onChange={(e) =>
                    setNewMessage(
                        e.target.value
                    )
                }
                onSubmit={handleSend}
                disabled={!aliciId}
            />
        </div>
    );
}