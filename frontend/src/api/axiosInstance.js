import axios from 'axios';
import { getAccessToken, getRefreshToken, saveTokens, removeTokens } from '../utils/token';
import { refreshAccessToken } from "./authApi";

const api = axios.create({
    baseURL : "http://127.0.0.1:8000/api/",
});

const refreshApi = axios.create({
    baseURL : "http://127.0.0.1:8000/api/",
});


api.interceptors.request.use(
    (config) => {
        const token = getAccessToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) =>{
        return Promise.reject(error);
    }
);



api.interceptors.response.use(
    (response) => response,
    async (error) => {
        
        const originalRequest = error.config;

        if(
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {

                const refresh = getRefreshToken();

                if (!refresh) {
                    removeTokens();
                    return Promise.reject(error);
                }

                const data = await refreshAccessToken(refresh);

                saveTokens(data.access, refresh);

                originalRequest.headers.Authorization = `Bearer ${data.access}`;

                return api(originalRequest);

            } catch (err) {

                removeTokens();

                return Promise.reject(err);

            }

        }

        return Promise.reject(error);
    }
);

export default api;