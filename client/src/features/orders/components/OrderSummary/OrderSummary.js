import { Link } from "react-router-dom";

import { formatDate } from "../../constants";
import OrderStatusBadge from "../OrderStatusBadge";

function Row({ label, children }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-gray-500">{label}</dt>
      <dd className="text-right font-medium text-gray-800">{children}</dd>
    </div>
  );
}

export default function OrderSummary({ order }) {
  return (
    <section className="rounded-lg border bg-white p-5 shadow-sm" aria-label="Sipariş özeti">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Sipariş Özeti</h2>
        <OrderStatusBadge status={order.status} />
      </div>
      <dl className="space-y-3">
        <Row label="İlan">
          <Link to={`/ilan/${order.adId}`} className="text-purple-700 hover:underline">
            {order.adTitle}
          </Link>
        </Row>
        <Row label="Alıcı">{order.buyer?.fullName}</Row>
        <Row label="Satıcı">{order.seller?.fullName}</Row>
        <Row label="Sipariş tarihi">{formatDate(order.createdAt)}</Row>
        <Row label="Teslim tarihi">{formatDate(order.dueAt)}</Row>
        <Row label="Revizyon">
          {order.revisionsUsed}/{order.revisionLimit}
        </Row>
        <Row label="Tutar">{order.offer ? `${order.offer.price} TL` : "Teklif bekleniyor"}</Row>
      </dl>
      <div className="mt-4 border-t pt-3">
        <h3 className="text-sm font-semibold text-gray-600">Alıcının ihtiyacı</h3>
        <p className="mt-1 whitespace-pre-line text-sm text-gray-700">{order.requirements}</p>
      </div>
    </section>
  );
}
