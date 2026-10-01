import OrderListPage from "../components/OrderListPage";

export default function BuyerRequests() {
  return (
    <OrderListPage
      viewerRole="seller"
      fixedStatus="requested"
      title="Alıcı İstekleri"
      description="İlanlarına gelen ve teklif bekleyen sipariş talepleri."
      emptyMessage="Şu an teklif bekleyen bir talep yok."
    />
  );
}
