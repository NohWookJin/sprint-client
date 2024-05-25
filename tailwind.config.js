/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "blue-glow": "0 4px 20px rgba(0, 123, 255, 0.5)",
        "blue-glow-hover":
          "0 4px 20px rgba(0, 123, 255, 0.7), 0 0 10px rgba(0, 123, 255, 0.7)",
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ["hover"],
    },
  },
  plugins: [],
};
