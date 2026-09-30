import { Link } from "react-router-dom";

import { ORDER_STATUS_LABELS, formatOrderDate } from "../../constants";

export default function SalesCard({ order }) {
  return (
    <div className="bg-white p-4 rounded shadow flex justify-between items-center space-x-4">
      <div className="text-gray-400 w-1/5">
        Alıcı:
        <br />
        {order.buyer}
      </div>

      <div className="text-gray-400 w-1/5">
        {formatOrderDate(order.orderedAt)}
        <br />
        {formatOrderDate(order.dueAt)}
      </div>

      <div className="text-purple-950 font-semibold w-1/5 text-center">
        ${order.price}
        <br />
        <br />
        <Link
          to={`/siparisler/${order.id}`}
          className="inline-block w-[150px] text-center border-2 border-purple-300 border-dashed p-2 rounded cursor-pointer"
        >
          {ORDER_STATUS_LABELS[order.status]}
        </Link>
      </div>
    </div>
  );
}
