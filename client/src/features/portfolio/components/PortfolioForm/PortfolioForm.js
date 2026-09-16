import { useEffect, useState } from "react";

import {
    Textarea,
    Button,
    Input,
    Select,
} from "@/shared/components/atoms";
import toast from "react-hot-toast";
import PortfolioImageUpload from "../PortfolioImageUpload";

export default function PortfolioForm({
    detail,
    userId,
    onSubmit,
    isUpdating,
}) {
    const [formData, setFormData] = useState({
        title: "",
        durum: "yayinda",
        fiyat: "",
        description: "",
        file: "",
        currency: "TL",
        selectedCategory: "",
        userId,
    });

    useEffect(() => {
        if (!detail) return;

        setFormData({
            title: detail.title || "",
            durum: detail.durum || "yayinda",
            fiyat: detail.fiyat || "",
            description: detail.description || "",
            file: detail.file || "",
            currency: detail.currency || "TL",
            selectedCategory:
                detail.selectedCategory || "",
            userId: detail.userId || userId,
        });
    }, [detail, userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            setFormData((prev) => ({
                ...prev,
                file: reader.result,
            }));
        };

        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            formData.title === "" ||
            formData.durum === "" ||
            formData.description === "" ||
            formData.file === "" ||
            Number(formData.fiyat) < 100
        ) {
            toast.error("Tüm alanları doldurun ve fiyat en az 100 TL olmalıdır!");

            return;
        }

        try {
            await onSubmit(formData);
        } catch (error) {
            // hata toast'u zaten mutation onError'da gösteriliyor
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-6">

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    <Select
                        label="Kategori Seçimi*"
                        name="selectedCategory"
                        value={formData.selectedCategory}
                        onChange={handleChange}
                        options={[
                            {
                                value: "Grafik & Tasarım",
                                label: "Grafik & Tasarım",
                            },
                            {
                                value: "Yazı & Çeviri",
                                label: "Yazı & Çeviri",
                            },
                            {
                                value: "Yazılım & Teknoloji",
                                label: "Yazılım & Teknoloji",
                            },
                        ]}
                    />

                    <Select
                        label="Yayın Durumu*"
                        name="durum"
                        value={formData.durum}
                        onChange={handleChange}
                        options={[
                            {
                                value: "yayinda",
                                label: "Yayında",
                            },
                            {
                                value: "yayindaDegil",
                                label: "Yayında Değil",
                            },
                        ]}
                        placeholder={null}
                    />

                    <Input
                        label="Başlığınızla ziyaretçiyi etkile*"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Portfolyonuz için başlık girin"
                        variant="default"
                    />

                    <div className="flex items-end gap-2">
                        <div className="flex-1">
                            <Input
                                label="Fiyat*"
                                type="number"
                                name="fiyat"
                                value={formData.fiyat}
                                onChange={handleChange}
                                placeholder="En az 100 TL"
                                variant="default"
                            />
                        </div>

                        <div className="w-24 shrink-0">
                            <Select
                                name="currency"
                                value={formData.currency}
                                onChange={handleChange}
                                options={[
                                    {
                                        value: "TL",
                                        label: "TL",
                                    },
                                    {
                                        value: "USD",
                                        label: "USD",
                                    },
                                ]}
                                placeholder={null}
                            />
                        </div>
                    </div>
                </div>

                <Textarea
                    label="Portfolyonuzu Detaylıca Açıklayın*"
                    name="description"
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Detaylı açıklama girin"
                    variant="default"
                />

                <PortfolioImageUpload
                    file={formData.file}
                    onChange={handleFileChange}
                />

                <div className="flex justify-center pt-2">
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={isUpdating}
                        className="px-10 py-3"
                    >
                        {isUpdating
                            ? "Güncelleniyor..."
                            : "Güncelle"}
                    </Button>
                </div>

            </div>
        </form>
    );
};
