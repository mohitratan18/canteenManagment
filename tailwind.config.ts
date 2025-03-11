// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        starColor: "rgb(250 204 21 / var(--tw-text-opacity))",
        grayTextColor:"rgb(156 163 175 / var(--tw-text-opacity))",
        background: "#F4EEFF", // Lightest color for background
        foreground: "#424874", // Darkest color for text and foreground elements

        // ... other existing colors
        card: {
          DEFAULT: "#DCD6F7",    // Second lightest color for card backgrounds
          foreground: "#424874", // Darkest color for text on cards
        },
        //For popover background and foreground colors, you should choose appropriate shades for contrast and visibility. For example:
        popover: {
          DEFAULT: "#A6B1E1",    // A good in-between shade for popovers
          foreground: "#424874", // Darkest for text on popovers
         },
        primary: {
          DEFAULT: "#A6B1E1",          // Use a color that works well with the new palette
          foreground: "#424874",      // Ensure good contrast
        },
        secondary: {
          DEFAULT: "#DCD6F7",      // Adjust as needed
          foreground: "#424874",   
        }, 
        muted: {
          DEFAULT: "#A6B1E1",      // Adjust as needed for a "muted" feel   
          foreground: "#424874",     
        },

        danger:{
          DEFAULT: "#FFC080",      // Use a color that works well with the new palette
        },

        accent: {
          DEFAULT: "#8b5cf6",         // Purple accent
          foreground: "#ffffff",     // White text on accent
        },
        destructive: {
          DEFAULT: "#ef4444",     // Red destructive color
          foreground: "#ffffff",   // White text on destructive
        },
        border: "#4b5563",         // Border color
        input: "#374151",           // Input background color
        ring: "#2563eb",            // Ring color
        chart: {                // You'll want to define chart colors as needed
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },

      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
