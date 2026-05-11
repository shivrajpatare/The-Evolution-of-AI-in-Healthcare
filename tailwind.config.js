/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      letterSpacing: {
        tighter: '-.04em',
        tight: '-.02em',
      },
      colors: {
        background: '#000000', // Pure Vercel/Linear black
        foreground: '#ededed',
        primary: {
          DEFAULT: '#ffffff', // Stark white accent
          dark: '#a3a3a3',
        },
        card: {
          DEFAULT: 'rgba(10, 10, 10, 0.4)', // Extremely subtle glass
          border: 'rgba(255, 255, 255, 0.06)',
        },
        accent: {
          DEFAULT: '#3b82f6', 
          glow: 'rgba(59, 130, 246, 0.15)',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'neural-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.0) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 0.8 },
        }
      }
    },
  },
  plugins: [],
}
