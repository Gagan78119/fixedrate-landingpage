/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // FIXEDRATE Brand Palette
        gold: {
          DEFAULT: '#D99E39',
          light: '#E5B55A',
          dark: '#B8872F',
        },
        copper: {
          DEFAULT: '#D26A40',
          light: '#E0825C',
          dark: '#B55532',
        },
        olive: {
          DEFAULT: '#82956B',
          light: '#9AAE82',
          dark: '#6B7D55',
        },
        // Premium dark theme
        pitch: '#050505',
        charcoal: '#0A0A0C',
        surface: '#111113',
        card: '#18181B',
      },
      fontFamily: {
        serif: ['Bodoni Moda', 'Instrument Serif', 'Georgia', 'serif'],
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #D99E39 0%, #D26A40 50%, #82956B 100%)',
        'gradient-copper': 'linear-gradient(135deg, #D26A40 0%, #D99E39 100%)',
        'gradient-olive': 'linear-gradient(135deg, #82956B 0%, #D99E39 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
    },
  },
  plugins: [],
}
