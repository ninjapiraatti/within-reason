/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  },
  theme: {
    extend: {},
    screens: {
      'sm': '400px',
      'md': '720px',
      'lg': '1024px',
      'xl': '1280px',
      'xxl': '1440px',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
