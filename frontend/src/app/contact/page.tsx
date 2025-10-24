"use client"; // Necesario porque usamos React hooks (si luego agregas interactividad) y FontAwesome

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function ContactPage() {
  return (
    <main className="p-6 max-w-lg mx-auto bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-md text-center">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        Contacto
      </h1>

      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Si deseas contactarme para oportunidades laborales, proyectos o
        colaboración, puedes hacerlo mediante los siguientes medios:
      </p>

      <div className="space-y-4 text-lg text-gray-800 dark:text-gray-200">
        {/* Nombre */}
        <div className="flex items-center justify-center gap-3">
          <FontAwesomeIcon icon={faUser} className="text-blue-600" />
          <span>Bruno Greco</span>
        </div>

        {/* Email */}
        <div className="flex items-center justify-center gap-3">
          <FontAwesomeIcon icon={faEnvelope} className="text-red-500" />
          <a
            href="mailto:brunogreco1000@gmail.com"
            className="hover:text-blue-500 transition-colors"
          >
            brunogreco1000@gmail.com
          </a>
        </div>

        {/* Teléfono */}
        <div className="flex items-center justify-center gap-3">
          <FontAwesomeIcon icon={faPhone} className="text-green-500" />
          <a
            href="tel:+541139123296"
            className="hover:text-blue-500 transition-colors"
          >
            +54 11 3912 3296
          </a>
        </div>

        {/* GitHub */}
        <div className="flex items-center justify-center gap-3">
          <FontAwesomeIcon icon={faGithub} className="text-gray-800 dark:text-gray-200" />
          <a
            href="https://github.com/brunogreco1000"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
          >
            github.com/brunogreco1000
          </a>
        </div>
      </div>

      <footer className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Bruno Greco — Todos los derechos reservados.
      </footer>
    </main>
  );
}
