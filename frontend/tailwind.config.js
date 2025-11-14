/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'leaf-fall': {
          '0%': {
            transform: 'translateY(0) translateX(0) rotate(0deg)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(100vh) translateX(var(--sway, 0)) rotate(360deg)',
            opacity: '0',
          },
        },
      },
      animation: {
        'leaf-fall': 'leaf-fall linear forwards',
      },
    },
  },
  plugins: [],
}

