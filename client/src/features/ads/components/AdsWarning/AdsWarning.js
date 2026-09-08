import { FaLightbulb } from "react-icons/fa";

export function AdsWarning  ()  {
    return (
        <div className="flex items-start space-x-2 text-yellow-500 bg-yellow-100 p-4 rounded border border-yellow-300">
            <FaLightbulb className="text-2xl text-yellow-500 pr-3" />

            <p>
                <strong>Lütfen Dikkat:</strong> Kategori
                veya hizmet türünü değiştirirsen, tüm
                paket fiyatlama bilgilerin sıfırlanır.
            </p>
        </div>
    );
};