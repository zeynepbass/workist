
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
            selectedCategory: detail.selectedCategory || "",
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
            toast.error(
                "Tüm alanları doldurun ve fiyat en az 100 TL olmalıdır!"
            );

            return;
        }

        try {
            await onSubmit(formData);
        } catch (error) {
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="">
                <div className="border-b border-gray-200 bg-gray-50/70 ">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Portfolyo Bilgileri
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Portfolyonuzun bilgilerini güncelleyin.
                    </p>
                </div>

                <div className="space-y-8 p-6 md:p-8">
                    <section>
                        <div className="mb-5">
                            <h3 className="text-base font-semibold text-gray-900">
                                Temel Bilgiler
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                Portfolyonuzun kategori, başlık ve fiyat
                                bilgilerini düzenleyin.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <Select
                                label="Kategori"
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
                                label="Yayın Durumu"
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
                       <div className="min-w-0 flex-1">
                            <Input
                                label="Başlık"
                                type="text"
                                name="title"
                                value={formData.title}
                                className="w-full"
                                onChange={handleChange}
                                placeholder="Portfolyonuz için başlık girin"
                                variant="default"
                            />
</div>
                            <div className="flex items-end gap-3">
                                <div className="min-w-0 flex-1">
                                    <Input
                                        label="Fiyat"
                                        type="number"
                                        name="fiyat"
                                                   className="w-full"
                                        value={formData.fiyat}
                                        onChange={handleChange}
                                        placeholder="En az 100 TL"
                                        variant="default"
                                    />
                                </div>

                                <div className="w-24">
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
                    </section>

                    <div className="h-px bg-gray-100" />

                    <section className="w-full">
                        <div className="mb-5">
                            <h3 className="text-base font-semibold text-gray-900">
                                Portfolyo Açıklaması
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                Projenizi ve sunduğunuz hizmeti detaylı şekilde
                                açıklayın.
                            </p>
                        </div>

                        <div className="w-full">
                            <Textarea
                                label="Açıklama"
                                name="description"
                                rows={6}
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Projeniz, kullandığınız teknolojiler ve sunduğunuz hizmet hakkında bilgi verin..."
                                variant="default"
                                className="w-full"
                            />
                        </div>
                    </section>

                    <div className="h-px bg-gray-100" />

                    <section className="w-full">
                        <div className="mb-5">
                            <h3 className="text-base font-semibold text-gray-900">
                                Portfolyo Görseli
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                Portfolyonuzu temsil edecek bir görsel yükleyin.
                            </p>
                        </div>

                        <div className="w-full rounded-xl border border-dashed border-gray-300 bg-gray-50/50 p-5">
                            <PortfolioImageUpload
                                file={formData.file}
                                onChange={handleFileChange}
                            />
                        </div>
                    </section>

                    <div className="flex justify-center border-t border-gray-100 pt-6">
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={isUpdating}
                            className="w-full px-8 py-3 sm:w-auto"
                        >
                            {isUpdating
                                ? "Güncelleniyor..."
                                : "Portfolyoyu Güncelle"}
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
}

