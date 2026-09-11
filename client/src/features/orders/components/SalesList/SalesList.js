import SalesCard from "./SalesCard";

export default function SalesList  ({ orders })  {
    if (orders.length === 0) {
        return (
            <p className="text-center p-4 text-gray-500 italic">
                Kriterlere uyan sipariş bulunamadı.
            </p>
        );
    }

    return (
        <div className="space-y-4">
            {orders.map((order) => (
                <SalesCard
                    key={order.id}
                    order={order}
                />
            ))}
        </div>
    );
};

