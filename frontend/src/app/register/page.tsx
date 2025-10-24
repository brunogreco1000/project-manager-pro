"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import InputField from "../../components/InputField";
import { useAuth } from "../../context/AuthContext";

// Regex de validación
const USER_REGEX = /^[A-Za-z][A-Za-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,24}$/;

export default function RegisterPage() {
  const { login } = useAuth(); // login seguro vía cookies HttpOnly
  const router = useRouter();
  const userRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validConfirm, setValidConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Enfocar input al cargar la página
  useEffect(() => {
    userRef.current?.focus();
  }, []);

  // Validaciones en tiempo real
  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
    setValidEmail(EMAIL_REGEX.test(email));
    setValidPassword(PWD_REGEX.test(password));
    setValidConfirm(password === confirmPassword && confirmPassword.length > 0);
  }, [username, email, password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validUsername || !validEmail || !validPassword || !validConfirm) {
      setError("Por favor, corrige los campos antes de continuar.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        credentials: "include", // Muy importante para cookies HttpOnly
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Error al registrar.");

      // Login automático tras registro
      await login(email, password);

      // Redirigir al dashboard tras registro
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Error desconocido.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Crear cuenta</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputField
          label="Username"
          type="text"
          value={username}
          setValue={setUsername}
          valid={validUsername}
          placeholder="Tu nombre de usuario"
          required
          inputRef={userRef}
        />
        <InputField
          label="Email"
          type="email"
          value={email}
          setValue={setEmail}
          valid={validEmail}
          placeholder="ejemplo@correo.com"
          required
        />
        <InputField
          label="Contraseña"
          type="password"
          value={password}
          setValue={setPassword}
          valid={validPassword}
          placeholder="••••••••"
          required
        />
        <InputField
          label="Confirmar contraseña"
          type="password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          valid={validConfirm}
          placeholder="••••••••"
          required
        />

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className={`p-2 rounded text-white font-semibold transition ${
            validUsername && validEmail && validPassword && validConfirm
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-500 cursor-not-allowed"
          }`}
          disabled={!validUsername || !validEmail || !validPassword || !validConfirm || loading}
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
}
