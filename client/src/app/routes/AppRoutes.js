import { Suspense, lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Layout from "@/shared/layout";
import { StatusMessage } from "@/shared/components/molecules";
import ErrorBoundary from "../ErrorBoundary";
import PrivateRoute from "./PrivateRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";

const pages = {
  Login: lazy(() => import("@/features/auth/pages/Login")),
  Register: lazy(() => import("@/features/auth/pages/Register")),
  AccountDeactivated: lazy(() => import("@/features/auth/pages/AccountDeactivated")),
  MyProfile: lazy(() => import("@/features/auth/pages/MyProfile")),
  MyAccount: lazy(() => import("@/features/auth/pages/MyAccount")),
  BrowseAds: lazy(() => import("@/features/ads/pages/BrowseAds")),
  AdDetail: lazy(() => import("@/features/ads/pages/AdDetail")),
  MyAds: lazy(() => import("@/features/ads/pages/MyAds")),
  EditAd: lazy(() => import("@/features/ads/pages/EditAd")),
  Portfolio: lazy(() => import("@/features/portfolio/pages/Portfolio")),
  PortfolioDetail: lazy(() => import("@/features/portfolio/pages/PortfolioDetail")),
  Dashboard: lazy(() => import("@/features/orders/pages/Dashboard")),
  Orders: lazy(() => import("@/features/orders/pages/Orders")),
  Sales: lazy(() => import("@/features/orders/pages/Sales")),
  OrderDetail: lazy(() => import("@/features/orders/pages/OrderDetail")),
  BuyerRequests: lazy(() => import("@/features/orders/pages/BuyerRequests")),
  Chat: lazy(() => import("@/features/messages/pages/Chat")),
  Conversations: lazy(() => import("@/features/messages/pages/Conversations")),
};

const PRIVATE_ROUTES = [
  ["/workist", pages.Dashboard],
  ["/ilanlar", pages.BrowseAds],
  ["/ilan/:id", pages.AdDetail],
  ["/ilanlarim", pages.MyAds],
  ["/ilanlarim/:id", pages.EditAd],
  ["/portfolyom", pages.Portfolio],
  ["/portfolyom/:id", pages.PortfolioDetail],
  ["/siparisler", pages.Orders],
  ["/siparisler/:id", pages.OrderDetail],
  ["/satislar", pages.Sales],
  ["/istekler", pages.BuyerRequests],
  ["/sohbet", pages.Chat],
  ["/konusmalar", pages.Conversations],
  ["/profilim", pages.MyProfile],
  ["/hesabim", pages.MyAccount],
];

function Page({ component: Component }) {
  const location = useLocation();

  return (
    <ErrorBoundary key={location.pathname}>
      <Suspense fallback={<StatusMessage type="loading" message="Sayfa yükleniyor..." />}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  );
}

function NotFound() {
  return <img src="/assets/404.jpg" className="h-full w-full" alt="Sayfa bulunamadı" />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicOnlyRoute>
            <Page component={pages.Login} />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/kayit-ol"
        element={
          <PublicOnlyRoute>
            <Page component={pages.Register} />
          </PublicOnlyRoute>
        }
      />
      <Route path="/hesap-donduruldu" element={<Page component={pages.AccountDeactivated} />} />

      <Route
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        {PRIVATE_ROUTES.map(([path, component]) => (
          <Route key={path} path={path} element={<Page component={component} />} />
        ))}
        <Route path="/yapilacaklar" element={<Navigate to="/konusmalar" replace />} />
        <Route path="/ilanlar/:category" element={<Navigate to="/ilanlar" replace />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
