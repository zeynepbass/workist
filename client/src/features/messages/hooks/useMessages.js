import { useMemo } from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { queryKeys } from "@/shared/api";
import { nextPageParam } from "@/shared/api/pagination";
import { useSocket } from "@/shared/socket/SocketProvider";
import { addMessage, removeMessage } from "../cache";
import * as messageRepository from "../repositories/message.repository";

export function useMessages(partnerId) {
  const query = useInfiniteQuery({
    queryKey: queryKeys.conversations.messages(partnerId),
    queryFn: ({ pageParam }) => messageRepository.getMessages(partnerId, pageParam),
    initialPageParam: undefined,
    getNextPageParam: nextPageParam,
    enabled: Boolean(partnerId),
  });

  const messages = useMemo(
    () => [...(query.data?.pages ?? [])].reverse().flatMap((page) => page.items),
    [query.data],
  );

  return { ...query, messages };
}

let temporaryId = 0;

export function useSendMessage(partnerId, userId) {
  const socket = useSocket();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (text) => messageRepository.sendViaSocket(socket, { recipientId: partnerId, text }),
    onMutate: (text) => {
      temporaryId += 1;
      const pendingId = `pending-${temporaryId}`;
      addMessage(queryClient, partnerId, {
        id: pendingId,
        senderId: userId,
        recipientId: partnerId,
        text,
        sentAt: new Date().toISOString(),
        pending: true,
      });
      return { pendingId };
    },
    onSuccess: (message, text, context) => {
      removeMessage(queryClient, partnerId, context.pendingId);
      addMessage(queryClient, partnerId, message);
      queryClient.invalidateQueries({ queryKey: queryKeys.conversations.all, exact: true });
    },
    onError: (error, text, context) => {
      removeMessage(queryClient, partnerId, context?.pendingId);
      toast.error(error.message);
    },
  });
}
