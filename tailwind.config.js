/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        retro: ['"Press Start 2P"', 'monospace'],
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        pokebit: {
          red: '#ef5350',
          yellow: '#fcd34d',
          blue: '#3b4cca',
          gray: '#f4f4f4',
          black: '#1f1f1f',
          white: '#ffffff',
        },
      },
      boxShadow: {
        card: '0 4px 8px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
