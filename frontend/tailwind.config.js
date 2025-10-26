/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // <--- importante
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/pages/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
