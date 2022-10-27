/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
delete colors.lightBlue
delete colors.warmGray
delete colors.trueGray
delete colors.coolGray
delete colors.blueGray

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "640px",
      sm: "768px",
      md: "960px",
      lg: "1280px",
      xl: "1368px",
      "2xl": "1536px",
      main: "1440px"
    },
    colors: {
      main: "#D01F36",
      ...colors
    },
    fontFamily: {

    },
    extend: {},
  },
  plugins: [],
}
