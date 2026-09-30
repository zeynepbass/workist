import { useState, useMemo, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";

import { usePortfolio } from "../hooks/usePortfolio";
import PortfolioList from "../components/PortfolioList";
import PortfolioFilters from "../components/PortfolioFilters";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { StatusMessage, TopHeader } from "@/shared/components/molecules";

const Modal = lazy(() =>
  import("@/shared/components/organisms").then((module) => ({
    default: module.Modal,
  })),
);

export default function Portfolio() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("published");

  const { userId, firstName, user } = useCurrentUser();

  const {
    portfolios,
    isPortfoliosLoading,
    isPortfoliosError,
    createPortfolio,
    deletePortfolio,
    isDeleting,
    updatePortfolioStatus,
  } = usePortfolio();

  const filteredPortfolios = useMemo(
    () =>
      portfolios.filter(
        (portfolio) => (portfolio.status === "published") === (statusFilter === "published"),
      ),
    [portfolios, statusFilter],
  );

  if (isPortfoliosLoading) {
    return <StatusMessage type="loading" message="Portfolyolar yükleniyor..." />;
  }

  if (isPortfoliosError) {
    return <StatusMessage type="error" message="Portfolyolar yüklenirken bir hata oluştu." />;
  }

  return (
    <div className="p-4 h-[100vh]">
      <TopHeader
        title="Portfolyom"
        desc="Tüm portfolyonu buradan takip edebilir, yönetebilir ve yeni portfolyolar ekleyebilirsin."
      />

      <Suspense fallback={<div>Yükleniyor...</div>}>
        <Modal type="portfolio" onCreate={createPortfolio} />
      </Suspense>

      <PortfolioFilters value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} />

      <PortfolioList
        portfolios={filteredPortfolios}
        firstName={firstName}
        title={user?.title}
        userId={userId}
        onToggleStatus={updatePortfolioStatus}
        onEdit={(id) => navigate(`/portfolyom/${id}`)}
        onDelete={deletePortfolio}
        isDeleting={isDeleting}
      />
    </div>
  );
}
