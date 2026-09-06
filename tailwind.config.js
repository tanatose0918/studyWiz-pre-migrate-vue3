/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app.vue',
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './domains/**/*.{vue,js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        // Core Theme Tokens (Requested by User)
        primary: '#F3F1F6',       // rgb(243, 241, 246)
        secondary: '#CE171F',     // rgb(206, 23, 31) - Studywiz Red
        highlight: '#961216',     // rgb(150, 18, 22) - Highlight text
        btn: {
          DEFAULT: '#961216',     // rgb(150, 18, 22) - Button Base
          hover: '#B4161B',       // rgb(180, 22, 27) - Button Hover
          active: '#780E12',      // rgb(120, 14, 18) - Button Active
        },
        surface: '#F3F1F6',
        
        // Brand Scale mapped to Studywiz Palette
        brand: {
          50: '#FAF8FC',
          100: '#F5EFF3',
          200: '#EBDDE4',
          300: '#E07C82',
          400: '#D9454C',
          500: '#CE171F',         // Secondary
          600: '#CE171F',         // Brand Primary Accent
          700: '#961216',         // Button Base & Highlight
          800: '#780E12',         // Button Active
          900: '#5A0B0E',
          950: '#380406'
        },
        accent: {
          500: '#CE171F',
          600: '#961216'
        },
        line: {
          DEFAULT: '#06C755',
          dark: '#05B34C'
        }
      },
      fontFamily: {
        sans: ['Prompt', 'sans-serif'],
        display: ['Montserrat', 'Prompt', 'sans-serif']
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(150, 18, 22, 0.05)',
        'card': '0 10px 30px -4px rgba(150, 18, 22, 0.08)',
        'btn': '0 4px 14px 0 rgba(150, 18, 22, 0.35)',
        'btn-hover': '0 6px 20px 0 rgba(180, 22, 27, 0.45)'
      }
    }
  },
  plugins: []
}
