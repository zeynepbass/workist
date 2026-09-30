export const nextPageParam = (lastPage) => lastPage.nextCursor ?? undefined;

export const flattenPages = (data) => data?.pages.flatMap((page) => page.items) ?? [];

export function toPage(response, adapt) {
  return {
    items: response.data.data.map(adapt),
    nextCursor: response.data.meta?.nextCursor ?? null,
  };
}
