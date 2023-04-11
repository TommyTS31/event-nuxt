/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
    "node_modules/tailvue/dist/tailvue.es.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#eabfa9",
          400: "#A17A66",
          600: "#795542",
        },
        secondary: "#65748a",
        secondarylight: "#687d9c",
        primarylight: "#a67f6c",
      },
      fontFamily: {
        sans: ["Source Sans Pro", "Public Sans", "sans-serif"],
        serif: ["Gloock", "serif"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
