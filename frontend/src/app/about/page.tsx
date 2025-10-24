"use client"; // Solo si necesitas hooks de React como useState, useEffect, etc.

import React from "react";

export default function AboutPage() {
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">About</h1>
      <p className="mb-2">
        This is a sample <strong>Next.js + TypeScript + PWA</strong> project for portfolio purposes.
      </p>
      <p className="mb-2">
        It demonstrates SPA, PWA support, testing, dashboard, charts, export features, and responsive UI.
      </p>
      <p className="mb-2">
        You can also add <strong>contact information</strong> here if needed.
      </p>
    </main>
  );
}
