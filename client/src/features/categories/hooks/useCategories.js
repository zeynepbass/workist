import { useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import * as categoriesRepository from "../repositories/categories.repository";

export function useCategories() {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoriesRepository.getCategories(),
    staleTime: Infinity,
  });

  const labelsBySlug = useMemo(() => {
    const entries = categories.flatMap((category) => [
      [category.slug, category.label],
      ...category.subcategories.map((subcategory) => [subcategory.slug, subcategory.label]),
    ]);

    return new Map(entries);
  }, [categories]);

  const getLabel = useCallback((slug) => labelsBySlug.get(slug) ?? slug, [labelsBySlug]);

  return { categories, isLoading, getLabel };
}
