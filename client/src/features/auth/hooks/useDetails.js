
import { useQuery, useMutation } from "@tanstack/react-query";
import authRepository from "../repositories/authRepository";

export const useDetails = () => {
  const {
    data: emailResponse,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["details"],
    queryFn: () => authRepository.details(),
  });

  const accountMutation = useMutation({
    mutationFn: () => authRepository.account(),

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

