import { Input } from "@/shared/components/atoms";

export default function AdsPricingOptions ({
    kodFiyatlandirma,
    ekstraOzellikler,
    onCheckboxChange,
}) {
    const codeOptions = [
        {
            key: "logo",
            label: "Logo",
        },
        {
            key: "kaynakKod",
            label: "Kaynak Kod",
        },
        {
            key: "fonMuzigi",
            label: "Fon Müziği",
        },
    ];

    const extraOptions = [
        {
            key: "hizliTeslimat",
            label: "Süper Hızlı Teslimat",
        },
        {
            key: "fullHd",
            label: "Full HD (1080px)",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
                    Kod Fiyatlandırma*
                </h3>

                <div className="space-y-2">
                    {codeOptions.map((item) => (
                        <label
                            key={item.key}
                            className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 hover:bg-purple-50"
                        >
                            <Input
                                type="checkbox"
                                checked={kodFiyatlandirma[item.key]}
                                onChange={() =>
                                    onCheckboxChange(
                                        "kodFiyatlandirma",
                                        item.key
                                    )
                                }
                                className="h-4 w-4 accent-purple-600"
                            />
                            <span>{item.label}</span>
                            <span className="ml-auto text-xs text-gray-400">+100 TL</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
                    Extra*
                </h3>

                <div className="space-y-2">
                    {extraOptions.map((item) => (
                        <label
                            key={item.key}
                            className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 hover:bg-purple-50"
                        >
                            <Input
                                type="checkbox"
                                checked={ekstraOzellikler[item.key]}
                                onChange={() =>
                                    onCheckboxChange(
                                        "ekstraOzellikler",
                                        item.key
                                    )
                                }
                                className="h-4 w-4 accent-purple-600"
                            />
                            <span>{item.label}</span>
                            <span className="ml-auto text-xs text-gray-400">+100 TL</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

