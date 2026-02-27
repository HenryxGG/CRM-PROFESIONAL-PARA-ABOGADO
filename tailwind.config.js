/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        crm: {
          navy: '#0f172a',
          slate: '#64748b',
          gold: '#d97706',
          bg: '#D1DEED',
          'bg-soft': '#fafbfc',
          'bg-warm': '#f8f9fa',
          error: '#ef4444',
          success: '#10b981',
          border: '#e2e8f0',
          'border-light': '#f1f5f9',
        }
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
