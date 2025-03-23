import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://mern-map.onrender.com/api", // The base URL for the API
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance