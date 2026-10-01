import { ORDER_STATUS_LABELS, ORDER_STATUS_STYLES } from "../../constants";

export default function OrderStatusBadge({ status }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${ORDER_STATUS_STYLES[status]}`}
    >
      {ORDER_STATUS_LABELS[status]}
    </span>
  );
}
