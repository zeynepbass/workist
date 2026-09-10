import {AdCard} from "../AdCard";
export default function AdList  ({
    posts,
    userId,
    firstName,
    onEdit,
    onDelete,
    isDeleting,
})  {
    if (!posts || posts.length === 0) {
        return (
            <p className="text-center p-4 text-gray-500 italic w-full">
                Seçilen duruma göre ilan bulunamadı.
            </p>
        );
    }

    return (
        <div className="flex flex-wrap gap-4 justify-start">
            {posts.map((post) => (
                <AdCard
                    key={post.id}
                    post={post}
                    userId={userId}
                    firstName={firstName}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    isDeleting={isDeleting}
                />
            ))}
        </div>
    );
};

