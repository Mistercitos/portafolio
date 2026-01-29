/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        grotesk: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      colors: {
        charcoal: '#050505',
        neon: '#1fff83',
        accent: 'rgb(var(--accent-rgb) / <alpha-value>)',
        bg: 'var(--bg)',
        panel: 'var(--panel)',
        border: 'var(--border)',
        text: 'var(--text)',
        muted: 'var(--muted)',
      },
      transitionTimingFunction: {
        ease: 'cubic-bezier(.2,.8,.2,1)',
      },
      borderRadius: {
        xl: '18px',
      },
      gridTemplateColumns: {
        showcase: 'repeat(12, minmax(0, 1fr))',
      },
      keyframes: {
        'hero-rotate': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '20%': { opacity: '1', transform: 'translateY(0)' },
          '80%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'hero-rotate': 'hero-rotate 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
