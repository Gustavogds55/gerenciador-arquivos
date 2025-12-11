export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENV !== 'test' },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3001'
    }
  }
})