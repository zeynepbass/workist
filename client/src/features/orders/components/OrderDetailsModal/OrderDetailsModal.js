import { Button } from "@/shared/components/atoms";
import { formatOrderDate } from "../../constants";

export default function OrderDetailsModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <button
        type="button"
        aria-label="Kapat"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        className="relative bg-white rounded-lg p-6 max-w-md w-full shadow-lg"
      >
        <h2 className="text-xl text-center italic mb-4 text-purple-950">Sipariş Detayları</h2>

        <p>
          <strong className="text-gray-400">Alıcı:</strong> {order.buyer}
        </p>

        <p>
          <strong className="text-gray-400">Sipariş Tarihi:</strong>{" "}
          {formatOrderDate(order.orderedAt)}
        </p>

        <p>
          <strong className="text-gray-400">Fiyat:</strong> ${order.price}
        </p>

        <p className="mt-3 text-gray-500 text-center">{order.note}</p>

        <Button onClick={onClose} className="hover:text-purple-600 mt-4">
          Kapat
        </Button>
      </div>
    </div>
  );
}
