import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import * as portfolioRepository from "../repositories/portfolio.repository";

const MY_PORTFOLIOS_KEY = ["portfolio"];

const errorMessage = (error, fallback) => error?.response?.data?.message || fallback;

export function usePortfolio(portfolioId) {
  const queryClient = useQueryClient();

  const myPortfoliosQuery = useQuery({
    queryKey: MY_PORTFOLIOS_KEY,
    queryFn: () => portfolioRepository.getMyPortfolios(),
  });

  const detailQuery = useQuery({
    queryKey: ["portfolio", "detail", portfolioId],
    queryFn: () => portfolioRepository.getPortfolio(portfolioId),
    enabled: !!portfolioId,
  });

  const createMutation = useMutation({
    mutationFn: (portfolio) => portfolioRepository.createPortfolio(portfolio),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MY_PORTFOLIOS_KEY });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => portfolioRepository.updatePortfolioStatus(id, status),

    onSuccess: (_, variables) => {
      queryClient.setQueryData(MY_PORTFOLIOS_KEY, (previous = []) =>
        previous.map((item) =>
          item.id === variables.id ? { ...item, status: variables.status } : item,
        ),
      );

      toast.success("Portfolyo durumu güncellendi.");
    },

    onError: (error) => {
      toast.error(errorMessage(error, "Portfolyo durumu güncellenirken bir hata oluştu."));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => portfolioRepository.deletePortfolio(id),

    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(MY_PORTFOLIOS_KEY, (previous = []) =>
        previous.filter((item) => item.id !== deletedId),
      );

      toast.success("Portfolyo silindi.");
    },

    onError: (error) => {
      toast.error(errorMessage(error, "Portfolyo silinirken bir hata oluştu."));
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, portfolio }) => portfolioRepository.updatePortfolio(id, portfolio),

    onSuccess: (updatedPortfolio) => {
      queryClient.invalidateQueries({ queryKey: MY_PORTFOLIOS_KEY });

      if (portfolioId) {
        queryClient.setQueryData(["portfolio", "detail", portfolioId], updatedPortfolio);
      }

      toast.success("Portfolyo güncellendi.");
    },

    onError: (error) => {
      toast.error(errorMessage(error, "Portfolyo güncellenirken bir hata oluştu."));
    },
  });

  return {
    portfolios: myPortfoliosQuery.data ?? [],
    isPortfoliosLoading: myPortfoliosQuery.isLoading,
    isPortfoliosError: myPortfoliosQuery.isError,

    detail: detailQuery.data ?? null,
    isDetailLoading: detailQuery.isLoading,
    isDetailError: detailQuery.isError,

    createPortfolio: createMutation.mutateAsync,

    deletePortfolio: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,

    updatePortfolioStatus: updateStatusMutation.mutate,
    isUpdatingStatus: updateStatusMutation.isPending,

    updatePortfolio: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
  };
}
