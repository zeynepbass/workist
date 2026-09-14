import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import {
    SearchPosts,
    getUserPortfolios,
    deletePortfolio,
    updatePortfolioStatus,
    getPortfolioDetail,
    updatePortfolio,
} from "../repositories/portfolio.repository";

export function usePortfolio(searchQuery = "", userId, portfolioId) {
    const queryClient = useQueryClient();

    const searchRepository = SearchPosts();
    const userPortfolioRepository = getUserPortfolios();
    const deleteRepository = deletePortfolio();
    const statusRepository = updatePortfolioStatus();
    const detailRepository = getPortfolioDetail();
    const updateRepository = updatePortfolio();


    const postsQuery = useQuery({
        queryKey: ["portfolio", searchQuery],
        queryFn: () =>
            searchRepository.searchPosts(searchQuery),
    });


    const userPortfoliosQuery = useQuery({
        queryKey: ["portfolio", "user", userId],
        queryFn: () =>
            userPortfolioRepository.getUserPortfolios(userId),
        enabled: !!userId,
    });


    const detailQuery = useQuery({
        queryKey: ["portfolio", "detail", portfolioId],
        queryFn: () =>
            detailRepository.getPortfolioDetail(portfolioId),
        enabled: !!portfolioId,
    });


    const deleteMutation = useMutation({
        mutationFn: (id) =>
            deleteRepository.deletePortfolio(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["portfolio", "user", userId],
            });

            queryClient.invalidateQueries({
                queryKey: ["portfolio"],
            });
        },
    });


    const statusMutation = useMutation({
        mutationFn: ({ id, durum }) =>
            statusRepository.updatePortfolioStatus(
                id,
                durum
            ),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["portfolio", "user", userId],
            });

            queryClient.invalidateQueries({
                queryKey: ["portfolio"],
            });
        },
    });


    const updateMutation = useMutation({
        mutationFn: ({ id, formData }) =>
            updateRepository.updatePortfolio(
                id,
                formData
            ),

        onSuccess: (updatedPortfolio) => {
            queryClient.invalidateQueries({
                queryKey: ["portfolio", "user", userId],
            });

            queryClient.invalidateQueries({
                queryKey: ["portfolio"],
            });

            if (portfolioId) {
                queryClient.setQueryData(
                    ["portfolio", "detail", portfolioId],
                    updatedPortfolio
                );
            }
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


        updatePortfolioStatus:
            statusMutation.mutateAsync,
        isUpdatingStatus:
            statusMutation.isPending,


        updatePortfolio:
            updateMutation.mutateAsync,
        isUpdating:
            updateMutation.isPending,
    };
}