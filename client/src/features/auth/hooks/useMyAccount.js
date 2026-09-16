import {
    useMutation,
    useQuery,
    useQueryClient,
  } from "@tanstack/react-query";
  
  import * as authRepository from "../repositories/auth.repository";
  
  export function useMyAccount() {
    const currentUser = JSON.parse(
        localStorage.getItem("login") || "null"
    );

    const email = currentUser?.result?.email || currentUser?.email;
    console.log(email)
    const queryClient = useQueryClient();
  
    const {
      data: userDetails,
      isLoading,
      isError,
      error,
    } = useQuery({
      queryKey: ["userDetails", email],
      queryFn: () => authRepository.getDetails(email),
      enabled: !!email,
    });
  
    const updateMutation = useMutation({
      mutationFn: (formData) =>
        authRepository.updateDetails(email, formData),
  
      onSuccess: (data) => {
        queryClient.setQueryData(
          ["userDetails", email],
          data
        );
  
        localStorage.setItem(
          "login",
          JSON.stringify({
            result: data,
          })
        );
      },
  
      onError: (error) => {
        console.error(
          "Profil güncelleme hatası:",
          error
        );
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
  }