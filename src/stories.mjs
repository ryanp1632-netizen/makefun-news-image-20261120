// The day's stories. DRAFT: layout test with early-morning items; to be replaced by checked stories.
export const weekday = 'Friday';
export const date = '20 November 2026';
export const short = 'FRI 20 NOV 2026';
export const stamp = 'DRAFT';
export const stampSub = 'layout test, not for entry';
export const teaser = 'Asia’s markets slide on AI fears · Cop31 climate talks reach their final day · BepiColombo arrives at Mercury';
export const figures = [
  { v: '−4%', l: 'draft figure one' },
  { v: '£17bn', l: 'UK October borrowing, ~£1bn below forecast' },
  { v: '6bn mi', l: 'BepiColombo’s 8-year trip to Mercury' },
  { v: '1,731', l: 'days of the war in Ukraine' },
  { v: '2', l: 'draft figure five' },
  { v: '3', l: 'draft figure six' },
];

const L = (place, cat, region, lon, lat, head, sum, src, scene) => ({ place, cat, region, lon, lat, head, sum, src, scene });
export const leads = [
  L('Asia markets', 'eco', 'as', 139.7, 35.7, 'Asian stocks head for their worst week since 2020', 'Anthropic’s debut fails to calm AI-bubble fears; SoftBank has its worst day in over two years. Draft text that runs to a third line for testing.', 'Guardian',
    { type: 'banner', bg: ['#0f1d3a', '#1e3a5f'], flags: ['jp', 'kr', 'tw'], syms: [['chartDown', '#cbd5e1', '#ef4444'], ['chip', '#cbd5e1', '#ef4444']], caption: 'TOKYO · SEOUL · TAIPEI', captionRight: 'WORST WEEK SINCE 2020' }),
  L('Antalya, Türkiye', 'sci', 'me', 30.7, 36.9, 'Cop31 climate talks enter their final day deeply divided', 'Rich polluters and everyone else are split; the summit may run past its official end. Draft text for testing the three-line summary.', 'Guardian',
    { type: 'map', win: [20, 30, 46, 43], marker: [30.7, 36.9], labels: [{ text: 'TÜRKIYE', at: [34, 39.2] }], syms: [{ name: 'thermometer', at: [40.5, 34.5], size: 34, c: '#fff', a: '#ef4444' }], flags: ['un', 'tr'], tag: 'COP31 · FINAL DAY', caption: 'ANTALYA · UN CLIMATE SUMMIT' }),
  L('Mercury', 'sci', 'wo', null, null, 'BepiColombo arrives at Mercury after 8-year trip', 'The European-Japanese probe prepares to swing into orbit, only the second mission ever to do so. Draft text for testing the summary block length.', 'Guardian',
    { type: 'banner', bg: ['#020617', '#1e293b'], flags: ['eu', 'jp'], syms: [['satellite', '#e2e8f0', '#3b82f6'], ['planet', '#94a3b8', '#a8a29e']], caption: 'ESA · JAXA', captionRight: '6BN MILES' }),
];

const C = (place, cat, region, lon, lat, head, sum, src, bannerSpec) => ({ place, cat, region, lon, lat, head, sum, src, banner: bannerSpec });
export const cards = Array.from({ length: 10 }, (_, i) => C(['London', 'Kyiv', 'Blantyre', 'Paris', 'Washington', 'Delhi', 'Lagos', 'Lima', 'Sydney', 'Seoul'][i], ['eco', 'war', 'eco', 'pol', 'pol', 'sci', 'af', 'pol', 'cul', 'eco'][i] === 'af' ? 'pol' : ['eco', 'war', 'eco', 'pol', 'pol', 'sci', 'pol', 'pol', 'cul', 'eco'][i], ['eu', 'eu', 'af', 'eu', 'am', 'as', 'af', 'am', 'oc', 'as'][i], [-0.1, 30.5, 35, 2.35, -77, 77.2, 3.4, -77, 151.2, 127][i], [51.5, 50.45, -15.8, 48.85, 38.9, 28.6, 6.5, -12, -33.9, 37.5][i], 'Draft card headline that wraps once', 'Draft summary text for the card body, two lines long at most here.', 'Draft',
  { flags: [['gb', 'ua', 'mw', 'fr', 'us', 'in', 'ng', 'pe', 'au', 'kr'][i]].filter((f) => f !== 'mw'), syms: [['coins'], ['missile'], ['oil'], ['ballot'], ['capitol'], ['virus'], ['people'], ['gavel'], ['cricket'], ['chip']][i], caption: 'DRAFT CAPTION' + i }));

const B = (place, cat, region, lon, lat, text, src) => ({ place, cat, region, lon, lat, text, src });
export const briefs = Array.from({ length: 24 }, (_, i) => B('Place' + i, ['war', 'pol', 'eco', 'sci', 'cul'][i % 5], ['eu', 'am', 'as', 'me', 'af', 'oc'][i % 6], -150 + i * 13, -40 + (i * 37) % 100, 'Draft brief text about something that happened today', 'Src'));

export const dateCheck = 'DRAFT. First reported before Friday, so not shown as Friday’s news: the Anthropic IPO and first day of trading (Thu 19 Nov), the Senegal boat capsize near Yenne (Wed 18 Nov), Bukele’s registration (deadline Thu 19 Nov).';
export const footLeft = 'Every story here happened, or was first reported, on Friday 20 November 2026 in at least one time zone. Claims are attributed.';
export const footRight = 'Sources: Guardian, Al Jazeera, Reuters, AP, BBC. Drawings: original SVG.';
