import { LoadMore, StatusMessage } from "@/shared/components/molecules";
import AdCard from "../AdCard";

export default function AdList({
  query,
  onEdit,
  onDelete,
  isDeleting,
  emptyMessage = "İlan bulunamadı.",
}) {
  const { ads, isLoading, isError, hasNextPage, isFetchingNextPage, fetchNextPage } = query;

  if (isLoading) return <StatusMessage type="loading" message="İlanlar yükleniyor..." />;
  if (isError) return <StatusMessage type="error" message="İlanlar yüklenirken bir hata oluştu." />;
  if (ads.length === 0) return <StatusMessage type="empty" message={emptyMessage} />;

  return (
    <>
      <div className="flex flex-wrap justify-start gap-4">
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} onEdit={onEdit} onDelete={onDelete} isDeleting={isDeleting} />
        ))}
      </div>
      <LoadMore
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={fetchNextPage}
      />
    </>
  );
}
