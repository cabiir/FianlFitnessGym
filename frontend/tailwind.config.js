/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryDarkGreen: "#102E16",   // Dark Green
        primaryDarkGreen2: "#143D1C",   // Dark Green2
        secondaryBeige: "#DAE2CB", // Beige
        WhiteColor: "#FFFFFF",    // White
        BlackColor: "#000000",    // Black
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
}