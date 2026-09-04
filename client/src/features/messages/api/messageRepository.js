import apiClient from "@/infrastructure/http/apiClient";
export const messageRepository = {
    getMessages: (senderId, receiverId) =>
      apiClient.get(`/mesajlar/${senderId}/${receiverId}`),
  
    getConversations: (userId) =>
      apiClient.get(`/konusmalar/${userId}`),
  
    getUsers: () =>
      apiClient.get("/users"),
  };