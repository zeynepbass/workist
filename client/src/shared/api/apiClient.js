import axios from "axios";

const AUTH_ENDPOINTS = ["/signin", "/uye-ol"];

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "",
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && !AUTH_ENDPOINTS.includes(config.url)) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiClient;
