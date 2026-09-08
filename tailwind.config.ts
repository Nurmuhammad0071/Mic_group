import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0A0A",
          raised: "#121210",
          panel: "#16160F",
        },
        paper: {
          DEFAULT: "#F5F4EF",
          dim: "#B8B6AB",
          faint: "#7A786E",
        },
        gold: {
          DEFAULT: "#C9A227",
          bright: "#E3BE4A",
          dim: "#8A6F1C",
        },
        line: {
          DEFAULT: "rgba(245,244,239,0.10)",
          strong: "rgba(245,244,239,0.20)",
        },
      },
      fontFamily: {
        display: ["var(--font-manrope)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        content: "1280px",
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        lg: "10px",
      },
      transitionTimingFunction: {
        sharp: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
