import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import * as authRepository from "../repositories/auth.repository";

export function useDetails(email) {
  const queryClient = useQueryClient();

  const detailsRepository =
      authRepository.getDetails();

  const updateRepository =
      authRepository.updateDetails();

  const {
      data: userDetails,
      isLoading,
      isError,
      error,
  } = useQuery({
      queryKey: ["userDetails", email],
      queryFn: () =>
          detailsRepository.getDetails(email),
      enabled: !!email,
  });

  const updateMutation = useMutation({
      mutationFn: (formData) =>
          updateRepository.updateDetails(
              email,
              formData
          ),

      onSuccess: (data) => {
          queryClient.setQueryData(
              ["userDetails", email],
              data
          );

          localStorage.setItem(
              "login",
              JSON.stringify({
                  result: data,
              })
          );
      },

      onError: (error) => {
          console.error(
              "Profil güncelleme hatası:",
              error
          );
      },
  });

  return {
      userDetails,

      isLoading,
      isError,
      error,

      updateDetails: updateMutation.mutate,
      isUpdating: updateMutation.isPending,
      updateError: updateMutation.error,
  };
}