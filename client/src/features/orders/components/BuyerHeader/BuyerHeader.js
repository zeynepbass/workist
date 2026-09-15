import { Link } from "react-router-dom";

export default function BuyerHeader({
    count,
    onShowAll,
}) {
    return (
        <div className="flex justify-between pt-5">

            <span className="text-left text-gray-400">
                Sana Özel{" "}
                <strong>
                    Alıcı İstekleri{" "}

                    <span
                        className="text-purple-600 cursor-pointer"
                        onClick={onShowAll}
                    >
                        &nbsp;[{count} alıcı isteği]
                    </span>
                </strong>
            </span>

            <span className="text-right">
                <Link
                    to="/istekler"
                    className="rounded-full text-gray-300 text-right p-2 cursor-pointer"
                >
                    Tümü
                </Link>
            </span>

        </div>
    );
}