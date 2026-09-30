import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { errorMessage, queryKeys } from "@/shared/api";
import { useSessionStore } from "@/shared/session/sessionStore";
import * as authRepository from "../repositories/auth.repository";

function useUserMutation(mutationFn, successMessage) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (user) => {
      queryClient.setQueryData(queryKeys.me, user);
      toast.success(successMessage);
    },
    onError: (error) => toast.error(errorMessage(error, "Profil güncellenemedi.")),
  });
}

export const useUpdateProfile = () =>
  useUserMutation(authRepository.updateProfile, "Profil başarıyla güncellendi.");

export const useUpdateAvatar = () =>
  useUserMutation(authRepository.updateAvatar, "Profil fotoğrafı güncellendi.");

export function useChangePassword() {
  const endSession = useSessionStore((state) => state.endSession);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authRepository.changePassword,
    onSuccess: () => {
      toast.success("Parolanız değişti, lütfen tekrar giriş yapın.");
      endSession();
      navigate("/", { replace: true });
    },
    onError: (error) => toast.error(errorMessage(error, "Parola değiştirilemedi.")),
  });
}

export function useDeleteAccount() {
  const queryClient = useQueryClient();
  const endSession = useSessionStore((state) => state.endSession);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authRepository.deleteAccount,
    onSuccess: () => {
      endSession();
      queryClient.clear();
      navigate("/hesap-donduruldu", { replace: true });
    },
    onError: (error) => toast.error(errorMessage(error, "Hesap silinemedi.")),
  });
}
