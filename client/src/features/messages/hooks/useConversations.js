import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { errorMessage, queryKeys } from "@/shared/api";
import * as messageRepository from "../repositories/message.repository";

export function useConversations() {
  return useQuery({
    queryKey: queryKeys.conversations.all,
    queryFn: messageRepository.getConversations,
  });
}

export function useDeleteConversations() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (partnerIds) => Promise.all(partnerIds.map(messageRepository.deleteConversation)),
    onSuccess: () => toast.success("Seçilen konuşmalar silindi."),
    onError: (error) => toast.error(errorMessage(error, "Bazı konuşmalar silinemedi.")),
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKeys.conversations.all }),
  });
}
