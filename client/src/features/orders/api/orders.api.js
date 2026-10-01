import apiClient from "@/shared/api";

export const ordersApi = {
  list: (params) => apiClient.get("/api/orders", { params }),
  get: (id) => apiClient.get(`/api/orders/${id}`),
  create: (body) => apiClient.post("/api/orders", body),
  act: (id, path, body) => apiClient.post(`/api/orders/${id}/${path}`, body),
  downloadFile: (id, fileId) =>
    apiClient.get(`/api/orders/${id}/files/${fileId}`, { responseType: "blob" }),
  review: (id, body) => apiClient.post(`/api/orders/${id}/review`, body),
  listReviews: (params) => apiClient.get("/api/reviews", { params }),
};
