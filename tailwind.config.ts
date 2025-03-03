import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        noto: ['"Noto Sans"', "sans-serif"],
      },
      colors: {
        // Dark Mode Colors
        dark: "#020114", // Background for dark mode

        // Light Mode Colors
        light: "#f8f8f8", // Background for light mode

        // Primary Colors
        primary: {
          DEFAULT: "#653ea9", // Muted purple for buttons/highlights
          light: "#c285ff", // Soft highlight color
          dark: "#2f0659", // Dark purple accent
        },

        // Text Colors
        text: {
          DEFAULT: "#eaeaea", // Off-white for dark mode text
          light: "#333333", // Dark gray for light mode text
        },

        // Borders/Dividers
        border: {
          DEFAULT: "#54467d", // Muted purple border for dark mode
          light: "#d1c7e3", // Subtle light gray border for light mode
        },
      },
    },
  },
};

export default config;
