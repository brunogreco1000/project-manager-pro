"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirige al login si no hay usuario
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading]);

  if (loading) return <div className="p-6 text-center">Cargando...</div>;

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Bienvenido, {user?.username || "Usuario"}!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/projects"
          className="p-6 bg-blue-600 text-white rounded-2xl shadow-md hover:bg-blue-700 text-center font-semibold transition"
        >
          Ver Proyectos
        </Link>

        <Link
          href="/tasks"
          className="p-6 bg-green-600 text-white rounded-2xl shadow-md hover:bg-green-700 text-center font-semibold transition"
        >
          Ver Tareas
        </Link>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-500">Puedes navegar a tus secciones usando los enlaces de arriba.</p>
      </div>
    </main>
  );
}
