
import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:4562",
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

        console.log(
            "API REQUEST:",
            config.method?.toUpperCase(),
            config.baseURL + config.url
        );

        console.log(
            "TOKEN VAR MI:",
            !!token
        );

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        console.log(
            "API RESPONSE:",
            response.status,
            response.config.url
        );

        return response;
    },
    (error) => {
        console.log(
            "API ERROR:",
            error.response?.status,
            error.config?.url,
            error.response?.data
        );

        if (error.response?.status === 401) {
            console.log("🚨 401 GELDİ");
            console.log("URL:", error.config?.url);
            console.log("METHOD:", error.config?.method);
            console.log(
                "AUTH HEADER:",
                error.config?.headers?.Authorization
            );
        }

        // ŞİMDİLİK redirect yapmıyoruz.
        // Önce hangi request'in 401 verdiğini bulacağız.

        return Promise.reject(error);
    }
);

export default apiClient;

