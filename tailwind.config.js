/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        sans: ['Rajdhani', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        neon: {
          pink: '#ff2d95',
          blue: '#00d4ff',
          purple: '#b14aed',
          green: '#39ff14',
          yellow: '#ffff00',
          orange: '#ff6600',
        },
        valorant: {
          red: '#ff4655',
          dark: '#0f1923',
          teal: '#00c8c8',
        },
        csgo: {
          orange: '#de9b35',
          blue: '#4b69ff',
          purple: '#8847ff',
          pink: '#d32ce6',
          red: '#eb4b4b',
          gold: '#ffd700',
        },
        xbox: '#107c10',
        playstation: '#003791',
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        gaming: {
          darker: '#0a0a0f',
          dark: '#12121a',
          medium: '#1a1a25',
          light: '#252535',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'neon-glow': 'linear-gradient(135deg, rgba(255, 45, 149, 0.1) 0%, rgba(0, 212, 255, 0.1) 100%)',
        'valorant-gradient': 'linear-gradient(135deg, #ff4655 0%, #0f1923 100%)',
        'csgo-gradient': 'linear-gradient(135deg, #de9b35 0%, #4b69ff 100%)',
      },
      boxShadow: {
        'neon-pink': '0 0 20px rgba(255, 45, 149, 0.5)',
        'neon-blue': '0 0 20px rgba(0, 212, 255, 0.5)',
        'neon-purple': '0 0 20px rgba(177, 74, 237, 0.5)',
        'neon-green': '0 0 20px rgba(57, 255, 20, 0.5)',
        'gaming': '0 8px 32px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
        'scan': 'scan 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 212, 255, 0.5), 0 0 10px rgba(0, 212, 255, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.8), 0 0 30px rgba(0, 212, 255, 0.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-neon': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        scan: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 100%' },
        },
      },
    },
  },
  plugins: [],
}