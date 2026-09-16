
import { useState } from "react";

import {
    Textarea,
    Button,
    Input,
    Select,
} from "@/shared/components/atoms";
import toast from "react-hot-toast";
export function Modal({
    type,
    createWorkPost,

    userId,
    firstName,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);

    const [selectedCategory, setSelectedCategory] =
        useState("");

    const [selectedSubcategory, setSelectedSubcategory] =
        useState("");

    const isPortfolio = type === "portfolio";
    const isAds = type === "ads";

    const subcategories = {
        "Grafik & Tasarım": [
            "Logo Tasarımı",
            "Afiş Tasarımı",
            "Sosyal Medya Postu",
        ],
        "Yazı & Çeviri": [
            "Makale",
            "Blog Yazısı",
            "Kitap Çevirisi",
        ],
        "Yazılım & Teknoloji": [
            "Web Uygulaması",
            "Mobil Uygulama",
            "API Geliştirme",
        ],
    };

    const iconMap = {
        "Grafik & Tasarım": (
            <img
                src="/assets/graphic-designer.png"
                width="50"
                height="50"
                alt="Grafik ve Tasarım"
            />
        ),
        "Yazı & Çeviri": (
            <img
                src="/assets/ab.png"
                width="50"
                height="50"
                alt="Yazı ve Çeviri"
            />
        ),
        "Yazılım & Teknoloji": (
            <img
                src="/assets/software.png"
                width="50"
                height="50"
                alt="Yazılım ve Teknoloji"
            />
        ),
    };

    const portfolioInitialForm = {
        fiyat: "",
        currency: "TL",
        title: "",
        description: "",
        file: "",
    };

    const adsInitialForm = {
        sure: "",
        description: "",
        fiyat: "",
        currency: "TL",
        kodFiyatlandirma: {
            logo: false,
            kaynakKod: false,
            fonMuzigi: false,
        },
        ekstraOzellikler: {
            hizliTeslimat: false,
            fullHd: false,
        },
        revizyon: "",
        title: "Ben, ",
        hizmetTuru: "",
        file: "",
    };

    const getInitialForm = () => {
        if (isPortfolio) {
            return { ...portfolioInitialForm };
        }

        return {
            ...adsInitialForm,
            kodFiyatlandirma: {
                ...adsInitialForm.kodFiyatlandirma,
            },
            ekstraOzellikler: {
                ...adsInitialForm.ekstraOzellikler,
            },
        };
    };

    const [formData, setFormData] = useState(
        getInitialForm()
    );

    const resetForm = () => {
        setFormData(getInitialForm());
        setSelectedCategory("");
        setSelectedSubcategory("");
        setStep(1);
        setIsOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (
        section,
        key,
        e
    ) => {
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: e.target.checked,
            },
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            setFormData((prev) => ({
                ...prev,
                file: reader.result,
            }));
        };

        reader.readAsDataURL(file);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (isPortfolio) {
            const payload = {
                fiyat: formData.fiyat,
                currency: formData.currency,
                title: formData.title,
                description: formData.description,
                file: formData.file,
                selectedCategory,
                selectedSubcategory,

            };

            if (
                !payload.file ||
                !payload.description ||
                !payload.title ||
                !selectedCategory ||
                !selectedSubcategory ||
                Number(payload.fiyat) < 100
            ) {
                toast.error(                    "Tüm alanları doldurun ve fiyat en az 100 TL olmalıdır!");

                return;
            }

            try {
                await createWorkPost(payload);
                resetForm();
                toast.success("Portfolyo başarıyla oluşturuldu.");
            } catch (error) {
                toast.error(
                    error?.response?.data?.message ||
                        "Portfolyo oluşturulurken bir hata oluştu."
                );
            }

            return;
        }

        if (isAds) {
            const kodSelectedCount = Object.values(
                formData.kodFiyatlandirma
            ).filter(Boolean).length;

            const ekstraSelectedCount = Object.values(
                formData.ekstraOzellikler
            ).filter(Boolean).length;

            const totalCheckboxCount =
                kodSelectedCount +
                ekstraSelectedCount;

            const fiyatNum =
                Number(formData.fiyat) || 0;

            const toplamFiyat =
                fiyatNum +
                totalCheckboxCount * 100;

            const payload = {
                sure: formData.sure,
                kodFiyatlandirma:
                    formData.kodFiyatlandirma,
                ekstraOzellikler:
                    formData.ekstraOzellikler,
                hizmetTuru:
                    formData.hizmetTuru,
                revizyon:
                    formData.revizyon,
                title:
                    formData.title,
                description:
                    formData.description,
                file:
                    formData.file,
                currency:
                    formData.currency,
                selectedCategory,
                selectedSubcategory,
                fiyat: toplamFiyat,

                userId,
                kullaniciAd: firstName,
            };

            if (
                !payload.sure ||
                !payload.title ||
                !payload.hizmetTuru ||
                !payload.revizyon ||
                !payload.description ||
                !payload.file ||
                !selectedCategory ||
                !selectedSubcategory ||
                Number(payload.fiyat) < 100
            ) {
                toast.error(    "Tüm alanları doldurun ve fiyat en az 100 TL olmalıdır!");
     

                return;
            }

            try {
                await createWorkPost(payload);
                resetForm();
                toast.success("İlan başarıyla oluşturuldu.");
            } catch (error) {
                toast.error(
                    error?.response?.data?.message ||
                        "İlan oluşturulurken bir hata oluştu."
                );
            }
        }
    };

    return (
        <>
            <Button
                type="button"
                className="
                    bg-purple-500
                    float-right
                    text-white
                    p-4
                    rounded-md
                    mb-4
                    cursor-pointer
                    text-base
                    w-full
                    md:text-sm
                    md:p-2
                    md:w-40
                "
                onClick={() => setIsOpen(true)}
            >
                {isPortfolio
                    ? "Yeni Portfolyo Ekle"
                    : "Yeni İş İlanı Ekle"}
            </Button>

            {isOpen && (
    <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4"
        onClick={resetForm}
    >
        <div
            className="bg-white w-full max-w-2xl p-6 rounded-md space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
        >
                        {step === 1 && (
                            <>
                                <h2 className="text-xl font-semibold text-gray-400">
                                    Kategori Seçin
                                </h2>

                                <p className="text-gray-400 italic">
                                    Hadi, başlayalım. 😎
                                    <br />

                                    {isPortfolio
                                        ? "Ekleyeceğin portfolyo hangi ana kategoriye giriyor?"
                                        : "Eklemek istediğin iş ilanı hangi kategoriye giriyor?"}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {Object.keys(
                                        subcategories
                                    ).map((category) => (
                                        <div
                                            key={category}
                                            className={`
                                                cursor-pointer
                                                border-2
                                                rounded-lg
                                                p-4
                                                text-center
                                                ${
                                                    selectedCategory ===
                                                    category
                                                        ? "border-purple-600 bg-purple-100"
                                                        : "border-gray-300"
                                                }
                                            `}
                                            onClick={() =>
                                                setSelectedCategory(
                                                    category
                                                )
                                            }
                                        >
                                            {iconMap[category]}

                                            <p className="mt-2 font-medium text-left text-gray-400">
                                                {category}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-end mt-4">
                                    <Button
                                        type="button"
                                        disabled={!selectedCategory}
                                        className="
                                            bg-purple-600
                                            text-white
                                            px-6
                                            py-2
                                            rounded
                                            hover:bg-purple-700
                                            disabled:opacity-50
                                        "
                                        onClick={() =>
                                            setStep(2)
                                        }
                                    >
                                        Devam Et
                                    </Button>
                                </div>
                            </>
                        )}

                   
                        {step === 2 && (
                            <>
                                <h2 className="text-xl font-semibold text-gray-400">
                                    <span className="text-purple-950">
                                        {selectedCategory}
                                    </span>{" "}
                                    kategorisinin alt alanı?
                                </h2>

                                <p className="text-gray-500 italic">
                                    Biraz daha detay alalım!
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {(
                                        subcategories[
                                            selectedCategory
                                        ] || []
                                    ).map(
                                        (subcategory) => (
                                            <div
                                                key={
                                                    subcategory
                                                }
                                                className={`
                                                    cursor-pointer
                                                    border-2
                                                    rounded-lg
                                                    p-4
                                                    text-center
                                                    ${
                                                        selectedSubcategory ===
                                                        subcategory
                                                            ? "border-purple-600 bg-purple-100"
                                                            : "border-gray-300"
                                                    }
                                                `}
                                                onClick={() =>
                                                    setSelectedSubcategory(
                                                        subcategory
                                                    )
                                                }
                                            >
                                                <p className="font-medium text-gray-400">
                                                    {
                                                        subcategory
                                                    }
                                                </p>
                                            </div>
                                        )
                                    )}
                                </div>

                                <div className="flex justify-between mt-4">
                                    <Button
                                        type="button"
                                        onClick={() =>
                                            setStep(1)
                                        }
                                    >
                                        <img
                                            src="/assets/left-arrow.png"
                                            width="40"
                                            height="40"
                                            alt="Geri"
                                        />
                                    </Button>

                                    <Button
                                        type="button"
                                        disabled={
                                            !selectedSubcategory
                                        }
                                        className="
                                            bg-purple-600
                                            text-white
                                            px-6
                                            py-2
                                            rounded
                                            hover:bg-purple-700
                                            disabled:opacity-50
                                        "
                                        onClick={() =>
                                            setStep(3)
                                        }
                                    >
                                        Devam Et
                                    </Button>
                                </div>
                            </>
                        )}


                        {step === 3 && (
                            <form
                                onSubmit={handleFormSubmit}
                                className="space-y-6"
                            >

                                {isPortfolio && (
                                    <>
                                        <h2 className="text-xl font-semibold text-gray-400">
                                            Biraz Bahseder misin?
                                        </h2>

                                        <Input
                                            name="title"
                                            type="text"
                                            placeholder="Etkileyici bir başlık"
                                            value={
                                                formData.title
                                            }
                                            onChange={
                                                handleInputChange
                                            }
                                            className="w-full p-3 border-2 border-purple-500 rounded bg-white text-gray-800"
                                        />

                                        <Textarea
                                            name="description"
                                            rows={4}
                                            placeholder="Portfolyon hakkında detaylı bilgi ver..."
                                            value={
                                                formData.description
                                            }
                                            onChange={
                                                handleInputChange
                                            }
                                            className="w-full p-3 border-2 border-purple-500 rounded bg-white text-gray-800"
                                        />

                                        <div className="flex space-x-2 items-center">
                                            <Input
                                                name="fiyat"
                                                type="number"
                                                placeholder="Fiyat girin"
                                                value={
                                                    formData.fiyat
                                                }
                                                onChange={
                                                    handleInputChange
                                                }
                                                className="flex-grow p-3 border-2 border-purple-500 rounded bg-white text-gray-800"
                                            />

                                            <Select
                                                value={
                                                    formData.currency
                                                }
                                                onChange={(
                                                    e
                                                ) =>
                                                    setFormData(
                                                        (
                                                            prev
                                                        ) => ({
                                                            ...prev,
                                                            currency:
                                                                e
                                                                    .target
                                                                    .value,
                                                        })
                                                    )
                                                }
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
                                                className="p-3 border-2 border-purple-500 rounded bg-white text-gray-800 cursor-pointer"
                                            />
                                        </div>

                                        <Input
                                            label="Dosya Seç"
                                            type="file"
                                            accept="image/*"
                                            onChange={
                                                handleFileChange
                                            }
                                        />
                                    </>
                                )}

                  
                                {isAds && (
                                    <>
                                        <h2 className="text-xl font-semibold text-gray-400">
                                            Biraz Bahseder misin?
                                        </h2>

                                        <Input
                                            name="title"
                                            label="Başlık"
                                            type="text"
                                            value={
                                                formData.title
                                            }
                                            onChange={(e) => {
                                                const value =
                                                    e.target
                                                        .value;

                                                setFormData(
                                                    (prev) => ({
                                                        ...prev,
                                                        title: value.startsWith(
                                                            "Ben,"
                                                        )
                                                            ? value
                                                            : "Ben, " +
                                                              value.replace(
                                                                  /^Ben,? ?/,
                                                                  ""
                                                              ),
                                                    })
                                                );
                                            }}
                                            className="w-full p-3 border-2 border-purple-300 rounded"
                                        />

                                        <Input
                                            name="revizyon"
                                            type="number"
                                            label="Revizyon"
                                            value={
                                                formData.revizyon
                                            }
                                            onChange={
                                                handleInputChange
                                            }
                                            className="w-full p-3 border-2 border-purple-300 rounded"
                                        />

                                        <Input
                                            name="sure"
                                            label="Süre"
                                            type="text"
                                            value={
                                                formData.sure
                                            }
                                            onChange={
                                                handleInputChange
                                            }
                                            className="w-full p-3 border-2 border-purple-300 rounded"
                                        />

                                        <Input
                                            name="fiyat"
                                            type="number"
                                            label="Fiyat"
                                            value={
                                                formData.fiyat
                                            }
                                            onChange={
                                                handleInputChange
                                            }
                                            className="w-full p-3 border-2 border-purple-300 rounded"
                                        />

                                        <Select
                                            value={
                                                formData.currency
                                            }
                                            onChange={(e) =>
                                                setFormData(
                                                    (prev) => ({
                                                        ...prev,
                                                        currency:
                                                            e.target
                                                                .value,
                                                    })
                                                )
                                            }
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
                                            className="w-full p-3 border-2 border-purple-300 rounded"
                                        />

                                        <div>
                                            <h3 className="text-md font-semibold text-gray-500">
                                                Kod Fiyatlandırma
                                            </h3>

                                            {[
                                                {
                                                    key: "logo",
                                                    label: "Logo",
                                                },
                                                {
                                                    key: "kaynakKod",
                                                    label: "Kaynak Kod",
                                                },
                                                {
                                                    key: "fonMuzigi",
                                                    label: "Fon Müziği",
                                                },
                                            ].map(
                                                ({
                                                    key,
                                                    label,
                                                }) => (
                                                    <div
                                                        key={key}
                                                        className="flex items-center space-x-2 mt-2"
                                                    >
                                                        <Input
                                                            type="checkbox"
                                                            checked={
                                                                formData
                                                                    .kodFiyatlandirma[
                                                                    key
                                                                ]
                                                            }
                                                            onChange={(
                                                                e
                                                            ) =>
                                                                handleCheckboxChange(
                                                                    "kodFiyatlandirma",
                                                                    key,
                                                                    e
                                                                )
                                                            }
                                                        />

                                                        <span className="text-gray-500">
                                                            {
                                                                label
                                                            }
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                        </div>

                                        <div>
                                            <h3 className="text-md font-semibold text-gray-500">
                                                Ekstra Özellikler
                                            </h3>

                                            {[
                                                {
                                                    key: "hizliTeslimat",
                                                    label: "Süper Hızlı Teslimat",
                                                },
                                                {
                                                    key: "fullHd",
                                                    label: "Full HD (1080px)",
                                                },
                                            ].map(
                                                ({
                                                    key,
                                                    label,
                                                }) => (
                                                    <div
                                                        key={key}
                                                        className="flex items-center space-x-2 mt-2"
                                                    >
                                                        <Input
                                                            type="checkbox"
                                                            checked={
                                                                formData
                                                                    .ekstraOzellikler[
                                                                    key
                                                                ]
                                                            }
                                                            onChange={(
                                                                e
                                                            ) =>
                                                                handleCheckboxChange(
                                                                    "ekstraOzellikler",
                                                                    key,
                                                                    e
                                                                )
                                                            }
                                                        />

                                                        <span className="text-gray-500">
                                                            {
                                                                label
                                                            }
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                        </div>

                                        <Select
                                            label="Hizmet Türü"
                                            value={
                                                formData.hizmetTuru
                                            }
                                            onChange={(e) =>
                                                setFormData(
                                                    (prev) => ({
                                                        ...prev,
                                                        hizmetTuru:
                                                            e.target
                                                                .value,
                                                    })
                                                )
                                            }
                                            options={[
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
                                            ]}
                                            placeholder="Hizmet türü seçin"
                                            className="w-full p-3 border-2 border-purple-300 rounded"
                                        />

                                        <Textarea
                                            name="description"
                                            label="İlan Açıklaması"
                                            rows={4}
                                            value={
                                                formData.description
                                            }
                                            onChange={
                                                handleInputChange
                                            }
                                            className="w-full p-3 border-2 border-purple-300 rounded"
                                        />

                                        <Input
                                            label="Dosya Yükle"
                                            type="file"
                                            accept="image/*"
                                            onChange={
                                                handleFileChange
                                            }
                                        />
                                    </>
                                )}

                                <div className="flex justify-between items-center">
                                    <Button
                                        type="button"
                                        onClick={() =>
                                            setStep(2)
                                        }
                                    >
                                        <img
                                            src="/assets/left-arrow.png"
                                            width="40"
                                            height="40"
                                            alt="Geri"
                                        />
                                    </Button>

                                    <Button
                                        type="submit"
                                        disabled={
                                            !isPortfolio &&
                                            !isAds
                                        }
                                        className="
                                            bg-purple-600
                                            text-white
                                            px-6
                                            py-2
                                            rounded
                                            hover:bg-purple-700
                                        "
                                    >
                                        Kaydet
                                    </Button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
