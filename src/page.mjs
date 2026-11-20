// Lays the day out as one 1024 x 1024 HTML page with inline SVG drawings.
import { banner, flag, sym, esc } from './art.mjs';
import { landSvg, pinsSvg, projector } from './worldmap.mjs';

export const CAT = {
  war: { name: 'War & security', color: '#c8102e' },
  pol: { name: 'Politics', color: '#1d4ed8' },
  eco: { name: 'Economy & tech', color: '#15803d' },
  sci: { name: 'Climate, health & science', color: '#0e7490' },
  cul: { name: 'Sport & culture', color: '#b45309' },
};
export const REGION = {
  eu: { name: 'Europe', color: '#1d4ed8' },
  am: { name: 'Americas', color: '#9f1239' },
  as: { name: 'Asia', color: '#b91c1c' },
  me: { name: 'Middle East', color: '#a16207' },
  af: { name: 'Africa', color: '#15803d' },
  oc: { name: 'Oceania', color: '#0e7490' },
  wo: { name: 'World', color: '#6d28d9' },
};
const CONTINENT = { eu: 'Europe', am: 'Americas', as: 'Asia', me: 'Asia', af: 'Africa', oc: 'Oceania' };

const src = (s) => (s ? ` <span class="src">(${esc(s)})</span>` : '');

// A lead scene: either a zoomed map with a marker, or a banner composition, drawn at w x h.
function scene(sc, w, h) {
  let s = '';
  if (sc.type === 'map') {
    s += landSvg(sc.win, 0, 0, w, h, { land: sc.land ?? '#e6dcc0', water: sc.water ?? '#1d3557', stroke: '#8a7b55', sw: 0.8 });
    const P = projector(sc.win, 0, 0, w, h);
    for (const lab of sc.labels ?? []) {
      const [lx, ly] = P(lab.at);
      s += `<text x="${lx}" y="${ly}" font-family="Arial, sans-serif" font-weight="bold" font-size="${lab.size ?? 9}" letter-spacing=".6" fill="${lab.color ?? '#3b3323'}" text-anchor="${lab.anchor ?? 'middle'}">${esc(lab.text)}</text>`;
    }
    for (const ar of sc.arrows ?? []) {
      const [x1, y1] = P(ar.from), [x2, y2] = P(ar.to);
      s += `<path d="M ${x1} ${y1} Q ${(x1 + x2) / 2} ${Math.min(y1, y2) - (ar.bend ?? 18)} ${x2} ${y2}" stroke="${ar.color ?? '#f59e0b'}" stroke-width="2" fill="none" stroke-dasharray="${ar.dash ?? '0'}" opacity=".95"/>`;
    }
    for (const sy of sc.syms ?? []) {
      const [sx, sy2] = P(sy.at);
      s += sym(sy.name, sx - sy.size / 2, sy2 - sy.size / 2, sy.size, sy.c ?? '#fff', sy.a ?? '#c8102e');
    }
    if (sc.marker) {
      const [mx, my] = P(sc.marker);
      s += `<circle cx="${mx}" cy="${my}" r="9" fill="none" stroke="#c8102e" stroke-width="2"/><circle cx="${mx}" cy="${my}" r="3.5" fill="#c8102e"/>`;
    }
  } else {
    s += banner(0, 0, w, h, { ...sc, caption: undefined });
  }
  if (sc.flags && sc.type === 'map') sc.flags.forEach((f, i) => { s += flag(f, w - 8 - (i + 1) * 30, 7, 26, 17); });
  if (sc.tag) s += `<rect x="6" y="6" width="${sc.tag.length * 6.4 + 12}" height="17" rx="2" fill="rgba(15,23,42,.85)"/><text x="12" y="18" font-family="Arial, sans-serif" font-weight="bold" font-size="10" letter-spacing=".5" fill="#fff">${esc(sc.tag)}</text>`;
  if (sc.caption) {
    s += `<rect x="0" y="${h - 20}" width="${w}" height="20" fill="rgba(15,23,42,.88)"/><text x="8" y="${h - 6}" font-family="Arial, sans-serif" font-weight="bold" font-size="10.5" letter-spacing=".4" fill="#fff">${esc(sc.caption)}</text>`;
    if (sc.captionRight) s += `<text x="${w - 8}" y="${h - 6}" font-family="Arial, sans-serif" font-weight="bold" font-size="10.5" text-anchor="end" fill="#fbbf24">${esc(sc.captionRight)}</text>`;
  }
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">${s}</svg>`;
}

