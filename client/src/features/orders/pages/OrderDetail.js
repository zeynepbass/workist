import { useParams, useNavigate } from "react-router-dom";

import { Button } from "@/shared/components/atoms";
import { BackButton } from "@/shared/components/molecules";
import { sampleOrderDetail } from "@/shared/mocks/orderDetail";
import OrderHeader from "../components/OrderHeader";
import OrderSummary from "../components/OrderSummary";
import OrderReview from "../components/OrderReview";
import OrderProcess from "../components/OrderProcess";

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const order = { ...sampleOrderDetail, id };

  return (
    <div className="p-6">
      <BackButton onClick={() => navigate(-1)} />

      <h1 className="text-xl font-semibold pb-4 text-gray-600">
        Sipariş<strong> Özeti</strong>
      </h1>

      <div className="bg-white rounded-lg mb-6">
        <OrderHeader order={order} />
        <OrderSummary order={order} />
      </div>

      <h2 className="text-sm font-semibold mt-5 mb-2 text-gray-400">
        Alıcının<strong> Değerlendirmesi</strong>
      </h2>

      <OrderReview review={order.review} />

      <div className="flex justify-between items-center pt-6">
        <h2 className="text-lg font-semibold text-gray-400">
          Sipariş <strong>Süreci</strong>
        </h2>

        <Button className="text-sm text-purple-600 font-medium">Alıcıya Mesaj Gönder</Button>
      </div>

      <OrderProcess steps={order.timeline} />
    </div>
  );
}
