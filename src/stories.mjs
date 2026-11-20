// Friday 20 November 2026: the day's stories, each checked against a report dated 20 November.
// Sweeps: Guardian /2026/nov/20 section lists, the Al Jazeera 20 Nov sitemap, Google News (last 12 hours), BBC live pages.
export const weekday = 'Friday';
export const date = '20 November 2026';
export const short = 'FRI 20 NOV 2026';
export const stamp = 'FRIDAY 20 NOV 2026';
export const stampSub = 'NEWS CHECKED TO 12:15 UTC';
export const teaser = 'Russia fires ~100 missiles at Ukraine and hits Kyiv’s bridges · Asia’s AI sell-off deepens · UK and EU agree a Brexit reset · Cop31’s last day';
export const figures = [
  { v: '~100', l: 'Russian missiles fired at Ukraine overnight' },
  { v: '−6.2%', l: 'Taiwan’s Taiex: Asia’s worst fall on Friday' },
  { v: '£17bn', l: 'UK borrowing in October, £1bn under forecast' },
  { v: '+0.7%', l: 'UK retail sales in October, on stockpiling' },
  { v: 'M5.7', l: 'quake in Kumamoto, Japan; week-long alert' },
  { v: '$60bn', l: 'Kenya rare-earths mine awarded to US group' },
];

const L = (place, cat, region, lon, lat, head, sum, src, scene) => ({ place, cat, region, lon, lat, head, sum, src, scene });
export const leads = [
  L('Kyiv, Ukraine', 'war', 'eu', 30.52, 50.45,
    'Russia fires ~100 missiles at Ukraine, hitting Kyiv’s bridges',
    'Three Dnipro bridges hit, five Kyiv districts lose power, at least eight dead across Ukraine. Nuclear plants cut output.',
    'BBC, CP24',
    { type: 'map', win: [22, 45.5, 41, 52.6], marker: [30.52, 50.45],
      labels: [{ text: 'UKRAINE', at: [32.5, 48.2], size: 10 }, { text: 'RUSSIA', at: [37.3, 51.7], size: 9 }, { text: 'KYIV', at: [29.7, 49.7], size: 9, color: '#7f1d1d', anchor: 'end' }, { text: '● LVIV', at: [24.03, 49.7], size: 8.5, color: '#7f1d1d' }],
      arrows: [{ from: [40.5, 50.6], to: [31.0, 50.5], color: '#ef4444', bend: 12 }, { from: [37.0, 46.3], to: [30.9, 50.1], color: '#ef4444', bend: 8, dash: '4 3' }, { from: [36.5, 49.3], to: [24.6, 49.9], color: '#f59e0b', bend: 20, dash: '4 3' }],
      syms: [{ name: 'missile', at: [38.6, 48.3], size: 26, c: '#fff', a: '#ef4444' }],
      flags: ['ua'], tag: 'OVERNIGHT · ~100 MISSILES', caption: 'KYIV · LVIV · NINE REGIONS', captionRight: '3 BRIDGES HIT' }),
  L('Tokyo · Seoul · Taipei', 'eco', 'as', 121.5, 25.05,
    'Asian stocks crash as fears of an AI bubble bite',
    'Nikkei −5.1%, Kospi −5.2%, Taiex −6.2% after Anthropic’s debut; Taiwan’s worst five days since 1990.',
    'Al Jazeera, Guardian',
    { type: 'banner', bg: ['#0f1d3a', '#1e3a5f'], flags: ['jp', 'kr', 'tw'], syms: [['chartDown', '#cbd5e1', '#ef4444'], ['chip', '#cbd5e1', '#ef4444']], caption: 'NIKKEI −5.1 · KOSPI −5.2 · TAIEX −6.2' }),
  L('Antalya, Türkiye', 'sci', 'me', 30.7, 36.9,
    'Cop31 climate talks reach their last day split over fossil fuels',
    'The draft deal drops any mention of fossil fuels. Pacific states warn of devastation, and the summit is expected to run past its official close.',
    'Reuters, Guardian',
    { type: 'map', win: [22, 33.2, 46, 43.2], marker: [30.7, 36.9], labels: [{ text: 'TÜRKIYE', at: [35, 39.4], size: 10 }, { text: 'ANTALYA', at: [31.8, 36.75], size: 8.5, color: '#7f1d1d', anchor: 'start' }, { text: 'MEDITERRANEAN', at: [27, 34.3], size: 7.5, color: '#93c5fd' }],
      syms: [{ name: 'thermometer', at: [41.5, 36.0], size: 32, c: '#fff', a: '#ef4444' }, { name: 'oil', at: [25.5, 39.8], size: 26, c: '#fff', a: '#1a1a1a' }],
      flags: ['un', 'tr'], tag: 'COP31 · FINAL DAY', caption: 'UN CLIMATE SUMMIT', captionRight: 'FOSSIL FUELS CUT FROM DRAFT' }),
];

