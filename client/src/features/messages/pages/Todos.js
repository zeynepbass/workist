import { useState } from "react";
import toast from "react-hot-toast";

import MessagingUI from "@/features/messages/pages/Message";
import { Button } from "@/shared/components/atoms";
import { useMessages } from "@/features/messages/hooks/useMessages";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";

import ConversationTable from "../components/ConversationTable";

export default function Todos() {
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [showCheckboxes, setShowCheckboxes] =
        useState(false);
    const [selectedForDelete, setSelectedForDelete] =
        useState([]);

    const { userId, firstName: currentFirstName } = useCurrentUser();

    const {
        konusmalar,
        users,
        deleteMessages,
        isConversationsLoading,
    } = useMessages(userId, selectedId);

    const handleClick = (id) => {
        setSelectedId(id);
        setOpen(true);
    };

    const handleDeleteMessages = async () => {
        let hasError = false;

        for (const targetId of selectedForDelete) {
            try {
                await deleteMessages(
                    userId,
                    targetId
                );
            } catch (error) {
                hasError = true;
            }
        }

        if (hasError) {
            toast.error("Bazı konuşmalar silinemedi.");
        } else {
            toast.success("Seçilen konuşmalar silindi.");
        }

        setSelectedForDelete([]);
        setShowCheckboxes(false);
    };

    return (
        <div className="h-[100vh] p-4">

            <div className="mb-4 flex justify-between">
                <h4 className="text-lg font-semibold text-gray-400">
                    Todos
                </h4>

                <h4
                    className="cursor-pointer text-purple-600"
                    onClick={() =>
                        setShowCheckboxes(
                            (prev) => !prev
                        )
                    }
                >
                    {showCheckboxes
                        ? "İptal Et"
                        : "Yapılanları Temizle"}
                </h4>
            </div>

            <ConversationTable
                conversations={konusmalar}
                users={users}
                currentUserId={userId}
                currentFirstName={currentFirstName}
                isLoading={
                    isConversationsLoading
                }
                showCheckboxes={
                    showCheckboxes
                }
                selectedForDelete={
                    selectedForDelete
                }
                onSelectForDelete={
                    setSelectedForDelete
                }
                onOpenConversation={
                    handleClick
                }
            />

            {showCheckboxes &&
                selectedForDelete.length > 0 && (
                    <div className="mt-4 text-right">
                        <Button
                            onClick={
                                handleDeleteMessages
                            }
                            variant="danger"
                            className="px-4 py-2"
                        >
                            Seçilenleri Sil
                        </Button>
                    </div>
                )}

            {open && selectedId && (
                <MessagingUI
                    open={open}
                    onClose={() =>
                        setOpen(false)
                    }
                    adi={
                        users.find(
                            (user) =>
                                user._id ===
                                selectedId
                        )?.firstName ||
                        "Kullanıcı"
                    }
                    gonderenId={userId}
                    aliciId={selectedId}
                />
            )}
        </div>
    );
}