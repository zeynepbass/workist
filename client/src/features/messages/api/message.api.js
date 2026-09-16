import apiClient from "@/shared/api";

export const messageApi = {
  getMessages(gonderenId, aliciId) {
    return apiClient.get(`/mesajlar/${gonderenId}/${aliciId}`);
  },

  getUsers() {
    return apiClient.get("/users");
  },

  getConversations(userId) {
    return apiClient.get(`/konusmalar/${userId}`);
  },

  deleteConversation(currentId, targetId) {
    return apiClient.delete(`/${currentId}/${targetId}`);
  },
};