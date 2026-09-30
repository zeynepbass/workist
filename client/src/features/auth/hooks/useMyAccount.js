import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import * as authRepository from "../repositories/auth.repository";
import { useCurrentUser } from "./useCurrentUser";

export function useMyAccount() {
  const { user, isLoading, isError, error } = useCurrentUser();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (profile) => authRepository.updateProfile(user?.email, profile),

    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["currentUser"], updatedUser);
      localStorage.setItem("login", JSON.stringify({ result: updatedUser }));
      toast.success("Profil başarıyla güncellendi.");
    },

    onError: (mutationError) => {
      toast.error(
        mutationError?.response?.data?.message || "Profil güncellenirken bir hata oluştu.",
      );
    },
  });

  return {
    userDetails: user,

    isLoading,
    isError,
    error,

    updateProfile: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,
  };
}
