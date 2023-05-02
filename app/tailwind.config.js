/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  purge: {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  },
  theme: {
    extend: {},
    screens: {
      sm: "400px",
      md: "720px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1440px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
