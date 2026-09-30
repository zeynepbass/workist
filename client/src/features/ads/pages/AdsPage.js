import { useMemo, useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";

import AdList from "../components/AdList";
import { PostSort, TopHeader, StatusMessage } from "@/shared/components/molecules";
import { useAds } from "../hooks/useAds";

const Modal = lazy(() =>
  import("@/shared/components/organisms").then((module) => ({
    default: module.Modal,
  })),
);

function sortByCreatedAt(ads, sortType) {
  const sorted = [...ads];

  if (sortType === "oldToNew") {
    sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }

  if (sortType === "newToOld") {
    sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return sorted;
}

export default function AdsPage() {
  const [sortType, setSortType] = useState("all");
  const navigate = useNavigate();

  const { ads, userId, firstName, createAd, isLoading, isError, deleteAd, isDeleting } = useAds();

  const sortedAds = useMemo(() => sortByCreatedAt(ads, sortType), [ads, sortType]);

  if (isLoading) {
    return <StatusMessage type="loading" message="İlanlar yükleniyor..." />;
  }

  if (isError) {
    return <StatusMessage type="error" message="İlanlar yüklenirken bir hata oluştu." />;
  }

  return (
    <div className="p-4 h-[100vh]">
      <TopHeader
        title="İş İlanlarım"
        desc="Tüm iş ilanlarını buradan takip edebilir, yönetebilir ve yeni iş ilanları oluşturabilirsin."
      />

      <PostSort sortType={sortType} onChange={(e) => setSortType(e.target.value)} />
      <Suspense fallback={<div>Yükleniyor...</div>}>
        <Modal type="ads" onCreate={createAd} userId={userId} firstName={firstName} />
      </Suspense>

      <AdList
        ads={sortedAds}
        userId={userId}
        onEdit={(id) => navigate(`/ilanlarim/${id}`)}
        onDelete={deleteAd}
        isDeleting={isDeleting}
      />
    </div>
  );
}
