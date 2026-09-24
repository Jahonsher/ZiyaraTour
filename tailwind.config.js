/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eef4ff',
          100: '#dbe6ff',
          200: '#bccffe',
          300: '#8cadfc',
          400: '#5480f7',
          500: '#2f5cef',
          600: '#1e40e0',
          700: '#1932b3',
          800: '#182d8f',
          900: '#0f1f66',
        },
        accent: {
          50:  '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        ink: {
          900: '#0b1220',
          800: '#111a2e',
          700: '#1e2a44',
          600: '#33405e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(15, 31, 102, 0.18)',
        cta: '0 12px 30px -8px rgba(249, 115, 22, 0.55)',
        pop: '0 20px 45px -15px rgba(30, 64, 224, 0.35)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'float': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: 0.6 },
          '100%': { transform: 'scale(1.6)', opacity: 0 },
        },
      },
      animation: {
        'fade-up': 'fade-up .6s ease-out both',
        'float': 'float 6s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
      },
    },
  },
  plugins: [],
}
