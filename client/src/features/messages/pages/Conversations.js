import { useState } from "react";

import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { Button } from "@/shared/components/atoms";
import { StatusMessage } from "@/shared/components/molecules";
import ChatWidget from "../components/ChatWidget";
import ConversationTable from "../components/ConversationTable";
import { useConversations, useDeleteConversations } from "../hooks/useConversations";

export default function Conversations() {
  const { userId } = useCurrentUser();
  const { data: conversations = [], isLoading, isError } = useConversations();
  const deleteConversations = useDeleteConversations();
  const [selecting, setSelecting] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [openPartner, setOpenPartner] = useState(null);

  const toggle = (id) =>
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );

  const deleteSelected = () =>
    deleteConversations.mutate(selectedIds, {
      onSettled: () => {
        setSelectedIds([]);
        setSelecting(false);
      },
    });

  if (isLoading) return <StatusMessage type="loading" message="Konuşmalar yükleniyor..." />;
  if (isError) return <StatusMessage type="error" message="Konuşmalar yüklenemedi." />;

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between">
        <h1 className="text-lg font-semibold text-gray-500">Konuşmalar</h1>
        <Button className="text-purple-600" onClick={() => setSelecting((current) => !current)}>
          {selecting ? "İptal Et" : "Konuşmaları Temizle"}
        </Button>
      </div>

      <ConversationTable
        conversations={conversations}
        currentUserId={userId}
        selectable={selecting}
        selectedIds={selectedIds}
        onToggle={toggle}
        onOpen={setOpenPartner}
      />

      {selecting && selectedIds.length > 0 && (
        <div className="mt-4 text-right">
          <Button
            variant="danger"
            className="px-4 py-2"
            onClick={deleteSelected}
            disabled={deleteConversations.isPending}
          >
            Seçilenleri Sil
          </Button>
        </div>
      )}

      {openPartner && <ChatWidget partner={openPartner} onClose={() => setOpenPartner(null)} />}
    </div>
  );
}
