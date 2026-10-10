// Draws the weekly report as a branded picture (PNG) on a canvas and shares it: the phone's
// share sheet when it can take files, otherwise a download.

const W = 1080;
const H = 1350;
const FONT = '-apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function fitText(ctx, text, maxWidth, size, weight) {
  let s = size;
  ctx.font = `${weight} ${s}px ${FONT}`;
  while (ctx.measureText(text).width > maxWidth && s > 24) { s -= 2; ctx.font = `${weight} ${s}px ${FONT}`; }
}

/**
 * @param {{ title: string, range: string, items: Array<{label:string, value:string, delta?:string, tone?:'good'|'bad'|null}>,
 *           streakLabel: string, streak: number, footer: string }} data
 * @returns {Promise<Blob>}
 */
export function renderReportCard(data) {
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#0A84FF');
  bg.addColorStop(1, '#5E5CE6');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // soft glow
  const glow = ctx.createRadialGradient(W * 0.85, H * 0.1, 10, W * 0.85, H * 0.1, 520);
  glow.addColorStop(0, 'rgba(255,255,255,0.28)');
  glow.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // brand
  ctx.fillStyle = '#fff';
  ctx.textBaseline = 'alphabetic';
  ctx.font = `800 54px ${FONT}`;
  ctx.fillText('VOCABRY.UZ', 80, 130);

  ctx.font = `800 84px ${FONT}`;
  fitText(ctx, data.title, W - 160, 84, 800);
  ctx.fillText(data.title, 80, 290);
  ctx.font = `600 38px ${FONT}`;
  ctx.fillStyle = 'rgba(255,255,255,0.8)';
  ctx.fillText(data.range, 80, 350);

  // stat cards (2 x 2)
  const cardW = 440;
  const cardH = 270;
  const gap = 40;
  const startY = 420;
  data.items.slice(0, 4).forEach((it, i) => {
    const x = 80 + (i % 2) * (cardW + gap);
    const y = startY + Math.floor(i / 2) * (cardH + gap);
    ctx.fillStyle = 'rgba(255,255,255,0.96)';
    roundRect(ctx, x, y, cardW, cardH, 44);
    ctx.fill();
    ctx.fillStyle = '#6B7280';
    ctx.font = `700 30px ${FONT}`;
    ctx.fillText(it.label.toUpperCase(), x + 40, y + 70);
    ctx.fillStyle = '#111827';
    fitText(ctx, it.value, cardW - 80, 96, 800);
    ctx.fillText(it.value, x + 40, y + 175);
    if (it.delta) {
      ctx.fillStyle = it.tone === 'good' ? '#16A34A' : it.tone === 'bad' ? '#DC2626' : '#6B7280';
      ctx.font = `700 32px ${FONT}`;
      ctx.fillText(it.delta, x + 40, y + 232);
    }
  });

  // streak pill
  const py = startY + 2 * (cardH + gap) + 10;
  ctx.fillStyle = 'rgba(255,255,255,0.18)';
  roundRect(ctx, 80, py, W - 160, 150, 75);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = `800 72px ${FONT}`;
  ctx.fillText(`🔥 ${data.streak}`, 130, py + 98);
  ctx.font = `700 38px ${FONT}`;
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.fillText(data.streakLabel, 360, py + 96);

  // footer
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.font = `700 36px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.fillText(data.footer, W / 2, H - 70);

  return new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Could not draw the picture'))), 'image/png');
  });
}

/** Share the picture (phone share sheet) or download it. Returns 'shared' | 'downloaded' | 'cancelled'. */
export async function shareReportImage(blob, { fileName = 'vocabry-weekly.png', title = '', text = '' } = {}) {
  const file = new File([blob], fileName, { type: 'image/png' });
  try {
    if (navigator.canShare && navigator.canShare({ files: [file] }) && navigator.share) {
      await navigator.share({ files: [file], title, text });
      return 'shared';
    }
  } catch (e) {
    if (e && e.name === 'AbortError') return 'cancelled';
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
  return 'downloaded';
}
