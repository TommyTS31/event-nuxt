/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#A17A66",
        secondary: "#65748a",
        secondarylight: "#687d9c",
        primarylight: "#bf9c8a",
      },
      fontFamily: {
        sans: ["Source Sans Pro", "Public Sans", "sans-serif"],
        serif: ["Gloock", "serif"],
      },
    },
  },
  plugins: [],
};
