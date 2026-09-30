import mongoose from "mongoose";
import { z } from "zod";

import { CATEGORIES } from "../constants/categories.js";
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "../utils/pagination.js";

export const objectId = z
  .string()
  .refine((value) => mongoose.Types.ObjectId.isValid(value), "Geçersiz kimlik.");

export const idParams = z.object({ id: objectId });

export const paginationQuery = z.object({
  cursor: z.string().max(200).optional(),
  limit: z.coerce.number().int().min(1).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
});

export const categorySlug = z.enum(CATEGORIES.map((category) => category.slug));

export const subcategorySlug = z.enum(
  CATEGORIES.flatMap((category) => category.subcategories.map((subcategory) => subcategory.slug)),
);

export function belongsToCategory(value) {
  const category = CATEGORIES.find((item) => item.slug === value.category);
  return Boolean(category?.subcategories.some((item) => item.slug === value.subcategory));
}

export const formBoolean = z
  .union([z.boolean(), z.enum(["true", "false"])])
  .transform((value) => value === true || value === "true");

export const jsonObject = (schema) =>
  z.preprocess((value) => {
    if (typeof value !== "string") {
      return value;
    }

    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }, schema);
