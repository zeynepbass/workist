import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { errorMessage, queryKeys } from "@/shared/api";
import { flattenPages, nextPageParam } from "@/shared/api/pagination";
import * as portfolioRepository from "../repositories/portfolio.repository";

export function usePortfolioList(filters) {
  const query = useInfiniteQuery({
    queryKey: queryKeys.portfolios.list(filters),
    queryFn: ({ pageParam }) => portfolioRepository.listPortfolios(filters, pageParam),
    initialPageParam: undefined,
    getNextPageParam: nextPageParam,
  });

  return { ...query, portfolios: flattenPages(query.data) };
}

export function usePortfolio(id) {
  return useQuery({
    queryKey: queryKeys.portfolios.detail(id),
    queryFn: () => portfolioRepository.getPortfolio(id),
    enabled: Boolean(id),
  });
}

function patchLists(queryClient, update) {
  queryClient.setQueriesData({ queryKey: [...queryKeys.portfolios.all, "list"] }, (data) =>
    data
      ? { ...data, pages: data.pages.map((page) => ({ ...page, items: update(page.items) })) }
      : data,
  );
}

function useOptimisticPortfolioMutation({
  mutationFn,
  applyOptimistic,
  successMessage,
  failureMessage,
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.portfolios.all });
      const snapshot = queryClient.getQueriesData({ queryKey: queryKeys.portfolios.all });
      patchLists(queryClient, (items) => applyOptimistic(items, variables));
      return { snapshot };
    },
    onError: (error, variables, context) => {
      context?.snapshot.forEach(([key, data]) => queryClient.setQueryData(key, data));
      toast.error(errorMessage(error, failureMessage));
    },
    onSuccess: () => toast.success(successMessage),
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKeys.portfolios.all }),
  });
}

export const useDeletePortfolio = () =>
  useOptimisticPortfolioMutation({
    mutationFn: portfolioRepository.deletePortfolio,
    applyOptimistic: (items, id) => items.filter((item) => item.id !== id),
    successMessage: "Portfolyo silindi.",
    failureMessage: "Portfolyo silinemedi.",
  });

export const useTogglePortfolioStatus = () =>
  useOptimisticPortfolioMutation({
    mutationFn: ({ id, status }) => portfolioRepository.updatePortfolio(id, { fields: { status } }),
    applyOptimistic: (items, { id, status }) =>
      items.map((item) => (item.id === id ? { ...item, status } : item)),
    successMessage: "Portfolyo durumu güncellendi.",
    failureMessage: "Portfolyo durumu güncellenemedi.",
  });

export function useCreatePortfolio() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: portfolioRepository.createPortfolio,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.portfolios.all });
      toast.success("Portfolyo oluşturuldu.");
    },
    onError: (error) => toast.error(errorMessage(error, "Portfolyo oluşturulamadı.")),
  });
}

export function useUpdatePortfolio(id) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input) => portfolioRepository.updatePortfolio(id, input),
    onSuccess: (portfolio) => {
      queryClient.setQueryData(queryKeys.portfolios.detail(id), portfolio);
      queryClient.invalidateQueries({ queryKey: [...queryKeys.portfolios.all, "list"] });
      toast.success("Portfolyo güncellendi.");
    },
    onError: (error) => toast.error(errorMessage(error, "Portfolyo güncellenemedi.")),
  });
}
