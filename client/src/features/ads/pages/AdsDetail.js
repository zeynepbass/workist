import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import { useAds } from "../hooks/useAds";
import { Button,Input,Select,Textarea } from "@/shared/components/atoms";
import { AdsInfo } from "../components/AdsInfo";
import { AdsWarning } from "../components/AdsWarning";
import {AdsPricingOptions} from "../components/AdsPricingOptions";
import {AdsPriceField} from "../components/AdsPriceField";
import {AdsFileUpload} from "../components/AdsFileUpload";

import {StatusMessage} from "@/shared/components/molecules";

export default function AdsDetail (){
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
                logo: Array.isArray(details.kodFiyatlandirma)
                    ? details.kodFiyatlandirma.some(
                          (item) => item.text === "logo"
                      )
                    : false,

                kaynakKod: Array.isArray(details.kodFiyatlandirma)
                    ? details.kodFiyatlandirma.some(
                          (item) => item.text === "kaynakKod"
                      )
                    : false,

                fonMuzigi: Array.isArray(details.kodFiyatlandirma)
                    ? details.kodFiyatlandirma.some(
                          (item) => item.text === "fonMuzigi"
                      )
                    : false,
            },

            ekstraOzellikler: {
                hizliTeslimat:
                    details.extra?.includes("hizliTeslimat") || false,

                fullHd:
                    details.extra?.includes("fullHd") || false,
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
            alert(
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

        const kodFiyatlandirma = Object.entries(
            form.kodFiyatlandirma
        )
            .filter(([_, value]) => value)
            .map(([key]) => ({
                text: key,
            }));

        const extra = Object.entries(form.ekstraOzellikler)
            .filter(([_, value]) => value)
            .map(([key]) => key)
            .join(",");

        const newIlan = {
            fiyat: toplamFiyat,
            sure: form.sure,
            hizmetTuru: form.hizmetTuru,
            title,
            description: form.description,
            revizyon: form.revizyon,
            file: form.file,
            kodFiyatlandirma,
            extra,
            selectedCategory: "Web",
            selectedSubcategory: "Frontend",
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
            className="max-w-6xl mx-auto space-y-6 text-gray-800"
        >
                                        <Button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center text-purple-600 hover:text-purple-800 py-5"
        >
            <FaArrowLeft className="mr-2" />
            Geri Dön</Button>
     


            <AdsInfo />

            <AdsWarning />

            <Select
                value={form.hizmetTuru}
                onChange={(value) =>
                    setForm((prev) => ({
                        ...prev,
                        hizmetTuru: value,
                    }))
                }
            />

            <AdsPricingOptions
                kodFiyatlandirma={form.kodFiyatlandirma}
                ekstraOzellikler={form.ekstraOzellikler}
                onCheckboxChange={handleCheckboxChange}
            />

            <div>
            <Input
            label="        Revizyon*"
      

                    type="number"
                    value={form.revizyon}
                    onChange={(e) =>
                        setForm((prev) => ({
                            ...prev,
                            revizyon: e.target.value,
                        }))
                    }
                    className="w-full p-5 border-2 border-purple-300 rounded bg-white text-gray-800"
                />
            </div>

            <div>
            <Input
            label="                Süre*"
            type="text"
            value={form.sure}
            onChange={(e) =>
                setForm((prev) => ({
                    ...prev,
                    sure: e.target.value,
                }))
            }
            className="w-full p-5 border-2 border-purple-300 rounded bg-white text-gray-800"
                />



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

            <AdsPriceField
                value={title}
                onChange={setTitle}
            />

            <Textarea
                value={form.description}
                onChange={(value) =>
                    setForm((prev) => ({
                        ...prev,
                        description: value,
                    }))
                }
            />

            <AdsFileUpload
                value={form.file}
                onChange={(value) =>
                    setForm((prev) => ({
                        ...prev,
                        file: value,
                    }))
                }
            />

            <div className="flex justify-center">
             <Button
                   type="submit"
                   disabled={isUpdating}
                   className="bg-purple-600 text-white px-8 py-3 rounded hover:bg-purple-700 disabled:opacity-50"
               >
              {isUpdating
                        ? "Kaydediliyor..."
                        : "Kaydet"}</Button>
  
            </div>
        </form>
    );
};