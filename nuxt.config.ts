// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  head: {
    link: [
      { rel: 'icon', type: 'image/x-icon', href: "/favicon.ico" }
    ]
  },
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
    runtimeConfig: {
      public: {
        api_key: process.env.DEFAULT_API_KEY,
        baseURL: process.env.API_URL || "http://localhost:5000"
      }
    }
})
