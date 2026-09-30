import AdCard from "../AdCard";

export default function AdList({ ads, userId, onEdit, onDelete, isDeleting }) {
  if (!ads || ads.length === 0) {
    return (
      <p className="text-center p-4 text-gray-500 italic w-full">
        Seçilen duruma göre ilan bulunamadı.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 justify-start">
      {ads.map((ad) => (
        <AdCard
          key={ad.id}
          ad={ad}
          userId={userId}
          onEdit={onEdit}
          onDelete={onDelete}
          isDeleting={isDeleting}
        />
      ))}
    </div>
  );
}
