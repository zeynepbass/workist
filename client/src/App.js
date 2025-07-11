import React from 'react'
import Layouts from "./pages/layout"
import { Route, Routes } from 'react-router-dom'
import Ilanlarım from "./pages/layout/Ilanlarim"
import Portfolyo from "./pages/layout/Portfolyo"
import Satislarim from "./pages/layout/Satislarim"
import Siparislerim from "./pages/layout/Siparislerim"
import PortfolyoDetay from "./pages/layout/Portfolyo/Detay"
import SiparislerimDetay from "./pages/layout/Siparislerim/Detay"
import IlanlarimDetay from "./pages/layout/Ilanlarim/Detay"
import Istekler from "./pages/layout/Istekler"
import Todo from "./pages/layout/Yapılıcaklar"
import Login from "./pages/layout/Login"
import Register from "./pages/layout/Register"
import ProfileHome from "./pages/layout/Profilim"
import Hesabim from "./pages/layout/Hesabim"
import Section from "./pages/layout/Section"
import Genel from "./pages/layout/Genel"
import Hesap from "./pages/layout/Hesap"
import WorkContextProvider from '../src/Context/workContext'
const App = () => {
  return (
    <WorkContextProvider>
 <Routes>
 <Route path="/" element={<Login/>} />
 <Route path="/kayit-ol" element={<Register/>} />
  <Route path="/workist" element={<Layouts><Section /></Layouts>} />
  <Route path="/ilanlarim" element={<Layouts><Ilanlarım /></Layouts>} />
  <Route path="/ilanlar/:kategori" element={<Layouts><Genel/></Layouts>} />
  <Route path="/ilanlar" element={<Layouts><Genel/></Layouts>} />
  <Route path="/portfolyom" element={<Layouts><Portfolyo /></Layouts>} />
  <Route path="/portfolyom/:id" element={<Layouts><PortfolyoDetay /></Layouts>} />
  <Route path="/ilanlarim/:id" element={<Layouts><IlanlarimDetay /></Layouts>} />
  <Route path="/satislarim" element={<Layouts><Satislarim /></Layouts>} />
  <Route path="/istekler" element={<Layouts><Istekler /></Layouts>} />
  <Route path="/siparislerim" element={<Layouts><Siparislerim /></Layouts>} />
  <Route path="/satislarim/:id" element={<Layouts><SiparislerimDetay /></Layouts>} />
  <Route path="/yapilacaklar" element={<Layouts><Todo /></Layouts>} />
  <Route path="/hesap-donduruldu" element={<Hesap />} />

  <Route path="/profilim" element={<Layouts><ProfileHome /></Layouts>} />
  <Route path="/hesabim" element={<Layouts><Hesabim /></Layouts>} />
  <Route path="*" element={<img src="https://serdivan.bel.tr/fa831c5256308e91e776e9e483effa49/24/vecteezy_404-landing-page_6549647.png" width="100%" height="100%"/>} />

</Routes>

    </WorkContextProvider>

  )
}

export default App
