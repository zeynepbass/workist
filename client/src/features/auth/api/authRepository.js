import apiClient from "@/infrastructure/http/apiClient";
export const authRepository = {
    login: (data) =>
      apiClient.post("/signin", data),
  
    register: (data) =>
      apiClient.post("/uye-ol", data),
  };