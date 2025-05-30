import axios from 'axios';
import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 8000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if(accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if(error.response.status === 401) {
            // redirect to login page
            window.location.href = "/";
        } else if(error.response.status === 500) {
            console.log("Server error. Please try again later.");
        } else if(error.code === "ECONNABORTED") {
            console.log("Request timed out. Please try again later.");
        }
        return Promise.rejectect(error);
    }
);

export default axiosInstance;