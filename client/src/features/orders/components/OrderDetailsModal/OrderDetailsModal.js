import { Button } from "@/shared/components/atoms";

export default function OrderDetailsModal({
  order,
  onClose,
})  {
  if (!order) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl text-center italic mb-4 text-purple-500">
          Sipariş Detayları
        </h2>

        <p>
          <strong className="text-gray-400">
            Alıcı:
          </strong>{" "}
          {order.alici}
        </p>

        <p>
          <strong className="text-gray-400">
            Sipariş Tarihi:
          </strong>{" "}
          {new Date(order.siparisTarihi).toLocaleDateString(
            "tr-TR"
          )}
        </p>

        <p>
          <strong className="text-gray-400">
            Fiyat:
          </strong>{" "}
          ${order.fiyat}
        </p>

        <p className="mt-3 text-gray-500 text-center">
          {order.aciklama}
        </p>

        <Button
          onClick={onClose}
          className="hover:text-purple-600 mt-4"
        >
          Kapat
        </Button>
      </div>
    </div>
  );
};

