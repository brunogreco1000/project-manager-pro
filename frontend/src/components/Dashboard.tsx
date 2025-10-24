"use client";

import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useFetch } from "../hooks/useFetch";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Project = {
  id: number;
  name: string;
  progress: number;
};

export const Dashboard = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const { data: projects, loading, error } = useFetch<Project[]>("/projects");

  if (!user) return null;

  if (loading)
    return <div className="text-center py-10">Cargando proyectos...</div>;

  if (error)
    return (
      <div className="text-center py-10 text-red-500">Error: {error}</div>
    );

  if (!projects || projects.length === 0)
    return (
      <div className="text-center py-10">No hay proyectos para mostrar.</div>
    );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Dashboard de Proyectos de {user.username}
      </h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={projects}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: theme === "dark" ? "#1f2937" : "#f3f4f6",
              color: theme === "dark" ? "#f9fafb" : "#111827",
            }}
          />
          <Bar
            dataKey="progress"
            fill={theme === "dark" ? "#3b82f6" : "#1d4ed8"}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
