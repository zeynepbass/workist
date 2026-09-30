import { useMemo, useState } from "react";

import { TopHeader } from "@/shared/components/molecules";
import { sampleSales } from "@/shared/mocks/sales";
import SalesFilters from "../components/SalesFilters";
import SalesList from "../components/SalesList";

export default function Sales() {
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredSales = useMemo(
    () =>
      statusFilter === "all"
        ? sampleSales
        : sampleSales.filter((sale) => sale.status === statusFilter),
    [statusFilter],
  );

  return (
    <div className="p-4 h-[100vh]">
      <TopHeader title="Tüm Satışlarım" desc="Sattığın tüm hizmetler." />

      <div className="max-w-4xl mx-auto p-4 space-y-6 bg-white rounded-lg shadow">
        <SalesFilters statusFilter={statusFilter} onStatusFilterChange={setStatusFilter} />
      </div>

      <div className="max-w-4xl mx-auto mt-6">
        <SalesList orders={filteredSales} />
      </div>
    </div>
  );
}
