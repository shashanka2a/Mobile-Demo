/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#FF6633',
          dark: '#E05526',
          light: '#FF855D',
          muted: 'rgba(255, 102, 51, 0.15)',
        },
        surface: {
          DEFAULT: '#1C1C1E',
          card: '#2C2C2E',
          elevated: '#3A3A3C',
          border: '#3A3A3C',
        },
        uv: {
          blue: '#0A84FF',
          green: '#30D158',
          yellow: '#FFD60A',
          red: '#FF453A',
          amber: '#FF9F0A',
          subtitle: '#98989D',
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        tapRipple: {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'tap-ripple': 'tapRipple 0.8s ease-out forwards',
        'float-slow': 'float 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};
