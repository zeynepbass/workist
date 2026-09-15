import messageProvider from "@/providers/message.provider";
import messageAdapter from "../adapters/message.adapter";

export function getMessages() {
    return {
        async getMessages(gonderenId, aliciId) {
            const response =
                await messageProvider.getMessages(
                    gonderenId,
                    aliciId
                );

            return response.map(messageAdapter);
        },
    };
}

export function getUser() {
    return {
        async getUser(userId) {
            return await messageProvider.getUser(userId);
        },
    };
}

export function getUsers() {
    return {
        async getUsers() {
            return await messageProvider.getUsers();
        },
    };
}

export function getConversations() {
    return {
        async getConversations(userId) {
            return await messageProvider.getConversations(
                userId
            );
        },
    };
}

export function getMessageData() {
    return {
        async getMessageData(currentId, targetId) {
            return await messageProvider.getMessageData(
                currentId,
                targetId
            );
        },
    };
}