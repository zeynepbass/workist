const STAR_COUNT = 5;

export function RatingStars({ rating }) {
  const average = rating?.average ?? 0;
  const count = rating?.count ?? 0;

  if (count === 0) {
    return <span className="text-sm text-gray-400">Henüz değerlendirme yok</span>;
  }

  const filled = Math.round(average);

  return (
    <span
      className="inline-flex items-center gap-1 text-sm"
      aria-label={`5 üzerinden ${average}, ${count} değerlendirme`}
    >
      <span aria-hidden="true" className="text-orange-400">
        {"★".repeat(filled)}
        <span className="text-gray-300">{"★".repeat(STAR_COUNT - filled)}</span>
      </span>
      <span className="text-gray-600">
        {average.toFixed(1)} ({count})
      </span>
    </span>
  );
}
