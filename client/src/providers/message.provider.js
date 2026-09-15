import * as messageApi from "../features/messages/api/message.api";

const messageProvider = {
    getMessages: messageApi.getMessages,
    getUser: messageApi.getUser,
    getUsers: messageApi.getUsers,
    getConversations: messageApi.getConversations,
};

export default messageProvider;