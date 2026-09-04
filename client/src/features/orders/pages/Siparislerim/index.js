
import React, { useState, useMemo } from "react";
import { FaTrash, FaEnvelope, FaInfoCircle } from "react-icons/fa";


const Index = () => {
  const siparislerOrnek = [
    {
      id: 1,
      alici: "Ali Veli",
      siparisTarihi: "2023-08-01",

      fiyat: 150,

      aciklama: "Bu sipariş devam ediyor.",
    },
    {
      id: 2,
      alici: "Ayşe Yılmaz",
      siparisTarihi: "2023-07-25",

      fiyat: 300,

      aciklama: "Sipariş başarıyla tamamlandı.",
    },
    {
      id: 3,
      alici: "Mehmet Demir",
      siparisTarihi: "2023-07-30",

      fiyat: 200,

      aciklama: "Sipariş iptal edildi.",
    },
    {
      id: 4,
      alici: "Fatma Kaya",
      siparisTarihi: "2023-08-02",

      fiyat: 180,

      aciklama: "Sipariş süreci devam ediyor.",
    },
  ];

  const [durumFilter, setDurumFilter] = useState("tum");
  const [sortType, setSortType] = useState("all");
  const [arama, setArama] = useState("");
  const [seciliSiparis, setSeciliSiparis] = useState(null);

  // Filtrele ve sırala
  const filtrelenmisSiparisler = useMemo(() => {
    let sonuc = [...siparislerOrnek];

    if (durumFilter !== "tum") {
      sonuc = sonuc.filter((s) => s.durum === durumFilter);
    }

    if (arama.trim() !== "") {
      sonuc = sonuc.filter((s) =>
        s.alici.toLowerCase().includes(arama.toLowerCase())
      );
    }

    if (sortType === "oldToNew") {
      sonuc.sort(
        (a, b) => new Date(a.siparisTarihi) - new Date(b.siparisTarihi)
      );
    } else if (sortType === "newToOld") {
      sonuc.sort(
        (a, b) => new Date(b.siparisTarihi) - new Date(a.siparisTarihi)
      );
    }

    return sonuc;
  }, [durumFilter, sortType, arama]);

  // Siparişi silme örneği (gerçek projede backend'e de gönderilmeli)
  const handleDelete = (id) => {
    alert(`Sipariş ${id} silindi! (Burada gerçek silme işlemi yapılmalı.)`);
  };

  // Mesaj ikonuna basınca örnek alert
  const handleMessage = (alici) => {
    alert(`${alici} için mesaj gönderme işlemi!`);
  };

  return (
    <div className="p-4 h-[100vh] bg-gray-50">
      <h1 className="text-left text-gray-500 text-xl">
        Tüm <strong>Siparişlerim</strong>
      </h1>

      <br />

      {/* Filtre ve arama alanı örnek ekleyebilirsin burada */}

      <div className="max-w-4xl mx-auto mt-6 space-y-4 overflow-y-auto max-h-[75vh]">
        {filtrelenmisSiparisler.length === 0 ? (
          <p className="text-center p-4 text-gray-500 italic">
            Kriterlere uyan sipariş bulunamadı.
          </p>
        ) : (
          filtrelenmisSiparisler.map((siparis) => (
            <div
              key={siparis.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center space-x-4"
            >
              <div className="text-purple-400  inline-block w-[150px] text-center border-2 border-purple-300 border-dashed p-2 rounded capitalize">
                Alıcı: <br />
                {siparis.alici}
              </div>
              <div className="text-gray-400 w-1/5">
                {new Date(siparis.siparisTarihi).toLocaleDateString("tr-TR")} <br />

              </div>

              <div className="text-purple-400 font-semibold w-1/5 text-center">
                ${siparis.fiyat}
                <br />


              </div>

              <div className="flex space-x-4 text-gray-500 w-1/5 justify-end">
                {/* Silme butonu */}
                <button
                  onClick={() => handleDelete(siparis.id)}
                  className="hover:text-purple-600"
                  title="Sil"
                >
                  <FaTrash size={20} />
                </button>

                {/* Mesaj butonu */}
                <button
                  onClick={() => handleMessage(siparis.alici)}
                  className="hover:text-purple-600"
                  title="Mesaj Gönder"
                >
                  <FaEnvelope size={20} />
                </button>

                {/* Detay butonu - popup açar */}
                <button
                  onClick={() => setSeciliSiparis(siparis)}
                  className="hover:text-purple-600"
                  title="Detaylar"
                >
                  <FaInfoCircle size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {seciliSiparis && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSeciliSiparis(null)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl text-center italic mb-4 text-purple-500">
              Sipariş Detayları
            </h2>
            <p>
              <strong className="text-gray-400">Alıcı:</strong> {seciliSiparis.alici}
            </p>
            <p>
              <strong className="text-gray-400">Sipariş Tarihi:</strong>{" "}
              {new Date(seciliSiparis.siparisTarihi).toLocaleDateString("tr-TR")}
            </p>

            <p>
              <strong className="text-gray-400">Fiyat:</strong> ${seciliSiparis.fiyat}
            </p>

            <p className="mt-3 text-gray-500 text-center">{seciliSiparis.aciklama}</p>

            <button
              onClick={() => setSeciliSiparis(null)}
              className="mt-6 px-4 py-2 bg-purple-200 text-white rounded hover:bg-purple-700 mx-auto block"
            >
              Kapat
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
