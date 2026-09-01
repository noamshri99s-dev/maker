/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './ht/**/*.html',
    './src/ht/**/*.{js,ts,tsx,css}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Heebo', 'Assistant', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
