import OrderActions from "../OrderActions";
import { formatOrderDate } from "../../constants";

export default function OrderCard({ order, onDelete, onMessage, onDetails }) {
  return (
    <div className="bg-white p-4 rounded shadow flex justify-between items-center space-x-4">
      <div className="text-purple-950 inline-block w-[150px] text-center border-2 border-purple-300 border-dashed p-2 rounded capitalize">
        Alıcı:
        <br />
        {order.buyer}
      </div>

      <div className="text-gray-400 w-1/5">{formatOrderDate(order.orderedAt)}</div>

      <div className="text-purple-950 font-semibold w-1/5 text-center">${order.price}</div>

      <OrderActions
        onDelete={() => onDelete(order.id)}
        onMessage={() => onMessage(order.buyer)}
        onDetails={() => onDetails(order)}
      />
    </div>
  );
}
