import { messageApi } from "../api/message.api";
import messageAdapter from "../adapters/message.adapter";

export async function getMessages(gonderenId, aliciId) {
    const response = await messageApi.getMessages(
        gonderenId,
        aliciId
    );

    return response.data.map(messageAdapter);
}

export async function getUser(userId) {
    const response = await messageApi.getUser(userId);

    return response.data;
}

export async function getUsers() {
    const response = await messageApi.getUsers();

    return response.data;
}

export async function getConversations(userId) {
    const response = await messageApi.getConversations(userId);

    return response.data;
}

export async function getMessageData(currentId, targetId) {
    const response = await messageApi.getMessageData(
        currentId,
        targetId
    );

    return response.data;
}
