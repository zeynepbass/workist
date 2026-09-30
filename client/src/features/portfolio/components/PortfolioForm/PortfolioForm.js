import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Textarea, Button, Input, Select } from "@/shared/components/atoms";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { CURRENCY_OPTIONS, PORTFOLIO_STATUS_OPTIONS } from "@/shared/constants/options";
import PortfolioImageUpload from "../PortfolioImageUpload";

const EMPTY_FORM = {
  title: "",
  status: "published",
  price: "",
  description: "",
  image: "",
  currency: "TL",
  category: "",
  subcategory: "",
};

function toForm(portfolio) {
  return {
    title: portfolio.title || "",
    status: portfolio.status || "published",
    price: portfolio.price || "",
    description: portfolio.description || "",
    image: portfolio.image || "",
    currency: portfolio.currency || "TL",
    category: portfolio.category || "",
    subcategory: portfolio.subcategory || "",
  };
}

function isIncomplete(form) {
  return (
    form.title === "" ||
    form.status === "" ||
    form.description === "" ||
    form.image === "" ||
    form.category === "" ||
    form.subcategory === "" ||
    Number(form.price) < 100
  );
}

function FormSection({ title, description, children }) {
  return (
    <section className="w-full">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
      {children}
    </section>
  );
}

export default function PortfolioForm({ detail, onSubmit, isUpdating }) {
  const { categories } = useCategories();
  const [formData, setFormData] = useState(EMPTY_FORM);

  useEffect(() => {
    if (detail) {
      setFormData(toForm(detail));
    }
  }, [detail]);

  const categoryOptions = categories.map(({ slug, label }) => ({ value: slug, label }));
  const subcategoryOptions = (
    categories.find((category) => category.slug === formData.category)?.subcategories ?? []
  ).map(({ slug, label }) => ({ value: slug, label }));

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
      ...(name === "category" ? { subcategory: "" } : {}),
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setFormData((previous) => ({ ...previous, image: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isIncomplete(formData)) {
      toast.error("Tüm alanları doldurun ve fiyat en az 100 TL olmalıdır!");
      return;
    }

    try {
      await onSubmit(formData);
    } catch {
      toast.error("Portfolyo kaydedilemedi.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="border-b border-gray-200 bg-gray-50/70 ">
        <h2 className="text-xl font-semibold text-gray-900">Portfolyo Bilgileri</h2>

        <p className="mt-1 text-sm text-gray-500">Portfolyonuzun bilgilerini güncelleyin.</p>
      </div>

      <div className="space-y-8 p-6 md:p-8">
        <FormSection
          title="Temel Bilgiler"
          description="Portfolyonuzun kategori, başlık ve fiyat bilgilerini düzenleyin."
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Select
              id="portfolio-category"
              label="Kategori"
              name="category"
              value={formData.category}
              onChange={handleChange}
              options={categoryOptions}
            />

            <Select
              id="portfolio-subcategory"
              label="Alt Kategori"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              options={subcategoryOptions}
            />

            <Select
              id="portfolio-status"
              label="Yayın Durumu"
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={PORTFOLIO_STATUS_OPTIONS}
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
                  name="price"
                  className="w-full"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="En az 100 TL"
                  variant="default"
                />
              </div>

              <div className="w-24">
                <Select
                  aria-label="Para birimi"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  options={CURRENCY_OPTIONS}
                  placeholder={null}
                />
              </div>
            </div>
          </div>
        </FormSection>

        <div className="h-px bg-gray-100" />

        <FormSection
          title="Portfolyo Açıklaması"
          description="Projenizi ve sunduğunuz hizmeti detaylı şekilde açıklayın."
        >
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
        </FormSection>

        <div className="h-px bg-gray-100" />

        <FormSection
          title="Portfolyo Görseli"
          description="Portfolyonuzu temsil edecek bir görsel yükleyin."
        >
          <div className="w-full rounded-xl border border-dashed border-gray-300 bg-gray-50/50 p-5">
            <PortfolioImageUpload image={formData.image} onChange={handleFileChange} />
          </div>
        </FormSection>

        <div className="flex justify-center border-t border-gray-100 pt-6">
          <Button
            type="submit"
            variant="primary"
            disabled={isUpdating}
            className="w-full px-8 py-3 sm:w-auto"
          >
            {isUpdating ? "Güncelleniyor..." : "Portfolyoyu Güncelle"}
          </Button>
        </div>
      </div>
    </form>
  );
}
