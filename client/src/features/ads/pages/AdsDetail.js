import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";

import { useAds } from "../hooks/useAds";
import { Button, Input, Select, Textarea } from "@/shared/components/atoms";
import { StatusMessage } from "@/shared/components/molecules";
import { AD_OPTION_PRICE, SERVICE_TYPE_OPTIONS } from "@/shared/constants/options";

import AdsInfo from "../components/AdsInfo";
import AdsWarning from "../components/AdsWarning";
import AdsPricingOptions from "../components/AdsPricingOptions";
import AdsPriceField from "../components/AdsPriceField";
import AdsFileUpload from "../components/AdsFileUpload";

const EMPTY_FORM = {
  price: "",
  image: "",
  revisionCount: "",
  deliveryTime: "",
  serviceType: "",
  addons: { logo: false, sourceCode: false, backgroundMusic: false },
  extras: { fastDelivery: false, fullHd: false },
  description: "",
};

function toForm(ad) {
  return {
    deliveryTime: ad.deliveryTime || "",
    price: ad.price || "",
    serviceType: ad.serviceType || "",
    addons: { ...EMPTY_FORM.addons, ...ad.addons },
    extras: { ...EMPTY_FORM.extras, ...ad.extras },
    revisionCount: ad.revisionCount || "",
    image: ad.image || "",
    description: ad.description || "",
  };
}

function countSelected(options) {
  return Object.values(options).filter(Boolean).length;
}

function isIncomplete(form, title) {
  return (
    form.image === "" ||
    form.deliveryTime === "" ||
    title === "" ||
    form.serviceType === "" ||
    form.revisionCount === "" ||
    form.description === "" ||
    Number(form.price) < 100
  );
}

function FormSection({ title, description, children }) {
  return (
    <section>
      <div className="mb-5">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
      {children}
    </section>
  );
}

export default function AdsDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { details, isDetailsLoading, isDetailsError, updateAd, isUpdating } = useAds(id);

  const [title, setTitle] = useState("Ben,");
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (!details) return;

    setTitle(details.title || "");
    setForm(toForm(details));
  }, [details]);

  const setField = (field) => (value) => setForm((previous) => ({ ...previous, [field]: value }));

  const handleCheckboxChange = (section, key) => {
    setForm((previous) => ({
      ...previous,
      [section]: { ...previous[section], [key]: !previous[section][key] },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isIncomplete(form, title)) {
      toast.error("Tüm alanları doldurun ve fiyat en az 100 TL olmalıdır!");
      return;
    }

    const selectedOptionCount = countSelected(form.addons) + countSelected(form.extras);

    const ad = {
      ...form,
      title,
      price: Number(form.price || 0) + selectedOptionCount * AD_OPTION_PRICE,
      category: details?.category,
      subcategory: details?.subcategory,
    };

    updateAd({ id, ad }, { onSuccess: () => navigate(-1) });
  };

  if (isDetailsLoading) {
    return <StatusMessage type="loading" message="İlan bilgileri yükleniyor..." />;
  }

  if (isDetailsError) {
    return <StatusMessage type="error" message="İlan bilgileri yüklenirken bir hata oluştu." />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-4xl space-y-6 px-4 pb-16 pt-6 text-gray-800 sm:px-6"
    >
      <div>
        <Button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-5 flex items-center gap-2 text-purple-600 transition hover:text-purple-800"
        >
          <FaArrowLeft />
          Geri Dön
        </Button>

        <h1 className="text-2xl font-bold text-gray-900">İlanı Düzenle</h1>

        <p className="mt-1 text-sm text-gray-500">
          İlan bilgilerini güncelleyip değişiklikleri kaydedebilirsin.
        </p>
      </div>

      <AdsInfo />
      <AdsWarning />

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 bg-gray-50/70 px-6 py-5 sm:px-8">
          <h2 className="text-lg font-semibold text-gray-900">İlan Bilgileri</h2>

          <p className="mt-1 text-sm text-gray-500">İlanınızın temel bilgilerini düzenleyin.</p>
        </div>

        <div className="space-y-8 p-6 sm:p-8">
          <section className="space-y-5">
            <Select
              id="ad-service-type"
              label="Hizmet Türü*"
              value={form.serviceType}
              options={SERVICE_TYPE_OPTIONS}
              onChange={(e) => setField("serviceType")(e.target.value)}
            />

            <Input
              label="Başlık*"
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              variant="default"
              className="w-full"
            />

            <Input
              label="Süre*"
              name="deliveryTime"
              type="text"
              placeholder="Örn. 3 gün"
              value={form.deliveryTime}
              onChange={(e) => setField("deliveryTime")(e.target.value)}
              variant="default"
              className="w-full"
            />

            <Input
              label="Revizyon*"
              name="revisionCount"
              type="number"
              value={form.revisionCount}
              onChange={(e) => setField("revisionCount")(e.target.value)}
              variant="default"
              className="w-full"
            />
          </section>

          <div className="h-px bg-gray-100" />

          <FormSection
            title="Ek Hizmetler"
            description="İlanınıza eklemek istediğiniz hizmetleri seçebilirsiniz."
          >
            <AdsPricingOptions
              addons={form.addons}
              extras={form.extras}
              onCheckboxChange={handleCheckboxChange}
            />
          </FormSection>

          <div className="h-px bg-gray-100" />

          <FormSection title="Fiyatlandırma" description="Hizmetiniz için temel fiyatı belirleyin.">
            <AdsPriceField
              value={form.price}
              onChange={setField("price")}
              addons={form.addons}
              extras={form.extras}
            />
          </FormSection>

          <div className="h-px bg-gray-100" />

          <FormSection title="Açıklama" description="Hizmetiniz hakkında detaylı bilgi verin.">
            <Textarea
              label="Açıklama*"
              name="description"
              rows={7}
              value={form.description}
              onChange={(e) => setField("description")(e.target.value)}
              variant="default"
              className="w-full"
            />
          </FormSection>

          <div className="h-px bg-gray-100" />

          <FormSection
            title="Dosya"
            description="İlanınızla ilgili görsel veya dosyayı güncelleyin."
          >
            <div className="w-full rounded-xl border border-dashed border-gray-300 bg-gray-50/50 p-5">
              <AdsFileUpload value={form.image} onChange={setField("image")} />
            </div>
          </FormSection>
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
