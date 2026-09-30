import { z } from "zod";

import {
  belongsToCategory,
  categorySlug,
  formBoolean,
  jsonObject,
  objectId,
  paginationQuery,
  subcategorySlug,
} from "./common.js";

export const AD_MIN_PRICE = 100;

const addons = z
  .strictObject({
    logo: formBoolean.default(false),
    sourceCode: formBoolean.default(false),
    backgroundMusic: formBoolean.default(false),
  })
  .default({ logo: false, sourceCode: false, backgroundMusic: false });

const extras = z
  .strictObject({
    fastDelivery: formBoolean.default(false),
    fullHd: formBoolean.default(false),
  })
  .default({ fastDelivery: false, fullHd: false });

const adFields = z.strictObject({
  serviceType: z.string().trim().min(1).max(80),
  title: z.string().trim().min(5).max(120),
  description: z.string().trim().min(10).max(5000),
  deliveryTime: z.string().trim().min(1).max(40),
  revisionCount: z.coerce.number().int().min(0).max(20),
  price: z.coerce.number().min(AD_MIN_PRICE).max(1_000_000),
  addons: jsonObject(addons),
  extras: jsonObject(extras),
  category: categorySlug,
  subcategory: subcategorySlug,
});

const categoryMatchMessage = {
  path: ["subcategory"],
  message: "Alt kategori seçilen kategoriye ait değil.",
};

export const createAdBody = adFields.refine(belongsToCategory, categoryMatchMessage);

export const updateAdBody = adFields
  .partial()
  .refine((value) => (value.category === undefined) === (value.subcategory === undefined), {
    path: ["subcategory"],
    message: "Kategori ve alt kategori birlikte gönderilmeli.",
  })
  .refine((value) => !value.category || belongsToCategory(value), categoryMatchMessage);

export const listAdsQuery = paginationQuery.extend({
  search: z.string().trim().max(100).optional(),
  category: categorySlug.optional(),
  subcategory: subcategorySlug.optional(),
  owner: z.union([z.literal("me"), objectId]).optional(),
  sort: z.enum(["newest", "oldest"]).default("newest"),
});
