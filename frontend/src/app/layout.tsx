"use client";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { ReactNode } from "react";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";
import "../styles/globals.css";
import Navbar from "../components/Navbar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <title>Project Manager Pro</title>
      </head>
      <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
