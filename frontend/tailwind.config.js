/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      anaheim: ["Anaheim", "sans-serif"],
      amiko: ["Amiko", "sans-serif"],
      almarai: ["Almarai", "sans-serif"],
      exo: ["Exo 2", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#45156B",
        secondary: "#382C6C",
        light_blue: "#486CFF",
        light_purple: "#9333EA",
        custom_white: "#FFFFFE",
        gray: "#8C8C8C",
        green: "#25DE21",
        overlay_1: "#19161D",
        overlay_2: "#28242C",
        overlay_3: "#141414",
        overlay_4: "#2E2934",
      },
      borderRadius: {
        overlay: "0.75rem",
      },
    },
  },
  plugins: [],
};
