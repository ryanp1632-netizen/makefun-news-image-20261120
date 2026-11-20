// Friday 20 November 2026 in one picture.
// The page is drawn ahead of time by build.mjs (HTML + hand-written SVG, screenshotted at 1024 x 1024)
// and kept in the repository as entry.png. At run time there is no network, so this program only
// checks that file and copies it, byte for byte, to the output folder: both runs write the same bytes.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const image = readFileSync(new URL('./entry.png', import.meta.url));

// The same checks the gate makes: a PNG, at most 1024 x 1024 pixels and 1 MiB.
const PNG_SIGNATURE = '89504e470d0a1a0a';
if (image.subarray(0, 8).toString('hex') !== PNG_SIGNATURE) throw new Error('entry.png is not a PNG');
const width = image.readUInt32BE(16), height = image.readUInt32BE(20);
if (width > 1024 || height > 1024) throw new Error(`entry.png is ${width}x${height}, over 1024x1024`);
if (image.length > 1048576) throw new Error(`entry.png is ${image.length} bytes, over 1 MiB`);

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.png'), image);
console.log(`wrote ${width}x${height}, ${image.length} bytes to ${join(outDir, 'entry.png')}`);
