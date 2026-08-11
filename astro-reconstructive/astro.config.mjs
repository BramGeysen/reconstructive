import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

import sanity from "@sanity/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://reconstructive.be",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  i18n: {
    defaultLocale: "nl",
    locales: ["nl", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    sitemap(),
    sanity({ projectId: "s0lxto26", dataset: "production", useCdn: false }),
  ],
});
