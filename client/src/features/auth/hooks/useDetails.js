import { useQuery, useMutation } from "@tanstack/react-query";
import * as authRepository from "../repositories/auth.repository";

export function useDetails() {
    const currentUser = JSON.parse(
        localStorage.getItem("login") || "null"
    );

    const email =
        currentUser?.email ||
        currentUser?.result?.email;

    const {
        data: emailResponse,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["details", email],

        queryFn: () =>
            authRepository.details(email),

        enabled: !!email,
    });
    const portfolioMutation = useMutation({
        mutationFn: (data) =>
            authRepository.portfolyoCreate(data),

        onSuccess: () => {
            console.log("Portfolyo başarıyla oluşturuldu.");
        },

        onError: (error) => {
            console.error(
                "Portfolyo oluşturma hatası:",
                error
            );
        },
    });

    const portfolyoCreate = (data) => {
        portfolioMutation.mutate(data);
    };
    const accountMutation = useMutation({
        mutationFn: () =>
            authRepository.account(email),

        onSuccess: () => {
            console.log("Hesap donduruldu.");
        },

        onError: (error) => {
            console.error(
                "Hesap dondurma hatası:",
                error
            );
        },
    });

    const hesabiDondur = () => {
        accountMutation.mutate();
    };

    return {
        email: emailResponse,

        isLoading,
        isError,
        error,
        portfolyoCreate,
        isCreating: portfolioMutation.isPending,
        isError: portfolioMutation.isError,
        error: portfolioMutation.error,

        hesabiDondur,
        isDeleting: accountMutation.isPending,
    };
}