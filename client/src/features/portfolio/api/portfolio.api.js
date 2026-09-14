import apiClient from "@/infrastructure/http/apiClient";
export const portfolioRepository = {
    getByUserId: (userId) =>
      apiClient.get(`/portfolyo/${userId}`),
  
    create: (data) =>
      apiClient.post("/portfolyo", data),
  
    update: (id, data) =>
      apiClient.put(`/portfolyo/${id}`, data),
  
    remove: (id) =>
      apiClient.delete(`/portfolyo/${id}`),
  };