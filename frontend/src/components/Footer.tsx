"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-center py-4 mt-4">
      Project Manager Pro © {new Date().getFullYear()}
    </footer>
  );
}
