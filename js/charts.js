/* =============================================
   LAMIM — CHARTS (Pure SVG, zero deps)
   ============================================= */
const Charts = {

  /* ---------- ring (SVG circular progress, starts at 0) ---------- */
  ring(container, opts = {}) {
    const size = opts.size || 88;
    const thick = opts.thickness || 8;
    const r = (size - thick) / 2;
    const circ = 2 * Math.PI * r;
    const color = opts.color || '#818cf8';
    const colorEnd = opts.colorEnd || null;
    const gradId = 'rg' + Math.random().toString(36).slice(2, 8);

    let gradSvg = '';
    if (colorEnd) {
      gradSvg = `<defs><linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${color}"/><stop offset="100%" stop-color="${colorEnd}"/>
      </linearGradient></defs>`;
    }
    const stroke = colorEnd ? `url(#${gradId})` : color;

    container.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="transform:rotate(-90deg)">
      ${gradSvg}
      <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="${thick}"/>
      <circle class="ch-ring" cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${stroke}" stroke-width="${thick}" stroke-linecap="round"
        stroke-dasharray="${circ}" stroke-dashoffset="${circ}" data-circ="${circ}"/>
    </svg>`;
  },

  /* ---------- animateRing ---------- */
  animateRing(container, value, opts = {}) {
    const svg = container.querySelector('svg');
    if (!svg) return;
    const circle = container.querySelector('.ch-ring');
    if (!circle) return;
    const circ = parseFloat(circle.getAttribute('data-circ')) || 2 * Math.PI * ((opts.size || 88) - (opts.thickness || 8)) / 2;
    const maxVal = 100;
    const pct = Math.min(Math.max(value / maxVal, 0), 1);
    const offset = circ * (1 - pct);
    circle.style.transition = 'stroke-dashoffset 1s cubic-bezier(.4,0,.2,1)';
    circle.style.strokeDashoffset = offset;
  },

  /* ---------- sparkline ---------- */
  sparkline(container, data, opts = {}) {
    if (!data || data.length < 2) { container.innerHTML = '<div style="font-size:11px;color:var(--color-text-muted);text-align:center;padding:12px 0;">Not enough data</div>'; return; }
    const w = container.clientWidth || 120;
    const h = opts.height || 44;
    const color = opts.color || '#818cf8';
    const fill = opts.fillColor || 'rgba(129,140,248,0.15)';
    const max = Math.max(...data, 1);
    const step = w / (data.length - 1);
    const pts = data.map((v, i) => [i * step, h - (v / max) * (h - 4)]);

    let d = `M${pts[0][0]},${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const [x, y] = pts[i];
      const [px, py] = pts[i - 1];
      const cx1 = px + step * 0.4;
      const cx2 = x - step * 0.4;
      d += ` C${cx1},${py} ${cx2},${y} ${x},${y}`;
    }
    const area = d + ` L${pts[pts.length-1][0]},${h} L${pts[0][0]},${h} Z`;

    container.innerHTML = `<svg width="100%" height="${h}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
      <path d="${area}" fill="${fill}"/>
      <path d="${d}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
    </svg>`;
  },


  /* ---------- lineChart ---------- */
  lineChart(container, data, opts = {}) {
    if (!data || data.length < 2) { container.innerHTML = '<div style="font-size:11px;color:var(--color-text-muted);text-align:center;padding:12px 0;">Not enough data</div>'; return; }
    const w = container.clientWidth || 200;
    const h = opts.height || 90;
    const color = opts.color || '#818cf8';
    const vals = data.map(d => d.value);
    const max = Math.max(...vals, 1);
    const min = Math.min(...vals, 0);
    const range = max - min || 1;
    const step = w / (data.length - 1);
    const pad = 4;

    const pts = data.map((d, i) => [i * step, pad + ((max - d.value) / range) * (h - pad * 2)]);

    let line = `M${pts[0][0]},${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const [x, y] = pts[i];
      const [px, py] = pts[i - 1];
      line += ` C${px + step * 0.4},${py} ${x - step * 0.4},${y} ${x},${y}`;
    }
    const area = line + ` L${pts[pts.length-1][0]},${h} L${pts[0][0]},${h} Z`;

    container.innerHTML = `<svg width="100%" height="${h}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
      <defs><linearGradient id="lg${opts._id || ''}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${color}" stop-opacity="0.3"/><stop offset="100%" stop-color="${color}" stop-opacity="0"/>
      </linearGradient></defs>
      <path d="${area}" fill="url(#lg${opts._id || ''})"/>
      <path d="${line}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="${pts[pts.length-1][0]}" cy="${pts[pts.length-1][1]}" r="3.5" fill="${color}"/>
    </svg>`;
  }
};


