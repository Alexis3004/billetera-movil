import axios from "axios";
import router from '@/router'

const paymentsApi = axios.create({
    baseURL: "https://payments-gmba.onrender.com",
});

// Request interceptors for API calls
paymentsApi.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        config.headers["Authorization"] = `Bearer ${user ? user.api_token : ''}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

paymentsApi.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response?.status == 401) {
            localStorage.clear()
            router.push({ name: 'signin' })
            window.history.go()
        }
        return Promise.reject(error);
    }
);

export default paymentsApi;
