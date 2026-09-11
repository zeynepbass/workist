import OrderCard from "./OrderCard";

export default function OrderList  ({
  orders,
  onDelete,
  onMessage,
  onDetails,
}) {
  if (orders.length === 0) {
    return (
      <p className="text-center p-4 text-gray-500 italic">
        Kriterlere uyan sipariş bulunamadı.
      </p>
    );
  }

  return (
    <>
      {orders.map((siparis) => (
        <OrderCard
          key={siparis.id}
          siparis={siparis}
          onDelete={onDelete}
          onMessage={onMessage}
          onDetails={onDetails}
        />
      ))}
    </>
  );
};

