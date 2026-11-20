// Friday 20 November 2026 in one picture.
// The page is drawn ahead of time by build.mjs (HTML + hand-written SVG, screenshotted at 1024 x 1024)
// and kept in the repository as entry.png. At run time there is no network, so this program only
// checks that file and copies it, byte for byte, to the output folder: both runs write the same bytes.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const image = readFileSync(new URL('./entry.png', import.meta.url));

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.png'), image);
console.log(`wrote ${image.length} bytes to ${join(outDir, 'entry.png')}`);
