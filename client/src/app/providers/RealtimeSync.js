import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { messageAdapter } from "@/features/messages/adapters/message.adapter";
import { addMessage, partnerOf } from "@/features/messages/cache";
import { ORDER_EVENT_LABELS } from "@/features/orders/constants";
import { queryKeys } from "@/shared/api";
import { useSocketEvent } from "@/shared/socket/SocketProvider";

export default function RealtimeSync() {
  const queryClient = useQueryClient();
  const { userId } = useCurrentUser();

  const handleMessage = useCallback(
    (payload) => {
      const message = messageAdapter(payload);
      addMessage(queryClient, partnerOf(message, userId), message);
      queryClient.invalidateQueries({ queryKey: queryKeys.conversations.all, exact: true });
    },
    [queryClient, userId],
  );

  const handleOrderUpdate = useCallback(
    ({ orderId, action }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.detail(orderId) });
      toast(ORDER_EVENT_LABELS[action] ?? "Sipariş güncellendi.", {
        id: `order-${orderId}-${action}`,
      });
    },
    [queryClient],
  );

  useSocketEvent("message:new", handleMessage);
  useSocketEvent("order:updated", handleOrderUpdate);

  return null;
}
