import axios from "axios";

const axiosInstance = axios.create({baseURL:`${import.meta.env.VITE_BACKEND_URL}`})

axiosInstance.interceptors.request.use((config:any)=>{
    const token = sessionStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
},
(error) => Promise.reject(error)
);

//response interceptor to handle expired tokens
axiosInstance.interceptors.response.use((res:any)=> res,
async(error)=>{
    const originalRequest = error.config;
    if(error.response.status === 401 && !originalRequest._retry){
        originalRequest._retry = true;

        //handle token expiration logic here (e.g redirect to login)
        sessionStorage.removeItem("token");

        //redirect to login page
        window.location.href = "/auth/login"
    }

    return Promise.reject(error)
})


export default axiosInstance