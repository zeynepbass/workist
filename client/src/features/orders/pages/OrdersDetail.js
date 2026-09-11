import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/atoms";
import { orderDetail } from "@shared/mocks/orderDetail";

import {BackButton} from "@/shared/components/molecules";
import OrderHeader from "./components/OrderHeader";
import OrderSummary from "./components/OrderSummary";
import OrderFiles from "./components/OrderFiles";
import OrderReview from "./components/OrderReview";
import OrderProcess from "./components/OrderProcess";

export default function OrdersDetails  ()  {
    const { id } = useParams();
    const navigate = useNavigate();

    const siparis = {
        ...orderDetail,
        id,
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="p-6">
            <BackButton onClick={handleBack} />

            <h3 className="text-xl font-semibold pb-4 text-gray-600">
                Sipariş<strong> Özeti</strong>
            </h3>

            <div className="bg-white rounded-lg mb-6">
                <OrderHeader order={siparis} />

                <OrderSummary order={siparis} />
            </div>

            <h2 className="text-sm font-semibold mt-5 mb-2 text-gray-400">
                Siparişe Ait<strong> Dosyalar</strong>
            </h2>

            <OrderFiles />

            <h2 className="text-sm font-semibold mt-5 mb-2 text-gray-400">
                Alıcının<strong> Değerlendirmesi</strong>
            </h2>

            <OrderReview review={siparis.degerlendirme} />

            <div className="flex justify-between items-center pt-6">
                <h2 className="text-lg font-semibold text-gray-400">
                    Sipariş <strong>Süreci</strong>
                </h2>

                <Button className="text-sm text-purple-600 font-medium">
                    Alıcıya Mesaj Gönder
                </Button>
            </div>

            <OrderProcess steps={siparis.process} />
        </div>
    );
};

 ;