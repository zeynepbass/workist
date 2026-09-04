import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaArrowLeft, FaThumbsUp, FaClock } from "react-icons/fa";

const SiparisDetay = () => {
    const { id } = useParams();

    const siparis = {
        id,
        alici: "Ali Veli",
        siparisTarihi: "2023-08-01",
        teslimTarihi: "2023-08-10",
        durum: "devam",
        ilan: "Web Tasarım Paketi",
        paket: {
            adet: 1,
            sure: "5 gün",
            tutar: 500,
        },
        degerlendirme: {
            kullaniciAdi: "ali_veli",
            aciklama: "Hızlı ve kaliteli hizmet, teşekkürler!",
        },
    };

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };
    const durumRenkleri = {
        tamamlandi: "bg-green-200 text-white border-b-2 border-green-300 text-green-500",
        devam: "bg-yellow-100 text-white border-b-2 border-yellow-300 text-yellow-500 ",
        iptal: "bg-red-200 text-white border-b-2 border-red-300 text-red-500",
    };

    return (
        <div className="p-6">
            <button
                onClick={handleBack}

                className="flex items-center text-purple-600 hover:text-purple-800 py-5 "
            >
                <FaArrowLeft className="mr-2 " />
                Geri Dön
            </button>

            <h3 className="text-xl font-semibold pb-4 text-gray-600">Sipariş<strong> Özeti</strong> </h3>
            <div className="bg-white rounded-lg mb-6">

                <div className={`p-4 flex justify-between ${durumRenkleri[siparis.durum]}`}>
                    <span>           <p className="text-gray-800 text-[13px]">Sipariş Durumu</p>
                        <p className="text-gray-800 flex">      <FaThumbsUp className={`text-xl  ${durumRenkleri[siparis.durum]} border-none`} /><strong>&nbsp;{siparis.durum} etmekte</strong></p></span>

                    <span className="flex flex-col items-end text-gray-700">
                        <p className="text-sm">Teslim Tarihi</p>
                        <strong className="text-base">
                            {new Date(siparis.teslimTarihi).toLocaleDateString("tr-TR")}
                        </strong>
                    </span>



                </div>



                <div className="bg-white shadow rounded-lg  ">
                    <div className="flex flex-col md:flex-row md:items-start gap-4 ">
                        <img src="https://via.placeholder.com/150x100" alt="Logo" className="rounded-md w-full md:w-48 object-cover" />
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold">Ben, logo tasarımı yaparım</h3>
                            <div className="mt-2 flex items-center gap-4 text-sm text-gray-600 ">
                                <div className="flex items-center gap-1">
                                    <img src="https://via.placeholder.com/32" className="w-6 h-6 rounded-full" />
                                    <span className="font-medium">memochi</span>
                                </div>
                                <div>📅 24 Ocak 2022 <br /> 18:31</div>
                            </div>
                        </div>
                    </div>


                    <div className="mt-4 ">
                        <div className="grid grid-cols-5 p-4 text-sm font-medium border-t-1 text-gray-400 bg-gray-100 uppercase">
                            <div className="col-span-2">Detaylar</div>
                            <div>Paket</div>
                            <div>Süre</div>
                            <div>Tutar</div>
                        </div>
                        <div className="grid grid-cols-5 text-sm font-medium   text-gray-400  uppercase p-4">
                            <div className="col-span-2 flex text-purple-600 underline cursor-pointer"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" className="custom_offer" data-inject-url="https://gcdn.bionluk.com/site/cicons/ic-special-offer.svg" data-v-3acd7412="">
                                <path fill="#9333EA" fill-rule="nonzero" d="M23 .5v24H1V.5h22zm-2 2H3v20h18v-20zm-9 2.986l2.209 4.475 4.939.718-3.574 3.484.844 4.92L12 16.761l-4.418 2.322.844-4.92-3.574-3.484 4.939-.718L12 5.486zm0 4.519l-.881 1.784-1.971.286 1.426 1.391-.336 1.961L12 14.501l1.762.926-.336-1.961 1.426-1.391-1.971-.286L12 10.005z"></path>
                            </svg> &nbsp;Özel Teklif Göster</div>
                            <div>1</div>
                            <div>2 Gün</div>
                            <div>60 TL</div>
                        </div>


                    </div>



                </div>


            </div>
            <h2 className="text-sm font-semibold mt-5 mb-2 text-gray-400">Siparişe Ait<strong> Dosyalar</strong> </h2>
            <div className="bg-white shadow rounded-lg p-4 border border-gray-200 mt-6 w-[40vh]">

                <div className=" items-center gap-2 text-sm text-gray-600">
                    📎 &nbsp;
                    <span>60406027-30a8-4345-baa8-89068d7797d9.jpg</span><br />
                    <span className="text-gray-400 text-xs pl-5">24 Ocak, 2022 - 23:44</span>
                </div>
            </div>
            <h2 className="text-sm font-semibold mt-5 mb-2 text-gray-400">Alıcının<strong> Değerlendirmesi</strong> </h2>

            <div className="bg-white shadow rounded-lg p-4 border border-gray-200 mt-6 w-[40vh]">

                <div className="flex items-start gap-3">
                    <img src="https://via.placeholder.com/32" className="w-8 h-8 rounded-full" />
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-medium">memochi</span>
                            <span className="text-yellow-500">⭐️5.0</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-700">
                            İlk çalışmamızdı, daha iş olmadan tasarımları gösterip finalize ettikleri için harikaydı. Çok teşekkürler, elinize emeğinize sağlık.
                        </p>
                    </div>
                </div>
            </div>


            <div className="flex justify-between items-center  pt-6">
                <h2 className="text-lg font-semibold text-gray-400">Sipariş <strong>Süreci</strong></h2>
                <a href="#" className="text-sm text-purple-600 font-medium hover:underline">Alıcıya Mesaj Gönder</a>
            </div>
            <br />
            <div className=" bg-white p-4 rounded-xl shadow space-y-6">


                <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded-md flex flex-col items-center text-center">
                    <svg className="w-8 h-8 text-green-600 mb-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                    </svg>
                    <div className="text-green-600 font-medium">Sipariş tamamlandı. 🥳</div>
                    <p className="text-sm mt-2 max-w-xs text-gray-400 text-center">
                        <strong>Ödemen Bionluk Bakiyene aktarılacak.</strong> Şimdi alıcı hakkında değerlendirme yapabilirsin.
                    </p>
                </div>


                <p className="text-xs text-gray-400 text-center mt-2">23:42</p>
                <div className="bg-teal-100 border-l-4 border-teal-500 p-4 rounded-md flex flex-col items-center text-center">
                    <svg className="w-8 h-8 text-teal-600 mb-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-7H9v2h2v-2zm0-4H9v3h2V7z" />
                    </svg>
                    <div className="text-teal-600 font-medium">Sipariş teslim edildi. 👏</div>
                    <p className="text-sm mt-2 max-w-xs text-gray-400">Alıcının siparişi inceleyip onay veya revize vermesi bekleniyor.</p>
                    <div className="mt-2  border p-2 rounded text-sm">📎 Dosya: <span className="text-gray-700">604b8027-30a4-4345-ba05-b096b197dfd7.jpg</span></div>
                </div>

                <p className="text-xs text-gray-400 text-center mt-2">23:41</p>
                <div className="bg-gray-100 border-l-4 border-red-400 p-4 rounded-md flex flex-col items-center text-center">
                    <svg className="w-8 h-8 text-red-600 mb-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.257 3.099c.763-1.36 2.722-1.36 3.485 0l5.451 9.724c.75 1.34-.213 3.027-1.742 3.027H4.548c-1.529 0-2.492-1.686-1.742-3.027l5.451-9.724zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-2a1 1 0 01-1-1V7a1 1 0 112 0v3a1 1 0 01-1 1z" />
                    </svg>
                    <div className="text-red-600 font-medium">Çözüm Merkezi</div>
                    <p className="text-sm mt-1 text-gray-400 text-center">Bir sorun yaşarsan bize "Çözüm merkezi" bölümünden yazabilirsin.</p>
                    <a href="#" className="inline-block mt-2 bg-white border text-sm rounded text-gray-700 hover:bg-gray-50 p-5 font-bold">Çözüm Merkezine Git</a>
                </div>

                <p className="text-xs text-gray-400 text-center mt-2">16:38</p>
                <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 rounded-md flex flex-col items-center text-center">
                    <svg className="w-8 h-8 text-yellow-600 mb-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6 2a1 1 0 000 2h1v2a1 1 0 102 0V4h2v2a1 1 0 102 0V4h1a1 1 0 100-2H6zM3 8a1 1 0 011-1h12a1 1 0 011 1v9a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                    </svg>
                    <div className="text-yellow-700 font-medium">Sipariş başladı</div>
                    <p className="text-sm mt-1 text-gray-400 text-center">Sipariş süreci başladı. Şimdi freelancer’ın işi teslim etmesi bekleniyor.</p>
                    <p className="text-xs text-gray-500 mt-2"><strong>Teknik Teslim Tarihi: 26 Ocak, 2022 16:38</strong></p>
                </div>

                <p className="text-xs text-gray-400 text-center mt-2">16:38</p>
                <div className="bg-sky-100 border-l-4 border-sky-400 p-4 rounded-md flex flex-col items-center text-center">
                    <svg className="w-8 h-8 text-sky-600 mb-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-4V9a1 1 0 112 0v5a1 1 0 11-2 0zm0-8a1 1 0 112 0 1 1 0 01-2 0z" />
                    </svg>
                    <div className="text-sky-600 font-medium text-base">Yeni bir sipariş aldın!</div>
                    <p className="text-sm mt-1 text-gray-400 text-center">
                        Ödeme şu an havuz hesabında. Çalıştığın kişi siparişi tamamladığında ödeme aktarılacak.
                        <span className="font-medium block">Alıcının siparişi başlatması gerekiyor.</span>
                    </p>
                </div>


                <p className="text-xs text-gray-400 text-center mt-2">16:38</p>

            </div>

        </div>
    );
};

export default SiparisDetay;
