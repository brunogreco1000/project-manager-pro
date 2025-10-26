"use client";

import { useState } from "react";
import { useRouter } from "next/navigation.tsx";
import { api } from "../../services/api.tsx";
import { useAuth } from "../../context/AuthContext.tsx";

export default function NewTaskPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !project) {
      setError("Completa todos los campos.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await api.post("/tasks", { title, project, progress });
      router.push("/tasks"); // redirige al listado después de crear
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al crear la tarea.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Nueva Tarea</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Título de la tarea"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded outline-none"
          required
        />
        <input
          type="text"
          placeholder="Proyecto asociado"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          className="p-2 border rounded outline-none"
          required
        />
        <input
          type="number"
          placeholder="Progreso (%)"
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="p-2 border rounded outline-none"
          min={0}
          max={100}
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {loading ? "Creando..." : "Crear Tarea"}
        </button>
      </form>
    </div>
  );
}
