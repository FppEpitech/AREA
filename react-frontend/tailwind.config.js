/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        // Light mode colors
        customLightBlue: "#ECF8F6",
        customDarkGreen: "#18534F",
        customGreen: "#226D68",
        customYellow: "#FEEAA1",
        customOrange: "#D6955B",
        customLightGreen: "#85C83E",

        // Dark mode equivalents
        customDarkBg: "#121212",
        customDarkCard: "#1E1E1E",
        customDarkDarkGreen: "#0F3D3A",
        customDarkLightGreen: "#78B035",
        customDarkText: "#E5E5E5",
        customDarkYellow: "#F3D774",
        customDarkOrange: "#C2854D",
        customDarkBorder: "#2D2D2D",
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
