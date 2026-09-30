export default function userAdapter(user) {
  if (!user) return null;

  return {
    id: user._id || user.id,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    phone: user.phone || "",
    about: user.about || "",
    avatar: user.avatar || "",
    title: user.title || "",
    skills: user.skills || [],
    certificates: user.certificates || [],
  };
}
