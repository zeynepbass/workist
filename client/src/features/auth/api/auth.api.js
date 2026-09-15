
import apiClient from "@/shared/api";

export async function login(data) {
    const response = await apiClient.post("/signin", data);
    return response.data;
}

export async function register(data) {
    const response = await apiClient.post("/uye-ol", data);
    return response.data;
}

export async function account(email) {
    const response = await apiClient.get(`/users/${email}`);
    return response.data;
}

export async function details(email) {
    const response = await apiClient.get(`/duzenle/${email}`);
    return response.data;
}

export async function getMessages(userId) {
    const response = await apiClient.get(
        `/konusmalar/${userId}`
    );

    return response.data;
}

export async function getUsers() {
    const response = await apiClient.get("/users");

    return response.data;
}

export async function getMessageData(currentId, targetId) {
    const response = await apiClient.get(
        `/${currentId}/${targetId}`
    );

    return response.data;
}

export async function updateDetails(email, formData) {
    const response = await apiClient.put(
        `/duzenle/${email}`,
        formData
    );

    return response.data;
}

export async function getDetails(email) {
    const response = await apiClient.get(
        `/duzenle/${email}`
    );

    return response.data;
}

