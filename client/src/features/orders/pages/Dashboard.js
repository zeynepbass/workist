import { useState } from "react";
import { Link } from "react-router-dom";

import AdsPage from "@/features/ads/pages/AdsPage";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import ChatWidget from "@/features/messages/components/ChatWidget";
import { StatusMessage } from "@/shared/components/molecules";
import { useBuyerRequests } from "../hooks/useBuyerRequests";
import { useExpandedIds } from "../hooks/useExpandedIds";
import BuyerRequestCard from "../components/BuyerRequestCard";
import BuyerHeader from "../components/BuyerHeader";

export default function Dashboard() {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const { expandedIds, toggleExpanded } = useExpandedIds();

  const { user, userId } = useCurrentUser();
  const { requests, isLoading, isError } = useBuyerRequests(userId);

  const latestRequest = requests[0];

  if (isLoading) {
    return <StatusMessage type="info" message="Yükleniyor..." />;
  }

  if (isError) {
    return <StatusMessage type="error" message="İlanlar yüklenirken bir hata oluştu." />;
  }

  return (
    <div className="w-full px-4 md:px-12 lg:px-20 relative">
      <div className="flex justify-left pl-2 items-center">
        {user?.avatar && (
          <img className="rounded-full p-3 h-40 w-40" src={user.avatar} alt="Profil" />
        )}

        <ul className="pl-5">
          <li className="text-gray-800 text-[30px]">
            Merhaba <strong>{user?.firstName} 👋</strong>
          </li>

          <li className="text-gray-800 text-[20px] font-mono">Workist&apos;e tekrar hoş geldin!</li>
        </ul>
      </div>

      <BuyerHeader />

      <br />

      {latestRequest ? (
        <BuyerRequestCard
          request={latestRequest}
          expanded={Boolean(expandedIds[latestRequest.id])}
          onToggleText={toggleExpanded}
          onMessage={setSelectedRequest}
        />
      ) : (
        <p className="text-gray-400">Son veri bulunamadı.</p>
      )}

      {selectedRequest && (
        <ChatWidget
          open
          onClose={() => setSelectedRequest(null)}
          partnerName={selectedRequest.ownerName}
          userId={userId}
          partnerId={selectedRequest.userId}
        />
      )}

      <br />

      <div className="flex justify-between items-center pt-5">
        <h2 className="text-center text-gray-600">
          Yayındaki <strong>İlanlarım</strong>
        </h2>

        <Link to="/ilanlarim" className="text-purple-300 text-right">
          Tüm ilanlarım
        </Link>
      </div>

      <AdsPage />
    </div>
  );
}
