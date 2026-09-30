import { useSearchParams } from "react-router-dom";

import { useCategories } from "@/features/categories/hooks/useCategories";
import AdList from "../components/AdList";
import { useAdList } from "../hooks/useAds";

export default function BrowseAds() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const subcategory = searchParams.get("subcategory") ?? "";
  const { getLabel } = useCategories();
  const query = useAdList({ search, subcategory });

  const activeFilter = search || (subcategory && getLabel(subcategory));

  return (
    <div>
      <h1 className="mb-6 text-left text-2xl font-semibold text-gray-700">
        Workist&apos;te Neler <span className="text-purple-700">Yapılıyor 🧙‍♂️</span>
        <span className="ml-2 text-xl text-gray-400">
          {activeFilter ? `${activeFilter} için sonuçlar` : "Tüm İlanlar"}
        </span>
      </h1>
      <AdList query={query} emptyMessage="Aramana uygun ilan bulunamadı." />
    </div>
  );
}
