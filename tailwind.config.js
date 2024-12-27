/** @type {import('tailwindcss').Config} */
import { addIconSelectors } from "@iconify/tailwind";
import { addDynamicIconSelectors } from "@iconify/tailwind";
import { iconsPlugin, getIconCollections } from "@egoist/tailwindcss-icons";
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#318e4c",
          600: "#206c43",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        fadeIn: "fadeIn 2s ease-in-out",
      },
      boxShadow: {
        "custom-shadow": "rgba(145, 158, 171, 0.16) 0px 8px 16px 0px",
        "new-shadow": "rgba(17, 17, 26, 0.1) 0px 0px 16px",
      },
      // borderRadius: {
      //   'sm': '0.125rem',  // small border radius (2px)
      //   'md': '0.375rem',  // medium border radius (6px)
      //   'lg': '0.5rem',    // large border radius (8px)
      //   'xl': '1rem',      // extra-large border radius (16px)
      //   '2xl': '2rem',     // double extra-large (32px)
      //   'full': '9999px',  // fully rounded (circle)
      // },
      screens: {
        sm: "640px", // small screens
        md: "768px", // medium screens
        lg: "1024px", // large screens
        xl: "1280px", // extra-large screens
        "2xl": "1536px", // double extra-large screens
      },
      // spacing: {
      //   'sm': '0.5rem',   // small size (8px)
      //   'md': '1rem',     // medium size (16px)
      //   'lg': '1.5rem',   // large size (24px)
      //   'xl': '2rem',     // extra-large size (32px)
      //   '2xl': '3rem',    // double extra-large (48px)
      //   'full': '100%',    // full width
      // },
    },
  },
  plugins: [
    require("flowbite/plugin"),
    require("@tailwindcss/forms"),
    addIconSelectors(["mdi", "mdi-light"]),
    addDynamicIconSelectors(),
    iconsPlugin({
      // Select the icon collections you want to use
      // You can also ignore this option to automatically discover all individual icon packages you have installed
      // If you install @iconify/json, you should explicitly specify the collections you want to use, like this:
      collections: getIconCollections("all"),
      // If you want to use all icons from @iconify/json, you can do this:
      // collections: getIconCollections("all"),
      // and the more recommended way is to use `dynamicIconsPlugin`, see below.
    }),
  ],
}

