const SIZES = { sm: "h-10 w-10 text-sm", md: "h-12 w-12 text-base", lg: "h-24 w-24 text-2xl" };

export function Avatar({ user, size = "md" }) {
  const name = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Kullanıcı";

  if (user?.avatarUrl) {
    return (
      <img
        src={user.avatarUrl}
        alt={name}
        className={`${SIZES[size]} shrink-0 rounded-full object-cover`}
      />
    );
  }

  return (
    <span
      role="img"
      aria-label={name}
      className={`${SIZES[size]} inline-flex shrink-0 items-center justify-center rounded-full bg-purple-100 font-semibold text-purple-700`}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}
