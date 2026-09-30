import { Input, Button } from "@/shared/components/atoms";
import { StatusMessage } from "@/shared/components/molecules";
import formatToTurkishDate from "@/shared/utils/formatToTurkishDate";

export default function ConversationTable({
  conversations,
  users,
  currentUserId,
  currentFirstName,
  isLoading,
  showCheckboxes,
  selectedForDelete,
  onSelectForDelete,
  onOpenConversation,
}) {
  if (isLoading) {
    return <StatusMessage type="loading" message="Mesajlar yükleniyor..." />;
  }

  if (conversations.length === 0) {
    return <StatusMessage type="loading" message="Henüz mesaj yok" />;
  }

  const toggleSelection = (partnerId) =>
    onSelectForDelete((previous) =>
      previous.includes(partnerId)
        ? previous.filter((id) => id !== partnerId)
        : [...previous, partnerId],
    );

  return (
    <div className="flex justify-start w-full overflow-x-auto">
      <table className="h-[400px] w-full min-w-[640px] table-auto overflow-auto border bg-white">
        <thead className="bg-white text-center font-medium text-gray-600">
          <tr>
            <th className="border p-4">Tarih</th>
            <th className="border p-4">Son Mesaj</th>
            <th className="border p-4">Alıcı / Gönderici</th>
            <th className="border p-4">İşlem</th>
          </tr>
        </thead>

        <tbody className="text-center text-gray-600">
          {conversations.map((message) => {
            const isSentByMe = message.senderId === currentUserId;
            const partnerId = isSentByMe ? message.recipientId : message.senderId;
            const partner = users.find((user) => user.id === partnerId);

            return (
              <tr key={message.id} className={isSentByMe ? "" : "text-green-500 line-through"}>
                <td>
                  {showCheckboxes && (
                    <Input
                      type="checkbox"
                      aria-label="Konuşmayı seç"
                      checked={selectedForDelete.includes(partnerId)}
                      onChange={() => toggleSelection(partnerId)}
                      className="mr-2"
                    />
                  )}

                  {formatToTurkishDate(message.sentAt)}
                </td>

                <td>{message.text}</td>

                <td>
                  {isSentByMe ? currentFirstName : partner?.firstName || "Bilinmeyen Kullanıcı"}
                </td>

                <td>
                  <Button
                    onClick={() => onOpenConversation(partnerId)}
                    className="rounded bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-700"
                  >
                    {isSentByMe ? "Mesajın Var" : "Cevap Ver"}
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
