// Игра «Поймай булку»: Лицеист ловит выпечку на поднос с четырёх лотков.
// Только рейтинг (лист «Игра» в таблице): звёзды не начисляются, к обучению не привязана.
// Экраны: game — лобби с рейтингом (обычный экран с нижним меню), play — сама игра на весь экран.
// Выпечка — вырезки из фото меню (content/img/game), бариста и кухня нарисованы.
(function () {
'use strict';

const COL = { red: '#E8262E', peach: '#F4C3A8', blue: '#6E6AD0', cream: '#F6EBD0', black: '#1E1E1E' };

// Лицеист в форме: чёрная оверсайз-футболка реглан с принтом Лицей × ZNWR, розовые широкие брюки. Смотрит вправо.
function baristaSVG(up) {
  // поднос держит одна (передняя) рука, ладонь под центром подноса; вторая рука прижата к телу
  const fArm = up ? 'M97 79 L113 38 L135 -15' : 'M97 79 L104 114 L136 101';
  const fSleeve = up ? 'M96 79 L103 63' : 'M96 79 L99 97';
  const tray = up ? [138, -22] : [140, 96];
  const hand = up ? [135, -15] : [136, 101];
  const arm = (d, c1, c2, w) => '<path d="' + d + '" fill="none" stroke="' + c1 + '" stroke-width="' + (w + 2.4) + '" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="' + d + '" fill="none" stroke="' + c2 + '" stroke-width="' + w + '" stroke-linecap="round" stroke-linejoin="round" transform="translate(-0.8,-0.8)"/>';
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 -50 180 300" width="540" height="900">' +
    '<defs>' +
    '<linearGradient id="sh" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3A3A3E"/><stop offset=".45" stop-color="#202024"/><stop offset="1" stop-color="#0E0E10"/></linearGradient>' +
    '<linearGradient id="pa" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFC2B8"/><stop offset=".5" stop-color="#F5A397"/><stop offset="1" stop-color="#E48478"/></linearGradient>' +
    '<radialGradient id="fa" cx=".62" cy=".42" r=".7"><stop offset="0" stop-color="#FAD3B6"/><stop offset=".7" stop-color="#EDB18C"/><stop offset="1" stop-color="#D99470"/></radialGradient>' +
    '<linearGradient id="ha" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5A3826"/><stop offset="1" stop-color="#1A0F0A"/></linearGradient>' +
    '<radialGradient id="tr" cx=".4" cy=".3" r=".9"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".6" stop-color="#ECE9E4"/><stop offset="1" stop-color="#BEB8AE"/></radialGradient>' +
    '<radialGradient id="ck" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#F58C88" stop-opacity=".55"/><stop offset="1" stop-color="#F58C88" stop-opacity="0"/></radialGradient>' +
    '</defs>' +
    // брюки: широкие, со стрелками и тенью
    '<path d="M42 134 L98 134 L108 236 L74 237 L70 172 L66 237 L32 236 Z" fill="url(#pa)"/>' +
    '<path d="M56 140 L50 233 M86 140 L92 233" stroke="#D9776C" stroke-width="1.6" fill="none" opacity=".7"/>' +
    '<path d="M70 150 L70 172" stroke="#C9665C" stroke-width="1.4" opacity=".6"/>' +
    '<path d="M42 134 L98 134 L98 142 L42 142 Z" fill="#000" opacity=".12"/>' +
    // кеды
    '<path d="M32 236 Q30 246 40 247 L66 247 Q70 240 64 236 Z" fill="#6B2222"/><path d="M76 236 Q72 246 80 247 L106 247 Q112 240 108 236 Z" fill="#6B2222"/>' +
    '<path d="M34 245 L66 245 M78 245 L108 245" stroke="#F3E6DA" stroke-width="2.4" stroke-linecap="round"/>' +
    // шея и футболка
    '<rect x="62" y="52" width="16" height="22" rx="5" fill="#D99470"/>' +
    '<path d="M58 66 Q70 75 82 66 L96 71 Q103 75 103 86 L103 147 Q70 154 37 147 L37 86 Q37 75 44 71 Z" fill="url(#sh)"/>' +
    '<path d="M46 118 Q50 134 46 146 M90 120 Q86 134 92 146" stroke="#000" stroke-width="2" fill="none" opacity=".35"/>' +
    '<path d="M44 80 Q42 96 46 108" stroke="#fff" stroke-width="3" fill="none" opacity=".08" stroke-linecap="round"/>' +
    '<path d="M58 66 Q70 77 82 66" stroke="#4A4A50" stroke-width="3.2" fill="none"/>' +
    // вторая рука прижата к телу: рукав, предплечье вдоль бока, кисть у бедра
    arm('M42 80 L36 110 L40 136', '#B9785A', '#E2A47F', 9.5) +
    '<circle cx="40.5" cy="137" r="5.8" fill="#E2A47F"/>' +
    '<path d="M43 78 L38 100" fill="none" stroke="#1A1A1D" stroke-width="17" stroke-linecap="round"/>' +
    '<path d="M38 82 L35 99" fill="none" stroke="#fff" stroke-width="2" opacity=".08" stroke-linecap="round"/>' +
    // принт: красный стакан, из которого тянется персиковый стебель с синими ягодами
    '<path d="M57 101 L72 99 Q69 105 74 109 Q68 112 73 117 Q66 119 72 125 L59 127 Z" fill="' + COL.red + '"/>' +
    '<path d="M70 100 Q74 90 83 88" stroke="' + COL.peach + '" stroke-width="3.2" fill="none" stroke-linecap="round"/>' +
    '<g fill="' + COL.blue + '"><circle cx="85" cy="86" r="2.3"/><circle cx="88.5" cy="89" r="2.3"/><circle cx="86" cy="92.5" r="2.3"/><circle cx="89" cy="83.5" r="2.3"/><circle cx="90" cy="93" r="2"/></g>' +
    '<path d="M62 134 L80 134" stroke="#fff" stroke-width="1.6" opacity=".7"/>' +
    // передняя рука: рукав футболки, затем кожа
    arm(fArm, '#C98361', '#EDB18C', 10) +
    '<path d="' + fSleeve + '" fill="none" stroke="#1A1A1D" stroke-width="17" stroke-linecap="round"/>' +
    '<circle cx="' + hand[0] + '" cy="' + hand[1] + '" r="6.6" fill="#EDB18C"/>' +
    // голова
    '<circle cx="73" cy="36" r="22" fill="url(#fa)"/>' +
    '<ellipse cx="60" cy="40" rx="4.4" ry="5.4" fill="#E3A27D"/><path d="M59 38 Q61 40 59 43" stroke="#B9785A" stroke-width="1" fill="none"/>' +
    // волосы: короткие, волнистые, объёмные
    '<path d="M50 42 Q44 22 56 13 Q62 3 75 6 Q84 0 93 8 Q102 14 97 25 Q91 20 85 23 Q80 16 74 24 Q68 20 66 30 Q62 36 63 48 Q58 52 52 50 Z" fill="url(#ha)"/>' +
    '<path d="M60 14 Q68 8 76 11 M78 9 Q86 6 91 12 M56 24 Q58 18 64 16" stroke="#8A5A3E" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".8"/>' +
    // лицо
    '<ellipse cx="84" cy="34" rx="3.2" ry="3.6" fill="#fff"/><circle cx="85.2" cy="34.4" r="2.3" fill="#2A1A12"/><circle cx="86" cy="33.4" r=".8" fill="#fff"/>' +
    '<path d="M79 27 Q84 24.5 89 26.5" stroke="#3A2416" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
    '<path d="M93 37 Q97.5 42 93 45" stroke="#C98361" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
    '<path d="M83 49 Q88 53 92 48.5" stroke="#B5473E" stroke-width="2.2" fill="none" stroke-linecap="round"/>' +
    '<circle cx="82" cy="43" r="6" fill="url(#ck)"/>' +
    // поднос
    '<ellipse cx="' + tray[0] + '" cy="' + (tray[1] + 3) + '" rx="29" ry="6.5" fill="#9E978C"/>' +
    '<ellipse cx="' + tray[0] + '" cy="' + tray[1] + '" rx="29" ry="6.2" fill="url(#tr)" stroke="#B5AEA3" stroke-width="1"/>' +
    '<ellipse cx="' + (tray[0] - 8) + '" cy="' + (tray[1] - 1.5) + '" rx="10" ry="1.6" fill="#fff" opacity=".9"/>' +
    '</svg>';
}

const KINDS = ['bun', 'danish', 'choux'];
const PIC = k => 'content/img/game/' + k + '.png';

function img(src) { const i = new Image(); i.src = src; return i; }
const svgImg = svg => img('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg));
let SPR = null;
function sprites() {
  if (!SPR) {
    SPR = { up: svgImg(baristaSVG(true)), down: svgImg(baristaSVG(false)), hall: img('content/img/game/hall.jpg') };
    SPR.hall.onload = () => { if (BG) BG.key = 'reload'; };
    KINDS.forEach(k => { SPR[k] = img(PIC(k)); });
    const lg = document.getElementById('logo');
    if (lg) {
      const s = lg.innerHTML.trim().replace(/currentColor/g, COL.red);
      SPR.logo = svgImg(s.includes('xmlns') ? s : s.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"'));
    }
  }
  return SPR;
}
const ready = i => i && i.complete && i.naturalWidth;

// ---------- геометрия (логический экран 360×640) ----------
const W = 360, H = 640, FLOOR = 600, CX = 180, K = 1.27;
// точки подноса: бариста стоит в центре, поднос справа в (138,-22)/(140,96) координат рисунка, ноги в (70,246)
const TRAY = (side, up) => {
  const tx = up ? 138 : 140, ty = up ? -22 : 96;
  return { x: CX + side * (tx - 70) * K, y: 598 - (246 - ty) * K };
};
// лотки: 0 — левый верхний, 1 — левый нижний, 2 — правый верхний, 3 — правый нижний
const LANES = [0, 1, 2, 3].map(i => {
  const side = i < 2 ? -1 : 1, up = i % 2 === 0, t = TRAY(side, up);
  return { side, up, tray: t, s: { x: CX + side * 146, y: t.y - 96 }, e: { x: t.x + side * 24, y: t.y - 24 } };
});

// ---------- движок ----------
let G = null;

function newGame() {
  return { pos: 3, score: 0, lives: 3, items: [], fx: [], parts: [], t: 0, nextSpawn: 1.0, lastArrive: 0, over: false, shake: 0, flash: 0, token: null, started: Date.now() };
}

function difficulty(score) {
  return { travel: Math.max(1.45, 3.1 - score * 0.022), every: Math.max(0.5, 1.45 - score * 0.011) };
}

function spawn(g) {
  const d = difficulty(g.score);
  const lane = Math.floor(Math.random() * 4);
  const arrive = g.t + d.travel;
  // не даём двум булкам прийти почти одновременно в разные лотки — иначе поймать невозможно
  if (arrive - g.lastArrive < 0.42) { g.nextSpawn = g.t + 0.1; return; }
  g.lastArrive = arrive;
  g.items.push({ lane, kind: KINDS[Math.floor(Math.random() * KINDS.length)], born: g.t, travel: d.travel, state: 'roll', x: 0, y: 0, rot: 0 });
  g.nextSpawn = g.t + d.every * (0.75 + Math.random() * 0.5);
}

function burst(g, x, y, colors, n, up) {
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * (up ? 1 : 2) + (up ? Math.PI : 0), v = 60 + Math.random() * 140;
    g.parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - (up ? 60 : 0), r: 1.5 + Math.random() * 2.5, c: colors[i % colors.length], t: g.t, life: 0.5 + Math.random() * 0.4, star: up });
  }
}

function step(g, dt) {
  g.t += dt;
  if (g.t >= g.nextSpawn) spawn(g);
  for (const it of g.items) {
    const L = LANES[it.lane];
    if (it.state === 'roll') {
      const p = Math.min(1, (g.t - it.born) / it.travel);
      it.x = L.s.x + (L.e.x - L.s.x) * p;
      it.y = L.s.y + (L.e.y - L.s.y) * p - Math.abs(Math.sin(p * 18)) * 2;
      it.rot = Math.sin(p * 18) * 0.08;
      if (p >= 1) {
        if (g.pos === it.lane) {
          it.state = 'caught'; it.ct = g.t;
          g.score++;
          g.fx.push({ kind: 'plus', x: L.tray.x, y: L.tray.y - 44, t: g.t });
          burst(g, L.tray.x, L.tray.y - 16, ['#FFD34D', '#FFFFFF', '#E8262E'], 10, true);
          if (g.score % 50 === 0 && g.lives < 3) { g.lives++; g.fx.push({ kind: 'life', x: CX, y: 170, t: g.t }); }
          vibrate('light');
        } else {
          it.state = 'fall'; it.vx = L.side * 40; it.vy = 40;
        }
      }
    } else if (it.state === 'caught') {
      const L2 = LANES[it.lane];
      const p = Math.min(1, (g.t - it.ct) / 0.12);
      it.x = L2.e.x + (L2.tray.x - L2.e.x) * p; it.y = L2.e.y + (L2.tray.y - 16 - L2.e.y) * p;
      if (g.t - it.ct > 0.35) it.dead = true;
    } else if (it.state === 'fall') {
      it.vy += 1400 * dt; it.x += it.vx * dt; it.y += it.vy * dt; it.rot += it.vx > 0 ? 6 * dt : -6 * dt;
      if (it.y >= FLOOR - 6) {
        it.state = 'floor'; it.y = FLOOR - 6; it.ft = g.t;
        burst(g, it.x, FLOOR - 4, ['#C8873E', '#E7B56A', '#8A5022'], 14, false);
        g.lives--; g.shake = 0.3; g.flash = 0.25;
        vibrate('error');
        if (g.lives <= 0) g.over = true;
      }
    } else if (it.state === 'floor') {
      if (g.t - it.ft > 1.1) it.dead = true;
    }
  }
  for (const p of g.parts) { p.vy += (p.star ? 260 : 700) * dt; p.x += p.vx * dt; p.y += p.vy * dt; if (!p.star && p.y > FLOOR) { p.y = FLOOR; p.vy *= -0.3; p.vx *= 0.6; } }
  g.items = g.items.filter(i => !i.dead);
  g.fx = g.fx.filter(f => g.t - f.t < 0.9);
  g.parts = g.parts.filter(p => g.t - p.t < p.life);
  g.shake = Math.max(0, g.shake - dt); g.flash = Math.max(0, g.flash - dt);
}

// ---------- отрисовка ----------
let BG = null; // статичный фон (фото зала + печи и лотки): один холст размером с экран, рисуется один раз
function background(v, pw, ph) {
  const key = pw + 'x' + ph;
  if (BG && BG.key === key) return BG.c;
  const c = BG && BG.c || document.createElement('canvas');
  c.width = pw; c.height = ph;
  const x = c.getContext('2d'), sc = v.dpr * v.s;
  x.setTransform(sc, 0, 0, sc, v.dpr * v.ox, v.dpr * v.oy);
  const x0 = -v.ox / v.s, y0 = -v.oy / v.s, vw = pw / sc, vh = ph / sc;
  x.fillStyle = '#F3E7DC'; x.fillRect(x0, y0, vw, vh);
  // фото зала «Лицея» — по размеру экрана (cover), чуть осветлено, чтобы выпечка читалась
  const loaded = SPR && ready(SPR.hall);
  if (loaded) {
    const im = SPR.hall, k = Math.max(vw / im.naturalWidth, vh / im.naturalHeight);
    const iw = im.naturalWidth * k, ih = im.naturalHeight * k;
    x.drawImage(im, x0 + (vw - iw) / 2, y0 + (vh - ih) * 0.55, iw, ih);
  }
  const gr = x.createLinearGradient(0, y0, 0, y0 + vh);
  gr.addColorStop(0, 'rgba(255,248,240,.42)'); gr.addColorStop(.55, 'rgba(255,248,240,.12)'); gr.addColorStop(1, 'rgba(40,20,10,.18)');
  x.fillStyle = gr; x.fillRect(x0, y0, vw, vh);
  for (const L of LANES) chute(x, L);
  for (const L of LANES) ovenBody(x, L);
  BG = { key: loaded ? key : 'wait', c };
  return c;
}

// спрайты заранее растрируем в холсты нужного размера: SVG и тени в каждом кадре на iPhone очень медленные
let BAKED = {};
function baked(name, sc) {
  const k = name + '@' + sc.toFixed(3);
  if (BAKED[k]) return BAKED[k];
  const S = sprites(), im = S[name];
  if (!ready(im)) return null;
  let lw, lh, pad = 0, shadow = false;
  if (name === 'up' || name === 'down') { lw = 180 * K; lh = 300 * K; }
  else { lw = 54; lh = 54 * im.naturalHeight / im.naturalWidth; pad = 8; shadow = true; }
  const c = document.createElement('canvas');
  c.width = Math.ceil((lw + pad * 2) * sc); c.height = Math.ceil((lh + pad * 2) * sc);
  const x = c.getContext('2d');
  x.scale(sc, sc);
  if (shadow) { x.shadowColor = 'rgba(70,30,10,.35)'; x.shadowBlur = 6 * sc; x.shadowOffsetY = 3 * sc; }
  x.drawImage(im, pad, pad, lw, lh);
  return (BAKED[k] = { c, w: lw + pad * 2, h: lh + pad * 2, pad });
}

function chute(x, L) {
  const a = { x: L.s.x, y: L.s.y + 16 }, b = { x: L.e.x, y: L.e.y + 20 };
  x.lineCap = 'round';
  x.strokeStyle = 'rgba(80,40,30,.18)'; x.lineWidth = 12; x.beginPath(); x.moveTo(a.x, a.y + 5); x.lineTo(b.x, b.y + 5); x.stroke();
  const gr = x.createLinearGradient(0, a.y - 6, 0, a.y + 6);
  gr.addColorStop(0, '#F4F6F9'); gr.addColorStop(.5, '#C3C9D2'); gr.addColorStop(1, '#8D95A1');
  x.strokeStyle = '#7C8490'; x.lineWidth = 11; x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.stroke();
  x.strokeStyle = '#CDD3DB'; x.lineWidth = 8; x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.stroke();
  x.strokeStyle = '#FFFFFF'; x.lineWidth = 2; x.beginPath(); x.moveTo(a.x, a.y - 3); x.lineTo(b.x, b.y - 3); x.stroke();
}

function ovenBody(x, L) {
  x.save(); x.translate(L.s.x, L.s.y);
  x.shadowColor = 'rgba(90,30,20,.28)'; x.shadowBlur = 10; x.shadowOffsetY = 4;
  let gr = x.createLinearGradient(-28, 0, 28, 0);
  gr.addColorStop(0, '#E4E7EB'); gr.addColorStop(.35, '#FFFFFF'); gr.addColorStop(1, '#AEB4BC');
  x.fillStyle = gr; roundRect(x, -28, -68, 56, 66, 10); x.fill();
  x.shadowColor = 'transparent';
  x.fillStyle = COL.red; roundRect(x, -28, -68, 56, 12, { tl: 10, tr: 10, br: 0, bl: 0 }); x.fill();
  x.fillStyle = '#FFFFFF'; x.globalAlpha = .35; x.fillRect(-24, -66, 30, 3); x.globalAlpha = 1;
  x.fillStyle = '#2A1412'; roundRect(x, -20, -50, 40, 28, 6); x.fill();
  x.fillStyle = '#6E7681'; x.fillRect(-16, -16, 32, 3);
  x.fillStyle = '#3B3F45'; x.beginPath(); x.arc(-14, -8, 2.6, 0, 7); x.fill(); x.beginPath(); x.arc(14, -8, 2.6, 0, 7); x.fill();
  x.restore();
}

// окно печи светится и мерцает
function ovenGlow(ctx, L, t) {
  const f = 0.85 + Math.sin(t * 7 + L.s.x) * 0.08 + Math.sin(t * 13 + L.s.y) * 0.05;
  ctx.save(); ctx.translate(L.s.x, L.s.y);
  const gr = ctx.createRadialGradient(0, -30, 2, 0, -36, 26);
  gr.addColorStop(0, 'rgba(255,236,160,' + f + ')'); gr.addColorStop(.5, 'rgba(255,150,40,' + (f * .9) + ')'); gr.addColorStop(1, 'rgba(200,60,20,' + (f * .6) + ')');
  ctx.fillStyle = gr; roundRect(ctx, -17, -47, 34, 22, 4); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fillRect(-14, -45, 12, 2);
  ctx.restore();
}

function draw(ctx, g, v, pw, ph) {
  sprites();
  const sc = v.dpr * v.s, shake = g.shake ? (Math.random() - 0.5) * 8 * g.shake / 0.3 : 0;
  ctx.setTransform(1, 0, 0, 1, Math.round(shake * sc), 0);
  ctx.drawImage(background(v, pw, ph), 0, 0);
  ctx.setTransform(sc, 0, 0, sc, v.dpr * v.ox + Math.round(shake * sc), v.dpr * v.oy);
  ctx.save();
  for (const L of LANES) ovenGlow(ctx, L, g.t);
  // тень бариста
  ctx.fillStyle = 'rgba(80,30,20,.2)'; ctx.beginPath(); ctx.ellipse(CX + LANES[g.pos].side * 4, FLOOR - 1, 62, 8, 0, 0, 7); ctx.fill();
  // бариста
  const up = LANES[g.pos].up, side = LANES[g.pos].side, bb = baked(up ? 'up' : 'down', sc);
  if (bb) {
    ctx.save();
    ctx.translate(CX, 598);
    ctx.scale(side, 1);
    ctx.drawImage(bb.c, (-10 - 70) * K, (-50 - 246) * K, bb.w, bb.h);
    ctx.restore();
  }
  // выпечка
  for (const it of g.items) {
    const sp = baked(it.kind, sc); if (!sp) continue;
    ctx.save(); ctx.translate(it.x, it.y + 12); if (it.rot) ctx.rotate(it.rot);
    if (it.state === 'floor') { ctx.scale(1.12, 0.72); ctx.globalAlpha = Math.max(0, 1 - (g.t - it.ft) / 1.1); }
    ctx.drawImage(sp.c, -sp.w / 2, -sp.h + sp.pad, sp.w, sp.h);
    ctx.restore();
  }
  // искры и крошки
  for (const p of g.parts) {
    ctx.globalAlpha = Math.max(0, 1 - (g.t - p.t) / p.life);
    ctx.fillStyle = p.c;
    if (p.star) star(ctx, p.x, p.y, p.r * 1.6); else { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill(); }
  }
  ctx.globalAlpha = 1;
  // «+1»
  for (const f of g.fx) {
    const p = (g.t - f.t) / 0.9, sc = 1 + Math.max(0, 0.3 - p) * 1.5;
    ctx.save(); ctx.globalAlpha = 1 - p; ctx.translate(f.x, f.y - p * 34); ctx.scale(sc, sc);
    ctx.font = '800 ' + (f.kind === 'life' ? 22 : 26) + 'px Manrope, sans-serif'; ctx.textAlign = 'center';
    ctx.lineWidth = 5; ctx.strokeStyle = '#fff'; ctx.lineJoin = 'round';
    const tx = f.kind === 'life' ? '+1 жизнь' : '+1';
    ctx.strokeText(tx, 0, 0); ctx.fillStyle = COL.red; ctx.fillText(tx, 0, 0);
    ctx.restore();
  }
  ctx.restore();
  if (g.flash) { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = 'rgba(232,38,46,' + (g.flash * 0.6) + ')'; ctx.fillRect(0, 0, pw, ph); }
}

function star(ctx, x, y, r) {
  ctx.beginPath();
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, rr = i % 2 ? r * 0.4 : r; ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); }
  ctx.closePath(); ctx.fill();
}
function roundRect(ctx, x, y, w, h, r) {
  const c = typeof r === 'number' ? { tl: r, tr: r, br: r, bl: r } : r;
  ctx.beginPath(); ctx.moveTo(x + c.tl, y); ctx.lineTo(x + w - c.tr, y); ctx.arcTo(x + w, y, x + w, y + c.tr, c.tr);
  ctx.lineTo(x + w, y + h - c.br); ctx.arcTo(x + w, y + h, x + w - c.br, y + h, c.br);
  ctx.lineTo(x + c.bl, y + h); ctx.arcTo(x, y + h, x, y + h - c.bl, c.bl);
  ctx.lineTo(x, y + c.tl); ctx.arcTo(x, y, x + c.tl, y, c.tl); ctx.closePath();
}

