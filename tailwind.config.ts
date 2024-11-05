import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        willinnPink: "#F72793",
        willinnPinkHover: "#d6207f",
        forgotPassword: "#263A66",
        loginText: "#282828",
        tableHeaderText: "#343C6A",
        tableContentText: "#718EBF",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", ...fontFamily.sans], // This creates a 'font-poppins' class
      },
    },
  },
  plugins: [],
};
export default config;
