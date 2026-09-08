import { FaInfoCircle } from "react-icons/fa";

export function AdsInfo () {
    return (
        <div className="bg-purple-400 text-white p-4 rounded border-2 border-purple-400 flex items-start space-x-2">
            <FaInfoCircle className="text-2xl text-purple-600 pr-1" />

            <p>
                <strong>Seni dinledik!</strong> Artık
                minimum ilan & sipariş tutarı{" "}
                <strong>100 TL</strong>!
            </p>
        </div>
    );
};