export function renderPage(D) {
  // number every story: leads 1-3, cards 4-13, briefs after
  const all = [...D.leads, ...D.cards, ...D.briefs].map((s, i) => ({ ...s, n: i + 1 }));
  const leads = all.slice(0, D.leads.length);
  const cards = all.slice(D.leads.length, D.leads.length + D.cards.length);
  const briefs = all.slice(D.leads.length + D.cards.length);
  const regionCount = {};
  for (const s of all) regionCount[s.region] = (regionCount[s.region] ?? 0) + 1;
  const continents = new Set(all.filter((s) => CONTINENT[s.region]).map((s) => CONTINENT[s.region]));

  const pinned = all.filter((s) => s.lon != null);
  const mapW = 318, mapH = 178;
  const win = D.mapWindow ?? [-170, -48, 180, 74];
  const mapSvg = `<svg width="${mapW}" height="${mapH}" viewBox="0 0 ${mapW} ${mapH}" xmlns="http://www.w3.org/2000/svg">${landSvg(win, 0, 0, mapW, mapH, { land: '#d8cdae', water: '#16304f', stroke: '#a59670', sw: 0.5 })}${pinsSvg(pinned.map((s) => ({ n: s.n, lon: s.lon, lat: s.lat, color: CAT[s.cat].color })), win, 0, 0, mapW, mapH, { r: 6.6, font: 8.4 })}</svg>`;

  const leadHtml = leads.map((s) => `
    <div class="lead">
      ${scene(s.scene, 326, 104)}
      <div class="meta"><b>${String(s.n).padStart(2, '0')}</b> · ${esc(s.place)} · <span style="color:${CAT[s.cat].color}">${esc(s.label ?? CAT[s.cat].name)}</span></div>
      <div class="lh fit">${esc(s.head)}</div>
      <div class="ls fit">${esc(s.sum)}${src(s.src)}</div>
    </div>`).join('');

  const cardHtml = cards.map((s) => `
    <div class="card">
      <svg width="194" height="58" viewBox="0 0 194 58" xmlns="http://www.w3.org/2000/svg">${banner(0, 0, 194, 58, s.banner)}</svg>
      <div class="meta sm"><b>${String(s.n).padStart(2, '0')}</b> · ${esc(s.place)} · <span style="color:${CAT[s.cat].color}">${esc(s.label ?? CAT[s.cat].name)}</span></div>
      <div class="ch fit">${esc(s.head)}</div>
      <div class="cs fit">${esc(s.sum)}${src(s.src)}</div>
    </div>`).join('');

  const half = Math.ceil(briefs.length / 2);
  const col = (list) => list.map((s) => `<div class="bi"><span class="bn" style="background:${CAT[s.cat].color}">${s.n}</span><b>${esc(s.place)}</b> ${esc(s.text)}${src(s.src)}</div>`).join('');

  const regionChips = Object.entries(REGION).filter(([k]) => regionCount[k]).map(([k, r]) => `<span class="chip" style="background:${r.color}">${r.name.toUpperCase()} ${regionCount[k]}</span>`).join('');
  const legend = Object.values(CAT).map((c) => `<span><i style="background:${c.color}"></i>${c.name}</span>`).join('');

  return `<!doctype html><html><head><meta charset="utf-8"><style>
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{width:1024px;height:1024px;overflow:hidden;background:#fbf8f1;color:#1a1a1a;font-family:Arial,Helvetica,sans-serif}
  .page{position:relative;width:1024px;height:1024px;padding:8px 16px 0}
  .top{display:flex;justify-content:space-between;font-size:10.5px;font-weight:bold;letter-spacing:1px;color:#7f1d1d;border-bottom:1px solid #1a1a1a;padding-bottom:3px}
  .top .r{color:#1a1a1a}
  .mast{display:flex;align-items:baseline;justify-content:space-between;margin-top:2px}
  .date{font-family:Georgia,'Times New Roman',serif;font-weight:bold;font-size:56px;letter-spacing:-1px;line-height:58px;color:#111}
  .stamp{font-family:Arial,sans-serif;text-align:right;font-size:10px;line-height:13px;color:#444;font-weight:bold;letter-spacing:.4px}
  .stamp b{display:inline-block;background:#c8102e;color:#fff;padding:2px 6px;margin-bottom:3px;font-size:11px;letter-spacing:.8px}
  .teaser{font-family:Georgia,serif;font-style:italic;color:#9f1239;font-size:15px;line-height:19px;border-bottom:3px double #1a1a1a;padding-bottom:4px;white-space:nowrap;overflow:hidden}
  .figs{display:flex;margin-top:6px;border:1px solid #d6cfbf;background:#fff}
  .fig{flex:1;padding:4px 6px 3px;border-right:1px solid #e3ddcf;text-align:center}
  .fig:last-child{border-right:0}
  .fig .v{font-family:Georgia,serif;font-weight:bold;font-size:19px;line-height:21px;color:#9f1239}
  .fig .l{font-size:9.6px;line-height:11.5px;color:#333;height:23px;overflow:hidden}
  .chips{display:flex;align-items:center;gap:5px;margin:5px 0 5px;font-size:9.5px}
  .chip{color:#fff;font-weight:bold;padding:2px 6px;border-radius:2px;letter-spacing:.4px}
  .chips .all{margin-left:auto;font-weight:bold;color:#333;letter-spacing:.4px}
  .leads{display:flex;gap:9px}
  .lead{width:326px;background:#fff;border:1px solid #d6cfbf}
  .lead svg{display:block}
  .meta{font-size:9.5px;font-weight:bold;letter-spacing:.5px;color:#555;text-transform:uppercase;padding:5px 8px 0}
  .meta b{color:#9f1239}
  .meta.sm{font-size:8.6px;padding:4px 6px 0;letter-spacing:.3px;white-space:nowrap;overflow:hidden}
  .lh{font-family:Georgia,serif;font-weight:bold;font-size:18px;line-height:20px;padding:2px 8px 0;height:42px;overflow:hidden;color:#111}
  .ls{font-size:11.2px;line-height:14px;padding:2px 8px 6px;height:50px;overflow:hidden;color:#333}
  .src{font-style:italic;color:#777}
  .cards{display:grid;grid-template-columns:repeat(5,194px);gap:6px 6.5px;margin-top:7px}
  .card{background:#fff;border:1px solid #d6cfbf;width:194px}
  .card svg{display:block}
  .ch{font-family:Georgia,serif;font-weight:bold;font-size:13.4px;line-height:15.5px;padding:1px 6px 0;height:33px;overflow:hidden;color:#111}
  .cs{font-size:9.8px;line-height:12px;padding:0 6px 3px;height:28px;overflow:hidden;color:#333}
  .bottom{display:flex;gap:9px;margin-top:7px}
  .mapbox{width:330px;background:#16304f;border:1px solid #0f1d3a;padding:5px 6px 4px;color:#fff}
  .mapbox .t{font-size:10px;font-weight:bold;letter-spacing:.8px;display:flex;justify-content:space-between;margin-bottom:3px}
  .mapbox svg{display:block}
  .legend{display:flex;flex-wrap:wrap;gap:1px 8px;font-size:8.4px;margin-top:3px;color:#e5e7eb}
  .legend i{display:inline-block;width:7px;height:7px;border-radius:50%;margin-right:3px;vertical-align:-0.5px}
  .briefs{flex:1;background:#fff;border:1px solid #d6cfbf;padding:5px 8px 4px}
  .briefs .t{font-size:10.5px;font-weight:bold;letter-spacing:.8px;color:#7f1d1d;border-bottom:1px solid #d6cfbf;padding-bottom:3px;margin-bottom:2px;display:flex;justify-content:space-between}
  .bcols{display:flex;gap:12px}
  .bcol{flex:1}
  .bi{font-size:9.9px;line-height:12px;padding:1.6px 0;border-bottom:1px dotted #ddd5c3;color:#222;height:15.6px;overflow:hidden;white-space:nowrap;text-overflow:clip}
  .bi b{font-weight:bold;color:#111;text-transform:uppercase;font-size:9.2px;letter-spacing:.3px}
  .bn{display:inline-block;min-width:16px;text-align:center;color:#fff;font-weight:bold;font-size:8.6px;border-radius:7px;padding:0 3px;margin-right:4px;line-height:12px}
  .check{margin-top:6px;border:1.5px solid #c8102e;background:#fff;padding:4px 8px;font-size:10px;line-height:13px;display:flex;gap:8px;height:42px;overflow:hidden}
  .check .k{background:#c8102e;color:#fff;font-weight:bold;padding:1px 6px;height:15px;white-space:nowrap;letter-spacing:.6px;font-size:9.6px}
  .foot{font-size:8.8px;color:#555;display:flex;justify-content:space-between;margin-top:4px;line-height:11px}
  </style></head><body><div class="page">
  <div class="top"><span>THE WORLD IN ONE DAY</span><span class="r">${esc(D.weekday.toUpperCase())}'S NEWS · ONE PAGE · ${all.length} STORIES · ${continents.size} CONTINENTS</span></div>
  <div class="mast"><div class="date">${esc(D.weekday)} ${esc(D.date)}</div><div class="stamp"><b>${esc(D.stamp)}</b><br>${esc(D.stampSub)}</div></div>
  <div class="teaser fit">${esc(D.teaser)}</div>
  <div class="figs">${D.figures.map((f) => `<div class="fig"><div class="v">${esc(f.v)}</div><div class="l fit">${esc(f.l)}</div></div>`).join('')}</div>
  <div class="chips">${regionChips}<span class="all">ALL STORIES: ${esc(D.short)} · ANY TIME ZONE</span></div>
  <div class="leads">${leadHtml}</div>
  <div class="cards">${cardHtml}</div>
  <div class="bottom">
    <div class="mapbox"><div class="t"><span>WHERE IT HAPPENED</span><span>${pinned.length} PINS · NUMBERS = STORIES</span></div>${mapSvg}<div class="legend">${legend}</div></div>
    <div class="briefs"><div class="t"><span>ALSO ON ${esc(D.weekday.toUpperCase())} ${esc(D.date.toUpperCase())}: ${briefs.length} MORE STORIES</span><span style="color:#555">${briefs[0]?.n ?? ''}–${briefs.at(-1)?.n ?? ''}</span></div>
      <div class="bcols"><div class="bcol">${col(briefs.slice(0, half))}</div><div class="bcol">${col(briefs.slice(half))}</div></div></div>
  </div>
  <div class="check fit"><span class="k">DATE CHECK</span><span>${esc(D.dateCheck)}</span></div>
  <div class="foot"><span>${esc(D.footLeft)}</span><span>${esc(D.footRight)}</span></div>
  </div>
  <pre id="probe" style="display:none"></pre>
  <script>
  // overflow probe: build.mjs reads this through --dump-dom and refuses a page whose text is cut off
  const bad=[];
  document.querySelectorAll('.fit,.bi').forEach(e=>{ if(e.scrollHeight>e.clientHeight+1||e.scrollWidth>e.clientWidth+1) bad.push(e.textContent.trim().slice(0,70)); });
  const pg=document.querySelector('.page'); const last=document.querySelector('.foot').getBoundingClientRect();
  if(last.bottom>1022) bad.push('PAGE TOO TALL: footer ends at '+Math.round(last.bottom));
  document.getElementById('probe').textContent='PROBE:'+JSON.stringify({bad,footBottom:Math.round(last.bottom)});
  </script></body></html>`;
}
