import { defineNuxtConfig } from "nuxt/config";
import eslintVitePlugin from "vite-plugin-eslint";
export default defineNuxtConfig({
  imports: {
    dirs: ["stores"],
  },

  modules: [
    "nuxt-icons",
    "@nuxtjs/google-fonts",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],
  ],

  typescript: {
    strict: true,
  },

  css: ["@/assets/styles/main.scss"],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@import "@/assets/styles/variables.scss"; @import "@/assets/styles/mixins.scss";',
        },
      },
    },
    plugins: [
      eslintVitePlugin({
        failOnError: false,
        cache: false,
      }),
    ],
  },

  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700],
    },
  },

  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || "https://connect-kc.appunite.net",
    },
  },
});
