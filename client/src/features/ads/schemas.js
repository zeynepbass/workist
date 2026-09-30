import { z } from "zod";

export const AD_OPTION_PRICE = 100;
export const AD_MIN_PRICE = 100;

export const AD_ADDON_OPTIONS = [
  { key: "logo", label: "Logo" },
  { key: "sourceCode", label: "Kaynak Kod" },
  { key: "backgroundMusic", label: "Fon Müziği" },
];

export const AD_EXTRA_OPTIONS = [
  { key: "fastDelivery", label: "Süper Hızlı Teslimat" },
  { key: "fullHd", label: "Full HD (1080px)" },
];

export const SERVICE_TYPE_OPTIONS = [
  { value: "Admin Panel", label: "Admin Panel" },
  { value: "Özel kodlanmış web tasarımı", label: "Özel kodlanmış web tasarımı" },
  { value: "Hata Giderme", label: "Hata Giderme" },
];

export const adFormSchema = z.object({
  serviceType: z.string().min(1, "Hizmet türü seçin."),
  title: z.string().trim().min(5, "Başlık en az 5 karakter olmalı.").max(120, "En fazla 120 karakter."),
  description: z.string().trim().min(10, "Açıklama en az 10 karakter olmalı.").max(5000),
  deliveryTime: z.string().trim().min(1, "Teslim süresini girin.").max(40),
  revisionCount: z.coerce.number({ error: "Sayı girin." }).int().min(0, "En az 0.").max(20, "En fazla 20."),
  basePrice: z.coerce.number({ error: "Sayı girin." }).min(AD_MIN_PRICE, `Fiyat en az ${AD_MIN_PRICE} TL olmalı.`),
  addons: z.object({ logo: z.boolean(), sourceCode: z.boolean(), backgroundMusic: z.boolean() }),
  extras: z.object({ fastDelivery: z.boolean(), fullHd: z.boolean() }),
});

export const EMPTY_AD_FORM = {
  serviceType: "",
  title: "Ben, ",
  description: "",
  deliveryTime: "",
  revisionCount: 1,
  basePrice: AD_MIN_PRICE,
  addons: { logo: false, sourceCode: false, backgroundMusic: false },
  extras: { fastDelivery: false, fullHd: false },
};

export const countSelectedOptions = ({ addons, extras }) =>
  [...Object.values(addons ?? {}), ...Object.values(extras ?? {})].filter(Boolean).length;

export const totalPrice = (values) =>
  Number(values.basePrice || 0) + countSelectedOptions(values) * AD_OPTION_PRICE;

export function adToFormValues(ad) {
  return {
    serviceType: ad.serviceType,
    title: ad.title,
    description: ad.description,
    deliveryTime: ad.deliveryTime,
    revisionCount: ad.revisionCount,
    basePrice: ad.price - countSelectedOptions(ad) * AD_OPTION_PRICE,
    addons: { ...EMPTY_AD_FORM.addons, ...ad.addons },
    extras: { ...EMPTY_AD_FORM.extras, ...ad.extras },
  };
}

export function formValuesToFields({ basePrice, ...values }) {
  return { ...values, price: totalPrice({ basePrice, ...values }) };
}
