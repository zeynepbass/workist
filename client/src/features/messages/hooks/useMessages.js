import { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import * as messageRepository from "../repositories/message.repository";

export function useMessages(userId, partnerId) {
  const queryClient = useQueryClient();

  const messagesQuery = useQuery({
    queryKey: ["messages", userId, partnerId],
    queryFn: () => messageRepository.getMessages(userId, partnerId),
    enabled: Boolean(userId && partnerId),
  });

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: () => messageRepository.getUsers(),
  });

  const conversationsQuery = useQuery({
    queryKey: ["conversations", userId],
    queryFn: () => messageRepository.getConversations(userId),
    enabled: Boolean(userId),
  });

  const addMessageToCache = useCallback(
    (message) => {
      queryClient.setQueryData(["messages", userId, partnerId], (previous = []) => [
        ...previous,
        message,
      ]);
    },
    [queryClient, userId, partnerId],
  );

  const deleteConversation = async (targetId) => {
    const response = await messageRepository.deleteConversation(userId, targetId);

    queryClient.setQueryData(["messages", userId, targetId], []);
    await queryClient.invalidateQueries({ queryKey: ["conversations", userId] });

    return response;
  };

  return {
    messages: messagesQuery.data ?? [],
    users: usersQuery.data ?? [],
    conversations: conversationsQuery.data ?? [],

    isMessagesLoading: messagesQuery.isLoading,
    isUsersLoading: usersQuery.isLoading,
    isConversationsLoading: conversationsQuery.isLoading,

    addMessageToCache,
    deleteConversation,
  };
}
