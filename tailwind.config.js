/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '2xs': '324px',
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px'
      },
      colors: {
        'main': '#ff784e',
        'danger': '#E23618',
        'success': '#48B35E',
        'dark-gray':'#212121',
        'gray' : '#888888',
        'light-gray' : '#E2E2E2'
      },
      backgroundImage:{
        "mc-gradient": 'linear-gradient(180deg, #E8F4F9 0%, rgba(217, 217, 217, 0) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5));'
      }
    },
    fontFamily: {
      'montserrat': ['Montserrat'],
      'inter': ['inter'],
    }
  },
  plugins: [],
}

