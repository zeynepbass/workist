import { useId, useState } from "react";

import { Button } from "@/shared/components/atoms";

const MAX_LENGTH = 2000;

export default function ChatInput({ onSend, disabled }) {
  const inputId = useId();
  const [text, setText] = useState("");

  const submit = (event) => {
    event.preventDefault();
    const message = text.trim();

    if (!message) return;

    onSend(message);
    setText("");
  };

  return (
    <form onSubmit={submit} className="flex items-center gap-2 border-t bg-white p-3">
      <label htmlFor={inputId} className="sr-only">
        Mesajınız
      </label>
      <input
        id={inputId}
        type="text"
        value={text}
        maxLength={MAX_LENGTH}
        disabled={disabled}
        onChange={(event) => setText(event.target.value)}
        placeholder="Mesajınızı yazın..."
        className="flex-1 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <Button
        type="submit"
        variant="primary"
        className="px-4 py-2"
        disabled={disabled || !text.trim()}
      >
        Gönder
      </Button>
    </form>
  );
}
