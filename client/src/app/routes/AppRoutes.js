import React from "react";
import { Route, Routes } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import Layouts from "../../shared/layout";


import Section from "../../features/orders/pages/Section";
import General from "../../features/portfolio/pages/General";
import Ads from "../../features/ads/pages/AdsPage";
import AdsDetail from "../../features/ads/pages/AdsDetail";
import Portfolyo from "../../features/portfolio/pages/Portfolio";
import PortfolyoDetail from "../../features/portfolio/pages/PortfolioDetail";

import Sales from "../../features/orders/pages/Sales";
import Orders from "../../features/orders/pages/Orders";
import SalesDetail from "../../features/orders/pages/OrdersDetail";
import Request from "../../features/orders/pages/Request";

import Sohbet from "../../features/messages/pages/Chat";
import Todo from "../../features/auth/pages/Todos";

import ProfileHome from "../../features/auth/pages/MyProfile";
import MyAccount from "../../features/auth/pages/myAccount";
import Account from "../../features/auth/pages/Account";

import Login from "../../features/auth/pages/Login";
import Register from "../../features/auth/pages/Register";

const AppRoutes = () => {
  return (
    <Routes>



      <Route path="/" element={<Login />} />

      <Route path="/kayit-ol" element={<Register />} />

      <Route path="/hesap-donduruldu" element={<Account />} />




      <Route
        element={
          <PrivateRoute>
            <Layouts />
          </PrivateRoute>
        }
      >

        <Route path="/workist" element={<Section />} />

        <Route path="/ilanlar" element={<General />} />

        <Route
          path="/ilanlar/:kategori"
          element={<General />}
        />

        <Route
          path="/ilanlarim"
          element={<Ads />}
        />

        <Route
          path="/ilanlarim/:id"
          element={<AdsDetail />}
        />

        <Route
          path="/portfolyom"
          element={<Portfolyo />}
        />

        <Route
          path="/portfolyom/:id"
          element={<PortfolyoDetail />}
        />

        <Route
          path="/satislar"
          element={<Sales />}
        />

        <Route
          path="/siparisler/:id"
          element={<SalesDetail />}
        />

        <Route
          path="/siparisler"
          element={<Orders />}
        />

        <Route
          path="/istekler"
          element={<Request />}
        />

        <Route
          path="/yapilacaklar"
          element={<Todo />}
        />

        <Route
          path="/sohbet"
          element={<Sohbet />}
        />

        <Route
          path="/profilim"
          element={<ProfileHome />}
        />

        <Route
          path="/hesabim"
          element={<MyAccount />}
        />

      </Route>




      <Route
        path="*"
        element={
          <img
            src="https://serdivan.bel.tr/fa831c5256308e91e776e9e483effa49/24/vecteezy_404-landing-page_6549647.png"
            width="100%"
            height="100%"
            alt="404"
          />
        }
      />

    </Routes>
  );
};

export default AppRoutes;