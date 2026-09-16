
import { useLocation } from "react-router-dom";

import { usePortfolio } from "@/features/portfolio/hooks/usePortfolio";
import PortfolioList from "@/features/portfolio/components/PortfolioList";
import { StatusMessage } from "@/shared/components/molecules";

export default function General() {
    const location = useLocation();

    const searchParams = new URLSearchParams(
        location.search
    );

    const searchQuery =
        searchParams.get("search") || "";

    const login = JSON.parse(
        localStorage.getItem("login") || "null"
    );

    const firstName =
        login?.result?.firstName ||
        login?.firstName;

    const {
        posts,
        isLoading,
        isError,
    } = usePortfolio(searchQuery);

    if (isLoading) {
        return (
            <StatusMessage
                type="loading"
                message="İlanlar yükleniyor..."
            />
        );
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
        <div className="h-[100vh]">
            <p className="text-gray-700 text-2xl font-semibold mb-6 text-left">
                Workis'te Nelere{" "}
                <span className="text-purple-700">
                    Yapıldı 🧙‍♂️
                </span>

                <span className="text-xl text-gray-400 mb-5 ml-2">
                    {searchQuery
                        ? `${searchQuery} için sonuçlar:`
                        : "Tüm İlanlar"}
                </span>
            </p>

            <PortfolioList
                posts={posts}
                firstName={firstName}
            />
        </div>
    );
}
