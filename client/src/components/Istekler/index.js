import React from 'react'

const Index = ({toggleText,userid,filteredData,formatToTurkishDate, expandedItems,fetchPost,getPost}) => {

    
  return (
    <>
       {filteredData && filteredData.reverse().map((item, index) => {
                const isExpanded = expandedItems[index] || false;
                const shortDescription = item.description.slice(0, 1);

                return (
                    <div className="bg-gray-50 rounded-lg shadow mt-3" key={index}>
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
                                        {userid?.result?.firstName}
                                    </span><br />
                                    <span className="text-xs text-white">{item.selectedSubcategory}</span>
                                </p>
                            </div>

                            <div className="flex justify-end space-x-2 mt-4 p-4">
                                <button className="border border-gray-300 px-3 py-1 rounded text-sm text-white hover:bg-gray-100">
                                    Mesaj At
                                </button>
                                <button className="bg-purple-600 text-white px-4 py-1 rounded text-sm hover:bg-pink-700">
                                    Teklif Ver
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
                    </div>
                );
            })}
    </>
  )
}

export default Index
