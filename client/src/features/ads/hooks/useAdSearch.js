import { useQuery } from "@tanstack/react-query";

import * as adsRepository from "../repositories/ads.repository";

export function useAdSearch({ search = "", subcategory = "" } = {}) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["ads", "search", { search, subcategory }],
    queryFn: () => adsRepository.searchAds({ search, subcategory }),
  });

  return {
    ads: data ?? [],
    isLoading,
    isError,
    error,
  };
}
