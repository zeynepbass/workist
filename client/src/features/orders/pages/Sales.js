import OrderListPage from "../components/OrderListPage";

export default function Sales() {
  return (
    <OrderListPage
      viewerRole="seller"
      title="Satışlarım"
      description="Sattığın tüm hizmetler."
      emptyMessage="Henüz satışın yok."
    />
  );
}
