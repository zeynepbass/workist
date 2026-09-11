import { useNavigate } from "react-router-dom";

export default function SalesCard  ({ order })  {
    const navigate = useNavigate();

    return (
        <div className="bg-white p-4 rounded shadow flex justify-between items-center space-x-4">
            <div className="text-gray-400 w-1/5">
                Alıcı:
                <br />
                {order.alici}
            </div>

            <div className="text-gray-400 w-1/5">
                {new Date(order.siparisTarihi).toLocaleDateString("tr-TR")}
                <br />
                {new Date(order.teslimTarihi).toLocaleDateString("tr-TR")}
            </div>

            <div className="text-purple-400 font-semibold w-1/5 text-center">
                ${order.fiyat}

                <br />
                <br />

                <span
                    className="inline-block w-[150px] text-center border-2 border-purple-300 border-dashed p-2 rounded cursor-pointer"
                    onClick={() => navigate(`/Sales/${order.id}`)}
                >
                    {order.durum}
                </span>
            </div>
        </div>
    );
};

