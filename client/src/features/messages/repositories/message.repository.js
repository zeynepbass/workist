

import {userAdapter} from "../../auth/adapters/auth.adapter"
import messageProvider from "@/providers/message.provider"
const messageRepository = {
  getMessages: (userId) =>
    apiClient.get(`/konusmalar/${userId}`),

  getUsers: () =>
    apiClient.get("/users"),

  getMessageData: (currentId, targetId) =>
    apiClient.get(`/${currentId}/${targetId}`),
};

export default messageRepository;

