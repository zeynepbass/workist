import { Button } from "@/shared/components/atoms";
import { StatusMessage } from "@/shared/components/molecules";
import formatToTurkishDate from "@/shared/utils/formatToTurkishDate";

export default function ConversationTable({
  conversations,
  currentUserId,
  selectable,
  selectedIds,
  onToggle,
  onOpen,
}) {
  if (conversations.length === 0) return <StatusMessage type="empty" message="Henüz mesaj yok" />;

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[640px] table-auto border bg-white text-center text-gray-600">
        <thead className="font-medium">
          <tr>
            <th scope="col" className="border p-4">
              Tarih
            </th>
            <th scope="col" className="border p-4">
              Son Mesaj
            </th>
            <th scope="col" className="border p-4">
              Kişi
            </th>
            <th scope="col" className="border p-4">
              İşlem
            </th>
          </tr>
        </thead>
        <tbody>
          {conversations.map(({ partner, lastMessage }) => {
            const awaitingReply = lastMessage.senderId !== currentUserId;

            return (
              <tr key={partner.id} className={awaitingReply ? "font-semibold text-gray-800" : ""}>
                <td className="p-2">
                  {selectable && (
                    <input
                      type="checkbox"
                      className="mr-2"
                      aria-label={`${partner.fullName} konuşmasını seç`}
                      checked={selectedIds.includes(partner.id)}
                      onChange={() => onToggle(partner.id)}
                    />
                  )}
                  {formatToTurkishDate(lastMessage.sentAt)}
                </td>
                <td className="p-2">{lastMessage.text}</td>
                <td className="p-2">{partner.fullName}</td>
                <td className="p-2">
                  <Button variant="primary" className="px-4 py-2" onClick={() => onOpen(partner)}>
                    {awaitingReply ? "Cevap Ver" : "Görüntüle"}
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
