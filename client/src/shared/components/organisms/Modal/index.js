import { useState } from "react";
import toast from "react-hot-toast";

import { Textarea, Button, Input, Select } from "@/shared/components/atoms";
import { useCategories } from "@/features/categories/hooks/useCategories";
import {
  AD_ADDON_OPTIONS,
  AD_EXTRA_OPTIONS,
  AD_OPTION_PRICE,
  CURRENCY_OPTIONS,
  SERVICE_TYPE_OPTIONS,
} from "@/shared/constants/options";

const CATEGORY_ICONS = {
  "graphic-design": { src: "/assets/graphic-designer.png", alt: "Grafik ve Tasarım" },
  "writing-translation": { src: "/assets/ab.png", alt: "Yazı ve Çeviri" },
  "software-technology": { src: "/assets/software.png", alt: "Yazılım ve Teknoloji" },
};

const PRIMARY_BUTTON_CLASS =
  "bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 disabled:opacity-50";

const createPortfolioForm = () => ({
  price: "",
  currency: "TL",
  title: "",
  description: "",
  image: "",
});

const createAdForm = () => ({
  deliveryTime: "",
  description: "",
  price: "",
  currency: "TL",
  addons: { logo: false, sourceCode: false, backgroundMusic: false },
  extras: { fastDelivery: false, fullHd: false },
  revisionCount: "",
  title: "Ben, ",
  serviceType: "",
  image: "",
});

function countSelected(options) {
  return Object.values(options).filter(Boolean).length;
}

function withTitlePrefix(value) {
  return value.startsWith("Ben,") ? value : `Ben, ${value.replace(/^Ben,? ?/, "")}`;
}

function SelectableCard({ isSelected, onSelect, children }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={`cursor-pointer border-2 rounded-lg p-4 text-center ${
        isSelected ? "border-purple-600 bg-purple-100" : "border-gray-300"
      }`}
    >
      {children}
    </button>
  );
}

function BackStepButton({ onClick }) {
  return (
    <Button type="button" onClick={onClick}>
      <img src="/assets/left-arrow.png" width="40" height="40" alt="Geri" />
    </Button>
  );
}

function OptionCheckboxes({ title, section, options, values, onChange }) {
  return (
    <div>
      <h3 className="text-md font-semibold text-gray-500">{title}</h3>

      {options.map(({ key, label }) => (
        <label key={key} className="flex items-center space-x-2 mt-2">
          <Input
            type="checkbox"
            checked={values[key]}
            onChange={(e) => onChange(section, key, e.target.checked)}
          />

          <span className="text-gray-500">{label}</span>
        </label>
      ))}
    </div>
  );
}

