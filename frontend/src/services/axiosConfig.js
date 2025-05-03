// src/services/axiosConfig.js
import axios from 'axios';
const API_BASE = import.meta.env.VITE_BACKENDAPISTRING || "http://localhost:5000";

const axiosInstance = axios.create({ baseURL: API_BASE });

axiosInstance.interceptors.request.use((config) =>
{
  const token = localStorage.getItem('token');
  if (token)
  {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
