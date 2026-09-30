import { useSearchParams } from "react-router-dom";

import AdList from "../components/AdList";
import { useAdSearch } from "../hooks/useAdSearch";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { StatusMessage } from "@/shared/components/molecules";

export default function BrowseAds() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const subcategory = searchParams.get("subcategory") || "";

  const { getLabel } = useCategories();
  const { ads, isLoading, isError } = useAdSearch({ search, subcategory });

  const activeFilter = search || (subcategory && getLabel(subcategory));

  if (isLoading) {
    return <StatusMessage type="loading" message="İlanlar yükleniyor..." />;
  }

  if (isError) {
    return <StatusMessage type="error" message="İlanlar yüklenirken bir hata oluştu." />;
  }

  return (
    <div className="h-[100vh]">
      <p className="text-gray-700 text-2xl font-semibold mb-6 text-left">
        Workist&apos;te Nelere <span className="text-purple-700">Yapıldı 🧙‍♂️</span>
        <span className="text-xl text-gray-400 mb-5 ml-2">
          {activeFilter ? `${activeFilter} için sonuçlar:` : "Tüm İlanlar"}
        </span>
      </p>

      <AdList ads={ads} />
    </div>
  );
}
