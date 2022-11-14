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
      xxs: "400px",
      xs: "640px",
      sm: "768px",
      md: "960px",
      "2md": "1100px",
      lg: "1280px",
      xl: "1368px",
      "2xl": "1536px",
      main: "1440px",
    },
    colors: {
      main: "#EB522F",
      ...colors,
    },
    fontFamily: {
      tthoves: ["TTHoves"],
      inter: ["Inter"],
      oswald: ["Oswald"],
    },
    fontSize: {
      "10/14": ["10px", { lineHeight: "14px" }],
      "10/32": ["10px", { lineHeight: "32px" }],
      "12/16": ["12px", { lineHeight: "16px" }],
      "12/18": ["12px", { lineHeight: "18px" }],
      "12/20": ["12px", { lineHeight: "20px" }],
      "14/20": ["14px", { lineHeight: "20px" }],
      "14/24": ["14px", { lineHeight: "24px" }],
      "14/32": ["14px", { lineHeight: "32px" }],
      "16/20": ["16px", { lineHeight: "20px" }],
      "16/24": ["16px", { lineHeight: "24px" }],
      "18/24": ["18px", { lineHeight: "24px" }],
      "18/32": ["18px", { lineHeight: "32px" }],
      "20/28": ["20px", { lineHeight: "28px" }],
      "20/32": ["20px", { lineHeight: "32px" }],
      "22/32": ["22px", { lineHeight: "32px" }],
      "24/32": ["24px", { lineHeight: "32px" }],
      "26/32": ["26px", { lineHeight: "32px" }],
      "28/36": ["28px", { lineHeight: "36px" }],
      "32/40": ["32px", { lineHeight: "40px" }],
      "36/48": ["36px", { lineHeight: "48px" }],
      "48/60": ["48px", { lineHeight: "60px" }],
      "40/52": ["40px", { lineHeight: "52px" }],
      "56/60": ["56px", { lineHeight: "60px" }],
      "80/80": ["80px", { lineHeight: "80px" }],
    },
    extend: {},
  },
  plugins: [],
};
