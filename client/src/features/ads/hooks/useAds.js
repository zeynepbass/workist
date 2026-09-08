import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { getAds } from "../respositories/ads.repository";
export function useAds(baseUrl, id) {
  const queryClient = useQueryClient();

  const login = JSON.parse(
      localStorage.getItem("login") || "null"
  );

  const userId = login?.result?._id;
  const firstName = login?.result?.firstName;


  const {
    data: posts = [],
    isLoading,
    isError,
    error,
} = useQuery({
    queryKey: ["ads", userId],

    queryFn: () => getAds.getAds(userId),

    enabled: !!userId,
});


const {
    data: details = null,
    isLoading: isDetailsLoading,
    isError: isDetailsError,
    error: detailsError,
} = useQuery({
    queryKey: ["ad", id],

    queryFn: () => getAds.getDetailAds(id),

    enabled: !!id,
});
const deleteMutation = useMutation({
    mutationFn: (id) => adsRepository.deleteAds(id),

    onSuccess: (_, deletedId) => {
        queryClient.setQueryData(
            ["ads", userId],
            (oldPosts = []) =>
                oldPosts.filter(
                    (item) => item.id !== deletedId
                )
        );

        queryClient.removeQueries({
            queryKey: ["ad", deletedId],
        });

        queryClient.invalidateQueries({
            queryKey: ["ads", userId],
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
        adsRepository.updateAds(id, post),

    onSuccess: (updatedPost, variables) => {
        queryClient.setQueryData(
            ["ad", variables.id],
            updatedPost
        );

        queryClient.setQueryData(
            ["ads", userId],
            (oldPosts = []) =>
                oldPosts.map((item) =>
                    item.id === variables.id
                        ? updatedPost
                        : item
                )
        );

        queryClient.invalidateQueries({
            queryKey: ["ads", userId],
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

      
      deleteClickPost: deleteMutation.mutate,
      isDeleting: deleteMutation.isPending,

      updatePost: updateMutation.mutate,
      isUpdating: updateMutation.isPending,
  };
}