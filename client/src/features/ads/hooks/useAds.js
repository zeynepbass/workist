import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import * as adsRepository from "../repositories/ads.repository";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";

export function useAds(id) {
  const queryClient = useQueryClient();
  const { userId, firstName } = useCurrentUser();

  const {
    data: ads = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["ads"],
    queryFn: () => adsRepository.getMyAds(),
  });

  const {
    data: details = null,
    isLoading: isDetailsLoading,
    isError: isDetailsError,
    error: detailsError,
  } = useQuery({
    queryKey: ["ad", id],
    queryFn: () => adsRepository.getAd(id),
    enabled: !!id,
  });

  const createMutation = useMutation({
    mutationFn: (ad) => adsRepository.createAd(ad),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ads"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (adId) => adsRepository.deleteAd(adId),

    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(["ads"], (previous = []) =>
        previous.filter((item) => item.id !== deletedId),
      );

      queryClient.removeQueries({ queryKey: ["ad", deletedId] });

      toast.success("İlan silindi.");
    },

    onError: (mutationError) => {
      toast.error(mutationError?.response?.data?.message || "İlan silinirken bir hata oluştu.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id: adId, ad }) => adsRepository.updateAd(adId, ad),

    onSuccess: (updatedAd, variables) => {
      queryClient.setQueryData(["ad", variables.id], updatedAd);

      queryClient.setQueryData(["ads"], (previous = []) =>
        previous.map((item) => (item.id === variables.id ? updatedAd : item)),
      );

      toast.success("İlan güncellendi.");
    },

    onError: (mutationError) => {
      toast.error(mutationError?.response?.data?.message || "İlan güncellenirken bir hata oluştu.");
    },
  });

  return {
    userId,
    firstName,

    ads,
    isLoading,
    isError,
    error,

    details,
    isDetailsLoading,
    isDetailsError,
    detailsError,

    createAd: createMutation.mutateAsync,
    isCreating: createMutation.isPending,

    deleteAd: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,

    updateAd: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
}
