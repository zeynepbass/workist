import { ORDER_STATUS_FILTERS } from "../../constants";

export default function OrderFilters({
  statusFilter,
  onStatusFilterChange,
  sortType,
  onSortTypeChange,
  searchTerm,
  onSearchTermChange,
}) {
  return (
    <div className="max-w-4xl mx-auto mt-6 bg-white rounded-lg p-4 border">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="order-search" className="block text-sm font-medium text-gray-600 mb-1">
            Sipariş Ara
          </label>

          <input
            id="order-search"
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            placeholder="Alıcı ara..."
            className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>

        <div>
          <label htmlFor="order-status" className="block text-sm font-medium text-gray-600 mb-1">
            Durum
          </label>

          <select
            id="order-status"
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm outline-none"
          >
            {ORDER_STATUS_FILTERS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="order-sort" className="block text-sm font-medium text-gray-600 mb-1">
            Sıralama
          </label>

          <select
            id="order-sort"
            value={sortType}
            onChange={(e) => onSortTypeChange(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm outline-none"
          >
            <option value="all">Varsayılan</option>
            <option value="newToOld">Yeniden Eskiye</option>
            <option value="oldToNew">Eskiden Yeniye</option>
          </select>
        </div>
      </div>
    </div>
  );
}
