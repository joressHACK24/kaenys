import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://kaenys.com',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('kaenys.com/'),
      i18n: { defaultLocale: 'fr', locales: { fr: 'fr-CM', en: 'en' } },
    }),
  ],
});
