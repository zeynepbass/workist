import { Button } from "@/shared/components/atoms";
import { formatDateTime } from "../../constants";
import { useDownloadOrderFile } from "../../hooks/useOrders";

const formatSize = (bytes) => `${Math.max(1, Math.round(bytes / 1024))} KB`;

export default function DeliveryList({ orderId, deliveries }) {
  const download = useDownloadOrderFile(orderId);

  if (deliveries.length === 0) {
    return null;
  }

  return (
    <section className="rounded-lg border bg-white p-6" aria-label="Teslimatlar">
      <h2 className="mb-4 text-lg font-semibold">Teslimatlar</h2>
      <ul className="space-y-4">
        {deliveries.map((delivery) => (
          <li key={delivery.id} className="rounded border p-3">
            <p className="text-sm text-gray-400">{formatDateTime(delivery.deliveredAt)}</p>
            {delivery.note && <p className="mt-1 text-gray-700">{delivery.note}</p>}
            <ul className="mt-2 space-y-1">
              {delivery.files.map((file) => (
                <li key={file.id}>
                  <Button
                    className="text-purple-700 hover:underline"
                    onClick={() => download.mutate(file)}
                  >
                    📎 {file.name} ({formatSize(file.size)})
                  </Button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
