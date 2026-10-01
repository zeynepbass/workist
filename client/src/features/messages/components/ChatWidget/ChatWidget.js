import { useRef } from "react";

import { useEscapeKey } from "@/shared/hooks/useEscapeKey";
import { useFocusTrap } from "@/shared/hooks/useFocusTrap";
import ChatPanel from "../ChatPanel";

export default function ChatWidget({ partner, onClose }) {
  const containerRef = useRef(null);

  useFocusTrap(containerRef, true);
  useEscapeKey(onClose);

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-label={`${partner?.fullName ?? "Kullanıcı"} ile sohbet`}
      className="fixed bottom-5 right-4 z-50 flex h-[50vh] w-[min(400px,calc(100vw-2rem))] flex-col rounded-t-xl bg-gray-100 shadow-lg"
    >
      <div className="flex items-center justify-between border-b bg-white p-4">
        <p className="font-bold">{partner?.fullName}</p>
        <button
          type="button"
          aria-label="Sohbeti kapat"
          onClick={onClose}
          className="text-xl font-bold text-gray-400 hover:text-red-500"
        >
          ×
        </button>
      </div>
      <ChatPanel partnerId={partner?.id} />
    </div>
  );
}
