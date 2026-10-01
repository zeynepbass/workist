import apiClient from "@/shared/api";

export const portfolioApi = {
  list: (params) => apiClient.get("/api/portfolios", { params }),
  get: (id) => apiClient.get(`/api/portfolios/${id}`),
  create: (formData) => apiClient.post("/api/portfolios", formData),
  update: (id, formData) => apiClient.patch(`/api/portfolios/${id}`, formData),
  remove: (id) => apiClient.delete(`/api/portfolios/${id}`),
};
