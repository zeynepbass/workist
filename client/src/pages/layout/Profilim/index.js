import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Modal from "../../../components/PortfolyoModal"

import { PortfolioContext } from "../../../Context/workContext"
const Index = () => {
    const { email, detailsPost, hesabiDondur } = useContext(PortfolioContext)
    const Navigate = useNavigate()
    const Delete = () => {
        hesabiDondur()
        Navigate("/hesap-donduruldu")
    }
    useEffect(() => { detailsPost() }, [])
    return (
        <div className="flex flex-col md:flex-row gap-6 px-20 h-[90vh] ">


            <div className="w-full md:w-1/3 space-y-4">
                <div className="bg-white p-4 rounded-[10px] shadow ">
                    <div className="flex justify-between items-center">
                        <img src={email.file} width="100" height="100" className="rounded-full shadow-lg shadow-indigo-500/50 " />


                        <div className="text-center
            ">

                            <Link to="/hesabim">
                                <span className="text-purple-600 text-right">Düzenle</span>
                            </Link>
                        </div>

                    </div><br />
                    <p>{email.firstName} {email.lastName}</p>
                    <p className='text-gray-400 italic'>{email.unvan}</p><br />
                    <p className="mt-2 flex text-orange-300"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="star-rating" data-inject-url="https://gcdn.bionluk.com/site/cicons/ic-star.svg" data-v-00099300="">
                        <path fill="currentColor" fill-rule="evenodd" d="M11.818.4l-3.57 7.85-7.825.713a.2.2 0 0 0-.124.34l5.927 5.977-1.638 8.273a.2.2 0 0 0 .3.21l7.086-4.32 7.082 4.322a.2.2 0 0 0 .3-.209l-1.59-8.281L23.7 9.303a.2.2 0 0 0-.123-.34l-7.829-.713L12.182.4a.2.2 0 0 0-.364 0z"></path>
                    </svg> &nbsp;5.0 (1)</p><br />
                    <hr /><br />
                
                </div>

                <div className="bg-white p-4 rounded-[10px] shadow">
                    <div className="flex justify-between items-center">
                        <h6 className="text-left text-gray-600">Hakkında</h6>
                        <Link to="/hesabim">
                            <span className="text-purple-600">Düzenle</span></Link>
                    </div>
                    <p className="text-sm mt-2 text-gray-400">
                        {email.hakkimda}
                    </p>
                </div>

                <div className="bg-white p-4 rounded-[10px] shadow">
                    <div className="flex justify-between items-center">
                        <h6 className="text-center text-gray-600">Uzmanı Olduğu Alanlar & Araçlar</h6><br />
                        <Link to="/hesabim">
                            <span className="text-purple-600">Düzenle</span></Link>
                    </div>

                    <hr />


                    <div className="bg-white p-1 rounded-[10px] relative ">

                        <ul className="pl-2 list-none flex flex-wrap">
                            {email?.uzmanlik?.map((yetenek, index) => (
                                <li key={index} className="p-2 border border-gray-300 rounded m-1">{yetenek}</li>
                            ))}

                        </ul>


                    </div>




                </div>

                <div className="bg-white p-4 rounded-[10px] shadow h-20 px-3">
                    <span className="text-left text-gray-600 mb-2 ">Hesap <strong>Yönetimi</strong></span>   <span className=" float-right mt-2">          <button className="bg-purple-800 text-white px-3 py-2 rounded float-right " onClick={Delete}>Hesabını Dondur</button></span><br />

                </div>
            </div>


            <div className="w-full md:w-2/3 space-y-4">
                <div className="bg-white p-4 rounded-[10px] shadow">
                    <h6 className="text-left text-gray-600 mb-2">Portfolyo</h6>
                    <div className="bg-[#F6F8FB] p-4 rounded">
                        <div className="flex justify-between items-center">

                            <div className="flex items-center space-x-3">
                                <img src="./images/network.png" width="50" height="50" alt="Presentation" />
                                <h6 className="font-bold text-gray-700 pt-2">Gösterilecek bir portfolyon yok 😞
                                    <p className="text-sm mt-1 text-gray-500">
                                        Neler yapabildiğini alıcılara göstermek için etkileyici bir portfolyo oluştur.
                                    </p></h6>
                            </div>


                            <Modal />
                        </div>



                    </div>

                </div>

                <div className="bg-white p-4 rounded-[10px] shadow">
                    <div className="flex justify-between items-center">
                        <p className="text-gray-600">Verdiğin Hizmetler</p>
                        <div className="flex gap-2 items-center">
                            <Link to="/ilanlarim"><p className="text-purple-600">İlanlarını yönet</p></Link>

                        </div>
                    </div>
                    <div className="mt-4 justify-center flex">
                        <button className="bg-purple-800 text-white px-4 py-2 rounded " onClick={() => Navigate("/ilanlarim")}>
                            İlanlarıma Git
                        </button>
                    </div>
                </div>
                <div className="bg-white  shadow">
                    <div className="flex justify-between items-center">
                        <p className="text-gray-600 p-4">Tüm Değerlendirmeler</p>

                    </div>
                    <div className="mt-4  bg-gray-100  pt-3">
                        <ul className="pl-2 list-none text-gray-300 flex justify-between text-center">
                            <li className="flex flex-col items-center p-2 text-gray-500 border-r-2 border-gray-300 w-1/3">
                                <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M3 3h18v4H3z" />
                                    <path d="M3 7l3 13h12l3-13" />
                                </svg>
                                <h4 className="text-sm">Hizmet Kalitesi</h4>

                            </li>

                            <li className="flex flex-col items-center p-2 text-gray-500 border-r-2 border-gray-300 w-1/3">
                                <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm">Zamanlama</span>
                            </li>

                            <li className="flex flex-col items-center p-2 text-gray-500 w-1/3">
                                <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
                                </svg>
                                <span className="text-sm">İletişim Becerisi</span>
                            </li>
                            <li className="flex flex-col items-center p-2 text-gray-500 w-1/3 border-l-2 border-gray-300">
                                <h6 className='text-black'>1 değerlendime</h6>
                                <span className="text-orange-300 text-4xl font-bold">
                                    <h1>5.00</h1>
                                </span>

                                <span className=" text-gray-400 text-xs">5 üzerinden</span>
                            </li>
                        </ul>

                        <div className="flex justify-between items-center bg-white p-5">
                            <img src="" width="150" height="150" className="rounded-full shadow-lg shadow-indigo-500/50 " />


                            <div className='pl-4'>

                                <Link to="/hesabim">
                                    <span className="text-black text-left">
                                        <strong>memochiz</strong> </span><br />
                                    <br />
                                    <span className='text-gray-400'>
                                        İlk calismamizdi,daha isi almadan tasarimlarini gosterip fikrimizi aldi,sonuc harikaydi,cok tesekkurler elinize emeginize saglik.
                                    </span>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Index
