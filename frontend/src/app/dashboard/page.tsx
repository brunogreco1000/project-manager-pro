"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { Dashboard } from "../../components/Dashboard";
import { ReportButtons } from "../../components/ReportButtons";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/"); // redirige automáticamente al login
  }, [user, router]);

  if (!user) return <div>Cargando...</div>;

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="container mx-auto px-4 py-6">
        <Dashboard />
        <ReportButtons />
        <nav className="mt-6">
          <Link href="/projects" className="text-blue-600 hover:underline mr-4">
            Proyectos
          </Link>
          <Link href="/tasks" className="text-blue-600 hover:underline">
            Tareas
          </Link>
        </nav>
      </div>
    </main>
  );
}
