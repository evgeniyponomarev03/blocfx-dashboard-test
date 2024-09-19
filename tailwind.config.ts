import type { Config } from "tailwindcss";
const colors = require('tailwindcss/colors');

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-pending",
    "text-pendingText",
    "bg-confirmed",
    "text-confirmedText",
    "bg-canceled",
    "text-cancelledText",
  ],
  theme: {
    fontFamily: {
      poppins: ["var(--font-poppins)", "Arial", "sans-serif"],
    },
    colors: {
      ...colors,
      transparent: "transparent",
      white: "#fff",
      black: "#121214",
      grey: "#6A6A75",
      "yankees-blue": "#26273A",
      "taupe-gray": "#878787",
      "eerie-black": "#1E1E1E",
      canceled: "#F54B4B29",
      canceledText: "#F54B5F",
      confirmed: "#00FF9433",
      confirmedText: "#5DC486",
      pending: "#FFB80033",
      pendingText: "#F49A47",
    },
    extend: {
      backgroundImage: {
        "blurred-dot":
          "linear-gradient(180deg, rgb(230, 185, 128) 0%, rgb(234, 205, 163) 100%)",
        "blurred-white-dot": "linear-gradient(90deg, #FDFCFB 0%, #E2D1C3 100%)",
        sand: "linear-gradient(90deg, #FDFCFB 0%, #E2D1C3 100%)",
      },
      keyframes: {
        horizontalScroll: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-100%)",
          },
        },
        pulse: {
          "0%, 100%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "50%": {
            opacity: ".2",
            transform: "scale(0.97)",
          },
        },
        startPulse: {
          "0%": {
            transform: "scale(1)",
          },
          "100%": {
            transform: "scale(1.15)",
          },
        },
        cardAnimation: {
          "0%": {
            boxShadow: "0px 4px 4px 8px #00000040",
            borderRadius: "22px",
          },
          "50%": {
            boxShadow: "0px 4px 4px 0px #00000040",
            borderRadius: "22px",
          },
          "100%": {
            boxShadow: "0px 4px 4px 8px #00000040",
            borderRadius: "22px",
          },
        },
      },
      animation: {
        horizontalScroll: "horizontalScroll 27s linear infinite",
        "start-pulse": "startPulse 3s linear infinite alternate",
        "animate-pulse": "pulse 3s linear infinite",
        cardAnimation: "cardAnimation 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
