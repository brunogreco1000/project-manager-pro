"use client";

import { useState, useEffect, memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "next-themes"; 
import classNames from "classnames";

const Navbar: React.FC = () => {
  const { user, logout, loading } = useAuth();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => setMounted(true), []);

  const darkMode = theme === "dark";

  const links = [
    { name: "Dashboard", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
    setLoggingOut(false);
    setMenuOpen(false);
  };

  const renderLinks = (onClick?: () => void) =>
    links.map((link) => (
      <Link
        key={link.path}
        href={link.path}
        onClick={onClick}
        className={classNames(
          "px-3 py-2 rounded transition-all duration-200",
          pathname === link.path
            ? "bg-blue-600 text-white dark:bg-blue-500"
            : "hover:bg-blue-500 hover:text-white dark:hover:bg-blue-700"
        )}
      >
        {link.name}
      </Link>
    ));

  return (
    <nav className="w-full bg-gray-800 dark:bg-gray-900 text-white dark:text-gray-100 transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center p-4 relative">
        <div className="text-2xl font-bold">Project Manager Pro</div>

        <div className="hidden md:flex gap-4 items-center">
          {renderLinks()}

          {loading ? (
            <span>Cargando...</span>
          ) : user ? (
            <>
              <span className="font-semibold">{user.username}</span>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 transition disabled:opacity-50"
              >
                {loggingOut ? "Saliendo..." : "Logout"}
              </button>
            </>
          ) : (
            <>
              <Link href="/login"  className={classNames(
                  "px-3 py-2 rounded transition-all duration-200",
                  pathname === "/login"
                    ? "bg-blue-600 text-white dark:bg-blue-500"
                    : "hover:bg-blue-500 hover:text-white dark:hover:bg-blue-700"
                )}>
                Login
              </Link>
              <Link href="/register"  className={classNames(
                  "px-3 py-2 rounded transition-all duration-200",
                  pathname === "/register"
                    ? "bg-blue-600 text-white dark:bg-blue-500"
                    : "hover:bg-blue-500 hover:text-white dark:hover:bg-blue-700"
                )}>
                Register
              </Link>
            </>
          )}

          {mounted && (
            <button
              onClick={() => setTheme(darkMode ? "light" : "dark")}
              className="px-3 py-1 rounded border hover:bg-gray-700 transition"
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl p-1">
            {menuOpen ? "✖" : "☰"}
          </button>
          {menuOpen && (
            <div className="absolute top-full left-0 w-full bg-gray-800 dark:bg-gray-900 flex flex-col gap-2 p-4 md:hidden transition-colors">
              {renderLinks(() => setMenuOpen(false))}
              {loading ? (
                <span>Cargando...</span>
              ) : user ? (
                <>
                  <span className="font-semibold">{user.username}</span>
                  <button
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 transition disabled:opacity-50"
                  >
                    {loggingOut ? "Saliendo..." : "Logout"}
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMenuOpen(false)} className="px-3 py-1 rounded hover:bg-gray-700 transition">
                    Login
                  </Link>
                  <Link href="/register" onClick={() => setMenuOpen(false)} className="px-3 py-1 rounded hover:bg-gray-700 transition">
                    Register
                  </Link>
                </>
              )}

              {mounted && (
                <button
                  onClick={() => setTheme(darkMode ? "light" : "dark")}
                  className="px-3 py-1 rounded border hover:bg-gray-700 transition"
                >
                  {darkMode ? "☀️ Light" : "🌙 Dark"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default memo(Navbar);









































