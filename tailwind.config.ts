import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        card: 'var(--card)',
        glass: 'var(--glass)',
        accent: 'var(--accent)',
        'primary-1': 'var(--primary-1)',
        'primary-2': 'var(--primary-2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.36s cubic-bezier(.22,.9,.35,1)',
        'slide-up': 'slideUp 0.36s cubic-bezier(.22,.9,.35,1)',
        'slide-down': 'slideDown 0.18s cubic-bezier(.22,.9,.35,1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px) scale(0.995)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config

