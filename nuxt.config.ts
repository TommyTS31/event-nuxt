// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
    },
    modules: [
      '@tailvue/nuxt',
    ],
    app: {
      head: {
          link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
      }
  },
    build: {
      transpile: [/^leaflet/],
    },
    runtimeConfig: {
      public: {
        api_key: process.env.DEFAULT_API_KEY,
        baseURL: process.env.API_URL || "http://localhost:5000"
      }
    }
})
