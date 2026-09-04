import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
const Index = () => {
  const siparislerOrnek = [
    {
      id: 1,
      alici: "Ali Veli",
      siparisTarihi: "2023-08-01",
      teslimTarihi: "2023-08-10",
      fiyat: 150,
      durum: "devam",
    },
    {
      id: 2,
      alici: "Ayşe Yılmaz",
      siparisTarihi: "2023-07-25",
      teslimTarihi: "2023-08-05",
      fiyat: 300,
      durum: "tamamlandı",
    },
    {
      id: 3,
      alici: "Mehmet Demir",
      siparisTarihi: "2023-07-30",
      teslimTarihi: "2023-08-12",
      fiyat: 200,
      durum: "iptal",
    },
    {
      id: 4,
      alici: "Fatma Kaya",
      siparisTarihi: "2023-08-02",
      teslimTarihi: "2023-08-15",
      fiyat: 180,
      durum: "devam",
    },
  ];

  const [durumFilter, setDurumFilter] = useState("tum");
  const [sortType, setSortType] = useState("all");
  const [arama, setArama] = useState("");

  const navigate = useNavigate();
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

  return (
    <div className="p-4 h-[100vh] ">
      <h1 className="text-left text-gray-500 text-xl">
        Tüm <strong>Satışlarım</strong>
      </h1>

      <p className="text-gray-400 p-4">Sattığın tüm hizmetler.</p>


      <div className="max-w-4xl mx-auto p-4 space-y-6 bg-white rounded-lg shadow ">

        <div className="flex space-x-3 justify-center ">
          {[
            { label: "Tüm Siparişler", value: "tum" },
            { label: "Devam Eden", value: "devam" },
            { label: "Tamamlanan", value: "tamamlandı" },
            { label: "İptal Olanlar", value: "iptal" },
          ].map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setDurumFilter(value)}
              className={`border-r-2 px-4 py-2 rounded-lg ${durumFilter === value
                  ? "bg-purple-700 text-white"
                  : "bg-gray-50 text-gray-400"
                }`}
            >
              {label}
            </button>
          ))}
        </div>



      </div>


      <div className="max-w-4xl mx-auto mt-6 space-y-4">
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
              <div className="text-gray-400 w-1/5">Alıcı: <br />{siparis.alici}</div>
              <div className="text-gray-400 w-1/5">
                {new Date(siparis.siparisTarihi).toLocaleDateString('tr-TR')} <br />
                {new Date(siparis.teslimTarihi).toLocaleDateString('tr-TR')}
              </div>


              <div className="text-purple-400 font-semibold w-1/5 text-center">
                ${siparis.fiyat}<br /><br />
                <span className="inline-block w-[150px] text-center border-2 border-purple-300 border-dashed p-2 rounded cursor-pointer" onClick={() => navigate(`/satislarim/${siparis.id}`)}>
                  {siparis.durum}
                </span>

              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Index;
