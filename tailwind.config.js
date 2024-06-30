/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#c600ff",

          "secondary": "#00dee5",

          "accent": "#00ba86",

          "neutral": "#050a09",

          "base-100": "#fbfffb",

          "info": "#006dc9",

          "success": "#00eea1",

          "warning": "#ff8c00",

          "error": "#f3576d",
        },
      },
    ],
  },
}

