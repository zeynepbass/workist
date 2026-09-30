import apiClient from "@/shared/api";

export const adsApi = {
  list: (params) => apiClient.get("/api/ads", { params }),
  get: (id) => apiClient.get(`/api/ads/${id}`),
  create: (formData) => apiClient.post("/api/ads", formData),
  update: (id, formData) => apiClient.patch(`/api/ads/${id}`, formData),
  remove: (id) => apiClient.delete(`/api/ads/${id}`),
};
