import { useMemo, useState } from "react";

import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import ChatWidget from "@/features/messages/components/ChatWidget";
import { StatusMessage } from "@/shared/components/molecules";
import { useBuyerRequests } from "../hooks/useBuyerRequests";
import { useExpandedIds } from "../hooks/useExpandedIds";
import BuyerHeader from "../components/BuyerHeader";
import BuyerRequestList from "../components/BuyerRequestList";

export default function BuyerRequests() {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const { expandedIds, toggleExpanded } = useExpandedIds();

  const { userId } = useCurrentUser();
  const { requests, isLoading, isError } = useBuyerRequests(userId);

  const newestFirst = useMemo(() => [...requests].reverse(), [requests]);

  if (isLoading) {
    return <StatusMessage type="info" message="Alıcı istekleri yükleniyor..." />;
  }

  if (isError) {
    return <StatusMessage type="error" message="Alıcı istekleri yüklenirken bir hata oluştu." />;
  }

  return (
    <div className="mx-auto p-4 rounded-lg h-[100vh] overflow-auto">
      <BuyerHeader />

      <BuyerRequestList
        requests={newestFirst}
        expandedIds={expandedIds}
        onToggleText={toggleExpanded}
        onMessage={setSelectedRequest}
      />

      {selectedRequest && (
        <ChatWidget
          open
          onClose={() => setSelectedRequest(null)}
          partnerName={selectedRequest.ownerName}
          userId={userId}
          partnerId={selectedRequest.userId}
        />
      )}
    </div>
  );
}
