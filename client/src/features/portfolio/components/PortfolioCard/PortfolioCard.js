import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import { useCategories } from "@/features/categories/hooks/useCategories";
import { Button } from "@/shared/components/atoms";
import { RatingStars } from "@/shared/components/molecules";
import formatToTurkishDate from "@/shared/utils/formatToTurkishDate";

const ACTION_CLASS =
  "flex h-7 w-7 items-center justify-center rounded text-gray-200 hover:bg-gray-700 hover:text-white";

export default function PortfolioCard({ portfolio, onToggleStatus, onEdit, onDelete }) {
  const { getLabel } = useCategories();
  const isPublished = portfolio.status === "published";
  const toggleLabel = isPublished ? "Yayından kaldır" : "Yayına al";

  return (
    <article className="relative flex w-full flex-col rounded-lg border bg-white p-4 shadow-md sm:w-[48%] md:w-[31%] lg:w-[23%]">
      {onEdit && (
        <div className="absolute right-2 top-2 z-10 flex space-x-1 rounded-md bg-gray-800/90 p-1">
          <Button
            className={ACTION_CLASS}
            ariaLabel={`${portfolio.title}: ${toggleLabel}`}
            onClick={() =>
              onToggleStatus({
                id: portfolio.id,
                status: isPublished ? "unpublished" : "published",
              })
            }
            icon={<FontAwesomeIcon icon={isPublished ? faEye : faEyeSlash} size="sm" />}
          />
          <Button
            className={ACTION_CLASS}
            ariaLabel={`${portfolio.title} düzenle`}
            onClick={() => onEdit(portfolio.id)}
            icon={<FontAwesomeIcon icon={faPen} size="sm" />}
          />
          <Button
            className={`${ACTION_CLASS} hover:bg-red-600`}
            ariaLabel={`${portfolio.title} sil`}
            onClick={() => onDelete(portfolio.id)}
            icon={<FontAwesomeIcon icon={faTrash} size="sm" />}
          />
        </div>
      )}

      <span className="ml-auto block w-1/2 rounded bg-gray-100 py-1 text-center text-sm text-gray-500">
        {formatToTurkishDate(portfolio.createdAt)}
      </span>
      <img
        src={portfolio.imageUrl}
        alt={portfolio.title}
        className="mt-3 h-[20vh] w-full rounded-md object-contain"
      />
      <div className="mt-2 flex items-center justify-between gap-4">
        <div>
          <span className="block text-lg font-semibold text-gray-800">
            {portfolio.owner?.fullName}
          </span>
          <span className="text-sm text-gray-600">{getLabel(portfolio.subcategory)}</span>
          <RatingStars rating={portfolio.owner?.rating} />
        </div>
        <span className="font-bold text-purple-900">{portfolio.price} TL</span>
      </div>
      <h3 className="mt-3 pl-1 text-sm font-semibold text-gray-600">{portfolio.title}</h3>
      <p className="truncate pl-1 text-sm text-gray-400">{portfolio.description}</p>
    </article>
  );
}
