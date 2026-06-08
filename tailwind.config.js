/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0c0f1d',
          sidebar: '#12162b',
          card: '#181d37',
          cardHover: '#1e2544',
          border: '#242c4f',
          borderLight: '#2d3861',
          indigo: '#8b5cf6',
          cyan: '#06b6d4',
          accent: '#a78bfa',
          purpleBg: 'rgba(139, 92, 246, 0.15)',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        title: ['"Outfit"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
