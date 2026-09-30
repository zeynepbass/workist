import { Navigate, Route, Routes } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import Layout from "@/shared/layout";

import AdsPage from "@/features/ads/pages/AdsPage";
import AdsDetail from "@/features/ads/pages/AdsDetail";
import BrowseAds from "@/features/ads/pages/BrowseAds";

import Portfolio from "@/features/portfolio/pages/Portfolio";
import PortfolioDetail from "@/features/portfolio/pages/PortfolioDetail";

import Dashboard from "@/features/orders/pages/Dashboard";
import Sales from "@/features/orders/pages/Sales";
import Orders from "@/features/orders/pages/Orders";
import OrderDetail from "@/features/orders/pages/OrderDetail";
import BuyerRequests from "@/features/orders/pages/BuyerRequests";

import Chat from "@/features/messages/pages/Chat";
import Conversations from "@/features/messages/pages/Conversations";

import MyProfile from "@/features/auth/pages/MyProfile";
import MyAccount from "@/features/auth/pages/MyAccount";
import AccountDeactivated from "@/features/auth/pages/AccountDeactivated";
import Login from "@/features/auth/pages/Login";
import Register from "@/features/auth/pages/Register";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/kayit-ol" element={<Register />} />
      <Route path="/hesap-donduruldu" element={<AccountDeactivated />} />

      <Route
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route path="/workist" element={<Dashboard />} />
        <Route path="/ilanlar" element={<BrowseAds />} />
        <Route path="/ilanlar/:category" element={<BrowseAds />} />
        <Route path="/ilanlarim" element={<AdsPage />} />
        <Route path="/ilanlarim/:id" element={<AdsDetail />} />
        <Route path="/portfolyom" element={<Portfolio />} />
        <Route path="/portfolyom/:id" element={<PortfolioDetail />} />
        <Route path="/satislar" element={<Sales />} />
        <Route path="/siparisler" element={<Orders />} />
        <Route path="/siparisler/:id" element={<OrderDetail />} />
        <Route path="/istekler" element={<BuyerRequests />} />
        <Route path="/konusmalar" element={<Conversations />} />
        <Route path="/yapilacaklar" element={<Navigate to="/konusmalar" replace />} />
        <Route path="/sohbet" element={<Chat />} />
        <Route path="/profilim" element={<MyProfile />} />
        <Route path="/hesabim" element={<MyAccount />} />
      </Route>

      <Route
        path="*"
        element={<img src="/assets/404.jpg" width="100%" height="100%" alt="Sayfa bulunamadı" />}
      />
    </Routes>
  );
}