function vibrate(kind) {
  try { const T = window.Telegram && Telegram.WebApp; if (T && T.HapticFeedback) { if (kind === 'error') T.HapticFeedback.notificationOccurred('error'); else T.HapticFeedback.impactOccurred(kind); } } catch (e) {}
}

// ---------- экраны ----------
const css = document.createElement('style');
css.textContent = `
.gm-hero { background: linear-gradient(180deg,#FFF7EC,#FCE3D3); border-radius: 22px; padding: 18px; display: flex; gap: 14px; align-items: center; margin-bottom: 14px; position: relative; overflow: hidden; }
.gm-hero img.b { width: 110px; height: 183px; object-fit: contain; flex: none; margin: -6px -4px -12px -6px; }
.gm-hero .tx { flex: 1; }
.gm-hero h3 { font: 600 26px/1.05 var(--serif); margin: 0 0 6px; }
.gm-hero p { margin: 0 0 12px; font-size: 13px; color: var(--muted); }
.gm-buns { display: flex; gap: 6px; margin-bottom: 12px; align-items: flex-end; } .gm-buns img { width: 42px; height: auto; filter: drop-shadow(0 2px 2px rgba(70,30,10,.3)); }
.gm-me { display: flex; gap: 10px; margin-bottom: 6px; }
.gm-me div { flex: 1; background: var(--surface-2); border-radius: 14px; padding: 10px 12px; }
.gm-me b { display: block; font-size: 22px; line-height: 1.1; } .gm-me span { font-size: 12px; color: var(--muted); }
.gm-top { display: grid; gap: 6px; }
.gm-top .r { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border: 1px solid var(--line); border-radius: 14px; }
.gm-top .r.me { border-color: var(--accent); background: var(--accent-soft); }
.gm-top .n { width: 26px; text-align: center; font-weight: 800; color: var(--muted); flex: none; }
.gm-top .r:nth-child(-n+3) .n { color: var(--accent); }
.gm-top .who { flex: 1; min-width: 0; } .gm-top .who div { font-weight: 600; } .gm-top .who span { font-size: 12px; color: var(--muted); }
.gm-top .sc { font-weight: 800; font-size: 17px; }
.gm-note { font-size: 12px; color: var(--muted); margin: 8px 2px 0; }
.gm-play { position: fixed; inset: 0; z-index: 80; background: #FCE8DC; touch-action: none; user-select: none; -webkit-user-select: none; }
.gm-play canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.gm-hud { position: absolute; left: 0; right: 0; top: 0; padding: calc(10px + env(safe-area-inset-top, 0px)) 14px 18px; background: linear-gradient(180deg, rgba(255,248,240,.92), rgba(255,248,240,0)); display: flex; align-items: center; justify-content: space-between; pointer-events: none; }
.gm-hud button { pointer-events: auto; width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,.85); box-shadow: 0 1px 4px rgba(0,0,0,.12); display: grid; place-items: center; }
.gm-score { font: 700 46px/1 var(--serif); color: #E8262E; text-shadow: 0 2px 0 #fff; min-width: 80px; text-align: center; }
.gm-lives { display: flex; gap: 3px; min-width: 40px; justify-content: flex-end; } .gm-lives img { width: 28px; height: auto; filter: drop-shadow(0 1px 1px rgba(0,0,0,.25)); } .gm-lives img.off { opacity: .2; filter: grayscale(1); }
.gm-over { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(251,247,244,.82); backdrop-filter: blur(3px); padding: 20px; }
.gm-over .card2 { background: #fff; border-radius: 24px; padding: 24px 20px 20px; width: 100%; max-width: 340px; text-align: center; box-shadow: var(--shadow); }
.gm-over h3 { font: 600 30px/1.1 var(--serif); margin: 0 0 6px; }
.gm-over .big { font: 700 64px/1 var(--serif); color: var(--accent); margin: 8px 0 4px; }
.gm-over p { color: var(--muted); margin: 0 0 16px; font-size: 14px; }
.gm-over .btns2 { display: grid; gap: 8px; }
`;
document.head.appendChild(css);

