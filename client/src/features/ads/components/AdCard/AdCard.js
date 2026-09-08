
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPen,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";

import {Button} from "@/shared/components/atoms/Button";

export function AdCard({
    post,
    userId,
    firstName,
    onEdit,
    onDelete,
    isDeleting,
}) {
    return (
        <div className="relative bg-white rounded-lg shadow-md border p-4 flex flex-col w-full sm:w-[48%] md:w-[31%] lg:w-[23%]">

            {userId === post.userId && (
                <div className="absolute top-2 right-2 rounded-lg p-2 flex space-x-2 bg-gray-800 rounded-bl-md z-10">

                    <Button
                        ariaLabel="İlanı düzenle"
                        onClick={() => onEdit(post.id)}
                        icon={
                            <FontAwesomeIcon
                                icon={faPen}
                                className="p-2 cursor-pointer"
                            />
                        }
                    />

                    <Button
                        ariaLabel="İlanı sil"
                        disabled={isDeleting}
                        onClick={() => onDelete(post.id)}
                        icon={
                            <FontAwesomeIcon
                                icon={faTrash}
                                className="p-2 cursor-pointer"
                            />
                        }
                    />

                </div>
            )}

            <div className="mt-6 h-[160px] w-full overflow-hidden">
                <img
                    src={post.file}
                    className="w-full h-full object-cover rounded-md"
                    alt={post.title}
                />
            </div>

            <div className="flex items-center justify-between mt-3 space-x-4">
                <div>
                    <span className="font-semibold text-base text-gray-800">
                        {firstName}
                    </span>

                    <br />

                    <span className="text-sm text-gray-600">
                        {post.selectedSubcategory}
                    </span>
                </div>

                <div className="text-md font-bold text-purple-900 whitespace-nowrap">
                    Fiyat: {post.fiyat}
                </div>
            </div>

            <p
                className="mt-4 text-gray-700 text-sm font-semibold truncate"
                title={post.title}
            >
                {post.title}
            </p>

            <p className="mt-2 text-gray-500 text-sm line-clamp-3">
                {post.description}
            </p>
        </div>
    );
}

