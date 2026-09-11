
import { StatusMessage } from "@/shared/components/molecules"
export default function ChatMessageList({
    messages,
    currentUserId,
    isLoading,
}) {
    if (isLoading) {
        return (
            <div className="flex-1">
                <StatusMessage
                    type="loading"
                    message="Mesajlar yükleniyor..."
                />
            </div>
        );
    }
    
    if (messages.length === 0) {
        return (
            <div className="flex-1">
                <StatusMessage
                    type="empty"
                    message="Henüz mesaj yok"
                />
            </div>
        );
    }
    return (
        <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4">
            {messages.map((msg, index) => {
                const isMine =
                    msg.senderId ===
                    currentUserId;

                return (
                    <div
                        key={
                            msg.id ||
                            index
                        }
                        className={`flex ${
                            isMine
                                ? "justify-end"
                                : "justify-start"
                        }`}
                    >
                        <div
                            className={`inline-block max-w-xs rounded-lg px-4 py-2 ${
                                isMine
                                    ? "rounded-tr-none bg-purple-500 text-white"
                                    : "rounded-tl-none bg-gray-200 text-gray-800"
                            }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}