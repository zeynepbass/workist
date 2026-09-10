
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserDetails, updateUserDetails } from "../repositories/authRepository";

export const useDetails = (email) => {
  const queryClient = useQueryClient();

  const {
    data: userDetails,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userDetails", email],
    queryFn: () => getUserDetails(email),
    enabled: !!email,
  });

  const updateMutation = useMutation({
    mutationFn: (formData) => updateUserDetails(email, formData),

    onSuccess: (data) => {
      queryClient.setQueryData(
        ["userDetails", email],
        data
      );

      localStorage.setItem(
        "login",
        JSON.stringify({ result: data })
      );
    },

    onError: (error) => {
      console.error("Profil güncelleme hatası:", error);
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
};

