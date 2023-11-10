/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    daisyui: {
      themes: [
        {
          mytheme: {
            "primary": "#8192d1",
            "secondary": "#436ab2",
            "accent": "#c662e5",
            "neutral": "#1c1221",
            "base-100": "#302a3c",
            "info": "#174be8",
            "success": "#51e1bb",
            "warning": "#efc315",
            "error": "#f82420",
          },
        },
      ],
    },
  },
  plugins: [require("daisyui")],
}