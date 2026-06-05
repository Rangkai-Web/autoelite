// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

declare var process: any;

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["./app/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: [
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/ui",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "vue3-carousel-nuxt",
  ],

  runtimeConfig: {
    public: {
      apiBaseUrl: (process as any).env.NUXT_API_BASE_URL || "http://localhost:8000/api",
      gaId: (process as any).env.NUXT_GA_MEASUREMENT_ID || "G-90XVWPM7LF",
    },
  },
});