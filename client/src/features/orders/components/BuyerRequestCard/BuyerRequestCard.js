import { Button } from "@/shared/components/atoms";
import { useCategories } from "@/features/categories/hooks/useCategories";
import formatToTurkishDate from "@/shared/utils/formatToTurkishDate";

const PREVIEW_LENGTH = 400;

export default function BuyerRequestCard({ request, expanded, onToggleText, onMessage }) {
  const { getLabel } = useCategories();

  if (!request) {
    return <p className="text-gray-400">Son veri bulunamadı.</p>;
  }

  const isLong = request.description?.length > PREVIEW_LENGTH;
  const description =
    expanded || !isLong
      ? request.description
      : `${request.description.slice(0, PREVIEW_LENGTH)}...`;

  return (
    <div className="bg-gray-50 rounded-lg shadow mt-3">
      <div className="flex items-center justify-between mb-2 bg-gray-800 p-4 rounded-md">
        <div className="flex">
          {request.image && (
            <img
              className="rounded-full w-20 h-20 mr-3 text-white"
              src={request.image}
              alt={request.title}
            />
          )}

          <p>
            <span className="text-sm font-semibold text-white">{request.ownerName}</span>
            <br />
            <span className="text-xs text-white">{getLabel(request.subcategory)}</span>
          </p>
        </div>

        <div className="flex justify-end space-x-2 mt-4 p-4">
          <Button
            className="border border-gray-300 px-3 py-1 rounded text-sm text-white hover:bg-gray-100"
            onClick={() => onMessage(request)}
          >
            Mesaj At
          </Button>
        </div>
      </div>

      <h3 className="font-semibold text-gray-900 mb-2 p-4">{request.title}</h3>

      <p className="text-gray-700 text-sm mb-2 p-4">{description}</p>

      {isLong && (
        <Button
          className="text-purple-950 font-semibold text-sm cursor-pointer p-4"
          onClick={() => onToggleText(request.id)}
        >
          {expanded ? "Gizle" : "Devamını oku"}
        </Button>
      )}

      <hr />

      <div className="flex justify-between items-center mt-4 text-sm text-gray-600 p-4">
        <span className="bg-gray-100 px-2 py-1 rounded text-gray-500">
          {formatToTurkishDate(request.createdAt)}
        </span>

        <div className="flex space-x-4">
          <span>
            Bütçe: <strong>{request.price}</strong>
          </span>

          <span>
            Süre: <strong>{request.deliveryTime}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
