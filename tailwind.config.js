/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f1f5ee',
          100: '#e3ebdc',
          200: '#c8d7bd',
          300: '#a5bf98',
          400: '#789c73',
          500: '#547e58',
          600: '#386347',
          700: '#294e39',
          800: '#224431',
          900: '#19372a',
        },
        accent: {
          50:  '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#c95130',
          600: '#b14426',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        ink: {
          900: '#203d30',
          800: '#30473b',
          700: '#47594c',
          600: '#667367',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 12px 30px -15px rgba(32, 61, 48, 0.15)',
        cta: '0 8px 20px -10px rgba(160, 65, 32, 0.3)',
        pop: '0 24px 50px -20px rgba(32, 61, 48, 0.2)',
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
        'blob': {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%':      { transform: 'translate(30px,-40px) scale(1.15)' },
          '66%':      { transform: 'translate(-25px,25px) scale(0.9)' },
        },
        'shine': {
          '0%':   { transform: 'translateX(-120%) skewX(-20deg)' },
          '100%': { transform: 'translateX(220%) skewX(-20deg)' },
        },
        'gradient-x': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%':     { backgroundPosition: '100% 50%' },
        },
        'marquee': {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'tilt': {
          '0%,100%': { transform: 'rotate(-1.5deg)' },
          '50%':     { transform: 'rotate(1.5deg)' },
        },
        'bounce-soft': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-6px)' },
        },
        'spin-slow': {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-up': 'fade-up .6s ease-out both',
        'float': 'float 6s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
        'blob': 'blob 14s ease-in-out infinite',
        'shine': 'shine 2.4s ease-in-out infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        'marquee': 'marquee 30s linear infinite',
        'tilt': 'tilt 6s ease-in-out infinite',
        'bounce-soft': 'bounce-soft 3s ease-in-out infinite',
        'spin-slow': 'spin-slow 24s linear infinite',
      },
    },
  },
  plugins: [],
}
