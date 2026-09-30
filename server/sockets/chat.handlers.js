import { toMessage } from "../serializers/index.js";
import { sendMessage } from "../services/message.service.js";
import { AppError } from "../utils/AppError.js";
import { sendMessagePayload } from "../validators/message.validators.js";
import { notifyUsers } from "./notifier.js";

const MESSAGES_PER_WINDOW = 5;
const WINDOW_MS = 1000;

function createRateGate() {
  let windowStartedAt = 0;
  let count = 0;

  return () => {
    const now = Date.now();

    if (now - windowStartedAt >= WINDOW_MS) {
      windowStartedAt = now;
      count = 0;
    }

    count += 1;
    return count <= MESSAGES_PER_WINDOW;
  };
}

const failure = (code, message) => ({ ok: false, error: { code, message } });

export function registerChatHandlers(socket, { logger }) {
  const allow = createRateGate();

  socket.on("message:send", async (payload, acknowledge) => {
    const reply = typeof acknowledge === "function" ? acknowledge : () => {};

    if (!allow()) {
      return reply(failure("TOO_MANY_REQUESTS", "Çok hızlı mesaj gönderiyorsunuz."));
    }

    const parsed = sendMessagePayload.safeParse(payload);

    if (!parsed.success) {
      return reply(failure("VALIDATION_ERROR", "Mesaj geçersiz."));
    }

    try {
      const message = toMessage(await sendMessage(socket.data.userId, parsed.data));
      notifyUsers([message.senderId, message.recipientId], "message:new", message);
      return reply({ ok: true, data: message });
    } catch (error) {
      if (error instanceof AppError) {
        return reply(failure(error.code, error.message));
      }

      logger.error({ err: error, userId: socket.data.userId }, "Failed to send chat message");
      return reply(failure("INTERNAL_ERROR", "Mesaj gönderilemedi."));
    }
  });
}
