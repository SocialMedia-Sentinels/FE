/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Titillium: ['Titillium Web', 'sans-serif'],
        Rajdhani: ['Rajdhani', 'sans-serif']
      }
    }
  },
  plugins: []
}
