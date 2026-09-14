import { useEffect, useState } from "react";

import {
    Textarea,
    Button,
    Input,
    Select,
} from "@/shared/components/atoms";

import PortfolioImageUpload from "./PortfolioImageUpload";

export default function PortfolioForm({
    detail,
    userId,
    onSubmit,
    isUpdating,
}) {
    const [formData, setFormData] = useState({
        title: "",
        durum: "",
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
            durum: detail.durum || "",
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
            alert(
                "Tüm alanları doldurun ve fiyat en az 100 TL olmalıdır!"
            );

            return;
        }

        try {
            await onSubmit(formData);
        } catch (error) {
            console.error(
                "Portfolyo güncellenirken hata oluştu:",
                error
            );

            alert(
                "Portfolyo güncellenirken bir hata oluştu."
            );
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <Select
                        label="Kategori Seçimi"
                        name="selectedCategory"
                        value={formData.selectedCategory}
                        onChange={handleChange}
                        className="w-full p-5 border-2 border-purple-300 rounded bg-white text-gray-800"
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
                        placeholder={null}
                    />

                    <Input
                        label="Başlığınızla ziyaretçiyi etkile*"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Portfolyonuz için başlık girin"
                        className="w-full p-5 border-2 border-purple-300 rounded bg-white text-gray-800"
                    />

                    <Input
                        label="Durum*"
                        type="text"
                        name="durum"
                        value={formData.durum}
                        onChange={handleChange}
                        placeholder="Portfolyonuz için durum girin"
                        className="w-full p-5 border-2 border-purple-300 rounded bg-white text-gray-800"
                    />

                    <div className="flex items-center space-x-2">

                        <div className="w-full">
                            <Input
                                label="Fiyat*"
                                type="number"
                                name="fiyat"
                                value={formData.fiyat}
                                onChange={handleChange}
                                placeholder="Portfolyonuz için fiyat girin"
                                className="w-full p-5 border-2 border-purple-300 rounded bg-white text-gray-800"
                            />
                        </div>

                        <div className="pt-7">
                            <Select
                                name="currency"
                                value={formData.currency}
                                onChange={handleChange}
                                className="p-5 border-2 border-purple-300 rounded bg-white text-gray-800"
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
                    className="w-full p-5 border-2 border-purple-300 rounded bg-white text-gray-800"
                />

                <PortfolioImageUpload
                    file={formData.file}
                    onChange={handleFileChange}
                />

                <div className="flex justify-center pt-5">
                    <Button
                        type="submit"
                        disabled={isUpdating}
                        className="mt-4 bg-gray-800 text-white rounded hover:bg-gray-700 px-10 py-3"
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

