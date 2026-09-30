import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { errorMessage, queryKeys } from "@/shared/api";
import { flattenPages, nextPageParam } from "@/shared/api/pagination";
import * as adsRepository from "../repositories/ads.repository";

export function useAdList(filters) {
  const query = useInfiniteQuery({
    queryKey: queryKeys.ads.list(filters),
    queryFn: ({ pageParam }) => adsRepository.listAds(filters, pageParam),
    initialPageParam: undefined,
    getNextPageParam: nextPageParam,
  });

  return { ...query, ads: flattenPages(query.data) };
}

export function useAd(id) {
  return useQuery({
    queryKey: queryKeys.ads.detail(id),
    queryFn: () => adsRepository.getAd(id),
    enabled: Boolean(id),
  });
}

function updateAdInLists(queryClient, adId, update) {
  queryClient.setQueriesData({ queryKey: [...queryKeys.ads.all, "list"] }, (data) =>
    data
      ? {
          ...data,
          pages: data.pages.map((page) => ({ ...page, items: update(page.items, adId) })),
        }
      : data,
  );
}

export function useCreateAd() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adsRepository.createAd,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ads.all });
      toast.success("İlan başarıyla oluşturuldu.");
    },
    onError: (error) => toast.error(errorMessage(error, "İlan oluşturulamadı.")),
  });
}

async function snapshotAds(queryClient) {
  await queryClient.cancelQueries({ queryKey: queryKeys.ads.all });
  return queryClient.getQueriesData({ queryKey: queryKeys.ads.all });
}

function restoreAds(queryClient, snapshot) {
  snapshot?.forEach(([key, data]) => queryClient.setQueryData(key, data));
}

export function useDeleteAd() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adsRepository.deleteAd,
    onMutate: async (adId) => {
      const snapshot = await snapshotAds(queryClient);
      updateAdInLists(queryClient, adId, (items) => items.filter((item) => item.id !== adId));
      return { snapshot };
    },
    onError: (error, adId, context) => {
      restoreAds(queryClient, context?.snapshot);
      toast.error(errorMessage(error, "İlan silinemedi."));
    },
    onSuccess: () => toast.success("İlan silindi."),
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKeys.ads.all }),
  });
}

export function useUpdateAd(adId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input) => adsRepository.updateAd(adId, input),
    onMutate: async ({ fields }) => {
      const snapshot = await snapshotAds(queryClient);
      const merge = (item) => ({ ...item, ...fields });

      queryClient.setQueryData(queryKeys.ads.detail(adId), (current) => current && merge(current));
      updateAdInLists(queryClient, adId, (items) =>
        items.map((item) => (item.id === adId ? merge(item) : item)),
      );

      return { snapshot };
    },
    onError: (error, input, context) => {
      restoreAds(queryClient, context?.snapshot);
      toast.error(errorMessage(error, "İlan güncellenemedi."));
    },
    onSuccess: (ad) => {
      queryClient.setQueryData(queryKeys.ads.detail(adId), ad);
      toast.success("İlan güncellendi.");
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKeys.ads.all }),
  });
}
