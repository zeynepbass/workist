import { useSearchParams } from "react-router-dom";

import ChatPanel from "../components/ChatPanel";
import ConversationList from "../components/ConversationList";
import { useConversations } from "../hooks/useConversations";

export default function Chat() {
  const [searchParams, setSearchParams] = useSearchParams();
  const partnerId = searchParams.get("partner");
  const { data: conversations = [], isLoading } = useConversations();

  return (
    <div className="flex h-[80vh] flex-col bg-gray-100 md:flex-row">
      <aside className="border-r bg-white p-4 md:w-1/3">
        <h1 className="mb-4 text-xl font-semibold">Gelen Kutusu</h1>
        <ConversationList
          conversations={conversations}
          isLoading={isLoading}
          selectedId={partnerId}
          onSelect={(id) => setSearchParams({ partner: id })}
        />
      </aside>
      <section className="flex flex-1 flex-col bg-gray-50" aria-label="Mesajlar">
        {partnerId ? (
          <ChatPanel partnerId={partnerId} />
        ) : (
          <p className="p-6 italic text-gray-500">Mesajlaşmak için bir kişi seçin.</p>
        )}
      </section>
    </div>
  );
}
