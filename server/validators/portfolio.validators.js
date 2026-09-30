import { z } from "zod";

import { PORTFOLIO_STATUSES } from "../models/portfolio.model.js";
import {
  belongsToCategory,
  categorySlug,
  objectId,
  paginationQuery,
  subcategorySlug,
} from "./common.js";

const status = z.enum(PORTFOLIO_STATUSES);

const portfolioFields = z.strictObject({
  title: z.string().trim().min(3).max(120),
  description: z.string().trim().min(10).max(5000),
  price: z.coerce.number().min(100).max(1_000_000),
  status: status.default("published"),
  category: categorySlug,
  subcategory: subcategorySlug,
});

const categoryMatchMessage = {
  path: ["subcategory"],
  message: "Alt kategori seçilen kategoriye ait değil.",
};

export const createPortfolioBody = portfolioFields.refine(belongsToCategory, categoryMatchMessage);

export const updatePortfolioBody = portfolioFields
  .extend({ status: status })
  .partial()
  .refine(
    (value) => (value.category === undefined) === (value.subcategory === undefined),
    { path: ["subcategory"], message: "Kategori ve alt kategori birlikte gönderilmeli." },
  )
  .refine((value) => !value.category || belongsToCategory(value), categoryMatchMessage);

export const updatePortfolioStatusBody = z.strictObject({ status });

export const listPortfoliosQuery = paginationQuery.extend({
  owner: z.union([z.literal("me"), objectId]).default("me"),
  status: status.optional(),
});
