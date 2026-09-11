import { useMemo, useState } from "react";

import { siparislerOrnek } from "@/shared/mocks/orders";

import OrderList from "./components/OrderList";
import OrderDetailsModal from "./components/OrderDetailsModal";
import OrderFilters from "./components/OrderFilters";

export default function Orders() {
    const [durumFilter, setDurumFilter] = useState("tum");
    const [sortType, setSortType] = useState("all");
    const [arama, setArama] = useState("");
    const [seciliSiparis, setSeciliSiparis] = useState(null);

    const filtrelenmisSiparisler = useMemo(() => {
        let sonuc = [...siparislerOrnek];


        if (durumFilter !== "tum") {
            sonuc = sonuc.filter(
                (siparis) => siparis.durum === durumFilter
            );
        }


        if (arama.trim() !== "") {
            sonuc = sonuc.filter((siparis) =>
                siparis.alici
                    .toLowerCase()
                    .includes(arama.toLowerCase())
            );
        }


        if (sortType === "oldToNew") {
            sonuc.sort(
                (a, b) =>
                    new Date(a.siparisTarihi) -
                    new Date(b.siparisTarihi)
            );
        }

        if (sortType === "newToOld") {
            sonuc.sort(
                (a, b) =>
                    new Date(b.siparisTarihi) -
                    new Date(a.siparisTarihi)
            );
        }

        return sonuc;
    }, [durumFilter, sortType, arama]);

    const handleDelete = (id) => {
        alert(
            `Sipariş ${id} silindi! (Burada gerçek silme işlemi yapılmalı.)`
        );
    };

    const handleMessage = (alici) => {
        alert(`${alici} için mesaj gönderme işlemi!`);
    };

    return (
        <div className="p-4 h-[100vh] bg-gray-50">
            <h1 className="text-left text-gray-500 text-xl">
                Tüm <strong>Siparişlerim</strong>
            </h1>

            <OrderFilters
                durumFilter={durumFilter}
                setDurumFilter={setDurumFilter}
                sortType={sortType}
                setSortType={setSortType}
                arama={arama}
                setArama={setArama}
            />

            <div className="max-w-4xl mx-auto mt-6 space-y-4 overflow-y-auto max-h-[75vh]">
                <OrderList
                    orders={filtrelenmisSiparisler}
                    onDelete={handleDelete}
                    onMessage={handleMessage}
                    onDetails={setSeciliSiparis}
                />
            </div>

            <OrderDetailsModal
                order={seciliSiparis}
                onClose={() => setSeciliSiparis(null)}
            />
        </div>
    );
}