/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ralewayRegular: ["Raleway"],
      },
      colors: {
        primary: "#424242",
        divideColor: "#DDDDDD",
        grayColor: "",
        fill: "#205CA8",
      },
      // screens: {
      //   xs: "400px",
      //   ...defaultTheme.screens,
      // },
    },
  },
  plugins: [],
};
