"use client";

import { useState } from "react";
import { api } from "../../services/api"; // tu axios instance
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await api.post("/auth/forgot-password", { email });
      setMessage("Revisa tu correo si existe una cuenta con ese email");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al enviar el correo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Olvidé mi contraseña</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingresa tu correo"
          required
          className="p-2 border rounded"
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {message && <p className="text-green-600 text-sm">{message}</p>}

        <button
          type="submit"
          disabled={!email || loading}
          className={`p-2 rounded text-white font-semibold transition ${
            email ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-500 cursor-not-allowed"
          }`}
        >
          {loading ? "Enviando..." : "Enviar correo"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/login")}
          className="text-sm text-blue-600 hover:underline mt-2"
        >
          Volver al login
        </button>
      </form>
    </div>
  );
}
