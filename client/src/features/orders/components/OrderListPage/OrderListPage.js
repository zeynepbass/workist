import { useState } from "react";

import { Select } from "@/shared/components/atoms";
import { TopHeader } from "@/shared/components/molecules";
import { STATUS_FILTERS } from "../../constants";
import { useOrderList } from "../../hooks/useOrders";
import OrderList from "../OrderList";

export default function OrderListPage({
  viewerRole: role,
  title,
  description,
  emptyMessage,
  fixedStatus,
}) {
  const [status, setStatus] = useState(fixedStatus ?? "");
  const query = useOrderList({ role, status: status || undefined });

  return (
    <div className="p-4">
      <TopHeader title={title} desc={description} />
      {!fixedStatus && (
        <div className="mb-6 max-w-xs px-4">
          <Select
            id={`${role}-status-filter`}
            label="Durum"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            options={STATUS_FILTERS.slice(1)}
            placeholder="Tümü"
          />
        </div>
      )}
      <div className="mx-auto max-w-4xl">
        <OrderList query={query} emptyMessage={emptyMessage} />
      </div>
    </div>
  );
}
