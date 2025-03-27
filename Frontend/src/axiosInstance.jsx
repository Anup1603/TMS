import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
});

// Request interceptor to add auth token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/auth/login"; // Redirect to login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
