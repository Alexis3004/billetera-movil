import axios from "axios";

const paymentsApi = axios.create({
    baseURL: "http://localhost:3000",
    // headers: {
    //     Authorization : `Bearer ${user ? user.api_token : ''}`
    // }
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

// paymentsApi.interceptors.response.use(
//     response => {
//         return response;
//     },
//     error => {
//         if(error.response.status == 403){
//             refreshToken()
//         }
//     }
// );

export default paymentsApi;
