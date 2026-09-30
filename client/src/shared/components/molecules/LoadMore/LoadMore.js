import { Button } from "../../atoms";

export function LoadMore({ hasNextPage, isFetchingNextPage, onLoadMore }) {
  if (!hasNextPage) {
    return null;
  }

  return (
    <div className="flex justify-center py-4">
      <Button
        variant="secondary"
        className="px-4 py-2"
        onClick={onLoadMore}
        disabled={isFetchingNextPage}
      >
        {isFetchingNextPage ? "Yükleniyor..." : "Daha fazla göster"}
      </Button>
    </div>
  );
}
