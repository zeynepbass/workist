import { useNavigate, useParams } from "react-router-dom";

import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { BackButton, StatusMessage } from "@/shared/components/molecules";
import AdsInfo from "../components/AdsInfo";
import AdsWarning from "../components/AdsWarning";
import EditAdForm from "../components/EditAdForm";
import { useAd } from "../hooks/useAds";

export default function EditAd() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userId } = useCurrentUser();
  const { data: ad, isLoading, isError } = useAd(id);

  if (isLoading) return <StatusMessage type="loading" message="İlan bilgileri yükleniyor..." />;
  if (isError || !ad) return <StatusMessage type="error" message="İlan bulunamadı." />;
  if (userId && ad.ownerId !== userId)
    return <StatusMessage type="error" message="Bu ilanı düzenleme yetkin yok." />;

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-4 pb-16 pt-6">
      <BackButton onClick={() => navigate(-1)} />
      <h1 className="text-2xl font-bold text-gray-900">İlanı Düzenle</h1>
      <AdsInfo />
      <AdsWarning />
      <EditAdForm ad={ad} onSaved={() => navigate("/ilanlarim")} />
    </div>
  );
}
