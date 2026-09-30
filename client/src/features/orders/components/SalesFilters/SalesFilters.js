import { Button } from "@/shared/components/atoms";

const FILTERS = [
  { label: "Tüm Siparişler", value: "all" },
  { label: "Devam Eden", value: "in_progress" },
  { label: "Tamamlanan", value: "completed" },
  { label: "İptal Olanlar", value: "cancelled" },
];

export default function SalesFilters({ statusFilter, onStatusFilterChange }) {
  return (
    <div className="flex space-x-3 justify-center">
      {FILTERS.map(({ label, value }) => (
        <Button
          key={value}
          onClick={() => onStatusFilterChange(value)}
          aria-pressed={statusFilter === value}
          className={`border-r-2 px-4 py-2 hover:text-gray-300 rounded-lg ${
            statusFilter === value ? "bg-purple-700 text-white" : "bg-gray-100 text-gray-400"
          }`}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
