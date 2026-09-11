export default function ChatUserList({
    users,
    selectedUserId,
    onSelect,
    isLoading,
}) {
    if (isLoading) {
        return (
            <p className="text-gray-500">
                Kullanıcılar yükleniyor...
            </p>
        );
    }

    if (users.length === 0) {
        return (
            <p className="text-gray-500">
                Henüz mesajlaştığınız kullanıcı yok.
            </p>
        );
    }

    return (
        <ul className="h-[calc(100vh-150px)] space-y-2 overflow-y-auto">
            {users.map((user) => (
                <li
                    key={user._id}
                    onClick={() => onSelect(user._id)}
                    className={`
                        cursor-pointer rounded p-3
                        ${
                            selectedUserId === user._id
                                ? "bg-purple-100"
                                : "hover:bg-gray-100"
                        }
                    `}
                >
                    <div className="flex items-center gap-2">
                        <img
                            src={
                                user.file ||
                                "https://via.placeholder.com/40"
                            }
                            alt="Profil"
                            width="50"
                            height="50"
                            className="rounded-full"
                        />

                        <p className="text-sm font-medium">
                            {user.firstName} {user.lastName}
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    );
}