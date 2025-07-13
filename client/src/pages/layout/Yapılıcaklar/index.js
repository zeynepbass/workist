import React, { useContext, useEffect, useState } from 'react';
import { PortfolioContext } from '../../../Context/workContext';
import MessagingUI from "../../../pages/layout/Message/index";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedForDelete, setSelectedForDelete] = useState([]);

  const {
    konusmalar,
    formatToTurkishDate,
    usersLis,
    userId,
    firstNameLabel,
    getMessage,
    userid,
  } = useContext(PortfolioContext);

  useEffect(() => {
    usersLis();
    getMessage(userId);
  }, []);

  const handleClick = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleDeleteMessages = async () => {
    const currentId = userid?.result?._id;
    for (const targetId of selectedForDelete) {
      try {
        await fetch(`http://localhost:1998/${currentId}/${targetId}`, {
          method: "DELETE",
        });
      } catch (error) {
        console.error("Silme hatası:", error);
      }
    }
    getMessage(userId);
    setSelectedForDelete([]);
    setShowCheckboxes(false);
  };

  const currentUser = JSON.parse(localStorage.getItem("login"));
  const currentFirstName = currentUser?.result?.firstName;

  return (
    <div className="h-[100vh] p-4">
      <div className="flex justify-between mb-4">
        <h4 className="text-left font-semibold text-lg text-gray-400">Yapılacaklar</h4>
        <h4
          className="text-right text-purple-600 cursor-pointer"
          onClick={() => setShowCheckboxes(prev => !prev)}
        >
          {showCheckboxes ? "İptal Et" : "Yapılanları Temizle"}
        </h4>
      </div>

      <div className="flex justify-start">
        <table className="table-auto w-[100vh] h-[400px] overflow-auto border bg-white">
          <thead className="bg-white text-gray-600 font-medium text-center">
            <tr>
              <th className="p-4 border">Tarih</th>
              <th className="p-4 border">Son Mesaj</th>
              <th className="p-4 border">Alıcı Adı</th>
              <th className="p-4 border">İşlem</th>
            </tr>
          </thead>

          <tbody className="text-center text-gray-600">
            {konusmalar.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-gray-500 italic">Henüz mesaj yok</td>
              </tr>
            )}

            {konusmalar.map((item, index) => {
              const user = firstNameLabel.find(
                (u) => u._id === item.aliciId || u._id === item.gonderenId
              );
              const isSameUser = user?.firstName === currentFirstName;
              const otherUserId = item.gonderenId === userId ? item.aliciId : item.gonderenId;

              return (
                <tr key={index} className={isSameUser ? 'line-through text-green-500' : ''}>
                  <td >
                    {showCheckboxes && (
                      <input
                        type="checkbox"
                        checked={selectedForDelete.includes(otherUserId)}
                        onChange={() => {
                          setSelectedForDelete(prev =>
                            prev.includes(otherUserId)
                              ? prev.filter(id => id !== otherUserId)
                              : [...prev, otherUserId]
                          );
                        }}
                        className="mr-2"
                      />
                    )}
                    {formatToTurkishDate(item.time)}
                  </td>
                  <td>{item.text}</td>
                  <td>{user ? user.firstName : "Bilinmeyen Kullanıcı"}</td>
                  <td>
                    <button
                      onClick={() => handleClick(otherUserId)}
                      className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                    >
                      {isSameUser ? "Cevap Verildi" : "Cevap Ver"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showCheckboxes && selectedForDelete.length > 0 && (
        <div className="mt-4 text-right">
          <button
            onClick={handleDeleteMessages}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Seçilenleri Sil
          </button>
        </div>
      )}

      {open && selectedId && (
        <MessagingUI
          open={open}
          onClose={() => setOpen(false)}
          adi={
            firstNameLabel.find((u) => u._id === selectedId)?.firstName || "Kullanıcı"
          }
          gonderenId={userid?.result?._id}
          aliciId={selectedId}
        />
      )}
    </div>
  );
};

export default Index;
