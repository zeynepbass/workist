import messageProvider from "@/providers/message.provider";
import { messageAdapter } from "../adapters/messageAdapter";

export async function getMessages(gonderenId, aliciId) {
    const response = await messageProvider.getMessages(
        gonderenId,
        aliciId
    );

    return response.data.map(messageAdapter);
}

export async function getUser(userId) {
    const response = await messageProvider.getUser(userId);

    return response.data;
}

export async function getUsers() {
    const response = await messageProvider.getUsers();

    return response.data;
}

export async function getConversations(userId) {
    const response =
        await messageProvider.getConversations(userId);

    return response.data;
}

export async function getMessageData(currentId, targetId) {
    const response =
        await messageProvider.getMessageData(
            currentId,
            targetId
        );

    return response.data;
}