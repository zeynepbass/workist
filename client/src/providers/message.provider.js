import * as messageApi from "../features/messages/api/message.api";

export const messageProvider = {
    getMessages: messageApi.getMessages,

    getUser: messageApi.getUser,

    getUsers: messageApi.getUsers,

    getConversations: messageApi.getConversations,

    getMessageData: messageApi.getMessageData,
};