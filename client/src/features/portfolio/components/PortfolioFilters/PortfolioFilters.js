import { Select } from "@/shared/components/atoms";

const FILTER_OPTIONS = [
  { value: "published", label: "Yayında olanlar" },
  { value: "unpublished", label: "Yayında olmayanlar" },
];

export default function PortfolioFilters({ value, onChange }) {
  const selectedLabel = FILTER_OPTIONS.find((option) => option.value === value)?.label;

  return (
    <div className="max-w-md mr-auto p-4 relative">
      <Select
        label="Durum Filtrele:"
        id="portfolio-status-filter"
        value={value}
        onChange={onChange}
        options={FILTER_OPTIONS}
        placeholder={null}
        className="border-gray-300 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <p className="mt-4 text-gray-600">
        Seçilen durum: <span className="font-semibold">{selectedLabel}</span>
      </p>
    </div>
  );
}
