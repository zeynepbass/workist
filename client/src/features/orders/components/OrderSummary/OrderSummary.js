export default function OrderSummary ({
    order,
}) {
    if (!order) {
        return null;
    }

    return (
        <div className="bg-white border rounded-lg p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Sipariş Özeti
            </h2>

            <div className="space-y-3">

                <div className="flex justify-between">
                    <span className="text-gray-500">
                        Sipariş No
                    </span>

                    <span className="font-medium text-gray-800">
                        #{order.id}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-500">
                        Alıcı
                    </span>

                    <span className="font-medium text-gray-800">
                        {order.alici}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-500">
                        Sipariş Tarihi
                    </span>

                    <span className="font-medium text-gray-800">
                        {order.siparisTarihi}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-500">
                        Teslim Tarihi
                    </span>

                    <span className="font-medium text-gray-800">
                        {order.teslimTarihi}
                    </span>
                </div>

                <div className="border-t pt-3 flex justify-between">
                    <span className="font-semibold text-gray-700">
                        Toplam
                    </span>

                    <span className="font-bold text-purple-700">
                        {order.fiyat} TL
                    </span>
                </div>

            </div>
        </div>
    );
};
