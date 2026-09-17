/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          dark: '#050505',
          card: '#0A0F0D',
          lighter: '#101414',
        },
        accent: {
          primary: '#00F5C3',
          secondary: '#39FF88',
          tertiary: '#00FFC6',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#B5B5B5',
        },
      },
      fontFamily: {
        space: ['Space Grotesk', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'matrix': 'matrix 20s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00F5C3, 0 0 10px #00F5C3' },
          '100%': { boxShadow: '0 0 20px #00F5C3, 0 0 30px #00F5C3' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        matrix: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [],
}
