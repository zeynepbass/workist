import { Select } from "@/shared/components/atoms";
import { PORTFOLIO_STATUS_OPTIONS } from "../../schemas";

export default function PortfolioFilters({ value, onChange }) {
  return (
    <div className="max-w-xs p-4">
      <Select
        id="portfolio-status-filter"
        label="Durum"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        options={PORTFOLIO_STATUS_OPTIONS}
        placeholder="Tümü"
      />
    </div>
  );
}
