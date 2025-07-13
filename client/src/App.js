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
import Sohbet from "./pages/layout/Sohbet"
import Todo from "./pages/layout/Yapılıcaklar"
import Login from "./pages/layout/Login"
import Register from "./pages/layout/Register"
import ProfileHome from "./pages/layout/Profilim"
import Hesabim from "./pages/layout/Hesabim"
import Section from "./pages/layout/Section"
import Genel from "./pages/layout/Genel"
import Hesap from "./pages/layout/Hesap"
import WorkContextProvider from '../src/Context/workContext'
import PrivateRoute from '../src/pages/layout/PrivateRoute';
const App = () => {

  return (
    <WorkContextProvider>

      <Routes>

 
          <Route path="/workist" element={ <PrivateRoute><Layouts><Section /> </Layouts> </PrivateRoute>}/>
          <Route path="/ilanlarim" element={ <PrivateRoute><Layouts><Ilanlarım /> </Layouts> </PrivateRoute>} />
          <Route path="/ilanlar/:kategori" element={ <PrivateRoute><Layouts><Genel /> </Layouts> </PrivateRoute>} />
          <Route path="/ilanlar" element={ <PrivateRoute><Layouts><Genel /> </Layouts> </PrivateRoute>} />
          <Route path="/portfolyom" element={ <PrivateRoute><Layouts><Portfolyo /> </Layouts> </PrivateRoute>} />
          <Route path="/portfolyom/:id" element={ <PrivateRoute><Layouts><PortfolyoDetay /> </Layouts> </PrivateRoute>} />
          <Route path="/ilanlarim/:id" element={ <PrivateRoute><Layouts><IlanlarimDetay /> </Layouts> </PrivateRoute>} />
          <Route path="/satislarim" element={ <PrivateRoute><Layouts><Satislarim /> </Layouts> </PrivateRoute>} />
          <Route path="/istekler" element={ <PrivateRoute><Layouts><Istekler /> </Layouts> </PrivateRoute>} />
          <Route path="/siparislerim" element={ <PrivateRoute><Layouts><Siparislerim /> </Layouts> </PrivateRoute>} />
          <Route path="/satislarim/:id" element={ <PrivateRoute><Layouts><SiparislerimDetay /> </Layouts> </PrivateRoute>} />
          <Route path="/yapilacaklar" element={ <PrivateRoute><Layouts><Todo /> </Layouts> </PrivateRoute>} />
          <Route path="/sohbet" element={ <PrivateRoute><Layouts><Sohbet /> </Layouts> </PrivateRoute>} />
          <Route path="/hesap-donduruldu" element={<Hesap />} />

          <Route path="/profilim" element={ <PrivateRoute><Layouts><ProfileHome /> </Layouts> </PrivateRoute>} />
          <Route path="/hesabim" element={ <PrivateRoute><Layouts><Hesabim /> </Layouts> </PrivateRoute>} />
          <Route path="*" element={<img src="https://serdivan.bel.tr/fa831c5256308e91e776e9e483effa49/24/vecteezy_404-landing-page_6549647.png" width="100%" height="100%" />} />
     
        <Route path="/" element={<Login />} />
        <Route path="/kayit-ol" element={<Register />} />


      </Routes>


    </WorkContextProvider>

  )
}

export default App
