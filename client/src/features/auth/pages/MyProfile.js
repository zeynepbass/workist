import { Link } from "react-router-dom";

import ReviewList from "@/features/orders/components/ReviewList";
import { Avatar } from "@/shared/components/atoms";
import { RatingStars, StatusMessage } from "@/shared/components/molecules";
import { useCurrentUser } from "../hooks/useCurrentUser";

function Card({ title, action, children }) {
  return (
    <section className="rounded-[10px] bg-white p-4 shadow" aria-label={title}>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-gray-600">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

const editLink = (
  <Link to="/hesabim" className="text-purple-600">
    Düzenle
  </Link>
);

export default function MyProfile() {
  const { user, isLoading } = useCurrentUser();

  if (isLoading || !user) {
    return <StatusMessage type="loading" message="Profil yükleniyor..." />;
  }

  return (
    <div className="flex min-h-[90vh] flex-col gap-6 px-4 md:flex-row md:px-12">
      <div className="w-full space-y-4 md:w-1/3">
        <Card title="Profil" action={editLink}>
          <Avatar user={user} size="lg" />
          <p className="mt-3 font-medium">{user.fullName}</p>
          <p className="italic text-gray-400">{user.title || "Ünvan eklenmedi."}</p>
          <RatingStars rating={user.rating} />
        </Card>
        <Card title="Hakkında" action={editLink}>
          <p className="text-sm text-gray-500">{user.about || "Henüz bir şey yazılmadı."}</p>
        </Card>
        <Card title="Uzmanı Olduğu Alanlar & Araçlar" action={editLink}>
          <ul className="flex flex-wrap gap-2">
            {user.skills.map((skill) => (
              <li key={skill} className="rounded border border-gray-300 p-2">
                {skill}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="w-full space-y-4 md:w-2/3">
        <Card
          title="Verdiğin Hizmetler"
          action={
            <Link to="/ilanlarim" className="text-purple-600">
              İlanlarını yönet
            </Link>
          }
        >
          <p className="text-sm text-gray-500">
            İlanlarını ve portfolyonu yöneterek alıcılara neler yapabildiğini göster.
          </p>
          <Link to="/portfolyom" className="mt-2 inline-block text-purple-600">
            Portfolyoma git
          </Link>
        </Card>
        <Card title="Tüm Değerlendirmeler">
          <ReviewList filters={{ sellerId: user.id }} />
        </Card>
      </div>
    </div>
  );
}
