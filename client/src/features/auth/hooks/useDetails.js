import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import * as authRepository from "../repositories/auth.repository";
import * as portfolioRepository from "@/features/portfolio/repositories/portfolio.repository";
import { useCurrentUser } from "./useCurrentUser";

export function useDetails() {
    const { user, isLoading, isError, error } = useCurrentUser();
    const queryClient = useQueryClient();

    const portfolioMutation = useMutation({
        mutationFn: (data) =>
            portfolioRepository.createPortfolio(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["portfolio"],
            });
        },
    });

    const portfolyoCreate = (data) =>
        portfolioMutation.mutateAsync(data);

    const accountMutation = useMutation({
        mutationFn: () =>
            authRepository.account(user?.email),

        onSuccess: () => {
            toast.success("Hesap donduruldu.");
        },

        onError: (error) => {
            toast.error(
                error?.response?.data?.message ||
                    "Hesap dondurulurken bir hata oluştu."
            );
        },
    });

    const hesabiDondur = () => {
        accountMutation.mutate();
    };

    return {
        email: user,

        isLoading,
        isError,
        error,
        portfolyoCreate,
        isCreating: portfolioMutation.isPending,
        isCreateError: portfolioMutation.isError,
        createError: portfolioMutation.error,

        hesabiDondur,
        isDeleting: accountMutation.isPending,
    };
}
