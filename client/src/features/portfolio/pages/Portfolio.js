import { useState, useMemo, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";

import { usePortfolio } from "@/features/portfolio/hooks/usePortfolio";

import PortfolioList from "../components/PortfolioList";
import PortfolioFilters from "../components/PortfolioFilters";

import {
    StatusMessage,
    TopHeader,
} from "@/shared/components/molecules";

const Modal = lazy(() =>
    import("@/shared/components/organism").then(
        (module) => ({
            default: module.Modal,
        })
    )
);

export default function Portfolio() {
    const navigate = useNavigate();

    const [filtreDurum, setFiltreDurum] =
        useState("yayinda");

    const login = JSON.parse(
        localStorage.getItem("login") || "null"
    );

    const userId = login?.result?._id;
    const firstName = login?.result?.firstName;
    const unvan = login?.result?.unvan;

    const {
        userPortfolios,
        isUserPortfoliosLoading,
        isUserPortfoliosError,

        deletePortfolio,
        isDeleting,

        toggleDurum,
        isUpdatingStatus,

    } = usePortfolio("", userId);

    const handleEditClick = (id) => {
        navigate(`/portfolyom/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await deletePortfolio(id);
        } catch (error) {
            console.error(
                "Portfolyo silme hatası:",
                error
            );
        }
    };

    const filtrelenmisPortfolyolar = useMemo(() => {
        if (!userPortfolios) return [];

        return userPortfolios.filter((portfolio) => {
            if (filtreDurum === "yayinda") {
                return portfolio.durum === "yayinda";
            }

            return portfolio.durum !== "yayinda";
        });
    }, [userPortfolios, filtreDurum]);

    if (isUserPortfoliosLoading) {
        return (
            <StatusMessage
                type="loading"
                message="Portfolyolar yükleniyor..."
            />
        );
    }

    if (isUserPortfoliosError) {
        return (
            <StatusMessage
                type="error"
                message="Portfolyolar yüklenirken bir hata oluştu."
            />
        );
    }

    return (
        <div className="p-4 h-[100vh]">
            <TopHeader
                title="Portfolyom"
                desc="Tüm portfolyonu buradan takip edebilir, yönetebilir ve yeni portfolyolar ekleyebilirsin."
            />

            <Suspense fallback={<div>Yükleniyor...</div>}>
                <Modal
                    type="portfolio"
                    userId={userId}
                />
            </Suspense>

            <PortfolioFilters
                value={filtreDurum}
                onChange={(e) =>
                    setFiltreDurum(e.target.value)
                }
            />

            <PortfolioList
                portfolios={filtrelenmisPortfolyolar}
                firstName={firstName}
                unvan={unvan}
                userId={userId}
                onToggleStatus={toggleDurum}
                onEdit={handleEditClick}
                onDelete={handleDelete}
                isDeleting={isDeleting}
                isUpdatingStatus={isUpdatingStatus}
            />
        </div>
    );
}