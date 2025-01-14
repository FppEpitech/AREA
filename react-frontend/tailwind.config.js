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
        customOrange: "#D6955B",
        customLightGreen: "#85C83E",
        customDarkLightGreen: "#78B035"
      },
      fontFamily: {
        abrilFatface: ['Abril Fatface', 'serif'],
        instrumentSans: ['Instrument Sans', 'sans-serif'],
        inter: ['Inter', 'serif'],
      },
      textShadow: {
        custom: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      },
      boxShadow: {
        custom: '0px 4px 4px rgba(0, 0, 0, 0.25)', // Buttons
        customNavbar: '10px 10px 100px rgba(0, 0, 0, 0.5)', // Navbar
      },
    },
  },
  plugins: [
    require("tailwindcss-textshadow")
  ],
};
