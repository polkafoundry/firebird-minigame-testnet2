/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
delete colors.lightBlue;
delete colors.warmGray;
delete colors.trueGray;
delete colors.coolGray;
delete colors.blueGray;

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "640px",
      sm: "768px",
      md: "960px",
      lg: "1280px",
      xl: "1368px",
      "2xl": "1536px",
      main: "1440px",
    },
    colors: {
      main: "#D01F36",
      ...colors,
    },
    fontFamily: {},
    fontSize: {
      "14/20": ["14px", { lineHeight: "20px" }],
      "14/24": ["14px", { lineHeight: "24px" }],
      "16/24": ["16px", { lineHeight: "24px" }],
      "18/24": ["18px", { lineHeight: "24px" }],
      "18/32": ["18px", { lineHeight: "32px" }],
      "20/28": ["20px", { lineHeight: "28px" }],
      "22/32": ["22px", { lineHeight: "32px" }],
      "26/32": ["26px", { lineHeight: "32px" }],
      "28/36": ["28px", { lineHeight: "36px" }],
      "32/40": ["32px", { lineHeight: "40px" }],
      "40/52": ["40px", { lineHeight: "52px" }],
      "56/60": ["56px", { lineHeight: "60px" }],
    },
    extend: {},
  },
  plugins: [],
};
