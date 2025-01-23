/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"], // Include toate fișierele unde folosești Tailwind
  theme: {
    extend: {}, // Aici extinzi tema (opțional)
  },
  plugins: [require("daisyui")], // Adaugă DaisyUI ca plugin
};

