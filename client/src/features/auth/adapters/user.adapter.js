export function publicUserAdapter(user) {
  if (!user) return null;

  return {
    id: user.id,
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    fullName: [user.firstName, user.lastName].filter(Boolean).join(" "),
    title: user.title ?? "",
    avatarUrl: user.avatarUrl ?? null,
    rating: user.rating ?? { average: 0, count: 0 },
  };
}

export function privateUserAdapter(user) {
  if (!user) return null;

  return {
    ...publicUserAdapter(user),
    email: user.email,
    phone: user.phone ?? "",
    about: user.about ?? "",
    skills: user.skills ?? [],
    certificates: user.certificates ?? [],
  };
}
