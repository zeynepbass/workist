import { useState } from "react";

import {
    Textarea,
    Button,
    Input,
    Select,
} from "@/shared/components/atoms";

export function Modal({
    type = "portfolio",
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
                src="/images/graphic-designer.png"
                width="50"
                height="50"
                alt="Grafik ve Tasarım"
            />
        ),

        "Yazı & Çeviri": (
            <img
                src="/images/ab.png"
                width="50"
                height="50"
                alt="Yazı ve Çeviri"
            />
        ),

        "Yazılım & Teknoloji": (
            <img
                src="/images/software.png"
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
        title: "Ben,",
        hizmetTuru: "",
        file: "",
    };

    const [formData, setFormData] = useState(
        type === "portfolio"
            ? portfolioInitialForm
            : adsInitialForm
    );

    const isPortfolio = type === "portfolio";

    const resetForm = () => {
        setFormData(
            isPortfolio
                ? portfolioInitialForm
                : adsInitialForm
        );

        setSelectedCategory("");
        setSelectedSubcategory("");
        setStep(1);
        setIsOpen(false);
    };

    const handleCheckboxChange = (section, key, e) => {
        const checked = e.target.checked;

        setFormData((prev) => ({
            ...prev,

            [section]: {
                ...prev[section],
                [key]: checked,
            },
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];

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
                userId,
            };

            if (
                payload.file === "" ||
                payload.description === "" ||
                payload.title === "" ||
                Number(payload.fiyat) < 100
            ) {
                alert(
                    "Tüm alanları doldurun ve fiyat en az 100 TL olmalıdır!"
                );

                return;
            }

            try {
                await createWorkPost(payload);
                resetForm();
            } catch (error) {
                console.error(
                    "Portfolyo oluşturma hatası:",
                    error
                );
            }

            return;
        }

        const kodSelectedCount = Object.values(
            formData.kodFiyatlandirma
        ).filter(Boolean).length;

        const ekstraSelectedCount = Object.values(
            formData.ekstraOzellikler
        ).filter(Boolean).length;

        const totalCheckboxCount =
            kodSelectedCount + ekstraSelectedCount;

        const fiyatNum =
            Number(formData.fiyat) || 0;

        const toplamFiyat =
            fiyatNum + totalCheckboxCount * 100;

        const payload = {
            sure: formData.sure,

            kodFiyatlandirma:
                formData.kodFiyatlandirma,

            ekstraOzellikler:
                formData.ekstraOzellikler,

            hizmetTuru: formData.hizmetTuru,

            revizyon: formData.revizyon,

            title: formData.title,

            description: formData.description,

            file: formData.file,

            selectedCategory,

            selectedSubcategory,

            fiyat: toplamFiyat,

            userId,

            kullaniciAd: firstName,
        };

        if (
            payload.sure === "" ||
            payload.title === "" ||
            payload.hizmetTuru === "" ||
            payload.revizyon === "" ||
            payload.description === "" ||
            payload.file === "" ||
            Number(payload.fiyat) < 100
        ) {
            alert(
                "Tüm alanları doldurun ve fiyat en az 100 TL olmalıdır!"
            );

            return;
        }

        try {
            await createWorkPost(payload);
            resetForm();
        } catch (error) {
            console.error(
                "İlan oluşturma hatası:",
                error
            );
        }
    };

    return (
        <>
            <Button
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
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white w-full max-w-2xl p-6 rounded-md space-y-6 max-h-[90vh] overflow-y-auto">

                        {/* STEP 1 */}
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
                                        disabled={
                                            !selectedCategory
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
                                            setStep(2)
                                        }
                                    >
                                        Devam Et
                                    </Button>
                                </div>
                            </>
                        )}

                        {/* STEP 2 */}
                        {step === 2 && (
                            <>
                                <h2 className="text-xl font-semibold text-gray-400">
                                    <span className="text-purple-400">
                                        {selectedCategory}
                                    </span>{" "}
                                    kategorisinin alt alanı?
                                </h2>

                                <p className="text-gray-500 italic">
                                    Biraz daha detay alalım!
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {subcategories[
                                        selectedCategory
                                    ]?.map(
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
                                            src="/images/left-arrow.png"
                                            width="40"
                                            height="40"
                                            alt="Geri"
                                        />
                                    </Button>

                                    <Button
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

                        {/* STEP 3 */}
                        {step === 3 && (
                            <form
                                onSubmit={handleFormSubmit}
                                className="space-y-6"
                            >
                                {isPortfolio ? (
                                    <>
                                        <h2 className="text-xl font-semibold text-gray-400">
                                            Biraz Bahseder misin?
                                        </h2>

                                        <Input
                                            type="text"
                                            placeholder="Etkileyici bir başlık"
                                            value={
                                                formData.title
                                            }
                                            onChange={(e) =>
                                                setFormData(
                                                    (prev) => ({
                                                        ...prev,
                                                        title: e
                                                            .target
                                                            .value,
                                                    })
                                                )
                                            }
                                            className="w-full p-3 border-2 border-purple-500 rounded bg-white text-gray-800"
                                        />

                                        <Textarea
                                            rows={4}
                                            placeholder="Portfolyon hakkında detaylı bilgi ver..."
                                            value={
                                                formData.description
                                            }
                                            onChange={(e) =>
                                                setFormData(
                                                    (prev) => ({
                                                        ...prev,
                                                        description:
                                                            e
                                                                .target
                                                                .value,
                                                    })
                                                )
                                            }
                                            className="w-full p-3 border-2 border-purple-500 rounded bg-white text-gray-800"
                                        />

                                        <div className="flex space-x-2 items-center">
                                            <Input
                                                type="number"
                                                placeholder="Fiyat girin"
                                                value={
                                                    formData.fiyat
                                                }
                                                onChange={(
                                                    e
                                                ) =>
                                                    setFormData(
                                                        (
                                                            prev
                                                        ) => ({
                                                            ...prev,
                                                            fiyat: e
                                                                .target
                                                                .value,
                                                        })
                                                    )
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
                                                placeholder={
                                                    null
                                                }
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
                                ) : (
                                    <>
                                        <h2 className="text-xl font-semibold text-gray-400">
                                            Biraz Bahseder misin?
                                        </h2>

                                        <Input
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
                                            type="number"
                                            label="Revizyon"
                                            value={
                                                formData.revizyon
                                            }
                                            onChange={(e) =>
                                                setFormData(
                                                    (prev) => ({
                                                        ...prev,
                                                        revizyon:
                                                            e
                                                                .target
                                                                .value,
                                                    })
                                                )
                                            }
                                            className="w-full p-3 border-2 border-purple-300 rounded"
                                        />

                                        <Input
                                            label="Süre"
                                            type="text"
                                            value={
                                                formData.sure
                                            }
                                            onChange={(e) =>
                                                setFormData(
                                                    (prev) => ({
                                                        ...prev,
                                                        sure: e
                                                            .target
                                                            .value,
                                                    })
                                                )
                                            }
                                            className="w-full p-3 border-2 border-purple-300 rounded"
                                        />

                                        <Input
                                            type="number"
                                            label="Fiyat"
                                            value={
                                                formData.fiyat
                                            }
                                            onChange={(e) =>
                                                setFormData(
                                                    (prev) => ({
                                                        ...prev,
                                                        fiyat: e
                                                            .target
                                                            .value,
                                                    })
                                                )
                                            }
                                            className="w-full p-3 border-2 border-purple-300 rounded"
                                        />

                                        <div>
                                            <h3 className="text-md font-semibold text-gray-500">
                                                Kod Fiyatlandırma
                                            </h3>

                                            {[
                                                "logo",
                                                "kaynakKod",
                                                "fonMuzigi",
                                            ].map(
                                                (item) => (
                                                    <div
                                                        key={
                                                            item
                                                        }
                                                    >
                                                        <Input
                                                            type="checkbox"
                                                            checked={
                                                                formData
                                                                    .kodFiyatlandirma[
                                                                    item
                                                                ]
                                                            }
                                                            onChange={(
                                                                e
                                                            ) =>
                                                                handleCheckboxChange(
                                                                    "kodFiyatlandirma",
                                                                    item,
                                                                    e
                                                                )
                                                            }
                                                        >
                                                            <span>
                                                                {item ===
                                                                "kaynakKod"
                                                                    ? "Kaynak Kod"
                                                                    : item ===
                                                                      "fonMuzigi"
                                                                    ? "Fon Müziği"
                                                                    : "Logo"}
                                                            </span>
                                                        </Input>
                                                    </div>
                                                )
                                            )}
                                        </div>

                                        <div>
                                            <h3 className="text-md font-semibold text-gray-500">
                                                Ekstra Özellikler
                                            </h3>

                                            {[
                                                "hizliTeslimat",
                                                "fullHd",
                                            ].map(
                                                (item) => (
                                                    <div
                                                        key={
                                                            item
                                                        }
                                                        className="flex items-center space-x-2 mt-2"
                                                    >
                                                        <Input
                                                            type="checkbox"
                                                            checked={
                                                                formData
                                                                    .ekstraOzellikler[
                                                                    item
                                                                ]
                                                            }
                                                            onChange={(
                                                                e
                                                            ) =>
                                                                handleCheckboxChange(
                                                                    "ekstraOzellikler",
                                                                    item,
                                                                    e
                                                                )
                                                            }
                                                        >
                                                            <span>
                                                                {item ===
                                                                "hizliTeslimat"
                                                                    ? "Süper Hızlı Teslimat"
                                                                    : "Full HD (1080px)"}
                                                            </span>
                                                        </Input>
                                                    </div>
                                                )
                                            )}
                                        </div>

                                        <Select
                                            value={
                                                formData.hizmetTuru
                                            }
                                            onChange={(e) =>
                                                setFormData(
                                                    (prev) => ({
                                                        ...prev,
                                                        hizmetTuru:
                                                            e
                                                                .target
                                                                .value,
                                                    })
                                                )
                                            }
                                            options={[
                                                "Admin Panel",
                                                "Özel kodlanmış web tasarımı",
                                                "Hata Giderme",
                                            ]}
                                        />

                                        <Textarea
                                            label="İlan Açıklaması"
                                            rows={4}
                                            value={
                                                formData.description
                                            }
                                            onChange={(e) =>
                                                setFormData(
                                                    (prev) => ({
                                                        ...prev,
                                                        description:
                                                            e
                                                                .target
                                                                .value,
                                                    })
                                                )
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
                                            src="/images/left-arrow.png"
                                            width="40"
                                            height="40"
                                            alt="Geri"
                                        />
                                    </Button>

                                    <Button
                                        type="submit"
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