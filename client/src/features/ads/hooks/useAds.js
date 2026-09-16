
import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import * as adsRepository from "../repositories/ads.repository";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";

export function useAds(id) {
    const queryClient = useQueryClient();
    const { userId, firstName } = useCurrentUser();

    const {
        data: posts = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["ads"],
        queryFn: () =>
            adsRepository.getAds(),
    });

    const {
        data: details = null,
        isLoading: isDetailsLoading,
        isError: isDetailsError,
        error: detailsError,
    } = useQuery({
        queryKey: ["ad", id],
        queryFn: () =>
            adsRepository.getDetailAds(id),
        enabled: !!id,
    });

    const createMutation = useMutation({
        mutationFn: (post) =>
            adsRepository.createWorkPost(post),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["ads"],
            });

            toast.success("İlan başarıyla oluşturuldu.");
        },

        onError: (error) => {
            toast.error(
                error?.response?.data?.message ||
                    "İlan oluşturulurken bir hata oluştu."
            );
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id) =>
            adsRepository.deletedAds(id),

        onSuccess: (_, deletedId) => {
            queryClient.setQueryData(
                ["ads"],
                (oldPosts = []) =>
                    oldPosts.filter(
                        (item) =>
                            item.id !== deletedId
                    )
            );

            queryClient.removeQueries({
                queryKey: ["ad", deletedId],
            });

            queryClient.invalidateQueries({
                queryKey: ["ads"],
            });

            toast.success("İlan silindi.");
        },

        onError: (error) => {
            toast.error(
                error?.response?.data?.message ||
                    "İlan silinirken bir hata oluştu."
            );
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, post }) =>
            adsRepository.updateAds(id, post),

        onSuccess: (updatedPost, variables) => {
            queryClient.setQueryData(
                ["ad", variables.id],
                updatedPost
            );

            queryClient.setQueryData(
                ["ads"],
                (oldPosts = []) =>
                    oldPosts.map((item) =>
                        item.id === variables.id
                            ? updatedPost
                            : item
                    )
            );

            queryClient.invalidateQueries({
                queryKey: ["ads"],
            });

            toast.success("İlan güncellendi.");
        },

        onError: (error) => {
            toast.error(
                error?.response?.data?.message ||
                    "İlan güncellenirken bir hata oluştu."
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
