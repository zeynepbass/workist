import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TopHeader } from "@/shared/components/molecules";
import CreatePortfolioDialog from "../components/CreatePortfolioDialog";
import PortfolioFilters from "../components/PortfolioFilters";
import PortfolioList from "../components/PortfolioList";
import {
  useDeletePortfolio,
  usePortfolioList,
  useTogglePortfolioStatus,
} from "../hooks/usePortfolios";

export default function Portfolio() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const query = usePortfolioList({ owner: "me", status: status || undefined });
  const deletePortfolio = useDeletePortfolio();
  const toggleStatus = useTogglePortfolioStatus();

  return (
    <div className="p-4">
      <TopHeader
        title="Portfolyom"
        desc="Tüm portfolyonu buradan takip edebilir, yönetebilir ve yeni portfolyolar ekleyebilirsin."
      />
      <div className="flex flex-wrap items-end justify-between gap-4">
        <PortfolioFilters value={status} onChange={setStatus} />
        <CreatePortfolioDialog />
      </div>
      <PortfolioList
        query={query}
        onToggleStatus={(variables) => toggleStatus.mutate(variables)}
        onEdit={(id) => navigate(`/portfolyom/${id}`)}
        onDelete={(id) => deletePortfolio.mutate(id)}
      />
    </div>
  );
}
