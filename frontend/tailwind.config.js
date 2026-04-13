/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    // Disable preflight to avoid breaking the existing style.css
    preflight: false,
  },
  theme: {
    extend: {},
  },
  plugins: [],
}
