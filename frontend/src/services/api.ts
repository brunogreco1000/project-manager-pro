import axios from "axios";

// Crear una instancia con baseURL y configuración común
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api", // reemplaza con tu backend
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // si manejas cookies o JWT en headers
});

// Opcional: interceptores para agregar token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // ejemplo usando localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
