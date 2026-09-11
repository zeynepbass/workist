import { FaThumbsUp } from "react-icons/fa";

const statusStyles = {
  tamamlandi:
    "bg-green-200 border-b-2 border-green-300 text-green-500",
  devam:
    "bg-yellow-100 border-b-2 border-yellow-300 text-yellow-500",
  iptal:
    "bg-red-200 border-b-2 border-red-300 text-red-500",
};

export default function OrderHeader  ({ order })  {
  return (
    <div
      className={`p-4 flex justify-between ${
        statusStyles[order.durum]
      }`}
    >
      <div>
        <p className="text-gray-800 text-[13px]">
          Sipariş Durumu
        </p>

        <p className="text-gray-800 flex items-center">
          <FaThumbsUp className="text-xl mr-2" />
          <strong>{order.durum} etmekte</strong>
        </p>
      </div>

      <div className="flex flex-col items-end text-gray-700">
        <p className="text-sm">Teslim Tarihi</p>

        <strong className="text-base">
          {new Date(order.teslimTarihi).toLocaleDateString(
            "tr-TR"
          )}
        </strong>
      </div>
    </div>
  );
};

