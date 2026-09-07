import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";

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

      queryFn: async () => {
          const response = await axios.get(
              `${baseUrl}/ilanlarim/${userId}`
          );

          return response.data;
      },

      enabled: !!userId,
  });

  const {
      data: details = null,
      isLoading: isDetailsLoading,
      isError: isDetailsError,
      error: detailsError,
  } = useQuery({
      queryKey: ["ad", id],

      queryFn: async () => {
          const response = await axios.get(
              `${baseUrl}/ilanlarim/${id}`
          );

          return response.data;
      },

      enabled: !!id,
  });

  const deleteMutation = useMutation({
      mutationFn: async (id) => {
          await axios.delete(
              `${baseUrl}/ilanlarim/${id}`
          );
      },

      onSuccess: (_, deletedId) => {
          queryClient.setQueryData(
              ["ads", userId],
              (oldPosts = []) =>
                  oldPosts.filter(
                      (item) => item._id !== deletedId
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
      mutationFn: async ({ id, post }) => {
          const response = await axios.put(
              `${baseUrl}/ilanlarim/${id}`,
              post
          );

          return response.data;
      },

      onSuccess: (updatedPost, variables) => {

          queryClient.setQueryData(
              ["ad", variables.id],
              updatedPost
          );


          queryClient.setQueryData(
              ["ads", userId],
              (oldPosts = []) =>
                  oldPosts.map((item) =>
                      item._id === variables.id
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