/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', '"Playfair Display"', 'serif'],
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        devanagari: ['"Tiro Devanagari Hindi"', 'serif'],
      },
      colors: {
        // Kathak-inspired palette
        ink: '#0a0610',        // plum-night base
        night: '#0a0610',
        plum: '#180a1e',
        maroon: '#6b1324',
        vermillion: '#d63a2a',
        saffron: '#f59e2b',    // marigold
        gold: '#d8a857',
        ivory: '#f4ead2',
        // legacy aliases used across components
        ember: '#ff6b35',      // warm orange
        rose: '#d63a2a',       // vermillion
        violet: '#f59e2b',     // saffron (reused as 3rd gradient stop)
      },
      animation: {
        'gradient-x': 'gradient-x 10s ease infinite',
        'float': 'float 7s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
        'spin-slow': 'spin 60s linear infinite',
        'spin-slower': 'spin 120s linear infinite',
        'spin-reverse': 'spin-reverse 90s linear infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'spin-reverse': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        'shimmer': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
