import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        xl: "50px",
        lg: "25px",
        md: "0.375rem",
      },
      fontFamily: {
        geist: ["Geist"],
      },
    },
  },
  plugins: [],
};
export default config;