const bunImg = k => '<img src="' + PIC(k) + '" alt="">';
let TOP = { period: 'month', by: 'people', data: {} };

VIEWS.game = () => {
  const my = (B && B.game) || { best: 0, place: 0 };
  let h = head('Разомнись');
  h += '<div class="gm-hero"><img class="b" src="data:image/svg+xml;charset=utf-8,' + encodeURIComponent(baristaSVG(true)) + '" alt="">' +
    '<div class="tx"><h3>Поймай булку</h3><div class="gm-buns">' + KINDS.map(bunImg).join('') + '</div>' +
    '<p>Булки катятся из печей по четырём лоткам. Нажимайте на ту часть экрана, куда катится булка, и Лицеист поймает её на поднос. Уронили три — игра окончена.</p>' +
    '<button class="btn" data-go="play">Играть</button></div></div>';
  h += '<div class="gm-me"><div><b>' + (my.best || '—') + '</b><span>ваш рекорд</span></div><div><b>' + (my.place ? my.place + '-е' : '—') + '</b><span>место в рейтинге</span></div></div>';
  h += '<div class="sec">Рейтинг</div>' +
    '<div class="seg" id="gmPeriod"><button data-p="month" class="' + (TOP.period === 'month' ? 'on' : '') + '">Этот месяц</button><button data-p="all" class="' + (TOP.period === 'all' ? 'on' : '') + '">Всё время</button></div>' +
    '<div class="seg" id="gmBy"><button data-b="people" class="' + (TOP.by === 'people' ? 'on' : '') + '">Сотрудники</button><button data-b="places" class="' + (TOP.by === 'places' ? 'on' : '') + '">Точки</button></div>' +
    '<div id="gmTop"><div class="empty">Загружаю рейтинг…</div></div>';
  return h;
};
AFTER.game = () => {
  const box = () => document.getElementById('gmTop');
  const paint = () => {
    const d = TOP.data[TOP.period]; const el = box(); if (!el) return;
    if (!d) { el.innerHTML = '<div class="empty">Загружаю рейтинг…</div>'; return; }
    if (TOP.by === 'places') {
      el.innerHTML = d.places.length ? '<div class="gm-top">' + d.places.map((x, i) => '<div class="r' + (x.me ? ' me' : '') + '"><span class="n">' + (i + 1) + '</span><span class="who"><div>' + esc(x.object) + '</div><span>' + x.players + ' ' + plural(x.players, 'игрок', 'игрока', 'игроков') + '</span></span><span class="sc">' + x.score + '</span></div>').join('') + '</div>' +
        '<p class="gm-note">Очки точки — средний рекорд пяти её лучших игроков.</p>' : '<div class="empty">Пока никто не играл — будьте первым!</div>';
      return;
    }
    const rows = d.people.slice();
    if (d.me && !rows.some(x => x.me)) rows.push(d.me);
    el.innerHTML = rows.length ? '<div class="gm-top">' + rows.map(x => '<div class="r' + (x.me ? ' me' : '') + '"><span class="n">' + x.place + '</span><span class="who"><div>' + esc(x.name) + (x.me ? ' (вы)' : '') + '</div><span>' + esc(x.object) + '</span></span><span class="sc">' + x.score + '</span></div>').join('') + '</div>'
      : '<div class="empty">Пока никто не играл — будьте первым!</div>';
  };
  const load = () => {
    const p = TOP.period;
    paint();
    api('gameTop', p).then(d => { TOP.data[p] = d; paint(); }).catch(e => { const el = box(); if (el && !TOP.data[p]) el.innerHTML = '<div class="empty">' + esc(e.message) + '</div>'; });
  };
  document.getElementById('gmPeriod').onclick = e => { const b = e.target.closest('[data-p]'); if (!b) return; TOP.period = b.dataset.p; document.querySelectorAll('#gmPeriod button').forEach(x => x.classList.toggle('on', x === b)); load(); };
  document.getElementById('gmBy').onclick = e => { const b = e.target.closest('[data-b]'); if (!b) return; TOP.by = b.dataset.b; document.querySelectorAll('#gmBy button').forEach(x => x.classList.toggle('on', x === b)); paint(); };
  load();
};

