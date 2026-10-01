import apiClient from "@/shared/api";

export const messageApi = {
  conversations: () => apiClient.get("/api/conversations"),
  messages: (partnerId, cursor) =>
    apiClient.get(`/api/conversations/${partnerId}/messages`, { params: { cursor } }),
  deleteConversation: (partnerId) => apiClient.delete(`/api/conversations/${partnerId}`),
};
