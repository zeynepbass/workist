import React, { useState, useMemo, useContext, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { PortfolioContext } from '../../../Context/workContext';
import Modal from "../../../components/PortfolyoModal"

const Index = () => {
    const navigate = useNavigate();
    const { data, setData, deleteClick, fetchResponse, userId } = useContext(PortfolioContext);
    const handleEditClick = (id) => {
        navigate(`/portfolyom/${id}`);
    };

    const [filtreDurum, setFiltreDurum] = useState("yayinda");

    const filtrelenmisPortfolyolar = useMemo(() => {
        if (!data) return [];
        return data.filter(p => p.durum === filtreDurum);
    }, [data, filtreDurum]);



    const userid = JSON.parse(localStorage.getItem("login"));
    useEffect(() => {

        const userId = userid?.result?._id;
        fetchResponse(userId)
    }, [])
    const toggleDurum = (id) => {
        setData((prev) =>
            prev.map((p) =>
                p._id === id
                    ? { ...p, durum: p.durum === "yayinda" ? "yayinda değil" : "yayinda" }
                    : p
            )
        );
    };
    return (
        <div className="p-4 h-[100vh]">
            <h1 className='text-left text-gray-500 text-xl pl-4'>
                <strong>Portfolyom</strong>
            </h1>


            <Modal />
            <p className='text-gray-400 p-4'>
                Tüm portfolyonu buradan takip edebilir, yönetebilir ve yeni portfolyolar ekleyebilirsin.
            </p>

            <div className="max-w-md mr-auto p-4 relative">
                <label htmlFor="filtre" className="block mb-2 font-semibold text-gray-400">
                    Durum Filtrele:
                </label>
                <select
                    id="filtre"
                    value={filtreDurum}
                    onChange={(e) => setFiltreDurum(e.target.value)}
                    className="w-full border p-2 border-gray-300 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    <option value="yayinda">Yayında olanlar</option>
                    <option value="yayindaDegil">Yayında olmayanlar</option>
                </select>

                <p className="mt-4 text-gray-600">
                    Seçilen durum:{" "}
                    <span className="font-semibold">
                        {filtreDurum === "yayinda"
                            ? "Yayında olanlar"
                            : "Yayında olmayanlar"}
                    </span>
                </p>
            </div>
            <div className="flex flex-wrap gap-1">
                {filtrelenmisPortfolyolar.length === 0 ? (
                    <p className="w-full text-center p-6 text-gray-500 italic">
                        Seçilen duruma göre portfolyo bulunamadı.
                    </p>
                ) : (
                    filtrelenmisPortfolyolar.map((p, index) => (
                        <div
                            key={index}
                            className="relative bg-white rounded-lg shadow-md border w-full sm:w-1/4 p-4 flex flex-col"
                        >
                            {userId === p.userId && (
                                <div className="absolute top-2 right-2 rounded-lg p-2 flex space-x-2 bg-gray-800 rounded-bl-md z-10 ">
                                    <button
                                        onClick={() => toggleDurum(p._id)}
                                        className="text-gray-200 hover:text-white"
                                        title={p.durum === "yayinda" ? "Yayından kaldır" : "Yayına ekle"}
                                    >
                                        <FontAwesomeIcon
                                            icon={p.durum === "yayinda" ? faEye : faEyeSlash}
                                            size="lg"
                                        />
                                    </button>

                                    <button
                                        onClick={() => handleEditClick(p._id)}
                                        className="text-gray-200 hover:text-white"
                                        title="Düzenle"
                                    >
                                        <FontAwesomeIcon icon={faPen} size="lg" />
                                    </button>

                                    <button
                                        onClick={() => deleteClick(p._id)}
                                        className="text-gray-200 hover:text-white"
                                        title="Sil"
                                    >
                                        <FontAwesomeIcon icon={faTrash} size="lg" />
                                    </button>
                                </div>
                            )}

                            <div className="mt-6 p-4 h-[15vh]">
                                <div className="w-full h-[100%] overflow-hidden">
                                    <img
                                        src={p.file}
                                        className="w-full h-full object-contain rounded-md"
                                        alt="İlan görseli"
                                    />
                                </div>

                                <div className="flex items-center justify-between mt-3 space-x-4">
                                    <div>
                                        <span className="font-semibold text-lg text-gray-800">{userid?.result?.firstName}</span><br />
                                        <p className="text-sm text-gray-400">{userid?.result?.unvan || "Unvan"}</p>

                                    </div>

                                    <div className="text-lg font-bold text-purple-900">fiyat:{p.fiyat}</div>

                                </div>
                            </div>


                            <br />
                                        <br />
                        <p className="mt-4 text-gray-400 text-sm pl-4 pt-2">{p.title}</p>
                        <p className="mt-4 text-gray-400 text-sm pl-4 ">{p.description}</p>
                        </div>
                    ))
                )}
            </div>


        </div>
    );
};

export default Index;
