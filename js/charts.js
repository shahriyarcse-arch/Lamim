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
    if (!data || data.length < 2) { container.innerHTML = ''; return; }
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

  /* ---------- barChart ---------- */
  barChart(container, data, opts = {}) {
    if (!data || !data.length) { container.innerHTML = ''; return; }
    const h = opts.height || 110;
    const color = opts.color || '#818cf8';
    const max = Math.max(...data.map(d => d.value), 1);
    const barW = Math.max(12, Math.floor(100 / data.length) - 4);
    const gap = Math.max(4, Math.floor(80 / data.length));

    let bars = '';
    let labels = '';
    data.forEach((d, i) => {
      const barH = Math.max(2, (d.value / max) * (h - 28));
      const x = i * (barW + gap) + gap / 2;
      const y = h - 20 - barH;
      const c = d.highlight ? '#fbbf24' : color;
      const opacity = d.highlight ? '1' : '0.85';
      bars += `<rect x="${x}" y="${y}" width="${barW}" height="${barH}" rx="3" fill="${c}" opacity="${opacity}">
        <animate attributeName="height" from="0" to="${barH}" dur="0.5s" fill="freeze"/>
        <animate attributeName="y" from="${h - 20}" to="${y}" dur="0.5s" fill="freeze"/>
      </rect>`;
      const labelColor = d.highlight ? '#fbbf24' : 'rgba(255,255,255,0.5)';
      labels += `<text x="${x + barW/2}" y="${h - 6}" text-anchor="middle" fill="${labelColor}" font-size="9" font-weight="600">${d.label}</text>`;
    });

    container.innerHTML = `<svg width="100%" height="${h}" viewBox="0 0 100 ${h}" preserveAspectRatio="xMidYMid meet">
      ${bars}${labels}
    </svg>`;
  },

  /* ---------- donut ---------- */
  donut(container, data, opts = {}) {
    if (!data || !data.length) { container.innerHTML = ''; return; }
    const size = opts.size || 120;
    const thick = opts.thickness || 14;
    const r = (size - thick) / 2;
    const circ = 2 * Math.PI * r;
    const total = data.reduce((s, d) => s + d.value, 0) || 1;

    let segs = '';
    let offset = 0;
    data.forEach(d => {
      const pct = d.value / total;
      const dash = circ * pct;
      const gap = circ - dash;
      segs += `<circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${d.color}" stroke-width="${thick}"
        stroke-dasharray="${dash} ${gap}" stroke-dashoffset="${-offset}" stroke-linecap="butt" style="transform:rotate(-90deg);transform-origin:center"/>`;
      offset += dash;
    });

    const centerText = opts.centerText || '';
    const centerSub = opts.centerSub || '';
    container.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      ${segs}
      <text x="${size/2}" y="${size/2 - (centerSub ? 4 : 0)}" text-anchor="middle" dominant-baseline="central"
        fill="var(--cb-text, #fff)" font-size="18" font-weight="800">${centerText}</text>
      <text x="${size/2}" y="${size/2 + 14}" text-anchor="middle" dominant-baseline="central"
        fill="var(--cb-text-muted, rgba(255,255,255,0.5))" font-size="9" font-weight="600">${centerSub}</text>
    </svg>`;
  },

  /* ---------- lineChart ---------- */
  lineChart(container, data, opts = {}) {
    if (!data || data.length < 2) { container.innerHTML = ''; return; }
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
