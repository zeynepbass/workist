import { Link } from "react-router-dom";

import { Avatar } from "@/shared/components/atoms";
import { formatDate } from "../../constants";
import OrderStatusBadge from "../OrderStatusBadge";

export default function OrderCard({ order }) {
  const counterpart = order.viewerRole === "buyer" ? order.seller : order.buyer;

  return (
    <article className="flex flex-wrap items-center justify-between gap-4 rounded bg-white p-4 shadow">
      <div className="flex items-center gap-3">
        <Avatar user={counterpart} size="sm" />
        <div>
          <p className="text-sm text-gray-400">
            {order.viewerRole === "buyer" ? "Satıcı" : "Alıcı"}
          </p>
          <p className="font-medium text-gray-700">{counterpart?.fullName}</p>
        </div>
      </div>
      <div className="min-w-[180px] flex-1">
        <Link
          to={`/siparisler/${order.id}`}
          className="font-semibold text-purple-900 hover:underline"
        >
          {order.adTitle}
        </Link>
        <p className="text-sm text-gray-400">{formatDate(order.createdAt)}</p>
      </div>
      <span className="font-semibold text-purple-950">
        {order.offer ? `${order.offer.price} TL` : "Teklif bekleniyor"}
      </span>
      <OrderStatusBadge status={order.status} />
    </article>
  );
}
