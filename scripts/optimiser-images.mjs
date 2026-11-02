// Compresse les images des réalisations pour le web.
//
// 1. Déposez vos images (JPG, PNG, WebP, TIFF) dans images-a-optimiser/<nom-du-projet>/
// 2. Lancez : npm run images
// 3. Les versions légères (WebP, 1600 px de large maximum) sont créées dans public/work/<nom-du-projet>/
//
// Les originaux ne sont pas modifiés et ne sont pas envoyés sur GitHub.
import { readdir, mkdir, stat } from 'node:fs/promises';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const SRC = 'images-a-optimiser';
const OUT = 'public/work';
const MAX_WIDTH = 1600;
const QUALITY = 78;
const EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff']);

const kb = (n) => `${Math.round(n / 1024)} Ko`;

async function* files(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* files(p);
    else if (EXT.has(parse(entry.name).ext.toLowerCase())) yield p;
  }
}

let count = 0;
let before = 0;
let after = 0;

for await (const file of files(SRC)) {
  const rel = file.slice(SRC.length + 1);
  const { dir, name } = parse(rel);
  const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const outDir = join(OUT, ...dir.split(/[\\/]/).filter(Boolean).map(slug));
  const outFile = join(outDir, `${slug(name)}.webp`);
  await mkdir(outDir, { recursive: true });

  const info = await sharp(file)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(outFile);

  const size = (await stat(file)).size;
  before += size;
  after += info.size;
  count++;
  console.log(`${rel}  ${kb(size)} -> ${kb(info.size)}   /${outFile.replace(/^public\//, '').replace(/\\/g, '/')}`);
}

if (!count) console.log(`Aucune image trouvée dans ${SRC}/. Déposez vos images dans ${SRC}/<nom-du-projet>/ puis relancez.`);
else console.log(`\n${count} image(s) : ${kb(before)} -> ${kb(after)}`);
