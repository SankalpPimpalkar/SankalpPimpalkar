/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neutral zinc shades
        'zinc-primary': '#181818',
        'zinc-secondary': '#2c2c2c',
        'zinc-tertiary': '#505050',
        'zinc-dark': '#242424',
      },
      fontFamily: {
        // Fonts goes here
      },
      screens: {
        'xs': '390px'
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}

