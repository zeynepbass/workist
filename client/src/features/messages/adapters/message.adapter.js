import { publicUserAdapter } from "@/features/auth/adapters/user.adapter";

export function messageAdapter(message) {
  return {
    id: message.id,
    senderId: message.senderId,
    recipientId: message.recipientId,
    text: message.text,
    sentAt: message.sentAt,
    pending: Boolean(message.pending),
  };
}

export function conversationAdapter(conversation) {
  return {
    partner: publicUserAdapter(conversation.partner),
    lastMessage: messageAdapter(conversation.lastMessage),
  };
}
