import { z } from "zod";

export const orderRequestSchema = z.object({
  requirements: z.string().trim().min(10, "İhtiyacınızı en az 10 karakterle anlatın.").max(5000),
});

export const offerSchema = z.object({
  price: z.coerce.number({ error: "Sayı girin." }).min(100, "Teklif en az 100 TL olmalı."),
  deliveryDays: z.coerce.number({ error: "Sayı girin." }).int().min(1, "En az 1 gün.").max(365),
  note: z.string().trim().max(2000),
});

export const noteSchema = z.object({ note: z.string().trim().max(2000) });

export const reviewSchema = z.object({
  rating: z.coerce.number().int().min(1, "Puan seçin.").max(5),
  comment: z.string().trim().max(1000),
});

export const DELIVERY_MAX_FILES = 5;
export const DELIVERY_MAX_BYTES = 20 * 1024 * 1024;
