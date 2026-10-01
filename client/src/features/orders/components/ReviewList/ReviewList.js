import { Avatar } from "@/shared/components/atoms";
import { LoadMore, StatusMessage } from "@/shared/components/molecules";
import { formatDate } from "../../constants";
import { useReviews } from "../../hooks/useReviews";

export default function ReviewList({ filters }) {
  const { reviews, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useReviews(filters);

  if (isLoading) return <StatusMessage type="loading" message="Değerlendirmeler yükleniyor..." />;
  if (reviews.length === 0)
    return <StatusMessage type="empty" message="Henüz değerlendirme yok." />;

  return (
    <>
      <ul className="space-y-4">
        {reviews.map((review) => (
          <li key={review.id} className="flex gap-3 rounded bg-white p-4">
            <Avatar user={review.reviewer} size="sm" />
            <div>
              <p className="font-medium text-gray-800">
                {review.reviewer?.fullName}{" "}
                <span className="text-orange-400" aria-label={`${review.rating} yıldız`}>
                  {"★".repeat(review.rating)}
                </span>
              </p>
              <p className="text-xs text-gray-400">{formatDate(review.createdAt)}</p>
              {review.comment && <p className="mt-1 text-gray-600">{review.comment}</p>}
            </div>
          </li>
        ))}
      </ul>
      <LoadMore
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={fetchNextPage}
      />
    </>
  );
}
