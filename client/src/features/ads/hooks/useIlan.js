import { useQuery } from "@tanstack/react-query";
import { ilanRepository } from "../api/ilanRepository";

export function useIlanlar() {
  return useQuery({
    queryKey: ["ilanlar"],
    queryFn: ilanRepository.getAll,
  });
}