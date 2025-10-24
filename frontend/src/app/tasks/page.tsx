"use client";

import { useFetch } from "../../hooks/useFetch";
import { useAuth } from "../../context/AuthContext";
import  Link  from "next/link";

type Task = {
  id: number;
  title: string;
  project: string;
  progress: number;
};

export default function TasksPage() {
  const { user } = useAuth();
  const { data: tasks, loading, error } = useFetch<Task[]>("/tasks");

  if (!user) return null;
  if (loading) return <p className="text-center py-10">Cargando tareas...</p>;
  if (error) return <p className="text-center py-10 text-red-500">Error: {error}</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tareas de Proyectos</h1>
      <Link
        href="/tasks/new"
        className="inline-block mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Nueva Tarea
      </Link>

      <ul className="space-y-2">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <li
              key={task.id}
              className="p-3 border rounded flex justify-between items-center hover:shadow"
            >
              <div>
                <p className="font-semibold">{task.title}</p>
                <p className="text-sm text-gray-500">Proyecto: {task.project}</p>
              </div>
              <p>{task.progress}%</p>
            </li>
          ))
        ) : (
          <p>No hay tareas disponibles.</p>
        )}
      </ul>
    </div>
  );
}
