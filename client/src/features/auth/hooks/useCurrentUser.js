import { useQuery } from "@tanstack/react-query";
import * as authRepository from "../repositories/auth.repository";

export function useCurrentUser() {
    const token = localStorage.getItem("token");

    const {
        data: user,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["currentUser"],
        queryFn: () => authRepository.getCurrentUser(),
        enabled: !!token,
        staleTime: 5 * 60 * 1000,
    });

    return {
        user: user ?? null,
        userId: user?.id ?? null,
        firstName: user?.firstName ?? "",
        isLoading,
        isError,
        error,
    };
}
