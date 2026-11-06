import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdir, readFile, unlink } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Supprime de la version publiée les images que plus aucune page n'utilise
// (par exemple celles d'un projet sans accord du client) : elles ne doivent pas être en ligne.
function pruneUnusedImages() {
  return {
    name: 'kaenys:prune-unused-images',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const files = [];
        const walk = async (d) => {
          for (const e of await readdir(d, { withFileTypes: true })) {
            const p = join(d, e.name);
            if (e.isDirectory()) await walk(p);
            else files.push(p);
          }
        };
        await walk(root);
        const text = (await Promise.all(files.filter((f) => /\.(html|css|js|xml|json)$/.test(f)).map((f) => readFile(f, 'utf8')))).join('\n');
        let removed = 0;
        for (const f of files) {
          if (!f.includes(`${join(root, '_astro')}`) || !/\.(webp|png|jpe?g|avif)$/i.test(f)) continue;
          const name = f.split(/[\\/]/).pop();
          if (!text.includes(name)) { await unlink(f); removed++; }
        }
        if (removed) logger.info(`${removed} image(s) inutilisée(s) retirée(s) de la version publiée`);
      },
    },
  };
}

export default defineConfig({
  site: 'https://kaenys.com',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('kaenys.com/'),
      i18n: { defaultLocale: 'fr', locales: { fr: 'fr-CM', en: 'en' } },
    }),
    pruneUnusedImages(),
  ],
});
