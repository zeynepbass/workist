import React, { useState } from 'react'
import MessagingUI from "../../pages/layout/Message/index"
const Index = ({ toggleText, userid, filteredData, formatToTurkishDate, expandedItems }) => {
    const [open, setOpen] = useState(false)
    const [selectId, setSelectedId] = useState(null)
    const handleClick = (id) => {
        setOpen(true);
        setSelectedId(id)
    }
    const data=filteredData.filter((item)=>item.userId !== userid?.result?._id)
    return (
        <>


            {data && data.reverse().map((item, index) => {
                const isExpanded = expandedItems[index] || false;
                const shortDescription = item.description.slice(0, 1);

                return (
                    <div className="bg-gray-50 rounded-lg shadow mt-3 relative" key={index}>
                        <div className="flex items-center justify-between mb-2 bg-gray-800 p-4 rounded-md">
                            <div className="flex">
                                {userid?.result?.file ? <img
                                    className="h-12 w-12 rounded-full object-cover"
                                    src={userid?.result?.file}
                                    alt="Kullanıcı Fotoğrafı"
                                />
                                    : ""}
                                <p>
                                    <span className="text-sm font-semibold text-white">
                                        {item.kullaniciAd}
                                    </span><br />
                                    <span className="text-xs text-white">{item.selectedSubcategory}</span>
                                </p>
                            </div>

                            <div className="flex justify-end space-x-2 mt-4 p-4">
                                <button className="border border-gray-300 px-3 py-1 rounded text-sm text-white hover:bg-gray-100" onClick={() =>
                                    handleClick(item.userId)

                                }>
                                    Mesaj At
                                </button>

                            </div>
                        </div>

                        <h3 className="font-semibold text-gray-900 mb-2 p-4">{item.title}</h3>

                        <p className="text-gray-700 text-sm mb-2 p-4">
                            {expandedItems[index] ? item.description : `${item.description.slice(0, 400)}...`}
                        </p>

                        {item.description.length > 400 && (
                            <p
                                className="text-purple-500 font-semibold text-sm cursor-pointer p-4"
                                onClick={() => toggleText(index)}
                            >
                                {expandedItems[index] ? "Gizle" : "Devamını oku"}
                            </p>
                        )}


                        <hr />

                        <div className="flex justify-between items-center mt-4 text-sm text-gray-600 p-4">
                            <span className="bg-gray-100 px-2 py-1 rounded text-gray-500">
                                {formatToTurkishDate(item.createdAt)}
                            </span>
                            <div className="flex space-x-4">
                                <div className="flex items-center space-x-1">
                                    <span>Bütçe: <strong>{item.fiyat}</strong></span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <span>Süre: <strong>{item.sure}</strong></span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <span>Teklifler: <strong>10</strong></span>
                                </div>
                            </div>
                        </div>

                        <MessagingUI open={open} onClose={setOpen} adi={item.kullaniciAd} gonderenId={userid?.result?._id} aliciId={selectId} />
                    </div>

                );
            })}



        </>
    )
}

export default Index
