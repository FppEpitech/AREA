/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customLightBlue: "#ECF8F6",
        customDarkGreen: "#18534F",
        customGreen: "#226D68",
        customYellow: "#FEEAA1",
        customOrange: "#D6955B"
      },
    },
  },
  plugins: [],
};
