import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:4562",
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        console.log("API REQUEST:", config.method, config.baseURL + config.url);

        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => {
        console.log("API RESPONSE:", response.status, response.config.url);
        return response;
    },
    (error) => {
        console.log(
            "API ERROR:",
            error.response?.status,
            error.response?.data
        );

        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("login");
            window.location.href = "/";
        }

        return Promise.reject(error);
    }
);

export default apiClient;