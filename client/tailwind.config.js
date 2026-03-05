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
        // Light theme palette
        light: {
          purple: '#cdb4db',
          pink1: '#ffc8dd',
          pink2: '#ffafcc',
          blue1: '#bde0fe',
          blue2: '#a2d2ff',
          green: '#7bf1a8',
        },
        // Dark theme palette
        dark: {
          navy: '#13005A',
          blue1: '#00337C',
          blue2: '#1C82AD',
          teal: '#03C988',
          red: '#dd3131',
        },
      },
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        dancing: ['"Dancing Script"', 'cursive'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
        'fade-in': 'fadeIn 1s ease-in',
        'slide-up': 'slideUp 0.8s ease-out',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      backgroundImage: {
        'gradient-light': 'linear-gradient(135deg, #cdb4db, #ffc8dd, #bde0fe, #7bf1a8)',
        'gradient-dark': 'linear-gradient(135deg, #13005A, #00337C, #1C82AD)',
      },
    },
  },
  plugins: [],
}
