/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      lightBeige: "#f7edda",
      orange: "#f0531c",
      darkGreen: "#09332c",
      beige: "#f7dfba",
      lightGreen: "#2e4b3c",
    },
    extend: {
      fontFamily: {
        Paytone: ["Paytone One", "sans-serif"],
        Snippet: ["Snippet", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
