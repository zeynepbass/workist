import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { errorMessage, queryKeys } from "@/shared/api";
import { flattenPages, nextPageParam } from "@/shared/api/pagination";
import * as ordersRepository from "../repositories/orders.repository";

export function useOrderList(filters) {
  const query = useInfiniteQuery({
    queryKey: queryKeys.orders.list(filters),
    queryFn: ({ pageParam }) => ordersRepository.listOrders(filters, pageParam),
    initialPageParam: undefined,
    getNextPageParam: nextPageParam,
  });

  return { ...query, orders: flattenPages(query.data) };
}

export function useOrder(id) {
  return useQuery({
    queryKey: queryKeys.orders.detail(id),
    queryFn: () => ordersRepository.getOrder(id),
    enabled: Boolean(id),
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ordersRepository.createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
      toast.success("Sipariş talebin satıcıya iletildi.");
    },
    onError: (error) => toast.error(errorMessage(error, "Sipariş oluşturulamadı.")),
  });
}

export function useOrderAction(orderId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ action, payload }) => ordersRepository.performAction(orderId, action, payload),
    onSuccess: (order) => {
      queryClient.setQueryData(queryKeys.orders.detail(orderId), order);
      queryClient.invalidateQueries({ queryKey: [...queryKeys.orders.all, "list"] });
      toast.success("Sipariş güncellendi.");
    },
    onError: (error) => toast.error(errorMessage(error, "İşlem yapılamadı.")),
  });
}

export function useDownloadOrderFile(orderId) {
  return useMutation({
    mutationFn: (file) => ordersRepository.downloadFile(orderId, file),
    onError: () => toast.error("Dosya indirilemedi."),
  });
}
