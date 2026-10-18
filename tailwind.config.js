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
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e', // Accent green
          600: '#16a34a', // Secondary green
          700: '#15803d', // Primary green
          800: '#166534',
          900: '#14532d',
          950: '#0f3a22', // Dark heading
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 12px 30px -4px rgba(22, 163, 74, 0.12)',
      },
    },
  },
  plugins: [],
}
