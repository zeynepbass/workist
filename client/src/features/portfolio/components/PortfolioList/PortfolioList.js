import PortfolioCard from "../PortfolioCard";

export default function PortfolioList({
  portfolios,
  firstName,
  title,
  userId,
  onToggleStatus,
  onEdit,
  onDelete,
  isDeleting,
}) {
  if (!portfolios || portfolios.length === 0) {
    return (
      <p className="w-full text-center p-6 text-gray-500 italic">
        Gösterilecek portfolyo bulunamadı.
      </p>
    );
  }

  return (
    <div className="p-4 flex flex-wrap gap-1 justify-start overflow-auto">
      {portfolios.map((portfolio) => (
        <PortfolioCard
          key={portfolio.id}
          portfolio={portfolio}
          firstName={firstName}
          title={title}
          userId={userId}
          onToggleStatus={onToggleStatus}
          onEdit={onEdit}
          onDelete={onDelete}
          isDeleting={isDeleting}
        />
      ))}
    </div>
  );
}
