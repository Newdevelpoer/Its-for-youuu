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
        pastel: {
          purple: '#cdb4db',
          pink: '#ffc8dd',
          hotpink: '#ffafcc',
          blue: '#bde0fe',
          lightblue: '#a2d2ff',
          mint: '#7bf1a8',
        },
        night: {
          deep: '#13005A',
          navy: '#00337C',
          teal: '#1C82AD',
          green: '#03C988',
          red: '#dd3131',
        }
      },
      fontFamily: {
        cursive: ['Georgia', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'rain': 'rain 1.5s linear infinite',
        'snow': 'snow 4s linear infinite',
        'petal': 'petal 6s ease-in-out infinite',
        'leaf': 'leaf 5s ease-in-out infinite',
        'confetti': 'confetti 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        rain: {
          '0%': { transform: 'translateY(-100vh)', opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0.3' },
        },
        snow: {
          '0%': { transform: 'translateY(-10px) translateX(0px)', opacity: '1' },
          '50%': { transform: 'translateY(50vh) translateX(20px)', opacity: '0.8' },
          '100%': { transform: 'translateY(100vh) translateX(-20px)', opacity: '0' },
        },
        petal: {
          '0%': { transform: 'translateY(-10px) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(110vh) rotate(360deg)', opacity: '0' },
        },
        leaf: {
          '0%': { transform: 'translateY(-10px) translateX(0px) rotate(0deg)', opacity: '1' },
          '50%': { transform: 'translateY(50vh) translateX(30px) rotate(180deg)', opacity: '0.8' },
          '100%': { transform: 'translateY(110vh) translateX(-30px) rotate(360deg)', opacity: '0' },
        },
        confetti: {
          '0%': { transform: 'translateY(-10px) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '0' },
        },
      }
    },
  },
  plugins: [],
}
