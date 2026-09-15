import apiClient from "@/shared/api";

export const messageApi = {
  getMessages(gonderenId, aliciId) {
    return apiClient.get(`/mesajlar/${gonderenId}/${aliciId}`);
  },

  getUser(userId) {
    return apiClient.get(`/users/${userId}`);
  },

  getUsers() {
    return apiClient.get("/users");
  },

  getConversations(userId) {
    return apiClient.get(`/konusmalar/${userId}`);
  },

  getMessageData(currentId, targetId) {
    return apiClient.get(`/${currentId}/${targetId}`);
  },
};