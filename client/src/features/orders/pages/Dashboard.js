import { Link } from "react-router-dom";

import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { Avatar } from "@/shared/components/atoms";
import { RatingStars } from "@/shared/components/molecules";
import OrderList from "../components/OrderList";
import { useOrderList } from "../hooks/useOrders";

function Section({ title, linkTo, linkLabel, children }) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-gray-600">{title}</h2>
        <Link to={linkTo} className="text-sm text-purple-600 hover:text-purple-800">
          {linkLabel}
        </Link>
      </div>
      {children}
    </section>
  );
}

export default function Dashboard() {
  const { user } = useCurrentUser();
  const requests = useOrderList({ role: "seller", status: "requested" });
  const purchases = useOrderList({ role: "buyer" });

  return (
    <div className="w-full space-y-8 px-4 md:px-12 lg:px-20">
      <div className="flex items-center gap-6">
        <Avatar user={user} size="lg" />
        <div>
          <h1 className="text-3xl text-gray-800">
            Merhaba <strong>{user?.firstName} 👋</strong>
          </h1>
          <p className="font-mono text-lg text-gray-700">Workist&apos;e tekrar hoş geldin!</p>
          <RatingStars rating={user?.rating} />
        </div>
      </div>

      <Section title="Sana gelen sipariş talepleri" linkTo="/istekler" linkLabel="Tümü">
        <OrderList
          query={{ ...requests, orders: requests.orders.slice(0, 3), hasNextPage: false }}
          emptyMessage="Teklif bekleyen talep yok."
        />
      </Section>

      <Section title="Son siparişlerin" linkTo="/siparisler" linkLabel="Tümü">
        <OrderList
          query={{ ...purchases, orders: purchases.orders.slice(0, 3), hasNextPage: false }}
          emptyMessage="Henüz sipariş vermedin."
        />
      </Section>
    </div>
  );
}
