import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { errorMessage, queryKeys } from "@/shared/api";
import { flattenPages, nextPageParam } from "@/shared/api/pagination";
import * as ordersRepository from "../repositories/orders.repository";

export function useReviews(filters) {
  const query = useInfiniteQuery({
    queryKey: queryKeys.reviews.list(filters),
    queryFn: ({ pageParam }) => ordersRepository.listReviews(filters, pageParam),
    initialPageParam: undefined,
    getNextPageParam: nextPageParam,
    enabled: Boolean(filters.sellerId || filters.adId),
  });

  return { ...query, reviews: flattenPages(query.data) };
}

export function useReviewOrder(orderId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body) => ordersRepository.reviewOrder(orderId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.detail(orderId) });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.ads.all });
      toast.success("Değerlendirmen için teşekkürler!");
    },
    onError: (error) => toast.error(errorMessage(error, "Değerlendirme gönderilemedi.")),
  });
}
