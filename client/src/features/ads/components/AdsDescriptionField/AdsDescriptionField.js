export function DescriptionField  ({ value, onChange }) {
    return (
        <div>
            <label className="block mb-1 font-semibold text-gray-500">
                Siparişe başlaman için gerekenler*
            </label>

            <textarea
                rows={5}
                placeholder="Yapacağın işin detaylarını açıkla..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-4 border-2 border-purple-300 rounded bg-white text-gray-800"
            />
        </div>
    );
};
