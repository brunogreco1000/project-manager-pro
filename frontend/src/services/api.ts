import axios from "axios";

// Crear una instancia con baseURL y configuración común
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // fundamental para enviar cookies HttpOnly
});
