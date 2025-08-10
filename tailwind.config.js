/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        vanSun: "#F59E0B",   // warm golden orange
        vanPine: "#14532D",  // deep forest green
        vanEarth: "#7C5F46", // earthy brown
        vanCream: "#FFF7ED", // soft off-white
      },
    },
  },
  plugins: [],
};
