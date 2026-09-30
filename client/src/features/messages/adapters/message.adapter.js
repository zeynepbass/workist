export default function messageAdapter(message) {
  return {
    id: message._id,
    senderId: message.senderId,
    recipientId: message.recipientId,
    text: message.text,
    sentAt: message.sentAt,
  };
}

export function chatUserAdapter(user) {
  return {
    id: user._id,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    avatar: user.avatar || "",
  };
}
