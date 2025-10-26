"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Si ya está logueado, redirige a /projects
  useEffect(() => {
    if (!loading && user) {
      router.push("/projects");
    }
  }, [user, loading, router]);

  if (loading) return <div>Cargando...</div>;

  // Función para redirigir al login
  const goToLogin = () => {
    router.push("/login"); // Redirige a la página de login
  };

  return (
    <main className="p-4">
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-2xl font-bold">Acceso requerido</h1>
        <p>
          Debes iniciar sesión para continuar.{" "}
          <button
            onClick={goToLogin}
            className="text-blue-500 underline hover:text-blue-700"
          >
            Ir al login
          </button>
        </p>
      </div>
    </main>
  );
}
