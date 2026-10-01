import { toPage } from "@/shared/api/pagination";
import { conversationAdapter, messageAdapter } from "../adapters/message.adapter";
import { messageApi } from "../api/message.api";

export async function getConversations() {
  const { data } = await messageApi.conversations();
  return data.data.map(conversationAdapter);
}

export async function getMessages(partnerId, cursor) {
  return toPage(await messageApi.messages(partnerId, cursor), messageAdapter);
}

export async function deleteConversation(partnerId) {
  await messageApi.deleteConversation(partnerId);
}

export function sendViaSocket(socket, { recipientId, text }) {
  return new Promise((resolve, reject) => {
    if (!socket?.connected) {
      reject(new Error("Bağlantı kurulamadı, lütfen tekrar deneyin."));
      return;
    }

    socket.timeout(10_000).emit("message:send", { recipientId, text }, (timeoutError, reply) => {
      if (timeoutError) return reject(new Error("Mesaj gönderilemedi."));
      if (!reply?.ok) return reject(new Error(reply?.error?.message ?? "Mesaj gönderilemedi."));
      return resolve(messageAdapter(reply.data));
    });
  });
}
