import formatToTurkishDate from "@/shared/utils/formatToTurkishDate";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPen,
    faTrash,
    faEye,
    faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

import { Button } from "@/shared/components/atoms";

export default function PortfolioCard({
    post,
    firstName,
    unvan,

    userId,
    onToggleStatus,
    onEdit,
    onDelete,

    isDeleting = false,
    isUpdatingStatus = false,
}) {
    const isOwner = userId === post.userId;
    const isPublished = post.durum === "yayinda";

    const isManageable =
        isOwner &&
        (onToggleStatus || onEdit || onDelete);

    return (
        <div className="relative bg-white rounded-lg shadow-md border w-full sm:w-1/4 p-4 flex flex-col">


            {isManageable && (
                <div className="absolute top-2 right-2 rounded-lg p-2 flex space-x-2 bg-gray-800 rounded-bl-md z-10">

                    {onToggleStatus && (
                        <Button
                            onClick={() =>
                                onToggleStatus(
                                    post.id,
                                    post.durum
                                )
                            }
                            disabled={isUpdatingStatus}
                            className="text-gray-200 hover:text-white"
                            title={
                                isPublished
                                    ? "Yayından kaldır"
                                    : "Yayına ekle"
                            }
                        >
                            <FontAwesomeIcon
                                icon={
                                    isPublished
                                        ? faEye
                                        : faEyeSlash
                                }
                                size="lg"
                            />
                        </Button>
                    )}

                    {onEdit && (
                        <Button
                            onClick={() => onEdit(post.id)}
                            className="text-gray-200 hover:text-white"
                            title="Düzenle"
                        >
                            <FontAwesomeIcon
                                icon={faPen}
                                size="lg"
                            />
                        </Button>
                    )}

                    {onDelete && (
                        <Button
                            onClick={() => onDelete(post.id)}
                            disabled={isDeleting}
                            className="text-gray-200 hover:text-white"
                            title="Sil"
                        >
                            <FontAwesomeIcon
                                icon={faTrash}
                                size="lg"
                            />
                        </Button>
                    )}

                </div>
            )}


            <span className="bg-gray-100 w-1/2 rounded text-gray-500 text-center ml-auto block text-sm py-1">
                {formatToTurkishDate(post.createdAt)}
            </span>


            <div className="mt-3 p-2 h-[20vh] flex flex-col">

                <div className="flex-1 overflow-hidden">
                    <img
                        src={post.file}
                        className="w-full h-full object-contain rounded-md"
                        alt="İlan görseli"
                    />
                </div>


                <div className="flex items-center justify-between mt-2 space-x-4">

                    <div>
                        <span className="font-semibold text-lg text-gray-800">
                            {firstName}
                        </span>

                        <br />

                        <span className="font-semibold text-md text-gray-600">
                            {post.selectedSubcategory}
                        </span>

                        {unvan && (
                            <p className="text-sm text-gray-400">
                                {unvan}
                            </p>
                        )}
                    </div>

                    <div className="text-lg font-bold text-purple-900">
                        fiyat: {post.fiyat}
                    </div>

                </div>
            </div>


            <p className="mt-3 text-gray-500 text-sm pl-1 font-semibold">
                {post.title}
            </p>


            <p className="text-gray-400 text-sm pl-1 truncate">
                {post.description}
            </p>

        </div>
    );
}