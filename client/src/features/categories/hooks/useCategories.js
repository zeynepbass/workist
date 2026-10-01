import { useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/api";
import * as categoriesRepository from "../repositories/categories.repository";

export function useCategories() {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: queryKeys.categories,
    queryFn: categoriesRepository.getCategories,
    staleTime: Infinity,
  });

  const labelsBySlug = useMemo(
    () =>
      new Map(
        categories.flatMap((category) => [
          [category.slug, category.label],
          ...category.subcategories.map((subcategory) => [subcategory.slug, subcategory.label]),
        ]),
      ),
    [categories],
  );

  const getLabel = useCallback((slug) => labelsBySlug.get(slug) ?? slug, [labelsBySlug]);

  const subcategoriesOf = useCallback(
    (categorySlug) =>
      categories.find((category) => category.slug === categorySlug)?.subcategories ?? [],
    [categories],
  );

  return { categories, isLoading, getLabel, subcategoriesOf };
}
