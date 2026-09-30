import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/shared/components/atoms";
import { useMessages } from "../hooks/useMessages";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import ConversationTable from "../components/ConversationTable";
import ChatWidget from "../components/ChatWidget";

export default function Conversations() {
  const [selectedPartnerId, setSelectedPartnerId] = useState(null);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedForDelete, setSelectedForDelete] = useState([]);

  const { userId, firstName } = useCurrentUser();

  const { conversations, users, deleteConversation, isConversationsLoading } = useMessages(
    userId,
    selectedPartnerId,
  );

  const handleDeleteSelected = async () => {
    const results = await Promise.allSettled(
      selectedForDelete.map((partnerId) => deleteConversation(partnerId)),
    );

    if (results.some((result) => result.status === "rejected")) {
      toast.error("Bazı konuşmalar silinemedi.");
    } else {
      toast.success("Seçilen konuşmalar silindi.");
    }

    setSelectedForDelete([]);
    setShowCheckboxes(false);
  };

  const selectedPartner = users.find((user) => user.id === selectedPartnerId);

  return (
    <div className="h-[100vh] p-4">
      <div className="mb-4 flex justify-between">
        <h1 className="text-lg font-semibold text-gray-400">Konuşmalar</h1>

        <Button
          className="cursor-pointer text-purple-600"
          onClick={() => setShowCheckboxes((previous) => !previous)}
        >
          {showCheckboxes ? "İptal Et" : "Konuşmaları Temizle"}
        </Button>
      </div>

      <ConversationTable
        conversations={conversations}
        users={users}
        currentUserId={userId}
        currentFirstName={firstName}
        isLoading={isConversationsLoading}
        showCheckboxes={showCheckboxes}
        selectedForDelete={selectedForDelete}
        onSelectForDelete={setSelectedForDelete}
        onOpenConversation={setSelectedPartnerId}
      />

      {showCheckboxes && selectedForDelete.length > 0 && (
        <div className="mt-4 text-right">
          <Button onClick={handleDeleteSelected} variant="danger" className="px-4 py-2">
            Seçilenleri Sil
          </Button>
        </div>
      )}

      {selectedPartnerId && (
        <ChatWidget
          open
          onClose={() => setSelectedPartnerId(null)}
          partnerName={selectedPartner?.firstName || "Kullanıcı"}
          userId={userId}
          partnerId={selectedPartnerId}
        />
      )}
    </div>
  );
}
