"use client";

import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faCircle } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

// Regex para validar email
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  valid: boolean;
  placeholder?: string;
  required?: boolean;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  showValidIcon?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  setValue,
  valid,
  placeholder,
  required,
  inputRef,
  showValidIcon = true,
}) => (
  <label className="flex flex-col">
    <span className="font-semibold">{label}</span>
    <div className="flex items-center border rounded px-2">
      <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-invalid={!valid}
        required={required}
        placeholder={placeholder}
        className="p-2 w-full outline-none bg-transparent"
      />
      {showValidIcon && (
        <FontAwesomeIcon
          icon={valid ? faCheck : value ? faTimes : faCircle}
          className={`ml-2 ${
            valid ? "text-green-500" : value ? "text-red-500" : "text-gray-400"
          }`}
        />
      )}
    </div>
  </label>
);

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (emailRef.current) emailRef.current.focus();
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
      await login(email, password);
      router.push("/dashboard"); // <--- redirección automática al dashboard
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al iniciar sesión.");
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
