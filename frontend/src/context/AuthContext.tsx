"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api } from "../services/api";

type User = {
  id: number;
  username: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Login
  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    setUser(res.data.user);
  };

  // Register
  const register = async (username: string, email: string, password: string) => {
    const res = await api.post("/auth/register", { username, email, password });
    setUser(res.data.user);
  };

  // Logout
  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  // Refrescar usuario desde cookie
  const refreshUser = async () => {
    try {
      const res = await api.get("/auth/me"); // endpoint que retorna user desde la cookie
      setUser(res.data.user);
    } catch {
      setUser(null);
    }
  };

  // Al iniciar la app, refrescamos usuario
  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
