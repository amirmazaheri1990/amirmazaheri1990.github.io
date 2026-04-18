import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://amirmazaheri1990.github.io',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
});
