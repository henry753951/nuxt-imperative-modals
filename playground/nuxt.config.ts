import tailwindcss from "@tailwindcss/vite";
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL ?? "/",
  },
  css: ["~/assets/css/main.css"],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  i18n: {
    defaultLocale: "zh-TW",
    langDir: "locales",
    lazy: true,
    locales: [
      { code: "zh-TW", file: "zh-TW.ts", language: "zh-TW", name: "繁體中文" },
      { code: "en", file: "en.ts", language: "en-US", name: "English" },
    ],
    strategy: "no_prefix",
  },
  modules: ["@nuxtjs/i18n", "../src/module"],
  vite: {
    plugins: [tailwindcss()],
  },
});
