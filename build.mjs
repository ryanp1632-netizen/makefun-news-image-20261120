// Builds entry.png: renders src/stories.mjs into an HTML page, checks that no text is cut off,
// screenshots it at 1024 x 1024 with headless Chrome, and keeps the PNG under the 1 MiB gate.
// Run: node build.mjs   (needs Chrome; set CHROME to its path if it is not in the usual place)
import { writeFileSync, readFileSync, mkdirSync, existsSync, statSync, copyFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';
import { renderPage } from './src/page.mjs';
import * as D from './src/stories.mjs';

const root = resolve('.');
const out = join(root, 'out');
mkdirSync(out, { recursive: true });

const chrome = process.env.CHROME ?? [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/usr/bin/google-chrome',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].find((p) => existsSync(p));
if (!chrome) throw new Error('Chrome not found: set CHROME');

const html = renderPage(D);
const pagePath = join(out, 'page.html');
writeFileSync(pagePath, html);
const url = pathToFileURL(pagePath).href;
const common = ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', '--window-size=1024,1024',
  '--no-first-run', '--no-default-browser-check', `--user-data-dir=${join(tmpdir(), 'newsday-chrome-profile')}`];

// 1. overflow probe
const dom = execFileSync(chrome, [...common, '--virtual-time-budget=3000', '--dump-dom', url], { encoding: 'utf8', maxBuffer: 64 << 20 });
const m = dom.match(/PROBE:(\{.*?\})<\/pre>/s);
if (!m) throw new Error('probe did not run');
const probe = JSON.parse(m[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
console.log(`footer bottom at ${probe.footBottom}px`);
if (probe.bad.length) {
  console.log('CUT-OFF TEXT:');
  for (const b of probe.bad) console.log('  - ' + b);
  if (!process.argv.includes('--force')) process.exitCode = 2;
}

// 2. screenshot
const shot = join(out, 'shot.png');
execFileSync(chrome, [...common, '--virtual-time-budget=3000', `--screenshot=${shot}`, url], { stdio: 'ignore' });

// 3. PNG checks: signature, 1024 x 1024, size gate (shrink with a palette if needed, using Python PIL at build time only)
const buf = readFileSync(shot);
const sig = buf.subarray(0, 8).toString('hex');
if (sig !== '89504e470d0a1a0a') throw new Error('screenshot is not a PNG');
const w = buf.readUInt32BE(16), h = buf.readUInt32BE(20);
if (w !== 1024 || h !== 1024) throw new Error(`screenshot is ${w}x${h}, not 1024x1024`);
let final = shot;
if (buf.length > 1_000_000) {
  const small = join(out, 'shot-palette.png');
  execFileSync('python', ['-c', `import sys\nfrom PIL import Image\nim=Image.open(sys.argv[1]).convert('RGB')\nim.quantize(colors=256,method=Image.Quantize.MEDIANCUT,dither=Image.Dither.NONE).save(sys.argv[2],optimize=True)`, shot, small]);
  final = small;
}
const size = statSync(final).size;
if (size > 1048576) throw new Error(`image is ${size} bytes, over the 1 MiB gate`);
if (process.exitCode !== 2 || process.argv.includes('--force')) {
  copyFileSync(final, join(root, 'entry.png'));
  console.log(`entry.png: ${w}x${h}, ${size} bytes, ${D.leads.length + D.cards.length + D.briefs.length} stories`);
} else {
  console.log(`not written: fix the cut-off text (preview at ${shot})`);
}
