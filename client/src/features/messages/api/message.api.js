import apiClient from "@/infrastructure/http/apiClient";

export const messageApi = {
    getMessages: (gonderenId, aliciId) =>
        apiClient.get(`/mesajlar/${gonderenId}/${aliciId}`),

    getUser: (userId) =>
        apiClient.get(`/users/${userId}`),

    getUsers: () =>
        apiClient.get("/users"),

    getConversations: (userId) =>
        apiClient.get(`/konusmalar/${userId}`),

    getMessageData: (currentId, targetId) =>
        apiClient.get(`/${currentId}/${targetId}`),
};