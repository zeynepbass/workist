import PortfolioCard from "./PortfolioCard";

export default function PortfolioList({
    posts,
    firstName,
    unvan,
    userId,
    onToggleStatus,
    onEdit,
    onDelete,
    isDeleting,
    isUpdatingStatus,
}) {
    if (!posts || posts.length === 0) {
        return (
            <p className="w-full text-center p-6 text-gray-500 italic">
                Gösterilecek portfolyo bulunamadı.
            </p>
        );
    }

    return (
        <div className="p-4 flex flex-wrap gap-1 justify-start overflow-auto">
            {posts.map((post) => (
                <PortfolioCard
                    key={post.id}
                    post={post}
                    firstName={firstName}
                    unvan={unvan}
                    userId={userId}
                    onToggleStatus={onToggleStatus}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    isDeleting={isDeleting}
                    isUpdatingStatus={isUpdatingStatus}
                />
            ))}
        </div>
    );
}