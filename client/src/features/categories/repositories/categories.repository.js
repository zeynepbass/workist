import { categoriesApi } from "../api/categories.api";

export async function getCategories() {
  const response = await categoriesApi.getCategories();

  return response.data;
}
