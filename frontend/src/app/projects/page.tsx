"use client";

import { useFetch } from "../../hooks/useFetch";

type Project = {
  id: number;
  name: string;
  progress: number;
};

export default function ProjectsPage() {
  const { data: projects, loading, error } = useFetch<Project[]>("/projects");

  if (loading) return <div className="p-6 text-center">Cargando proyectos...</div>;
  if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  if (!projects || projects.length === 0)
    return <div className="p-6 text-center">No hay proyectos para mostrar.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Proyectos</h1>
      <ul className="space-y-2">
        {projects.map((project) => (
          <li key={project.id} className="p-4 bg-white dark:bg-gray-800 rounded shadow">
            <div className="flex justify-between items-center">
              <span>{project.name}</span>
              <span className="text-gray-500">{project.progress}%</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
