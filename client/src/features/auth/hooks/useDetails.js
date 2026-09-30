import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import * as authRepository from "../repositories/auth.repository";
import { useCurrentUser } from "./useCurrentUser";

export function useDetails() {
  const { user, isLoading, isError, error } = useCurrentUser();
  const queryClient = useQueryClient();

  const deleteAccountMutation = useMutation({
    mutationFn: () => authRepository.deleteAccount(user?.email),

    onSuccess: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("login");
      queryClient.clear();
      toast.success("Hesap donduruldu.");
    },

    onError: (mutationError) => {
      toast.error(mutationError?.response?.data?.message || "Hesap dondurulurken bir hata oluştu.");
    },
  });

  return {
    user,
    isLoading,
    isError,
    error,

    deleteAccount: deleteAccountMutation.mutateAsync,
    isDeleting: deleteAccountMutation.isPending,
  };
}
