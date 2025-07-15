import React, { useState } from 'react';
import MessagingUI from "../../pages/layout/Message/index";

const Index = ({ toggleText, userid, filteredData, formatToTurkishDate, expandedItems }) => {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); 


  const data = filteredData.filter((item) => item.userId !== userid?.result?._id);

  return (
    <>
      {data.reverse().map((item) => {
        const isExpanded = expandedItems[item._id] || false;

        return (
          <div className="bg-gray-50 rounded-lg shadow mt-3 relative" key={item._id}>

            <div className="flex items-center justify-between mb-2 bg-gray-800 p-4 rounded-md">
              <div className="flex items-center gap-3">
                {item?.file && (
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={item?.file}
                    alt="Kullanıcı Fotoğrafı"
                  />
                )}
                <div>
                  <p className="text-sm font-semibold text-white">{item.kullaniciAd}</p>
                  <p className="text-xs text-white">{item.selectedSubcategory}</p>
                </div>
              </div>

              <button
                className="border border-gray-300 px-3 py-1 rounded text-sm text-white hover:bg-gray-100"
                onClick={() => {
                    setSelectedUser({
                    id: item.userId,
                    adi: item.kullaniciAd,
                  });
                  setOpen(true);
                }}
              >
                Mesaj At
              </button>
            </div>

  
  
            <h3 className="font-semibold text-gray-900 mb-2 p-4">{item.title}</h3>


            <p className="text-gray-700 text-sm mb-2 p-4">
              {isExpanded ? item.description : `${item.description.slice(0, 400)}...`}
            </p>

            {item.description.length > 400 && (
              <p
                className="text-purple-500 font-semibold text-sm cursor-pointer p-4"
                onClick={() => toggleText(item._id)}
              >
                {isExpanded ? "Gizle" : "Devamını oku"}
              </p>
            )}

            <hr />


            <div className="flex justify-between items-center mt-4 text-sm text-gray-600 p-4">
              <span className="bg-gray-100 px-2 py-1 rounded text-gray-500">
                {formatToTurkishDate(item.createdAt)}
              </span>
              <div className="flex space-x-4">
                <span>Bütçe: <strong>{item.fiyat}</strong></span>
                <span>Süre: <strong>{item.sure}</strong></span>
                <span>Teklifler: <strong>10</strong></span>
              </div>
            </div>
          </div>
        );
      })}

  
      {open && selectedUser && (
        <MessagingUI
          open={open}
          onClose={setOpen}
          adi={selectedUser.adi}
          gonderenId={userid?.result?._id}
          aliciId={selectedUser.id}
        />
      )}
    </>
  );
};

export default Index;
