import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { Button } from "@/shared/components/atoms";
import { useCategories } from "@/features/categories/hooks/useCategories";
import formatToTurkishDate from "@/shared/utils/formatToTurkishDate";

const ACTION_BUTTON_CLASS =
  "flex h-7 w-7 items-center justify-center rounded text-gray-200 hover:bg-gray-700 hover:text-white";

export default function PortfolioCard({
  portfolio,
  firstName,
  title,
  userId,
  onToggleStatus,
  onEdit,
  onDelete,
  isDeleting = false,
}) {
  const { getLabel } = useCategories();
  const isOwner = userId === portfolio.userId;
  const isPublished = portfolio.status === "published";
  const isManageable = isOwner && (onToggleStatus || onEdit || onDelete);

  return (
    <div className="relative bg-white rounded-lg shadow-md border w-full sm:w-[48%] md:w-[31%] lg:w-[23%] p-4 flex flex-col">
      {isManageable && (
        <div className="absolute top-2 right-2 flex space-x-1 rounded-md bg-gray-800/90 p-1 z-10">
          {onToggleStatus && (
            <Button
              onClick={() =>
                onToggleStatus({
                  id: portfolio.id,
                  status: isPublished ? "unpublished" : "published",
                })
              }
              className={ACTION_BUTTON_CLASS}
              ariaLabel={isPublished ? "Yayından kaldır" : "Yayına ekle"}
              title={isPublished ? "Yayından kaldır" : "Yayına ekle"}
            >
              <FontAwesomeIcon icon={isPublished ? faEye : faEyeSlash} size="sm" />
            </Button>
          )}

          {onEdit && (
            <Button
              onClick={() => onEdit(portfolio.id)}
              className={ACTION_BUTTON_CLASS}
              ariaLabel="Düzenle"
              title="Düzenle"
            >
              <FontAwesomeIcon icon={faPen} size="sm" />
            </Button>
          )}

          {onDelete && (
            <Button
              onClick={() => onDelete(portfolio.id)}
              disabled={isDeleting}
              className="flex h-7 w-7 items-center justify-center rounded text-gray-200 hover:bg-red-600 hover:text-white"
              ariaLabel="Sil"
              title="Sil"
            >
              <FontAwesomeIcon icon={faTrash} size="sm" />
            </Button>
          )}
        </div>
      )}

      <span className="bg-gray-100 w-1/2 rounded text-gray-500 text-center ml-auto block text-sm py-1">
        {formatToTurkishDate(portfolio.createdAt)}
      </span>

      <div className="mt-3 p-2 h-[20vh] flex flex-col">
        <div className="flex-1 overflow-hidden">
          <img
            src={portfolio.image}
            className="w-full h-full object-contain rounded-md"
            alt={portfolio.title}
          />
        </div>

        <div className="flex items-center justify-between mt-2 space-x-4">
          <div>
            <span className="font-semibold text-lg text-gray-800">{firstName}</span>

            <br />

            <span className="font-semibold text-md text-gray-600">
              {getLabel(portfolio.subcategory)}
            </span>

            {title && <p className="text-sm text-gray-400">{title}</p>}
          </div>

          <div className="text-lg font-bold text-purple-900">fiyat: {portfolio.price}</div>
        </div>
      </div>

      <p className="mt-3 text-gray-500 text-sm pl-1 font-semibold">{portfolio.title}</p>

      <p className="text-gray-400 text-sm pl-1 truncate">{portfolio.description}</p>
    </div>
  );
}
