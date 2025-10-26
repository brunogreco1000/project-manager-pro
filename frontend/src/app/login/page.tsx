"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import InputField from "../../components/InputField";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validar email antes de enviar (opcional)
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Por favor, introduce un correo válido.");
      setLoading(false);
      return;
    }

    try {
      await login(email, password);
      router.push("/projects");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error al iniciar sesión.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Iniciar sesión</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputField
          label="Email"
          type="email"
          value={email}
          setValue={setEmail}
          valid={email.length > 0}
          placeholder="ejemplo@correo.com"
          required
          inputRef={emailRef}
        />

        <InputField
          label="Contraseña"
          type="password"
          value={password}
          setValue={setPassword}
          valid={password.length > 0}
          placeholder="••••••••"
          required
        />

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className={`p-2 rounded text-white font-semibold transition ${
            email && password
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-500 cursor-not-allowed"
          }`}
          disabled={!email || !password || loading}
        >
          {loading ? "Ingresando..." : "Iniciar sesión"}
        </button>

        <p className="text-sm text-center mt-2">
          <button
            type="button"
            onClick={() => router.push("/forgot-password")}
            className="text-blue-600 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </p>

        <button
          type="button"
          onClick={() =>
            window.location.href = "http://localhost:3001/api/auth/google"
          }
          className="p-2 rounded text-white font-semibold bg-red-600 hover:bg-red-700 mt-2"
        >
          Iniciar sesión con Google
        </button>
      </form>
    </div>
  );
}
