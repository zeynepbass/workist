import { Button } from "@/shared/components/atoms";

const filters = [
    { label: "Tüm Siparişler", value: "tum" },
    { label: "Devam Eden", value: "devam" },
    { label: "Tamamlanan", value: "tamamlandı" },
    { label: "İptal Olanlar", value: "iptal" },
];

export default function SalesFilters  ({ durumFilter, setDurumFilter })  {
    return (
        <div className="flex space-x-3 justify-center">
            {filters.map(({ label, value }) => (
                <Button
                    key={value}
                    onClick={() => setDurumFilter(value)}
                    className={`border-r-2 px-4 py-2 rounded-lg ${
                        durumFilter === value
                            ? "bg-purple-700 text-white"
                            : "bg-gray-50 text-gray-400"
                    }`}
                >
                    {label}
                </Button>
            ))}
        </div>
    );
};

