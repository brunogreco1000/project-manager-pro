"use client";
import { useState, memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import classNames from "classnames";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const darkMode = theme === "dark";
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Dashboard", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const renderLinks = (onClick?: () => void) =>
    links.map((link) => (
      <Link
        key={link.path}
        href={link.path}
        onClick={onClick}
        className={classNames(
          "px-3 py-2 rounded transition-all duration-200",
          pathname === link.path
            ? "bg-blue-600 text-white"
            : "hover:bg-blue-500 hover:text-white"
        )}
      >
        {link.name}
      </Link>
    ));

  return (
    <nav className="bg-gray-800 text-white w-full">
      <div className="container mx-auto flex justify-between items-center p-4 relative">
        <div className="text-2xl font-bold">Project Manager Pro</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center">
          {renderLinks()}
          {user ? (
            <>
              <span className="font-semibold">Hi, {user.username}</span>
              <button
                onClick={logout}
                className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-3 py-1 rounded hover:bg-gray-700 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-3 py-1 rounded hover:bg-gray-700 transition"
              >
                Register
              </Link>
            </>
          )}
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded border hover:bg-gray-700 transition"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl p-1">
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-gray-800 flex flex-col gap-2 p-4 md:hidden">
            {renderLinks(() => setMenuOpen(false))}
            {user ? (
              <>
                <span className="font-semibold">Hi, {user.username}</span>
                <button
                  onClick={logout}
                  className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-1 rounded hover:bg-gray-700 transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-1 rounded hover:bg-gray-700 transition"
                >
                  Register
                </Link>
              </>
            )}
            <button
              onClick={toggleTheme}
              className="px-3 py-1 rounded border hover:bg-gray-700 transition"
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default memo(Navbar);
