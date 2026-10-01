import { LoadMore, StatusMessage } from "@/shared/components/molecules";
import OrderCard from "../OrderCard";

export default function OrderList({ query, emptyMessage }) {
  const { orders, isLoading, isError, hasNextPage, isFetchingNextPage, fetchNextPage } = query;

  if (isLoading) return <StatusMessage type="loading" message="Siparişler yükleniyor..." />;
  if (isError)
    return <StatusMessage type="error" message="Siparişler yüklenirken bir hata oluştu." />;
  if (orders.length === 0) return <StatusMessage type="empty" message={emptyMessage} />;

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
      <LoadMore
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={fetchNextPage}
      />
    </div>
  );
}
