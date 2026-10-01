import { LoadMore, StatusMessage } from "@/shared/components/molecules";
import PortfolioCard from "../PortfolioCard";

export default function PortfolioList({ query, onToggleStatus, onEdit, onDelete }) {
  const { portfolios, isLoading, isError, hasNextPage, isFetchingNextPage, fetchNextPage } = query;

  if (isLoading) return <StatusMessage type="loading" message="Portfolyolar yükleniyor..." />;
  if (isError)
    return <StatusMessage type="error" message="Portfolyolar yüklenirken bir hata oluştu." />;
  if (portfolios.length === 0)
    return <StatusMessage type="empty" message="Gösterilecek portfolyo bulunamadı." />;

  return (
    <>
      <div className="flex flex-wrap justify-start gap-4 p-4">
        {portfolios.map((portfolio) => (
          <PortfolioCard
            key={portfolio.id}
            portfolio={portfolio}
            onToggleStatus={onToggleStatus}
            onEdit={onEdit}
            onDelete={onDelete}
          />
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
