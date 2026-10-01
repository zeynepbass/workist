import { useEffect, useRef } from "react";

import { Button } from "@/shared/components/atoms";
import { StatusMessage } from "@/shared/components/molecules";

export default function ChatMessageList({ query, currentUserId }) {
  const { messages, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = query;
  const endRef = useRef(null);
  const lastId = messages[messages.length - 1]?.id;

  useEffect(() => {
    endRef.current?.scrollIntoView?.({ block: "end" });
  }, [lastId]);

  if (isLoading) return <StatusMessage type="loading" message="Mesajlar yükleniyor..." />;

  return (
    <div
      className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4"
      role="log"
      aria-live="polite"
      aria-label="Mesajlar"
    >
      {hasNextPage && (
        <div className="text-center">
          <Button
            className="text-sm text-purple-600"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            Önceki mesajları göster
          </Button>
        </div>
      )}
      {messages.length === 0 && <StatusMessage type="empty" message="Henüz mesaj yok" />}
      {messages.map((message) => {
        const isMine = message.senderId === currentUserId;

        return (
          <div key={message.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
            <p
              className={`max-w-xs rounded-lg px-4 py-2 ${
                isMine
                  ? "rounded-tr-none bg-purple-500 text-white"
                  : "rounded-tl-none bg-gray-200 text-gray-800"
              } ${message.pending ? "opacity-60" : ""}`}
            >
              {message.text}
            </p>
          </div>
        );
      })}
      <div ref={endRef} />
    </div>
  );
}
