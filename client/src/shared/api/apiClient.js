import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:4562",
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        const isAuthRequest =
            config.url === "/signin" ||
            config.url === "/uye-ol";

        if (token && !isAuthRequest) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
