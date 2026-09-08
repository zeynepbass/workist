import { FaLightbulb } from "react-icons/fa";

export function AdsServiceTitleField  ({ value, onChange }) {
    return (
        <div>
            <label className="block mb-1 font-semibold text-gray-700">
                Başlığınızla ziyaretçiyi etkile*
            </label>

            <p className="text-gray-500 flex items-start">
                <FaLightbulb className="text-2xl text-yellow-500 pr-3" />

                "Ben web sitenizi özgün tasarımlar eşliğinde
                yönetebileceğiniz hale getiriyorum" gibi bir
                cümle önerilir.
            </p>

            <br />

            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-5 border-2 border-purple-300 rounded bg-white text-gray-800"
            />
        </div>
    );
};

