import OrderListPage from "../components/OrderListPage";

export default function Orders() {
  return (
    <OrderListPage
      viewerRole="buyer"
      title="Siparişlerim"
      description="Satın aldığın hizmetlerin durumunu buradan takip edebilirsin."
      emptyMessage="Henüz sipariş vermedin."
    />
  );
}
