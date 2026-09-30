import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import { sampleOrders } from "@/shared/mocks/orders";
import OrderList from "../components/OrderList";
import OrderDetailsModal from "../components/OrderDetailsModal";
import OrderFilters from "../components/OrderFilters";

function filterOrders(orders, { statusFilter, searchTerm, sortType }) {
  const term = searchTerm.trim().toLowerCase();

  const filtered = orders.filter(
    (order) =>
      (statusFilter === "all" || order.status === statusFilter) &&
      (term === "" || order.buyer.toLowerCase().includes(term)),
  );

  if (sortType === "oldToNew") {
    filtered.sort((a, b) => new Date(a.orderedAt) - new Date(b.orderedAt));
  }

  if (sortType === "newToOld") {
    filtered.sort((a, b) => new Date(b.orderedAt) - new Date(a.orderedAt));
  }

  return filtered;
}

export default function Orders() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortType, setSortType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = useMemo(
    () => filterOrders(sampleOrders, { statusFilter, searchTerm, sortType }),
    [statusFilter, sortType, searchTerm],
  );

  const handleDelete = (id) => {
    toast.error(`Sipariş ${id} silindi! (Burada gerçek silme işlemi yapılmalı.)`);
  };

  const handleMessage = (buyer) => {
    toast(`${buyer} için mesaj gönderme işlemi!`);
  };

  return (
    <div className="p-4 h-[100vh] bg-gray-50">
      <h1 className="text-left text-gray-500 text-xl">
        Tüm <strong>Siparişlerim</strong>
      </h1>

      <OrderFilters
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        sortType={sortType}
        onSortTypeChange={setSortType}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
      />

      <div className="max-w-4xl mx-auto mt-6 space-y-4 overflow-y-auto max-h-[75vh]">
        <OrderList
          orders={filteredOrders}
          onDelete={handleDelete}
          onMessage={handleMessage}
          onDetails={setSelectedOrder}
        />
      </div>

      <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </div>
  );
}
