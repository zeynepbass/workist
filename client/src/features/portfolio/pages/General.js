import { useLocation } from "react-router-dom";
import { usePortfolio } from "@/features/portfolio/hooks/usePortfolio";
import PortfolioList from "@/features/portfolio/components/PortfolioList";

export default function General() {
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search") || "";

    const {
        posts,
        isLoading,
        isError,
    } = usePortfolio(searchQuery);

    const login = JSON.parse(localStorage.getItem("login"));
    const firstName = login?.result?.firstName;

    if (isLoading) {
        return (
            <p className="text-gray-500 p-4">
                İlanlar yükleniyor...
            </p>
        );
    }

    if (isError) {
        return (
            <p className="text-red-500 p-4">
                İlanlar yüklenirken bir hata oluştu.
            </p>
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