// ---------- сама игра ----------
VIEWS.play = () => '<div class="gm-play" id="gmPlay"><canvas id="gmCv"></canvas>' +
  '<div class="gm-hud"><button data-act="gmQuit" aria-label="Выйти"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
  '<div class="gm-score" id="gmScore">0</div><div class="gm-lives" id="gmLives"></div></div><div id="gmOver"></div></div>';

AFTER.play = () => {
  const T = window.Telegram && Telegram.WebApp;
  try { T && T.disableVerticalSwipes && T.disableVerticalSwipes(); } catch (e) {}
  const cv = document.getElementById('gmCv'), ctx = cv.getContext('2d');
  let view = { s: 1, ox: 0, oy: 0 };
  const resize = () => {
    const dpr = Math.min(2, window.devicePixelRatio || 1), w = cv.clientWidth, h = cv.clientHeight;
    if (!w || !h) { view = { s: 0, ox: 0, oy: 0, dpr }; return; }
    cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    const s = Math.min(w / W, h / H);
    view = { s, ox: (w - W * s) / 2, oy: (h - H * s) / 2, dpr };
  };
  resize();
  window.addEventListener('resize', resize);
  start();

  function start() {
    G = newGame();
    document.getElementById('gmOver').innerHTML = '';
    hud();
    api('gameStart').then(r => { if (G) G.token = r.token; }).catch(() => {});
  }
  function hud() {
    const sc = document.getElementById('gmScore'), lv = document.getElementById('gmLives');
    if (!sc) return;
    sc.textContent = G.score;
    lv.innerHTML = [0, 1, 2].map(i => bunImg('bun').replace('<img', '<img class="' + (i < G.lives ? '' : 'off') + '"')).join('');
  }
  let last = performance.now(), shown = { score: -1, lives: -1 };
  function frame(now) {
    if (!document.body.contains(cv)) { BG = null; BAKED = {}; window.removeEventListener('resize', resize); window.removeEventListener('keydown', key); try { T && T.enableVerticalSwipes && T.enableVerticalSwipes(); } catch (e) {} G = null; return; }
    if (cv.clientWidth && (cv.width !== Math.round(cv.clientWidth * view.dpr) || cv.height !== Math.round(cv.clientHeight * view.dpr) || !view.s)) resize();
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (G && !G.over && !G.paused) step(G, dt);
    if (G && view.s) {
      draw(ctx, G, view, cv.width, cv.height);
      if (G.score !== shown.score || G.lives !== shown.lives) { shown = { score: G.score, lives: G.lives }; hud(); }
      if (G.over && !G.ended) { G.ended = true; finish(); }
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  // управление: касание четверти экрана (лево/право × выше/ниже середины между подносами), клавиши для компьютера
  const midY = (LANES[0].tray.y + LANES[1].tray.y) / 2;
  cv.addEventListener('pointerdown', e => {
    if (!G || G.over) return;
    e.preventDefault();
    const r = cv.getBoundingClientRect();
    const x = (e.clientX - r.left - view.ox) / view.s, y = (e.clientY - r.top - view.oy) / view.s;
    G.pos = (x < CX ? 0 : 2) + (y < midY ? 0 : 1);
  });
  function key(e) {
    if (!G || G.over) return;
    const m = { q: 0, a: 1, p: 2, l: 3, й: 0, ф: 1, з: 2, д: 3 }[e.key.toLowerCase()];
    if (m !== undefined) G.pos = m;
    else if (e.key === 'ArrowLeft') G.pos = G.pos % 2;
    else if (e.key === 'ArrowRight') G.pos = 2 + G.pos % 2;
    else if (e.key === 'ArrowUp') G.pos = G.pos - G.pos % 2;
    else if (e.key === 'ArrowDown') G.pos = G.pos - G.pos % 2 + 1;
    else return;
    e.preventDefault();
  }
  window.addEventListener('keydown', key);
  const qb = document.querySelector('.gm-hud [data-act="gmQuit"]');
  if (qb) qb.addEventListener('pointerup', e => { e.preventDefault(); e.stopPropagation(); ACT.gmQuit(); });
  qb && qb.addEventListener('click', e => { e.stopPropagation(); });

  function finish() {
    const g = G, prevBest = (B.game && B.game.best) || 0;
    const box = document.getElementById('gmOver');
    const show = (note) => {
      if (!document.body.contains(box)) return;
      const best = Math.max(prevBest, g.score), rec = g.score > prevBest && g.score > 0;
      box.innerHTML = '<div class="gm-over"><div class="card2"><h3>' + (rec ? 'Новый рекорд!' : 'Игра окончена') + '</h3>' +
        '<div class="big">' + g.score + '</div><p>' + plural(g.score, 'булка поймана', 'булки поймано', 'булок поймано') +
        (rec ? '' : ' · рекорд ' + best) + (B.game && B.game.place ? '<br>' + B.game.place + '-е место в рейтинге' : '') + (note ? '<br>' + esc(note) : '') + '</p>' +
        '<div class="btns2"><button class="btn" data-act="gmAgain">Ещё раз</button><button class="btn ghost" data-act="gmQuit">Рейтинг</button></div></div></div>';
    };
    vibrate(g.score > prevBest ? 'medium' : 'heavy');
    show('Сохраняю результат…');
    if (!g.token || g.score === 0) { show(g.token ? '' : 'Нет связи — результат не сохранён'); return; }
    api('gameEnd', g.token, g.score).then(r => {
      B.game = r; ls.set(LS.boot, B); TOP.data = {};
      show('');
    }).catch(e => show(e.message));
  }
  ACT.gmAgain = () => start();
};

// крестик и «Назад»: идёт игра — сразу заканчиваем и показываем итог (результат сохраняется); на итоге — выходим к рейтингу
ACT.gmQuit = () => {
  if (G && !G.over && G.score > 0) { G.over = true; return; }
  stack.pop(); render(false);
};
window.gameBack = () => ACT.gmQuit();
window.gameState = () => G; // для проверки на стенде
})();
