import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { useCategories } from "@/features/categories/hooks/useCategories";
import ChatWidget from "@/features/messages/components/ChatWidget";
import OrderRequestForm from "@/features/orders/components/OrderRequestForm";
import ReviewList from "@/features/orders/components/ReviewList";
import { Avatar, Button } from "@/shared/components/atoms";
import { BackButton, RatingStars, StatusMessage } from "@/shared/components/molecules";
import { useAd } from "../hooks/useAds";
import { AD_ADDON_OPTIONS, AD_EXTRA_OPTIONS } from "../schemas";

function IncludedOptions({ ad }) {
  const included = [
    ...AD_ADDON_OPTIONS.filter((option) => ad.addons?.[option.key]),
    ...AD_EXTRA_OPTIONS.filter((option) => ad.extras?.[option.key]),
  ];

  if (included.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-2">
      {included.map((option) => (
        <li key={option.key} className="rounded bg-purple-100 px-2 py-1 text-sm text-purple-800">
          {option.label}
        </li>
      ))}
    </ul>
  );
}

export default function AdDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userId } = useCurrentUser();
  const { getLabel } = useCategories();
  const [chatOpen, setChatOpen] = useState(false);
  const { data: ad, isLoading, isError } = useAd(id);

  if (isLoading) return <StatusMessage type="loading" message="İlan yükleniyor..." />;
  if (isError || !ad) return <StatusMessage type="error" message="İlan bulunamadı." />;

  const isOwner = ad.ownerId === userId;

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4">
      <BackButton onClick={() => navigate(-1)} />
      <div className="grid gap-6 md:grid-cols-3">
        <article className="space-y-4 md:col-span-2">
          <img
            src={ad.imageUrl}
            alt={ad.title}
            className="max-h-[400px] w-full rounded-lg object-cover"
          />
          <p className="text-sm text-gray-500">
            {getLabel(ad.category)} › {getLabel(ad.subcategory)} · {ad.serviceType}
          </p>
          <h1 className="text-2xl font-bold text-gray-900">{ad.title}</h1>
          <RatingStars rating={ad.rating} />
          <p className="whitespace-pre-line text-gray-700">{ad.description}</p>
          <IncludedOptions ad={ad} />
        </article>

        <aside className="space-y-4 rounded-lg bg-white p-4 shadow">
          <p className="text-2xl font-bold text-purple-900">{ad.price} TL</p>
          <p className="text-sm text-gray-600">
            Teslim: {ad.deliveryTime} · Revizyon: {ad.revisionCount}
          </p>
          <div className="flex items-center gap-3 border-t pt-4">
            <Avatar user={ad.owner} />
            <div>
              <p className="font-medium">{ad.owner?.fullName}</p>
              <RatingStars rating={ad.owner?.rating} />
            </div>
          </div>
          {isOwner ? (
            <Button
              variant="secondary"
              className="w-full py-2"
              onClick={() => navigate(`/ilanlarim/${ad.id}`)}
            >
              İlanı Düzenle
            </Button>
          ) : (
            <>
              <OrderRequestForm adId={ad.id} />
              <Button variant="secondary" className="w-full py-2" onClick={() => setChatOpen(true)}>
                Satıcıya Mesaj At
              </Button>
            </>
          )}
        </aside>
      </div>

      <section aria-label="Değerlendirmeler" className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-700">Değerlendirmeler</h2>
        <ReviewList filters={{ adId: ad.id }} />
      </section>

      {chatOpen && <ChatWidget partner={ad.owner} onClose={() => setChatOpen(false)} />}
    </div>
  );
}
