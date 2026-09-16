import { useMemo, useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";


import  AdList from "../components/AdList";

import { PostSort,TopHeader ,StatusMessage} from "@/shared/components/molecules";


import { useAds } from "../hooks/useAds";

const Modal = lazy(() =>
  import("@/shared/components/organism").then((module) => ({
    default: module.Modal,
  }))
);
export default function AdsPage() {
  const [sortType, setSortType] = useState("all");

  const {
    data: posts = [],
    userId,
    createWorkPost,
    firstName,
    isLoading,
    isError,
    deleteAds,
    isDeleting,
  } = useAds();

  const navigate = useNavigate();

  const sortedPosts = useMemo(() => {
    const sorted = [...posts];

    if (sortType === "oldToNew") {
      sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    if (sortType === "newToOld") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return sorted;
  }, [posts, sortType]);

  const handleChange = (e) => {
    setSortType(e.target.value);
  };

  const handleEditClick = (id) => {
    navigate(`/ilanlarim/${id}`);
  };

  if (isLoading) {
    return <StatusMessage type="loading" message="İlanlar yükleniyor..." />;
  }

  if (isError) {
    return (
      <StatusMessage
        type="error"
        message="İlanlar yüklenirken bir hata oluştu."
      />
    );
  }

  return (
    <div className="p-4 h-[100vh]">
      
      <TopHeader
        title="İş İlanlarım"
        desc="Tüm iş ilanlarını buradan takip edebilir,
                yönetebilir ve yeni iş ilanları
                oluşturabilirsin."
      />

      <PostSort sortType={sortType} onChange={handleChange} />
      <Suspense fallback={<div>Yükleniyor...</div>}>
      <Modal
    type="ads"
    createWorkPost={createWorkPost}
    userId={userId}
    firstName={firstName}
/>
      </Suspense>

      <AdList
        posts={sortedPosts}
        userId={userId}
        firstName={firstName}
        onEdit={handleEditClick}
        onDelete={deleteAds}
        isDeleting={isDeleting}
      />
    </div>
  );
};


