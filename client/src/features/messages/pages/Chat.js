import { useEffect, useMemo, useState } from "react";
import io from "socket.io-client";

import { useMessages } from "../hooks/useMessages";
import { messageAdapter } from "../adapters/messageAdapter";

import ChatUserList from "../components/ChatUserList";
import ChatMessageList from "../components/ChatMessageList";
import ChatInput from "../components/ChatInput";

const socket = io(process.env.REACT_APP_BASE_URL);

export default function Chat() {
    const currentUser = JSON.parse(
        localStorage.getItem("login")
    );

    const gonderenId = currentUser?.result?._id;

    const [aliciId, setAliciId] = useState(null);
    const [newMessage, setNewMessage] = useState("");

    const {
        messages,
        userList,
        addMessageToCache,
        isMessagesLoading,
        isUsersLoading,
    } = useMessages(gonderenId, aliciId);

    const findUserPhotoById = (id) => {
        const user = userList.find(
            (user) => user._id === id
        );

        return (
            user?.file ||
            "https://via.placeholder.com/40"
        );
    };

    const filteredUsers = useMemo(() => {
        if (!userList.length || !messages.length) {
            return [];
        }

        return userList.filter((user) =>
            messages.some(
                (msg) =>
                    (
                        msg.senderId === gonderenId &&
                        msg.receiverId === user._id
                    ) ||
                    (
                        msg.receiverId === gonderenId &&
                        msg.senderId === user._id
                    )
            )
        );
    }, [userList, messages, gonderenId]);

    useEffect(() => {
        const handleReceiveMessage = (msg) => {
            if (
                (
                    msg.gonderenId === gonderenId &&
                    msg.aliciId === aliciId
                ) ||
                (
                    msg.gonderenId === aliciId &&
                    msg.aliciId === gonderenId
                )
            ) {
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
        gonderenId,
        aliciId,
        addMessageToCache,
    ]);

    const handleSend = (e) => {
        e.preventDefault();

        if (
            !newMessage.trim() ||
            !aliciId ||
            !gonderenId
        ) {
            return;
        }

        const msgData = {
            gonderenId,
            aliciId,
            text: newMessage.trim(),
        };

        socket.emit(
            "sendMessage",
            msgData
        );

        setNewMessage("");
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans">

    
            <div className="w-1/3 border-r bg-white p-4">

                <h2 className="mb-4 text-xl font-semibold">
                    Gelen Kutusu
                </h2>

                <ChatUserList
                    users={filteredUsers}
                    selectedUserId={aliciId}
                    onSelect={setAliciId}
                    isLoading={isUsersLoading}
                />

            </div>


            <div className="flex flex-1 flex-col bg-gray-50 p-6">

                <h3 className="mb-4 text-lg font-semibold">
                    Mesajlar
                </h3>

                {!aliciId ? (
                    <p className="italic text-gray-500">
                        Mesajlaşmak için bir kullanıcı seçin.
                    </p>
                ) : (
                    <ChatMessageList
                        messages={messages}
                        currentUserId={gonderenId}
                        isLoading={isMessagesLoading}
                        findUserPhotoById={
                            findUserPhotoById
                        }
                    />
                )}

                <ChatInput
                    value={newMessage}
                    onChange={(e) =>
                        setNewMessage(e.target.value)
                    }
                    onSubmit={handleSend}
                    disabled={!aliciId}
                />

            </div>
        </div>
    );
}