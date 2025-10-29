/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fall: {
          '0%': { transform: 'translateY(-10vh) translateX(0)' },
          '50%': { transform: 'translateY(50vh) translateX(var(--sway))' },
          '100%': { transform: 'translateY(110vh) translateX(calc(var(--sway) * -1))' },
        },
      },
      animation: {
        fall: 'fall linear infinite',
      },
    },
  },
  plugins: [],
}
