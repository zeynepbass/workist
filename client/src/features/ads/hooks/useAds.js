
import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import * as adsRepository from "../respositories/ads.repository";

export function useAds(id) {
    const queryClient = useQueryClient();

    const login = JSON.parse(
        localStorage.getItem("login") || "null"
    );

    const userId =
        login?._id ||
        login?.result?._id;

    const firstName =
        login?.result?.firstName ||
        login?.firstName;

    const adsRepositoryInstance =
        adsRepository.getAds();

    const detailRepository =
        adsRepository.getDetailAds();

    const createRepository =
        adsRepository.createWorkPost();

    const deleteRepository =
        adsRepository.deletedAds();

    const updateRepository =
        adsRepository.updateAds();

    const {
        data: posts = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["ads"],
        queryFn: () =>
            adsRepositoryInstance.getAds(),
    });

    const {
        data: details = null,
        isLoading: isDetailsLoading,
        isError: isDetailsError,
        error: detailsError,
    } = useQuery({
        queryKey: ["ad", id],
        queryFn: () =>
            detailRepository.getDetailAds(id),
        enabled: !!id,
    });

    const createMutation = useMutation({
        mutationFn: (post) =>
            createRepository.createWorkPost(post),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["ads"],
            });
        },

        onError: (error) => {
            console.error(
                "Post oluşturma hatası:",
                error
            );
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id) =>
            deleteRepository.deleteAds(id),

        onSuccess: (_, deletedId) => {
            queryClient.setQueryData(
                ["ads"],
                (oldPosts = []) =>
                    oldPosts.filter(
                        (item) =>
                            item._id !== deletedId
                    )
            );

            queryClient.removeQueries({
                queryKey: ["ad", deletedId],
            });

            queryClient.invalidateQueries({
                queryKey: ["ads"],
            });
        },

        onError: (error) => {
            console.error(
                "İlan silme hatası:",
                error
            );
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, post }) =>
            updateRepository.updateAds(id, post),

        onSuccess: (updatedPost, variables) => {
            queryClient.setQueryData(
                ["ad", variables.id],
                updatedPost
            );

            queryClient.setQueryData(
                ["ads"],
                (oldPosts = []) =>
                    oldPosts.map((item) =>
                        item._id === variables.id
                            ? updatedPost
                            : item
                    )
            );

            queryClient.invalidateQueries({
                queryKey: ["ads"],
            });
        },

        onError: (error) => {
            console.error(
                "İlan güncelleme hatası:",
                error
            );
        },
    });

    return {
        userId,
        firstName,

        posts,
        isLoading,
        isError,
        error,

        details,
        isDetailsLoading,
        isDetailsError,
        detailsError,

        createWorkPost:
            createMutation.mutateAsync,

        isCreating:
            createMutation.isPending,

        deleteClickPost:
            deleteMutation.mutate,

        isDeleting:
            deleteMutation.isPending,

        updatePost:
            updateMutation.mutate,

        isUpdating:
            updateMutation.isPending,
    };
}
