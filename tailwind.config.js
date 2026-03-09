/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      colors: {
        primary: {
          50:  '#f0fafa',
          100: '#ccefef',
          200: '#99dfdf',
          300: '#66cfcf',
          400: '#33bfbf',
          500: '#0a6e6e',
          600: '#085e5e',
          700: '#074f4f',
          800: '#053f3f',
          900: '#032f2f',
        },
        accent: {
          50:  '#fef9ec',
          100: '#fef3dc',
          200: '#fce7b0',
          300: '#f9d47a',
          400: '#f5bc3e',
          500: '#c9921a',
          600: '#b8820f',
          700: '#9a6b0c',
          800: '#7c5509',
          900: '#5e3f07',
        },
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
        'modal': '0 12px 32px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
    },
  },
  plugins: [],
}
