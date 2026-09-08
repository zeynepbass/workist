export function Select({ value, onChange }) {
    return (
        <div>
            <label className="block mb-1 font-semibold text-gray-400">
                Hizmet Türü*
            </label>

            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-5 border-2 border-purple-300 rounded bg-white text-gray-800"
            >
                <option value="">Seçiniz</option>
                <option>Admin Panel</option>
                <option>Özel kodlanmış web tasarımı</option>
                <option>Hata Giderme</option>
            </select>
        </div>
    );
};

