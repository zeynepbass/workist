import { Avatar } from "@/shared/components/atoms";
import { StatusMessage } from "@/shared/components/molecules";

export default function ConversationList({ conversations, isLoading, selectedId, onSelect }) {
  if (isLoading) return <StatusMessage type="loading" message="Konuşmalar yükleniyor..." />;
  if (conversations.length === 0)
    return <StatusMessage type="empty" message="Henüz mesajlaştığınız kullanıcı yok." />;

  return (
    <ul className="space-y-2 overflow-y-auto">
      {conversations.map(({ partner, lastMessage }) => (
        <li key={partner.id}>
          <button
            type="button"
            aria-pressed={selectedId === partner.id}
            onClick={() => onSelect(partner.id)}
            className={`flex w-full items-center gap-3 rounded p-3 text-left ${selectedId === partner.id ? "bg-purple-100" : "hover:bg-gray-100"}`}
          >
            <Avatar user={partner} size="sm" />
            <span className="min-w-0">
              <span className="block text-sm font-medium">{partner.fullName}</span>
              <span className="block truncate text-xs text-gray-500">{lastMessage.text}</span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
