export function AdsPriceField ({
    value,
    onChange,
    kodFiyatlandirma,
    ekstraOzellikler,
})  {
    const selectedCodeCount =
        Object.values(kodFiyatlandirma).filter(Boolean).length;

    const selectedExtraCount =
        Object.values(ekstraOzellikler).filter(Boolean).length;

    const totalPrice =
        Number(value || 0) +
        (selectedCodeCount + selectedExtraCount) * 100;

    return (
        <div>
            <label className="block mb-1 font-semibold text-gray-700">
                Fiyat*
            </label>

            <p className="mt-2 text-sm text-gray-500">
                Toplam fiyat (seçimler dahil):{" "}
                {totalPrice} TL
            </p>

            <input
                type="number"
                min={100}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-5 border-2 border-purple-300 rounded bg-white text-gray-800"
            />
        </div>
    );
};

