import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import * as adsRepository from "@/features/ads/repositories/ads.repository";

export function useBuyerRequests(userId) {
  const myAdsQuery = useQuery({
    queryKey: ["ads"],
    queryFn: () => adsRepository.getMyAds(),
    enabled: !!userId,
  });

  const allAdsQuery = useQuery({
    queryKey: ["ads", "search", { search: "", subcategory: "" }],
    queryFn: () => adsRepository.searchAds(),
  });

  const requests = useMemo(() => {
    const myCategories = new Set((myAdsQuery.data ?? []).map((ad) => ad.category));

    return (allAdsQuery.data ?? []).filter(
      (ad) => myCategories.has(ad.category) && ad.userId !== userId,
    );
  }, [myAdsQuery.data, allAdsQuery.data, userId]);

  return {
    requests,
    isLoading: myAdsQuery.isLoading || allAdsQuery.isLoading,
    isError: myAdsQuery.isError || allAdsQuery.isError,
  };
}
