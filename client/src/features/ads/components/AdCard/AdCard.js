import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import { useCategories } from "@/features/categories/hooks/useCategories";
import { Button } from "@/shared/components/atoms";
import { RatingStars } from "@/shared/components/molecules";

const ACTION_CLASS =
  "flex h-7 w-7 items-center justify-center rounded text-gray-200 hover:bg-gray-700 hover:text-white";

export default function AdCard({ ad, onEdit, onDelete, isDeleting }) {
  const { getLabel } = useCategories();

  return (
    <article className="relative flex w-full flex-col rounded-lg border bg-white p-4 shadow-md sm:w-[48%] md:w-[31%] lg:w-[23%]">
      {onEdit && onDelete && (
        <div className="absolute right-2 top-2 z-10 flex space-x-1 rounded-md bg-gray-800/90 p-1">
          <Button
            ariaLabel={`${ad.title} ilanını düzenle`}
            onClick={() => onEdit(ad.id)}
            className={ACTION_CLASS}
            icon={<FontAwesomeIcon icon={faPen} size="sm" />}
          />
          <Button
            ariaLabel={`${ad.title} ilanını sil`}
            disabled={isDeleting}
            onClick={() => onDelete(ad.id)}
            className={`${ACTION_CLASS} hover:bg-red-600`}
            icon={<FontAwesomeIcon icon={faTrash} size="sm" />}
          />
        </div>
      )}

      <div className="mt-6 h-[160px] w-full overflow-hidden">
        <img src={ad.imageUrl} className="h-full w-full rounded-md object-cover" alt={ad.title} />
      </div>

      <div className="mt-3 flex items-center justify-between gap-4">
        <div>
          <span className="block text-base font-semibold text-gray-800">{ad.owner?.fullName}</span>
          <span className="text-sm text-gray-600">{getLabel(ad.subcategory)}</span>
        </div>
        <span className="whitespace-nowrap font-bold text-purple-900">{ad.price} TL</span>
      </div>

      <h3 className="mt-3 truncate text-sm font-semibold text-gray-700" title={ad.title}>
        <Link to={`/ilan/${ad.id}`} className="hover:text-purple-700">
          {ad.title}
        </Link>
      </h3>
      <RatingStars rating={ad.rating} />
      <p className="mt-2 line-clamp-3 text-sm text-gray-500">{ad.description}</p>
    </article>
  );
}
