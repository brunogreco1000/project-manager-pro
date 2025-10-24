"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import InputField from "../../components/InputField";
import { useAuth } from "../../context/AuthContext";

// Regex para validar email
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const { login } = useAuth(); // login seguro vía cookies HttpOnly
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validEmail || !password) {
      setError("Por favor, completa los campos correctamente.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        credentials: "include", // cookies HttpOnly
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Error al iniciar sesión.");

      // Actualizar contexto de usuario
      await login(email, password);

      // Redirigir al dashboard
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Error desconocido.");
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
          valid={validEmail}
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
            validEmail && password
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-500 cursor-not-allowed"
          }`}
          disabled={!validEmail || !password || loading}
        >
          {loading ? "Iniciando sesión..." : "Login"}
        </button>
      </form>
    </div>
  );
}
