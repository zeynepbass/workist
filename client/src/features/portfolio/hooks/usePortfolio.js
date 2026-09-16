import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import * as portfolioRepository from "../repositories/portfolio.repository";

export function usePortfolio(
    searchQuery = "",
    userId,
    portfolioId
) {
    const queryClient = useQueryClient();

    // -------------------------
    // Tüm portfolyolar
    // -------------------------
    const postsQuery = useQuery({
        queryKey: ["portfolio", searchQuery],

        queryFn: () =>
            portfolioRepository.searchPosts(searchQuery),
    });

    // -------------------------
    // Kullanıcının portfolyoları
    // -------------------------
    const userPortfoliosQuery = useQuery({
        queryKey: [
            "portfolio",
            "user",
            userId,
        ],

        queryFn: () =>
            portfolioRepository.getUserPortfolios(
                userId
            ),

        enabled: !!userId,
    });

    // -------------------------
    // Portfolio detay
    // -------------------------
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

    // -------------------------
    // Durum güncelle
    // -------------------------
    const updateStatusMutation = useMutation({
        mutationFn: ({ id, durum }) =>
            portfolioRepository.updatePortfolioStatus(
                id,
                durum
            ),

        onSuccess: (_, variables) => {
            const { id, durum } = variables;

            queryClient.setQueryData(
                [
                    "portfolio",
                    "user",
                    userId,
                ],
                (oldPosts = []) =>
                    oldPosts.map((item) =>
                        item.id === id
                            ? {
                                  ...item,
                                  durum,
                              }
                            : item
                    )
            );

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

    // -------------------------
    // Sil
    // -------------------------
    const deleteMutation = useMutation({
        mutationFn: (id) =>
            portfolioRepository.deletePortfolio(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [
                    "portfolio",
                    "user",
                    userId,
                ],
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

    // -------------------------
    // Güncelle
    // -------------------------
    const updateMutation = useMutation({
        mutationFn: ({ id, formData }) =>
            portfolioRepository.updatePortfolio(
                id,
                formData
            ),

        onSuccess: (updatedPortfolio) => {
            queryClient.invalidateQueries({
                queryKey: [
                    "portfolio",
                    "user",
                    userId,
                ],
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
        // Tüm portfolyolar
        posts: postsQuery.data ?? [],
        isLoading: postsQuery.isLoading,
        isError: postsQuery.isError,
        error: postsQuery.error,

        // Kullanıcı portfolyoları
        userPortfolios:
            userPortfoliosQuery.data ?? [],

        isUserPortfoliosLoading:
            userPortfoliosQuery.isLoading,

        isUserPortfoliosError:
            userPortfoliosQuery.isError,

        userPortfoliosError:
            userPortfoliosQuery.error,

        // Detay
        detail: detailQuery.data ?? null,

        isDetailLoading:
            detailQuery.isLoading,

        isDetailError:
            detailQuery.isError,

        detailError:
            detailQuery.error,

        // Sil
        deletePortfolio:
            deleteMutation.mutateAsync,

        isDeleting:
            deleteMutation.isPending,

        // Durum
        toggleDurum:
            updateStatusMutation.mutateAsync,

        isUpdatingStatus:
            updateStatusMutation.isPending,

        // Güncelle
        updatePortfolio:
            updateMutation.mutateAsync,

        isUpdating:
            updateMutation.isPending,
    };
}