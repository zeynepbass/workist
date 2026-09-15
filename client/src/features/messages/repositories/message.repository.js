
import messageProvider from "@/providers/message.provider";
import messageAdapter from "../adapters/message.adapter";

export async function getMessages(gonderenId, aliciId) {
    const response = await messageProvider.getMessages(
        gonderenId,
        aliciId
    );

    return response.map(messageAdapter);
}

export async function getUser(userId) {
    return await messageProvider.getUser(userId);
}

export async function getUsers() {
    return await messageProvider.getUsers();
}

export async function getConversations(userId) {
    return await messageProvider.getConversations(userId);
}

export async function getMessageData(currentId, targetId) {
    return await messageProvider.getMessageData(
        currentId,
        targetId
    );
}