import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api",

  headers: {
    "Content-Type": "application/json"
  },

  // IMPORTANT:
  // Allows browser cookies such as the JWT "token"
  // to be sent to the backend.
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // Keep this in case some APIs use Authorization headers.
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }

    return Promise.reject(error);
  }
);

export default api;