const C = (place, cat, region, lon, lat, head, sum, src, bannerSpec) => ({ place, cat, region, lon, lat, head, sum, src, banner: bannerSpec });
export const cards = [
  C('Brussels', 'pol', 'eu', 4.35, 50.85, 'UK and EU agree a post-Brexit reset deal', 'Youth scheme, food trade, carbon link; fees open.', 'Reuters',
    { flags: ['gb', 'eu'], syms: [['handshake', '#fff', '#fbbf24']], bg: ['#1e3a8a', '#1d4ed8'], caption: 'DEAL AGREED' }),
  C('Odisha, India', 'sci', 'as', 84.9, 19.3, 'Cyclone Akvan hits India’s Odisha coast', 'Landfall near Gopalpur; no major loss of life.', 'ThePrint',
    { flags: ['in'], syms: [['cyclone', '#e0f2fe', '#38bdf8'], ['rain', '#e0f2fe', '#38bdf8']], bg: ['#0c4a6e', '#334155'], caption: 'CYCLONE AKVAN' }),
  C('Shenzhen, China', 'pol', 'as', 114.06, 22.54, 'Xi hails ‘full turnaround’ with Australia', 'He praised Albanese as they met at Apec.', 'Guardian',
    { flags: ['cn', 'au'], syms: [['handshake', '#fff', '#fbbf24']], bg: ['#7f1d1d', '#1e3a8a'], caption: 'APEC · SHENZHEN' }),
  C('California, US', 'eco', 'am', -121.5, 38.6, 'California subpoenas Nvidia over China', 'Probe asks if investors were misled; shares slide.', 'Guardian',
    { flags: ['us'], syms: [['chip', '#e5e7eb', '#22c55e'], ['gavel', '#e5e7eb', '#fbbf24']], bg: ['#14532d', '#1f2937'], caption: 'NVIDIA PROBE' }),
  C('Pinnacles, California', 'sci', 'am', -121.2, 36.5, 'Magnitude 5.0 quake shakes central California', '06:49 UTC Friday; USGS: ~2% odds of a bigger one.', 'USGS',
    { flags: ['us'], syms: [['quake', '#fde68a', '#f97316']], bg: ['#78350f', '#292524'], big: 'M5.0', bigColor: '#fde68a', caption: 'SAN BENITO CO.' }),
  C('Mogadishu', 'pol', 'af', 45.32, 2.05, 'Somalia gives UAE envoy 72 hours to go', 'It alleges meddling; the UAE says it regrets the row.', 'allAfrica',
    { flags: ['so', 'ae'], syms: [['document', '#fff', '#ef4444']], bg: ['#1e40af', '#0f172a'], caption: 'ENVOY EXPELLED' }),
  C('New Delhi', 'pol', 'as', 77.2, 28.6, 'Pakistan minister in India, first since war', 'Musadik Malik at an SCO forum Modi opens.', 'Al Jazeera',
    { flags: ['pk', 'in'], syms: [['dove', '#fff', '#22c55e']], bg: ['#14532d', '#c2410c'], caption: 'SCO FORUM' }),
  C('Mercury', 'sci', 'wo', null, null, 'BepiColombo reaches Mercury after 8 years', 'Europe–Japan probe readies to enter orbit.', 'Guardian',
    { flags: ['eu', 'jp'], syms: [['satellite', '#e2e8f0', '#3b82f6'], ['planet', '#94a3b8', '#a8a29e']], bg: ['#020617', '#1e293b'], caption: '6BN MILES' }),
  C('Mrima Hill, Kenya', 'eco', 'af', 39.25, -4.48, 'Kenya picks US group for $60bn rare-earths mine', 'Rival RareX says it will challenge the award.', 'allAfrica',
    { flags: ['ke', 'us'], syms: [['mountain', '#d6d3d1', '#a16207'], ['coins', '#fde68a', '#ca8a04']], bg: ['#3f2a14', '#14532d'], caption: 'RARE EARTHS' }),
  C('Riyadh', 'war', 'me', 46.68, 24.71, 'Houthi missile hits Riyadh’s tallest tower', 'Saudi Arabia confirms damage to the PIF tower.', 'The National',
    { flags: ['sa', 'ye'], syms: [['missile', '#fff', '#ef4444'], ['tower', '#e5e7eb', '#f59e0b']], bg: ['#14532d', '#1f2937'], caption: 'PIF TOWER HIT' }),
];

