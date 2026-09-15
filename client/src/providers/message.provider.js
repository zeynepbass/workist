import * as messageApi from "../features/messages/api/message.api";

export default function messageProvider() {
  return {
    getMessages: messageApi.getMessages,

    getUser: messageApi.getUser,

    getUsers: messageApi.getUsers,

    getConversations: messageApi.getConversations,
  };
}
