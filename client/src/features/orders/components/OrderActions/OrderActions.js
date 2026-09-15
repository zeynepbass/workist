import { FaTrash, FaEnvelope, FaInfoCircle } from "react-icons/fa";
import { Button } from "@/shared/components/atoms";

export default function OrderActions  ({
  onDelete,
  onMessage,
  onDetails,
}) {
  return (
    <div className="flex space-x-4 text-gray-500 w-1/5 justify-end">
      <Button
        onClick={onDelete}
        className="hover:text-purple-600"
        title="Sil"
      >
        <FaTrash size={20} />
      </Button>

      <Button
        onClick={onMessage}
        className="hover:text-purple-600"
        title="Mesaj Gönder"
      >
        <FaEnvelope size={20} />
      </Button>

      <Button
        onClick={onDetails}
        className="hover:text-purple-600"
        title="Detaylar"
      >
        <FaInfoCircle size={20} />
      </Button>
    </div>
  );
};

