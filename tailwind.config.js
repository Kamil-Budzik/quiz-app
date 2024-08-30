/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue, js, ts, jsx, tsx}'
  ],
  theme: {
    extend: {
      colors: {
       primary: '#34db73', // Light Green
        secondary: '#4B5563', // Cool Gray
        accent: '#F59E0B', // Amber
        background: '#F9FAFB', // Very Light Gray
        text: '#111827', // Almost Black
      }
    },
  },
  plugins: [],
}

