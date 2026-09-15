import apiClient from "@/shared/api";

export async function getMessages(gonderenId, aliciId) {
    const response = await apiClient.get(
        `/mesajlar/${gonderenId}/${aliciId}`
    );

    return response.data;
}

export async function getUser(userId) {
    const response = await apiClient.get(
        `/users/${userId}`
    );

    return response.data;
}

export async function getUsers() {
    const response = await apiClient.get("/users");

    return response.data;
}

export async function getConversations(userId) {
    const response = await apiClient.get(
        `/konusmalar/${userId}`
    );

    return response.data;
}

export async function getMessageData(currentId, targetId) {
    const response = await apiClient.get(
        `/${currentId}/${targetId}`
    );

    return response.data;
}