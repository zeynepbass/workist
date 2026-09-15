import { Input, Button } from "@/shared/components/atoms";
import {StatusMessage} from "@/shared/components/molecules";
import formatToTurkishDate from "@/shared/utils";

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
        return (
            <StatusMessage
                type="loading"
                message="Mesajlar yükleniyor..."
            />
        );
    }

    if (conversations.length === 0) {
        return (
            <StatusMessage
                type="loading"
                message="Henüz mesaj yok"
            />
        );
    }

    return (
        <div className="flex justify-start">
            <table className="h-[400px] w-[100vh] table-auto overflow-auto border bg-white">
                <thead className="bg-white text-center font-medium text-gray-600">
                    <tr>
                        <th className="border p-4">Tarih</th>
                        <th className="border p-4">Son Mesaj</th>
                        <th className="border p-4">
                            Alıcı / Gönderici
                        </th>
                        <th className="border p-4">İşlem</th>
                    </tr>
                </thead>

                <tbody className="text-center text-gray-600">
                    {conversations.map((item) => {
                        const otherUserId =
                            item.gonderenId === currentUserId
                                ? item.aliciId
                                : item.gonderenId;

                        const user = users.find(
                            (user) =>
                                user._id === otherUserId
                        );

                        const isSameUser =
                            item.gonderenId === currentUserId;

                        return (
                            <tr
                                key={
                                    item._id ||
                                    `${item.gonderenId}-${item.aliciId}-${item.time}`
                                }
                                className={
                                    isSameUser
                                        ? ""
                                        : "text-green-500 line-through"
                                }
                            >
                                <td>
                                    {showCheckboxes && (
                                        <Input
                                            type="checkbox"
                                            checked={selectedForDelete.includes(
                                                otherUserId
                                            )}
                                            onChange={() =>
                                                onSelectForDelete(
                                                    (prev) =>
                                                        prev.includes(
                                                            otherUserId
                                                        )
                                                            ? prev.filter(
                                                                  (id) =>
                                                                      id !==
                                                                      otherUserId
                                                              )
                                                            : [
                                                                  ...prev,
                                                                  otherUserId,
                                                              ]
                                                )
                                            }
                                            className="mr-2"
                                        />
                                    )}

                                    {formatToTurkishDate(
                                        item.time
                                    )}
                                </td>

                                <td>{item.text}</td>

                                <td>
                                    {isSameUser
                                        ? currentFirstName
                                        : user?.firstName ||
                                          "Bilinmeyen Kullanıcı"}
                                </td>

                                <td>
                                    <Button
                                        onClick={() =>
                                            onOpenConversation(
                                                otherUserId
                                            )
                                        }
                                        className="rounded bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-700"
                                    >
                                        {isSameUser
                                            ? "Mesajın Var"
                                            : "Cevap Ver"}
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