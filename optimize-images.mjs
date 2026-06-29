// optimize-images.mjs
// Run: node optimize-images.mjs
// Requires: npm install sharp --save-dev

import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import path from "path";

const PUBLIC_DIR  = "./public";
const SRC_DIR     = "./src";

async function findImages(dir) {
  const result = [];
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        result.push(...await findImages(full));
      } else if (/\.(png|jpe?g|webp)$/i.test(e.name)) {
        result.push(full);
      }
    }
  } catch {}
  return result;
}

async function optimize(filePath) {
  const info  = await stat(filePath);
  const sizeBefore = (info.size / 1024).toFixed(1);

  const ext  = path.extname(filePath).toLowerCase();
  const base = filePath.replace(/\.(png|jpe?g|webp)$/i, "");

  // Always produce a .webp next to the original
  const outPath = base + ".webp";

  await sharp(filePath)
    .resize({ width: 800, withoutEnlargement: true }) // max 800px wide
    .webp({ quality: 80 })
    .toFile(outPath === filePath ? filePath + ".tmp.webp" : outPath);

  const infoOut   = await stat(outPath === filePath ? filePath + ".tmp.webp" : outPath);
  const sizeAfter = (infoOut.size / 1024).toFixed(1);

  console.log(`✓ ${path.basename(filePath)}  ${sizeBefore} KB → ${sizeAfter} KB  (saved ${(sizeBefore - sizeAfter).toFixed(1)} KB)`);
}

const images = [
  ...await findImages(PUBLIC_DIR),
  ...await findImages(SRC_DIR),
];

if (images.length === 0) {
  console.log("No images found.");
} else {
  console.log(`Found ${images.length} image(s)...\n`);
  for (const img of images) {
    await optimize(img).catch(e => console.error(`✗ ${img}: ${e.message}`));
  }
}
