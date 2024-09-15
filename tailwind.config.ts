import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-pending",
    "text-pendingText",
    "bg-approved",
    "text-approvedText",
    "bg-cancel",
    "text-cancelText",
  ],
  theme: {
    fontFamily: {
      poppins: ["var(--font-poppins)", "Arial", "sans-serif"],
    },
    colors: {
      transparent: "transparent",
      white: "#fff",
      black: "#121214",
      grey: "#6A6A75",
      "yankees-blue": "#26273A",
      "taupe-gray": "#878787",
      "eerie-black": "#1E1E1E",
      cancel: "#F54B4B29",
      cancelText: "#F54B5F",
      approve: "#00FF9433",
      approveText: "#5DC486",
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
      },
      animation: {
        horizontalScroll: "horizontalScroll 27s linear infinite",
        "start-pulse": "startPulse 3s linear infinite alternate",
        "animate-pulse": "pulse 3s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