export function Modal({ type, onCreate, userId, firstName }) {
  const isPortfolio = type === "portfolio";
  const createInitialForm = isPortfolio ? createPortfolioForm : createAdForm;

  const { categories } = useCategories();

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [formData, setFormData] = useState(createInitialForm);

  const selectedCategory = categories.find((item) => item.slug === category);

  const resetForm = () => {
    setFormData(createInitialForm());
    setCategory("");
    setSubcategory("");
    setStep(1);
    setIsOpen(false);
  };

  const setField = (name, value) => setFormData((previous) => ({ ...previous, [name]: value }));

  const handleInputChange = (e) => setField(e.target.name, e.target.value);

  const handleCheckboxChange = (section, key, checked) => {
    setFormData((previous) => ({
      ...previous,
      [section]: { ...previous[section], [key]: checked },
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setField("image", reader.result);
    reader.readAsDataURL(file);
  };

  const buildPortfolioPayload = () => {
    const payload = { ...formData, category, subcategory };
    const isValid =
      payload.image &&
      payload.description &&
      payload.title &&
      category &&
      subcategory &&
      Number(payload.price) >= 100;

    return { payload, isValid, successMessage: "Portfolyo başarıyla oluşturuldu." };
  };

  const buildAdPayload = () => {
    const selectedOptionCount = countSelected(formData.addons) + countSelected(formData.extras);
    const payload = {
      ...formData,
      category,
      subcategory,
      price: (Number(formData.price) || 0) + selectedOptionCount * AD_OPTION_PRICE,
      userId,
      ownerName: firstName,
    };
    const isValid =
      payload.deliveryTime &&
      payload.title &&
      payload.serviceType &&
      payload.revisionCount &&
      payload.description &&
      payload.image &&
      category &&
      subcategory &&
      payload.price >= 100;

    return { payload, isValid, successMessage: "İlan başarıyla oluşturuldu." };
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { payload, isValid, successMessage } = isPortfolio
      ? buildPortfolioPayload()
      : buildAdPayload();

    if (!isValid) {
      toast.error("Tüm alanları doldurun ve fiyat en az 100 TL olmalıdır!");
      return;
    }

    try {
      await onCreate(payload);
      resetForm();
      toast.success(successMessage);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Kayıt oluşturulurken bir hata oluştu.");
    }
  };

  return (
    <>
      <Button
        type="button"
        className="bg-purple-500 float-right text-white p-4 rounded-md mb-4 cursor-pointer text-base w-full md:text-sm md:p-2 md:w-40"
        onClick={() => setIsOpen(true)}
      >
        {isPortfolio ? "Yeni Portfolyo Ekle" : "Yeni İş İlanı Ekle"}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <button
            type="button"
            aria-label="Kapat"
            className="absolute inset-0 cursor-default"
            onClick={resetForm}
          />
          <div
            role="dialog"
            aria-modal="true"
            className="relative bg-white w-full max-w-2xl p-6 rounded-md space-y-6 max-h-[90vh] overflow-y-auto"
          >
            {step === 1 && (
              <>
                <h2 className="text-xl font-semibold text-gray-400">Kategori Seçin</h2>

                <p className="text-gray-400 italic">
                  Hadi, başlayalım. 😎
                  <br />
                  {isPortfolio
                    ? "Ekleyeceğin portfolyo hangi ana kategoriye giriyor?"
                    : "Eklemek istediğin iş ilanı hangi kategoriye giriyor?"}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {categories.map((item) => (
                    <SelectableCard
                      key={item.slug}
                      isSelected={category === item.slug}
                      onSelect={() => {
                        setCategory(item.slug);
                        setSubcategory("");
                      }}
                    >
                      {CATEGORY_ICONS[item.slug] && (
                        <img
                          src={CATEGORY_ICONS[item.slug].src}
                          alt={CATEGORY_ICONS[item.slug].alt}
                          width="50"
                          height="50"
                        />
                      )}

                      <p className="mt-2 font-medium text-left text-gray-400">{item.label}</p>
                    </SelectableCard>
                  ))}
                </div>

                <div className="flex justify-end mt-4">
                  <Button
                    type="button"
                    disabled={!category}
                    className={PRIMARY_BUTTON_CLASS}
                    onClick={() => setStep(2)}
                  >
                    Devam Et
                  </Button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-xl font-semibold text-gray-400">
                  <span className="text-purple-950">{selectedCategory?.label}</span> kategorisinin
                  alt alanı?
                </h2>

                <p className="text-gray-500 italic">Biraz daha detay alalım!</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(selectedCategory?.subcategories ?? []).map((item) => (
                    <SelectableCard
                      key={item.slug}
                      isSelected={subcategory === item.slug}
                      onSelect={() => setSubcategory(item.slug)}
                    >
                      <p className="font-medium text-gray-400">{item.label}</p>
                    </SelectableCard>
                  ))}
                </div>

                <div className="flex justify-between mt-4">
                  <BackStepButton onClick={() => setStep(1)} />

                  <Button
                    type="button"
                    disabled={!subcategory}
                    className={PRIMARY_BUTTON_CLASS}
                    onClick={() => setStep(3)}
                  >
                    Devam Et
                  </Button>
                </div>
              </>
            )}

            {step === 3 && (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-400">Biraz Bahseder misin?</h2>

                {isPortfolio ? (
                  <>
                    <Input
                      name="title"
                      type="text"
                      aria-label="Başlık"
                      placeholder="Etkileyici bir başlık"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-purple-500 rounded bg-white text-gray-800"
                    />

                    <Textarea
                      name="description"
                      rows={4}
                      aria-label="Açıklama"
                      placeholder="Portfolyon hakkında detaylı bilgi ver..."
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-purple-500 rounded bg-white text-gray-800"
                    />

                    <div className="flex space-x-2 items-center">
                      <Input
                        name="price"
                        type="number"
                        aria-label="Fiyat"
                        placeholder="Fiyat girin"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="flex-grow p-3 border-2 border-purple-500 rounded bg-white text-gray-800"
                      />

                      <Select
                        aria-label="Para birimi"
                        value={formData.currency}
                        onChange={(e) => setField("currency", e.target.value)}
                        options={CURRENCY_OPTIONS}
                        placeholder={null}
                        className="p-3 border-2 border-purple-500 rounded bg-white text-gray-800 cursor-pointer"
                      />
                    </div>

                    <Input
                      label="Dosya Seç"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </>
                ) : (
                  <>
                    <Input
                      name="title"
                      label="Başlık"
                      type="text"
                      value={formData.title}
                      onChange={(e) => setField("title", withTitlePrefix(e.target.value))}
                      className="w-full p-3 border-2 border-purple-300 rounded"
                    />

                    <Input
                      name="revisionCount"
                      type="number"
                      label="Revizyon"
                      value={formData.revisionCount}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-purple-300 rounded"
                    />

                    <Input
                      name="deliveryTime"
                      label="Süre"
                      type="text"
                      value={formData.deliveryTime}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-purple-300 rounded"
                    />

                    <Input
                      name="price"
                      type="number"
                      label="Fiyat"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-purple-300 rounded"
                    />

                    <Select
                      aria-label="Para birimi"
                      value={formData.currency}
                      onChange={(e) => setField("currency", e.target.value)}
                      options={CURRENCY_OPTIONS}
                      placeholder={null}
                      className="w-full p-3 border-2 border-purple-300 rounded"
                    />

                    <OptionCheckboxes
                      title="Kod Fiyatlandırma"
                      section="addons"
                      options={AD_ADDON_OPTIONS}
                      values={formData.addons}
                      onChange={handleCheckboxChange}
                    />

                    <OptionCheckboxes
                      title="Ekstra Özellikler"
                      section="extras"
                      options={AD_EXTRA_OPTIONS}
                      values={formData.extras}
                      onChange={handleCheckboxChange}
                    />

                    <Select
                      id="modal-service-type"
                      label="Hizmet Türü"
                      value={formData.serviceType}
                      onChange={(e) => setField("serviceType", e.target.value)}
                      options={SERVICE_TYPE_OPTIONS}
                      placeholder="Hizmet türü seçin"
                      className="w-full p-3 border-2 border-purple-300 rounded"
                    />

                    <Textarea
                      name="description"
                      label="İlan Açıklaması"
                      rows={4}
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-purple-300 rounded"
                    />

                    <Input
                      label="Dosya Yükle"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </>
                )}

                <div className="flex justify-between items-center">
                  <BackStepButton onClick={() => setStep(2)} />

                  <Button type="submit" className={PRIMARY_BUTTON_CLASS}>
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
