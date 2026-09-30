import { messageApi } from "../api/message.api";
import messageAdapter, { chatUserAdapter } from "../adapters/message.adapter";

export async function getMessages(userId, partnerId) {
  const response = await messageApi.getMessages(userId, partnerId);

  return response.data.map(messageAdapter);
}

export async function getUsers() {
  const response = await messageApi.getUsers();

  return response.data.map(chatUserAdapter);
}

export async function getConversations(userId) {
  const response = await messageApi.getConversations(userId);

  return response.data.map(messageAdapter);
}

export async function deleteConversation(userId, partnerId) {
  const response = await messageApi.deleteConversation(userId, partnerId);

  return response.data;
}
