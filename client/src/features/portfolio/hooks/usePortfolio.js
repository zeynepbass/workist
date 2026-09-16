
import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import * as portfolioRepository from "../repositories/portfolio.repository";
import * as authRepository from "@/features/auth/repositories/auth.repository";
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

    const createMutation = useMutation({
        mutationFn: (formData) =>
            authRepository.portfolyoCreate(
                formData
            ),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["portfolio", "user"],
            });

            queryClient.invalidateQueries({
                queryKey: ["portfolio"],
            });
        },

        onError: (error) => {
            console.error(
                "Portfolyo ekleme hatası:",
                error
            );
        },
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({ id, durum }) =>
            portfolioRepository.updatePortfolioStatus(
                id,
                durum
            ),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["portfolio", "user"],
            });

            queryClient.invalidateQueries({
                queryKey: ["portfolio"],
            });
        },

        onError: (error) => {
            console.error(
                "Portfolyo durumu güncelleme hatası:",
                error
            );
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id) =>
            portfolioRepository.deletePortfolio(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["portfolio", "user"],
            });

            queryClient.invalidateQueries({
                queryKey: ["portfolio"],
            });
        },

        onError: (error) => {
            console.error(
                "Portfolyo silme hatası:",
                error
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
                queryKey: ["portfolio", "user"],
            });

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
        },

        onError: (error) => {
            console.error(
                "Portfolyo güncelleme hatası:",
                error
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

        createPortfolio:
            createMutation.mutateAsync,

        isCreating:
            createMutation.isPending,

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
