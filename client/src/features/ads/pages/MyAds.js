import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { PostSort, TopHeader } from "@/shared/components/molecules";
import AdList from "../components/AdList";
import CreateAdDialog from "../components/CreateAdDialog";
import { useAdList, useDeleteAd } from "../hooks/useAds";

export default function MyAds() {
  const navigate = useNavigate();
  const [sort, setSort] = useState("newest");
  const query = useAdList({ owner: "me", sort });
  const deleteAd = useDeleteAd();

  return (
    <div className="p-4">
      <TopHeader
        title="İş İlanlarım"
        desc="Tüm iş ilanlarını buradan takip edebilir, yönetebilir ve yeni iş ilanları oluşturabilirsin."
      />
      <div className="flex flex-wrap items-end justify-between gap-4">
        <PostSort sortType={sort} onChange={(event) => setSort(event.target.value)} />
        <CreateAdDialog />
      </div>
      <AdList
        query={query}
        onEdit={(id) => navigate(`/ilanlarim/${id}`)}
        onDelete={(id) => deleteAd.mutate(id)}
        isDeleting={deleteAd.isPending}
        emptyMessage="Henüz ilanın yok. İlk ilanını oluştur!"
      />
    </div>
  );
}
