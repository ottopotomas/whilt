/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        pulseGlow: {
          '0%, 100%': {
            color: '#00c2a8',
            textShadow: '0 0 0px #00c2a8',
          },
          '50%': {
            color: '#00ffd5',
            textShadow: '0 0 8px #00ffd5',
          },
        },
      },
      animation: {
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
