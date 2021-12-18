import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5500/api/",
});

export const axiosAuthorization = axios.create({
  baseURL: "http://localhost:5500/api/",
});

axiosAuthorization.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") ?? null;

  if (token) {
    config.headers["authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
