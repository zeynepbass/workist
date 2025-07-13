import React from 'react'
import Header from "./Header"
import Footer from "./Footer"
import Sidebar from "./Sidebar"
const Index = ({ children }) => {

  return (

    <>
      <div  className=''>

        <div className='grid grid-cols-5 '>

          <div className='col-span-5'>  <div className='container mx-auto'><Header />      </div></div>

          <div className="col-span-1"><Sidebar /></div>
          <div className="bg-gray-100 col-span-4 p-10" style={{ height: "auto" }}>{children}</div>


        </div>

      </div>
      <div className='col-span-5'><Footer /></div>

    </>

  )
}

export default Index
