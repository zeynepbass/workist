import { useMemo, useState } from "react";

import { TopHeader } from "@/shared/components/molecules";

import { siparislerOrnek } from "@/shared/mocks/sales";

import SalesFilters from "./components/SalesFilters";
import SalesList from "./components/SalesList";

export default function Sales  ()  {
    const [durumFilter, setDurumFilter] = useState("tum");

    const filtrelenmisSiparisler = useMemo(() => {
        if (durumFilter === "tum") {
            return siparislerOrnek;
        }

        return siparislerOrnek.filter(
            (siparis) => siparis.durum === durumFilter
        );
    }, [durumFilter]);

    return (
        <div className="p-4 h-[100vh]">
            <TopHeader
                title="Tüm Satışlarım"
                desc="Sattığın tüm hizmetler."
            />

            <div className="max-w-4xl mx-auto p-4 space-y-6 bg-white rounded-lg shadow">
                <SalesFilters
                    durumFilter={durumFilter}
                    setDurumFilter={setDurumFilter}
                />
            </div>

            <div className="max-w-4xl mx-auto mt-6">
                <SalesList orders={filtrelenmisSiparisler} />
            </div>
        </div>
    );
};

