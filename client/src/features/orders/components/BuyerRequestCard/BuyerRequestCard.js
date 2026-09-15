
import { Button } from "@/shared/components/atoms";
import formatToTurkishDate from "@/shared/utils/formatToTurkishDate";

export default function BuyerRequestCard({
    item,
    expanded,
    onToggleText,
    onMessage,
}) {
    if (!item) {
        return (
            <p className="text-gray-400">
                Son veri bulunamadı.
            </p>
        );
    }

    return (
        <div className="bg-gray-50 rounded-lg shadow mt-3">


            <div className="flex items-center justify-between mb-2 bg-gray-800 p-4 rounded-md">

                <div className="flex">

                    {item?.file && (
                        <img
                            className="rounded-full w-20 h-20 mr-3 text-white"
                            src={item.file}
                            alt="Fotoğraf"
                        />
                    )}

                    <p>
                        <span className="text-sm font-semibold text-white">
                            {item?.kullaniciAd}
                        </span>

                        <br />

                        <span className="text-xs text-white">
                            {item?.selectedSubcategory}
                        </span>
                    </p>

                </div>

                <div className="flex justify-end space-x-2 mt-4 p-4">

                    <Button
                        className="border border-gray-300 px-3 py-1 rounded text-sm text-white hover:bg-gray-100"
                        onClick={() => onMessage(item)}
                    >
                        Mesaj At
                    </Button>

                </div>
            </div>


            <h3 className="font-semibold text-gray-900 mb-2 p-4">
                {item?.title}
            </h3>


            <p className="text-gray-700 text-sm mb-2 p-4">
                {expanded
                    ? item?.description
                    : `${item?.description?.slice(0, 400)}...`}
            </p>


            {item?.description?.length > 400 && (
                <p
                    className="text-purple-500 font-semibold text-sm cursor-pointer p-4"
                    onClick={() => onToggleText(item.id)}
                >
                    {expanded
                        ? "Gizle"
                        : "Devamını oku"}
                </p>
            )}

            <hr />


            <div className="flex justify-between items-center mt-4 text-sm text-gray-600 p-4">

                <span className="bg-gray-100 px-2 py-1 rounded text-gray-500">
                    {formatToTurkishDate(item?.createdAt)}
                </span>

                <div className="flex space-x-4">

                    <span>
                        Bütçe:{" "}
                        <strong>
                            {item?.fiyat}
                        </strong>
                    </span>

                    <span>
                        Süre:{" "}
                        <strong>
                            {item?.sure}
                        </strong>
                    </span>

                    <span>
                        Teklifler:{" "}
                        <strong>
                            10
                        </strong>
                    </span>

                </div>
            </div>

        </div>
    );
}
