import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { errorMessage, queryKeys } from "@/shared/api";
import { useSessionStore } from "@/shared/session/sessionStore";
import * as authRepository from "../repositories/auth.repository";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const startSession = useSessionStore((state) => state.startSession);

  return useMutation({
    mutationFn: authRepository.login,
    onSuccess: ({ accessToken, user }) => {
      queryClient.setQueryData(queryKeys.me, user);
      startSession(accessToken);
      toast.success("Giriş başarılı.");
      navigate("/workist", { replace: true });
    },
    onError: (error) => toast.error(errorMessage(error, "E-posta veya parola hatalı.")),
  });
}

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authRepository.register,
    onSuccess: () => {
      toast.success("Kayıt başarılı. Giriş yapabilirsiniz.");
      navigate("/");
    },
    onError: (error) => toast.error(errorMessage(error, "Kayıt sırasında bir hata oluştu.")),
  });
}

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const endSession = useSessionStore((state) => state.endSession);

  return useMutation({
    mutationFn: authRepository.logout,
    onSettled: () => {
      endSession();
      queryClient.clear();
      toast.success("Çıkış yapıldı.");
      navigate("/", { replace: true });
    },
  });
}
