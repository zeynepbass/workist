import React from "react";
import { Route, Routes } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import Layouts from "../../shared/layout";


import Section from "../../features/orders/pages/Section";
import Genel from "../../features/portfolio/pages/Genel";
import Ilanlarim from "../../shared/layout/Ilanlarim";
import IlanlarimDetay from "../../shared/layout/Ilanlarim/Detay";
import Portfolyo from "../../shared/layout/Portfolyo";
import PortfolyoDetay from "../../shared/layout/Portfolyo/Detay";

import Satislarim from "../../features/orders/pages/Satislarim";
import Siparislerim from "../../features/orders/pages/Siparislerim";
import SiparislerimDetay from "../../features/orders/pages/Siparislerim/Detay";
import Istekler from "../../features/orders/pages/Istekler";

import Sohbet from "../../shared/layout/Sohbet";
import Todo from "../../features/auth/pages/Yapılıcaklar";

import ProfileHome from "../../shared/layout/Profilim";
import Hesabim from "../../shared/layout/Hesabim";
import Hesap from "../../shared/layout/Hesap";

import Login from "../../shared/layout/Login";
import Register from "../../shared/layout/Register";

const AppRoutes = () => {
  return (
    <Routes>



      <Route path="/" element={<Login />} />

      <Route path="/kayit-ol" element={<Register />} />

      <Route path="/hesap-donduruldu" element={<Hesap />} />




      <Route
        element={
          <PrivateRoute>
            <Layouts />
          </PrivateRoute>
        }
      >

        <Route path="/workist" element={<Section />} />

        <Route path="/ilanlar" element={<Genel />} />

        <Route
          path="/ilanlar/:kategori"
          element={<Genel />}
        />

        <Route
          path="/ilanlarim"
          element={<Ilanlarim />}
        />

        <Route
          path="/ilanlarim/:id"
          element={<IlanlarimDetay />}
        />

        <Route
          path="/portfolyom"
          element={<Portfolyo />}
        />

        <Route
          path="/portfolyom/:id"
          element={<PortfolyoDetay />}
        />

        <Route
          path="/satislarim"
          element={<Satislarim />}
        />

        <Route
          path="/satislarim/:id"
          element={<SiparislerimDetay />}
        />

        <Route
          path="/siparislerim"
          element={<Siparislerim />}
        />

        <Route
          path="/istekler"
          element={<Istekler />}
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
          element={<Hesabim />}
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