import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import { Button } from "@/shared/components/atoms";
import { usePortfolio } from "../hooks/usePortfolio";
import PortfolioForm from "./PortfolioForm";

export default function PortfolioDetail  () {
    const { id } = useParams();
    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");

    const {
        detail,
        isDetailLoading,
        isDetailError,
        updatePortfolio,
        isUpdating,
    } = usePortfolio("", userId, id);

    const handleBack = () => {
        navigate(-1);
    };

    if (isDetailLoading) {
        return (
            <div className="flex justify-center items-center p-10">
                <p className="text-gray-500">
                    Portfolyo bilgileri yükleniyor...
                </p>
            </div>
        );
    }

    if (isDetailError) {
        return (
            <div className="flex justify-center items-center p-10">
                <p className="text-red-500">
                    Portfolyo bilgileri yüklenirken bir hata oluştu.
                </p>
            </div>
        );
    }

    if (!detail) {
        return (
            <div className="flex justify-center items-center p-10">
                <p className="text-gray-500">
                    Portfolyo bulunamadı.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-8xl mx-auto px-[150px]">

            <Button
                type="button"
                onClick={handleBack}
                className="flex items-center text-purple-600 hover:text-purple-800 py-5"
            >
                <FaArrowLeft className="mr-2" />
                Geri Dön
            </Button>

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
    );
};

