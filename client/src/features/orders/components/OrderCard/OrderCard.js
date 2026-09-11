import OrderActions from "./OrderActions";

export default function OrderCard  ({
  siparis,
  onDelete,
  onMessage,
  onDetails,
})  {
  return (
    <div className="bg-white p-4 rounded shadow flex justify-between items-center space-x-4">
      
      <div className="text-purple-400 inline-block w-[150px] text-center border-2 border-purple-300 border-dashed p-2 rounded capitalize">
        Alıcı:
        <br />
        {siparis.alici}
      </div>

      <div className="text-gray-400 w-1/5">
        {new Date(siparis.siparisTarihi).toLocaleDateString("tr-TR")}
      </div>

      <div className="text-purple-400 font-semibold w-1/5 text-center">
        ${siparis.fiyat}
      </div>

      <OrderActions
        onDelete={() => onDelete(siparis.id)}
        onMessage={() => onMessage(siparis.alici)}
        onDetails={() => onDetails(siparis)}
      />
    </div>
  );
};