// Short category names where the card's top line has no room for the full one.
const SHORT_LABEL = { 'Odisha, India': 'Weather', 'Pinnacles, California': 'Science', 'Mercury': 'Space', 'Mrima Hill, Kenya': 'Economy', 'California, US': 'Tech' };
for (const c of cards) if (SHORT_LABEL[c.place]) c.label = SHORT_LABEL[c.place];

const B = (place, cat, region, lon, lat, text, src) => ({ place, cat, region, lon, lat, text, src });
export const briefs = [
  B('UK', 'eco', 'eu', -1.5, 52.6, 'Retail sales +0.7% as homes stockpile', 'ONS'),
  B('London', 'eco', 'eu', -0.13, 51.5, 'October borrowing £17bn, below forecast', 'ONS'),
  B('Stockholm', 'pol', 'eu', 18.07, 59.33, 'Russian envoy summoned over Kyiv embassy', 'AJ'),
  B('Poland', 'war', 'eu', 21.0, 52.23, 'Probe into possible airspace breach', 'Kyiv Post'),
  B('Budapest', 'cul', 'eu', 19.04, 47.5, 'Carlsen risks losing world No 1 spot', 'Guardian'),
  B('Italy', 'eco', 'eu', 12.5, 41.9, 'Thousands strike over wages and spending', 'US News'),
  B('Kumamoto', 'sci', 'as', 130.7, 32.8, 'M5.7 quake injures two; alert issued', 'Arab News'),
  B('Tokyo', 'eco', 'as', 139.7, 35.7, 'Japan Tobacco: ¥1.38tn Russia loss', 'Nikkei'),
  B('Hong Kong', 'cul', 'as', 114.17, 22.3, 'Lakshya Sen into Hong Kong Open semis', 'ANI'),
  B('Kathmandu', 'pol', 'as', 85.32, 27.7, 'PM Balendra Shah to visit India', 'Reuters'),
  B('Kuno, India', 'sci', 'as', 77.1, 25.6, 'Cheetah cubs take India’s count to 62', 'Indian Exp.'),
  B('Doha', 'cul', 'oc', 51.53, 25.29, 'Australia stun Argentina 2-0 at U17 WC', 'Guardian'),
  B('Sydney', 'sci', 'oc', 151.2, -33.87, 'Etomidate vapes put three in hospital', 'Guardian'),
  B('Gaza', 'war', 'me', 34.45, 31.5, '85% of rescue vehicles out of service', 'AJ'),
  B('Hormuz', 'war', 'me', 56.3, 26.6, 'Iran readies tankers to test US blockade', 'Fars'),
  B('Washington', 'war', 'am', -77.5, 39.6, 'Trump: Iran strike call can wait to 2027', 'Gulf News'),
  B('Germany', 'pol', 'eu', 13.4, 52.52, 'Pupils rally against conscription', 'Al Jazeera'),
  B('Malawi', 'eco', 'af', 35.0, -15.8, 'Fuel queues last all night in Blantyre', 'AJ'),
  B('New York', 'pol', 'wo', -73.97, 40.75, 'Security Council poll on next UN chief', 'Guardian'),
  B('Washington', 'pol', 'am', -77.04, 38.9, 'Trump fires cyber director Cairncross', 'Cybernews'),
  B('Cincinnati', 'cul', 'am', -84.51, 39.1, 'Fiona the hippo dies after eating a hat', 'WVXU'),
  B('Haiti', 'war', 'am', -72.34, 18.54, 'Police say 34 gang members killed', 'EFE'),
  B('Lima', 'eco', 'am', -77.03, -12.05, 'Japan and Peru team up on minerals', 'Mainichi'),
  B('Los Angeles', 'sci', 'am', -118.16, 34.0, 'M4.4 quake near Commerce before dawn', 'ABC News'),
];

export const dateCheck = 'Left out because it is not Friday’s news: the Anthropic IPO (Thu 19 Nov), the Senegal boat capsize (Wed 18), Jepchirchir’s doping ban (Thu 19), Israel’s Bekaa strike (Thu 19), Lula’s visit to Chief Raoni and the Trump–Xi–Putin peace declaration at Apec (both Thu 19). The Pinnacles quake struck at 10:49 pm Thursday local time, which is 06:49 UTC Friday.';
export const footLeft = 'Every story here happened, or was first reported, on Friday 20 November 2026 in at least one time zone. Claims are attributed.';
export const footRight = 'Sources in brackets. Drawings: original SVG.';
