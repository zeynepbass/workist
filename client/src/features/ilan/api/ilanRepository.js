import apiClient from "@/infrastructure/http/apiClient";

export const ilanRepository = {
  getAll: () =>
    apiClient.get("/ilanlar"),

  search: (query) =>
    apiClient.get(`/ilanlar?search=${encodeURIComponent(query)}`),

  getMyIlanlar: (userId) =>
    apiClient.get(`/ilanlarim/${userId}`),

  getById: (id) =>
    apiClient.get(`/ilanlarim/${id}`),

  create: (data) =>
    apiClient.post("/ilanlarim", data),

  update: (id, data) =>
    apiClient.put(`/ilanlarim/${id}`, data),

  remove: (id) =>
    apiClient.delete(`/ilanlarim/${id}`),
};