/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'SFMono-Medium', 'Cascadia Code', 'Consolas', 'Menlo', 'monospace'],
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        carbon: {
          950: '#05080a',
          900: '#0a0f12',
          850: '#0d1418',
          800: '#111a1f',
          700: '#1b2830',
          600: '#26363f',
        },
      },
      boxShadow: {
        'neon-green': '0 0 26px -6px rgba(52, 211, 153, 0.45)',
        'neon-red': '0 0 26px -6px rgba(244, 63, 94, 0.5)',
        'neon-amber': '0 0 26px -6px rgba(251, 191, 36, 0.5)',
        'neon-sky': '0 0 26px -6px rgba(56, 189, 248, 0.5)',
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        scan: {
          '0%': { top: '-8%' },
          '100%': { top: '108%' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        blink: 'blink 1.1s step-end infinite',
        scan: 'scan 1.8s linear infinite',
        fadeIn: 'fadeIn 0.35s ease-out',
      },
    },
  },
  plugins: [],
};
