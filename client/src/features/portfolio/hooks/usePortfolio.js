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


    const searchPostsRepository =
        portfolioRepository.SearchPosts();

    const userPortfoliosRepository =
        portfolioRepository.getUserPortfolios();

    const detailRepository =
        portfolioRepository.getPortfolioDetail();

    const deleteRepository =
        portfolioRepository.deletePortfolio();

    const updateRepository =
        portfolioRepository.updatePortfolio();


    const postsQuery = useQuery({
        queryKey: ["portfolio", searchQuery],
        queryFn: () =>
            searchPostsRepository.searchPosts(
                searchQuery
            ),
    });


    const userPortfoliosQuery = useQuery({
        queryKey: ["portfolio", "user", userId],
        queryFn: () =>
            userPortfoliosRepository.getUserPortfolios(
                userId
            ),
        enabled: !!userId,
    });


    const detailQuery = useQuery({
        queryKey: ["portfolio", "detail", portfolioId],
        queryFn: () =>
            detailRepository.getPortfolioDetail(
                portfolioId
            ),
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


        updatePortfolio:
            updateMutation.mutateAsync,

        isUpdating:
            updateMutation.isPending,
    };
}