import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://devtcha-backend.herokuapp.com/api/",
});

export const axiosAuthorization = axios.create({
  baseURL: "https://devtcha-backend.herokuapp.com/api/",
});

axiosAuthorization.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") ?? null;

  if (token) {
    config.headers["authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
