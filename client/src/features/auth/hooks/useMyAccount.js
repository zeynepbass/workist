import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import * as authRepository from "../repositories/auth.repository";
import { useCurrentUser } from "./useCurrentUser";

export function useMyAccount() {
    const { user, isLoading, isError, error } = useCurrentUser();
    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationFn: (formData) =>
            authRepository.updateDetails(user?.email, formData),

        onSuccess: (data) => {
            queryClient.setQueryData(["currentUser"], data);

            localStorage.setItem(
                "login",
                JSON.stringify({
                    result: data,
                })
            );

            toast.success("Profil başarıyla güncellendi.");
        },

        onError: (error) => {
            toast.error(
                error?.response?.data?.message ||
                    "Profil güncellenirken bir hata oluştu."
            );
        },
    });

    return {
        userDetails: user,

        isLoading,
        isError,
        error,

        updateDetails: updateMutation.mutate,
        isUpdating: updateMutation.isPending,
        updateError: updateMutation.error,
    };
}
