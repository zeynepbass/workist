import { Select } from "@/shared/components/atoms";

export default function PortfolioFilters({
    value,
    onChange,
}) {
    return (
        <div className="max-w-md mr-auto p-4 relative">
            <Select
                label="Durum Filtrele:"
                id="filtre"
                value={value}
                onChange={onChange}
                options={[
                    {
                        value: "yayinda",
                        label: "Yayında olanlar",
                    },
                    {
                        value: "yayindaDegil",
                        label: "Yayında olmayanlar",
                    },
                ]}
                placeholder={null}
                className="border-gray-300 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <p className="mt-4 text-gray-600">
                Seçilen durum:{" "}
                <span className="font-semibold">
                    {value === "yayinda"
                        ? "Yayında olanlar"
                        : "Yayında olmayanlar"}
                </span>
            </p>
        </div>
    );
}