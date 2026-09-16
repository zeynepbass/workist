
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";

import { useAds } from "../hooks/useAds";

import {
    Button,
    Input,
    Select,
    Textarea,
} from "@/shared/components/atoms";

import AdsInfo from "../components/AdsInfo";
import AdsWarning from "../components/AdsWarning";
import AdsPricingOptions from "../components/AdsPricingOptions";
import AdsPriceField from "../components/AdsPriceField";
import AdsFileUpload from "../components/AdsFileUpload";

import { StatusMessage } from "@/shared/components/molecules";

const HIZMET_TURU_OPTIONS = [
    {
        value: "Admin Panel",
        label: "Admin Panel",
    },
    {
        value: "Özel kodlanmış web tasarımı",
        label: "Özel kodlanmış web tasarımı",
    },
    {
        value: "Hata Giderme",
        label: "Hata Giderme",
    },
];

export default function AdsDetail() {
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        details,
        isLoading: isDetailsLoading,
        isError: isDetailsError,
        updatePost,
        isUpdating,
        userId,
    } = useAds(id);

    const [title, setTitle] = useState("Ben,");

    const [form, setForm] = useState({
        fiyat: "",
        file: "",
        revizyon: "",
        sure: "",
        hizmetTuru: "",
        kodFiyatlandirma: {
            logo: false,
            kaynakKod: false,
            fonMuzigi: false,
        },
        ekstraOzellikler: {
            hizliTeslimat: false,
            fullHd: false,
        },
        description: "",
    });

    useEffect(() => {
        if (!details) return;

        setTitle(details.title || "");

        setForm({
            sure: details.sure || "",
            fiyat: details.fiyat || "",
            hizmetTuru: details.hizmetTuru || "",
            kodFiyatlandirma: {
                logo: details.kodFiyatlandirma?.logo ?? false,
                kaynakKod: details.kodFiyatlandirma?.kaynakKod ?? false,
                fonMuzigi: details.kodFiyatlandirma?.fonMuzigi ?? false,
            },
            ekstraOzellikler: {
                hizliTeslimat:
                    details.ekstraOzellikler?.hizliTeslimat ?? false,
                fullHd:
                    details.ekstraOzellikler?.fullHd ?? false,
            },
            revizyon: details.revizyon || "",
            file: details.file || "",
            description: details.description || "",
        });
    }, [details]);

    const handleCheckboxChange = (section, key) => {
        setForm((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: !prev[section][key],
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            form.file === "" ||
            form.sure === "" ||
            title === "" ||
            form.hizmetTuru === "" ||
            form.revizyon === "" ||
            form.description === "" ||
            Number(form.fiyat) < 100
        ) {
            toast.error(
                "Tüm alanları doldurun ve fiyat en az 100 TL olmalıdır!"
            );

            return;
        }

        const kodFiyatlandirmaCount =
            Object.values(form.kodFiyatlandirma).filter(Boolean).length;

        const ekstraOzelliklerCount =
            Object.values(form.ekstraOzellikler).filter(Boolean).length;

        const totalSelectedCount =
            kodFiyatlandirmaCount + ekstraOzelliklerCount;

        const toplamFiyat =
            Number(form.fiyat || 0) +
            totalSelectedCount * 100;

        const newIlan = {
            fiyat: toplamFiyat,
            sure: form.sure,
            hizmetTuru: form.hizmetTuru,
            title,
            description: form.description,
            revizyon: form.revizyon,
            file: form.file,
            kodFiyatlandirma: form.kodFiyatlandirma,
            ekstraOzellikler: form.ekstraOzellikler,
            selectedCategory:
                details?.selectedCategory || "Web",
            selectedSubcategory:
                details?.selectedSubcategory || "Frontend",
            userId,
        };

        updatePost(
            {
                id,
                post: newIlan,
            },
            {
                onSuccess: () => {
                    navigate(-1);
                },
            }
        );
    };

    if (isDetailsLoading) {
        return (
            <StatusMessage
                type="loading"
                message="İlan bilgileri yükleniyor..."
            />
        );
    }

    if (isDetailsError) {
        return (
            <StatusMessage
                type="error"
                message="İlan bilgileri yüklenirken bir hata oluştu."
            />
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-4xl space-y-6 px-4 pb-16 pt-6 text-gray-800 sm:px-6"
        >
                     <div >
                <Button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="mb-5 flex items-center gap-2 text-purple-600 transition hover:text-purple-800"
                >
                    <FaArrowLeft />
                    Geri Dön
                </Button>

                <h1 className="text-2xl font-bold text-gray-900">
                    İlanı Düzenle
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    İlan bilgilerini güncelleyip değişiklikleri
                    kaydedebilirsin.
                </p>
            </div>

            <AdsInfo />
            <AdsWarning />

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-200 bg-gray-50/70 px-6 py-5 sm:px-8">
                    <h2 className="text-lg font-semibold text-gray-900">
                        İlan Bilgileri
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        İlanınızın temel bilgilerini düzenleyin.
                    </p>
                </div>

                <div className="space-y-8 p-6 sm:p-8">
                    <section className="space-y-5">
                        <Select
                            label="Hizmet Türü*"
                            value={form.hizmetTuru}
                            options={HIZMET_TURU_OPTIONS}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    hizmetTuru: e.target.value,
                                }))
                            }
                        />

                        <Input
                            label="Başlık*"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            variant="default"
                            className="w-full"
                        />

                        <Input
                            label="Süre*"
                            type="text"
                            placeholder="Örn. 3 gün"
                            value={form.sure}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    sure: e.target.value,
                                }))
                            }
                            variant="default"
                                                className="w-full"
                        />

                        <Input
                            label="Revizyon*"
                            type="number"
                            value={form.revizyon}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    revizyon: e.target.value,
                                }))
                            }
                            variant="default"
                                                className="w-full"
                        />
                    </section>

                    <div className="h-px bg-gray-100" />

                    <section>
                        <div className="mb-5">
                            <h3 className="text-base font-semibold text-gray-900">
                                Ek Hizmetler
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                İlanınıza eklemek istediğiniz hizmetleri
                                seçebilirsiniz.
                            </p>
                        </div>

                        <AdsPricingOptions
                            kodFiyatlandirma={form.kodFiyatlandirma}
                            ekstraOzellikler={form.ekstraOzellikler}
                            onCheckboxChange={handleCheckboxChange}
                        />
                    </section>

                    <div className="h-px bg-gray-100" />

                    <section>
                        <div className="mb-5">
                            <h3 className="text-base font-semibold text-gray-900">
                                Fiyatlandırma
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                Hizmetiniz için temel fiyatı belirleyin.
                            </p>
                        </div>

                        <AdsPriceField
                            value={form.fiyat}
                            onChange={(value) =>
                                setForm((prev) => ({
                                    ...prev,
                                    fiyat: value,
                                }))
                            }
                            kodFiyatlandirma={form.kodFiyatlandirma}
                            ekstraOzellikler={form.ekstraOzellikler}
                        />
                    </section>

                    <div className="h-px bg-gray-100" />

                    <section>
                        <div className="mb-5">
                            <h3 className="text-base font-semibold text-gray-900">
                                Açıklama
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                Hizmetiniz hakkında detaylı bilgi verin.
                            </p>
                        </div>

                        <Textarea
                            label="Açıklama*"
                            rows={7}
                            value={form.description}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                }))
                            }
                            variant="default"
                            className="w-full"
                        />
                    </section>

                    <div className="h-px bg-gray-100" />

                    <section>
                        <div className="mb-5">
                            <h3 className="text-base font-semibold text-gray-900">
                                Dosya
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                İlanınızla ilgili görsel veya dosyayı
                                güncelleyin.
                            </p>
                        </div>
                        <div className="w-full rounded-xl border border-dashed border-gray-300 bg-gray-50/50 p-5">
                        <AdsFileUpload
                            value={form.file}
                            onChange={(value) =>
                                setForm((prev) => ({
                                    ...prev,
                                    file: value,
                                }))
                            }
                        />
                        
                        </div>

                    </section>
                </div>

            <div className="flex justify-center border-t border-gray-200 p-6">
                <Button
                    type="submit"
                    variant="primary"
                    disabled={isUpdating}
                    className="w-full px-10 py-3 sm:w-auto"
                >
                    {isUpdating ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                </Button>
            </div>
            </div>

        </form>
    );
}

