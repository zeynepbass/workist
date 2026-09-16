
import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import * as portfolioRepository from "../repositories/portfolio.repository";

export function usePortfolio(
    searchQuery = "",
    portfolioId
) {
    const queryClient = useQueryClient();

    const postsQuery = useQuery({
        queryKey: ["portfolio", searchQuery],
        queryFn: () =>
            portfolioRepository.searchPosts(searchQuery),
    });

    const userPortfoliosQuery = useQuery({
        queryKey: ["portfolio"],
        queryFn: () =>
            portfolioRepository.getUserPortfolios(),
    });

    const detailQuery = useQuery({
        queryKey: [
            "portfolio",
            "detail",
            portfolioId,
        ],
        queryFn: () =>
            portfolioRepository.getPortfolioDetail(
                portfolioId
            ),
        enabled: !!portfolioId,
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({ id, durum }) =>
            portfolioRepository.updatePortfolioStatus(
                id,
                durum
            ),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["portfolio"],
            });

            toast.success("Portfolyo durumu güncellendi.");
        },

        onError: (error) => {
            toast.error(
                error?.response?.data?.message ||
                    "Portfolyo durumu güncellenirken bir hata oluştu."
            );
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id) =>
            portfolioRepository.deletePortfolio(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["portfolio"],
            });

            toast.success("Portfolyo silindi.");
        },

        onError: (error) => {
            toast.error(
                error?.response?.data?.message ||
                    "Portfolyo silinirken bir hata oluştu."
            );
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, formData }) =>
            portfolioRepository.updatePortfolio(
                id,
                formData
            ),

        onSuccess: (updatedPortfolio) => {
            queryClient.invalidateQueries({
                queryKey: ["portfolio"],
            });

            if (portfolioId) {
                queryClient.setQueryData(
                    [
                        "portfolio",
                        "detail",
                        portfolioId,
                    ],
                    updatedPortfolio
                );
            }

            toast.success("Portfolyo güncellendi.");
        },

        onError: (error) => {
            toast.error(
                error?.response?.data?.message ||
                    "Portfolyo güncellenirken bir hata oluştu."
            );
        },
    });

    return {
        posts: postsQuery.data ?? [],
        isLoading: postsQuery.isLoading,
        isError: postsQuery.isError,
        error: postsQuery.error,

        userPortfolios:
            userPortfoliosQuery.data ?? [],

        isUserPortfoliosLoading:
            userPortfoliosQuery.isLoading,

        isUserPortfoliosError:
            userPortfoliosQuery.isError,

        userPortfoliosError:
            userPortfoliosQuery.error,

        detail: detailQuery.data ?? null,

        isDetailLoading:
            detailQuery.isLoading,

        isDetailError:
            detailQuery.isError,

        detailError:
            detailQuery.error,

        deletePortfolio:
            deleteMutation.mutateAsync,

        isDeleting:
            deleteMutation.isPending,

        toggleDurum:
            updateStatusMutation.mutateAsync,

        isUpdatingStatus:
            updateStatusMutation.isPending,

        updatePortfolio:
            updateMutation.mutateAsync,

        isUpdating:
            updateMutation.isPending,
    };
}
