/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Official brand palette (fixed — from the visual identity sheet)
        navy: '#123B68',
        cyan: '#00AEEF',
        paper: '#F5F9FF',
        success: '#10B981',
        // Semantic, theme-aware tokens (values in src/index.css)
        ink: 'rgb(var(--ink) / <alpha-value>)', // main text
        page: 'rgb(var(--page) / <alpha-value>)', // page background
        card: 'rgb(var(--card) / <alpha-value>)', // raised surfaces
      },
      fontFamily: {
        heading: ['Cairo', 'system-ui', 'sans-serif'],
        body: ['Tajawal', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(18, 59, 104, 0.18)',
        card: '0 20px 50px -24px rgba(18, 59, 104, 0.28)',
        glow: '0 18px 40px -14px rgba(0, 174, 239, 0.55)',
        phone: '0 40px 80px -30px rgba(18, 59, 104, 0.55), 0 0 0 1px rgba(18, 59, 104, 0.06)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #123B68 0%, #00AEEF 100%)',
        'brand-gradient-soft': 'linear-gradient(135deg, rgba(18,59,104,0.06) 0%, rgba(0,174,239,0.10) 100%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
