import apiClient from "@/shared/api";

export const categoriesApi = {
  getCategories() {
    return apiClient.get("/api/categories");
  },
};
