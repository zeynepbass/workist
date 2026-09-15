import { useQuery, useMutation } from "@tanstack/react-query";
import * as authRepository from "../repositories/auth.repository";

export function useDetails() {
    const currentUser = JSON.parse(
        localStorage.getItem("login") || "null"
    );

    const email = currentUser?.result?.email;

    const detailsRepository =
        authRepository.details();

    const accountRepository =
        authRepository.account();

    const {
        data: emailResponse,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["details", email],
        queryFn: () =>
            detailsRepository.details(email),
        enabled: !!email,
    });

    const accountMutation = useMutation({
        mutationFn: () =>
            accountRepository.account(email),

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

        hesabiDondur,
        isDeleting: accountMutation.isPending,
    };
}