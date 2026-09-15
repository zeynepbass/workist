import axios from "axios";



const apiClient = axios.create({
    baseURL: "http://localhost:4562",
});


apiClient.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");

            if (token) {
                config.headers.Authorization =
                    `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;

        if (
            typeof window !== "undefined" &&
            status === 401
        ) {
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default apiClient;