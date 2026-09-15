
import { useQuery, useMutation } from "@tanstack/react-query";
import * as authRepository from "../repositories/auth.repository";

export function useDetails() {
  const currentUser = JSON.parse(localStorage.getItem("login"));
  const email = currentUser?.result?.email;
  const {
    data: emailResponse,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["details"],
    queryFn: () => authRepository.details(email),
  });

  const accountMutation = useMutation({
    mutationFn: () => authRepository.account(email),

    onSuccess: () => {
      console.log("Hesap donduruldu.");
    },

    onError: (error) => {
      console.error("Hesap dondurma hatası:", error);
    },
  });

  const hesabiDondur = () => {
    accountMutation.mutate();
  };

  return {
    email: emailResponse?.data,

    isLoading,
    isError,
    error,

    hesabiDondur,
    isDeleting: accountMutation.isPending,
  };
};

