import BuyerRequestCard from "../BuyerRequestCard";

export default function BuyerRequestList({ requests, expandedIds, onToggleText, onMessage }) {
  if (!requests || requests.length === 0) {
    return <p className="text-gray-400">Alıcı isteği bulunamadı.</p>;
  }

  return (
    <>
      {requests.map((request) => (
        <BuyerRequestCard
          key={request.id}
          request={request}
          expanded={Boolean(expandedIds[request.id])}
          onToggleText={onToggleText}
          onMessage={onMessage}
        />
      ))}
    </>
  );
}
