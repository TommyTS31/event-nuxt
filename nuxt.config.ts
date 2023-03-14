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
    runtimeConfig: {
      public: {
        api_key: process.env.DEFAULT_API_KEY,
        baseURL: "http://localhost:5000"
      }
    }
})
