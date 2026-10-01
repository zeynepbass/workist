import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ChatWidget from "@/features/messages/components/ChatWidget";
import { Button } from "@/shared/components/atoms";
import { BackButton, StatusMessage } from "@/shared/components/molecules";
import DeliveryList from "../components/DeliveryList";
import OrderActions from "../components/OrderActions";
import OrderSummary from "../components/OrderSummary";
import OrderTimeline from "../components/OrderTimeline";
import ReviewForm from "../components/ReviewForm";
import { useOrder } from "../hooks/useOrders";

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const { data: order, isLoading, isError } = useOrder(id);

  if (isLoading) return <StatusMessage type="loading" message="Sipariş yükleniyor..." />;
  if (isError || !order) return <StatusMessage type="error" message="Sipariş bulunamadı." />;

  const counterpart = order.viewerRole === "buyer" ? order.seller : order.buyer;
  const canReview = order.viewerRole === "buyer" && order.status === "completed" && !order.reviewed;

  return (
    <div className="space-y-6 p-6">
      <BackButton onClick={() => navigate(-1)} />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-gray-600">
          Sipariş <strong>Detayı</strong>
        </h1>
        <Button className="font-medium text-purple-600" onClick={() => setChatOpen(true)}>
          {order.viewerRole === "buyer" ? "Satıcıya" : "Alıcıya"} Mesaj Gönder
        </Button>
      </div>

      <OrderSummary order={order} />
      <OrderActions order={order} />
      <DeliveryList orderId={order.id} deliveries={order.deliveries} />
      {canReview && <ReviewForm orderId={order.id} />}
      {order.reviewed && (
        <StatusMessage type="info" message="Bu sipariş değerlendirildi. Teşekkürler!" />
      )}
      <OrderTimeline events={order.events} participants={[order.buyer, order.seller]} />

      {chatOpen && <ChatWidget partner={counterpart} onClose={() => setChatOpen(false)} />}
    </div>
  );
}
