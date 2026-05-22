import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "logo-blue": "#54afe6",
        warning: "#dca206",
        gold: "#ffc107",
        "off-red": "#e36087",
        secondary: "#bb7ce4",
        accent: "#4b5563",
        primary: "#371a5b",
        green: "#86c540",
        orange: "#f68712",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
