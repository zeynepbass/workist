import { useNavigate, useParams } from "react-router-dom";

import { BackButton, StatusMessage } from "@/shared/components/molecules";
import EditPortfolioForm from "../components/EditPortfolioForm";
import { usePortfolio } from "../hooks/usePortfolios";

export default function PortfolioDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: portfolio, isLoading, isError } = usePortfolio(id);

  if (isLoading)
    return <StatusMessage type="loading" message="Portfolyo bilgileri yükleniyor..." />;
  if (isError || !portfolio) return <StatusMessage type="error" message="Portfolyo bulunamadı." />;

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 pb-16 pt-4">
      <BackButton onClick={() => navigate(-1)} />
      <h1 className="text-2xl font-bold text-gray-800">Portfolyoyu Düzenle</h1>
      <EditPortfolioForm portfolio={portfolio} onSaved={() => navigate("/portfolyom")} />
    </div>
  );
}
