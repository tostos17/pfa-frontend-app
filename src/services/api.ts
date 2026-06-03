import axios, { type InternalAxiosRequestConfig } from 'axios';

const API = axios.create({
  baseURL: (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically inject JWT token signature
API.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;