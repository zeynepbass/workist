const AVATAR_PLACEHOLDER = "https://via.placeholder.com/40";

export default function ChatUserList({ users, selectedUserId, onSelect, isLoading }) {
  if (isLoading) {
    return <p className="text-gray-500">Kullanıcılar yükleniyor...</p>;
  }

  if (users.length === 0) {
    return <p className="text-gray-500">Henüz mesajlaştığınız kullanıcı yok.</p>;
  }

  return (
    <ul className="h-[calc(100vh-150px)] space-y-2 overflow-y-auto">
      {users.map((user) => (
        <li key={user.id}>
          <button
            type="button"
            onClick={() => onSelect(user.id)}
            aria-pressed={selectedUserId === user.id}
            className={`w-full cursor-pointer rounded p-3 text-left ${
              selectedUserId === user.id ? "bg-purple-100" : "hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center gap-2">
              <img
                src={user.avatar || AVATAR_PLACEHOLDER}
                alt={`${user.firstName} ${user.lastName}`}
                width="50"
                height="50"
                className="rounded-full"
              />

              <p className="text-sm font-medium">
                {user.firstName} {user.lastName}
              </p>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}
