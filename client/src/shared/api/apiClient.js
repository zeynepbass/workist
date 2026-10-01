import axios from "axios";

import { getAccessToken, useSessionStore } from "@/shared/session/sessionStore";

const baseURL = process.env.REACT_APP_API_URL || "";
const SKIP_REFRESH_URLS = ["/api/auth/login", "/api/auth/register", "/api/auth/refresh"];

const apiClient = axios.create({ baseURL, withCredentials: true });

let refreshInFlight = null;

export function refreshSession() {
  if (!refreshInFlight) {
    refreshInFlight = axios
      .post(`${baseURL}/api/auth/refresh`, null, { withCredentials: true })
      .then((response) => {
        const { accessToken, user } = response.data.data;
        useSessionStore.getState().startSession(accessToken);
        return { accessToken, user };
      })
      .catch((error) => {
        useSessionStore.getState().endSession();
        throw error;
      })
      .finally(() => {
        refreshInFlight = null;
      });
  }

  return refreshInFlight;
}

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    const canRetry =
      response?.status === 401 &&
      config &&
      !config.retried &&
      !SKIP_REFRESH_URLS.includes(config.url);

    if (!canRetry) {
      throw error;
    }

    await refreshSession();
    return apiClient({ ...config, retried: true });
  },
);

export function errorMessage(error, fallback = "Beklenmeyen bir hata oluştu.") {
  return error?.response?.data?.error?.message || fallback;
}

export function toFormData(fields, files = {}) {
  const formData = new FormData();

  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined || value === null) continue;
    formData.append(key, typeof value === "object" ? JSON.stringify(value) : String(value));
  }

  for (const [key, value] of Object.entries(files)) {
    for (const file of [].concat(value ?? [])) {
      formData.append(key, file);
    }
  }

  return formData;
}

export default apiClient;
