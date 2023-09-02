// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: true},
  runtimeConfig: {
    public: {
      WS_ENDPOINT: process.env.WS_ENDPOINT || "ws://localhost:8080",
    },
  },
});
