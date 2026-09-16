import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import { Button } from "@/shared/components/atoms";
import { StatusMessage } from "@/shared/components/molecules";
import { usePortfolio } from "../hooks/usePortfolio";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import PortfolioForm from "../components/PortfolioForm";

export default function PortfolioDetail  () {
    const { id } = useParams();
    const navigate = useNavigate();

    const { userId } = useCurrentUser();

    const {
        detail,
        isDetailLoading,
        isDetailError,
        updatePortfolio,
        isUpdating,
    } = usePortfolio("", id);

    const handleBack = () => {
        navigate(-1);
    };

    if (isDetailLoading) {
        return (
            <StatusMessage
                type="loading"
                message="Portfolyo bilgileri yükleniyor..."
            />
        );
    }

    if (isDetailError) {
        return (
            <StatusMessage
                type="error"
                message="Portfolyo bilgileri yüklenirken bir hata oluştu."
            />
        );
    }

    if (!detail) {
        return (
            <StatusMessage
                type="error"
                message="Portfolyo bulunamadı."
            />
        );
    }

    return (
        <div className="mx-auto max-w-4xl space-y-6 px-4 pb-16 pt-4 sm:px-6">

            <Button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-2 text-purple-600 hover:text-purple-800"
            >
                <FaArrowLeft />
                Geri Dön
            </Button>

            <div>
                <h1 className="text-2xl font-bold text-gray-800">
                    Portfolyoyu Düzenle
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Portfolyo bilgilerini güncelleyip değişiklikleri kaydedebilirsin.
                </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                <PortfolioForm
                    detail={detail}
                    userId={userId}
                    onSubmit={async (formData) => {
                        await updatePortfolio({
                            id,
                            formData,
                        });

                        navigate(-1);
                    }}
                    isUpdating={isUpdating}
                />
            </div>

        </div>
    );
};
