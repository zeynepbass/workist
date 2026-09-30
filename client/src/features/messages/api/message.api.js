import apiClient from "@/shared/api";

export const messageApi = {
  getMessages(userId, partnerId) {
    return apiClient.get(`/mesajlar/${userId}/${partnerId}`);
  },

  getUsers() {
    return apiClient.get("/users");
  },

  getConversations(userId) {
    return apiClient.get(`/konusmalar/${userId}`);
  },

  deleteConversation(userId, partnerId) {
    return apiClient.delete(`/${userId}/${partnerId}`);
  },
};
