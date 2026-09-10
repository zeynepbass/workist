import apiClient from "@/infrastructure/http/apiClient";
export const authRepository = {
    login: (data) =>
      apiClient.post("/signin", data),
  
    register: (data) =>
      apiClient.post("/uye-ol", data),
    account:()=>
      apiClient.delete(`/users/${userid.result.email}`),
    details:()=>
      apiClient.get(`/duzenle/${userid.result.email}`),
  getMessages: (userId) =>
    apiClient.get(`/konusmalar/${userId}`),

  getUsers: () =>
    apiClient.get("/users"),

  getMessageData: (currentId, targetId) =>
    apiClient.get(`/${currentId}/${targetId}`),

  updateDetails: (email, formData) =>
    apiClient.put(`/duzenle/${email}`, formData),

  getDetails: (email) =>
    apiClient.get(`/duzenle/${email}`),
  
}

