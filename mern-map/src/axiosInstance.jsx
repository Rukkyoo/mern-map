import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/autocomplete", // The base URL for the API
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance