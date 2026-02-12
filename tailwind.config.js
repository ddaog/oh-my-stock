/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        toss: {
          blue: {
            DEFAULT: '#3182f6',
            light: '#e8f3ff',
            hover: '#1b64da',
          },
          grey: {
            50: '#f9fafb',
            100: '#f2f4f6',
            200: '#e5e8eb',
            300: '#d1d6db',
            400: '#b0b8c1',
            500: '#8b95a1',
            600: '#4e5968',
            700: '#333d4b',
            800: '#191f28',
            900: '#000000',
          },
        },
      },
      boxShadow: {
        'toss-blue/20': '0 10px 40px -10px rgba(49, 130, 246, 0.2)',
      },
    },
  },
  plugins: [],
}
