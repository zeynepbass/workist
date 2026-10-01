import { z } from "zod";

export const PORTFOLIO_STATUS_OPTIONS = [
  { value: "published", label: "Yayında" },
  { value: "unpublished", label: "Yayında değil" },
];

export const portfolioFormSchema = z.object({
  title: z.string().trim().min(3, "Başlık en az 3 karakter olmalı.").max(120),
  description: z.string().trim().min(10, "Açıklama en az 10 karakter olmalı.").max(5000),
  price: z.coerce.number({ error: "Sayı girin." }).min(100, "Fiyat en az 100 TL olmalı."),
  status: z.enum(["published", "unpublished"]),
});

export const EMPTY_PORTFOLIO_FORM = { title: "", description: "", price: 100, status: "published" };

export const portfolioToFormValues = (portfolio) => ({
  title: portfolio.title,
  description: portfolio.description,
  price: portfolio.price,
  status: portfolio.status,
});
