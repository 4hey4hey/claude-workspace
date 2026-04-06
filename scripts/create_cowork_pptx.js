const PptxGenJS = require('pptxgenjs');
const pres = new PptxGenJS();

// Constants
const JA = 'Meiryo';
const EN = 'Arial';
const PRIMARY = '004098';
const ACCENT = 'DC2626';
const BG_LIGHT = 'EEF3FA';
const BG_DARK = '003070';
const TEXT_DARK = '1A1A2E';
const TEXT_MID = '444466';
const WHITE = 'FFFFFF';
const BORDER_LIGHT = 'CADCFC';

// Use default LAYOUT_16x9 (10 x 5.625 inches) to match coordinate system
pres.title = 'Cowork機能 使い方ガイド';

// ─── Helper functions ──────────────────────────────────────────────────────

function addBottomBar(slide) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.56, w: 10.0 * 0.80, h: 0.065,
    fill: { color: PRIMARY }, line: { color: PRIMARY }
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 10.0 * 0.80, y: 5.56, w: 10.0 * 0.20, h: 0.065,
    fill: { color: ACCENT }, line: { color: ACCENT }
  });
}

function addHeader(slide, text) {
  slide.addText(text, {
    x: 0.4, y: 0.08, w: 9.2, h: 0.22,
    fontSize: 9, color: PRIMARY, fontFace: JA,
    bold: false, align: 'left', valign: 'middle', margin: 0
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0.34, w: 10, h: 0.01,
    fill: { color: BORDER_LIGHT }, line: { color: BORDER_LIGHT }
  });
}

function addSlideTitle(slide, title) {
  slide.addText(title, {
    x: 0.4, y: 0.42, w: 9.2, h: 0.65,
    fontSize: 22, bold: true, color: PRIMARY, fontFace: JA,
    valign: 'middle'
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 1.15, w: 10, h: 0.015,
    fill: { color: BORDER_LIGHT }, line: { color: BORDER_LIGHT }
  });
}

function addBadge(slide, label, x, y, color) {
  const c = color || PRIMARY;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: x, y: y, w: 0.7, h: 0.28,
    fill: { color: c }, line: { color: c },
    rectRadius: 0.03
  });
  slide.addText(label, {
    x: x, y: y, w: 0.7, h: 0.28,
    fontSize: 9, bold: true, color: WHITE, fontFace: JA,
    align: 'center', valign: 'middle', margin: 0
  });
}

function addNumberBadge(slide, num, x, y) {
  slide.addShape(pres.shapes.OVAL, {
    x: x, y: y, w: 0.32, h: 0.32,
    fill: { color: PRIMARY }, line: { color: PRIMARY }
  });
  slide.addText(String(num), {
    x: x, y: y, w: 0.32, h: 0.32,
    fontSize: 11, bold: true, color: WHITE, fontFace: EN,
    align: 'center', valign: 'middle', margin: 0
  });
}

// ─── Slide 1: Title ────────────────────────────────────────────────────────

const s1 = pres.addSlide();
s1.background = { color: WHITE };
addBottomBar(s1);


s1.addText('Claude Code', {
  x: 0.5, y: 1.2, w: 9, h: 0.5,
  fontSize: 16, color: TEXT_MID, fontFace: EN, bold: false
});
s1.addText('Cowork \u6a5f\u80fd', {
  x: 0.5, y: 1.7, w: 9, h: 1.0,
  fontSize: 48, bold: true, color: PRIMARY, fontFace: JA
});
s1.addText('\u4f7f\u3044\u65b9\u30ac\u30a4\u30c9', {
  x: 0.5, y: 2.65, w: 9, h: 0.65,
  fontSize: 32, bold: false, color: TEXT_MID, fontFace: JA
});
s1.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 3.4, w: 4, h: 0.015,
  fill: { color: ACCENT }, line: { color: ACCENT }
});
s1.addText('\u6982\u8981 / \u64cd\u4f5c\u65b9\u6cd5 / \u30e6\u30fc\u30b9\u30b1\u30fc\u30b9 / \u30d9\u30b9\u30c8\u30d7\u30e9\u30af\u30c6\u30a3\u30b9', {
  x: 0.5, y: 3.5, w: 9, h: 0.4,
  fontSize: 13, color: TEXT_MID, fontFace: JA
});
s1.addText('2026.03', {
  x: 0.5, y: 4.8, w: 3, h: 0.3,
  fontSize: 11, color: TEXT_MID, fontFace: EN
});

// ─── Slide 2: Agenda ───────────────────────────────────────────────────────

const s2 = pres.addSlide();
s2.background = { color: WHITE };
addBottomBar(s2);
addHeader(s2, 'Cowork \u4f7f\u3044\u65b9\u30ac\u30a4\u30c9');
addSlideTitle(s2, '\u30a2\u30b8\u30a7\u30f3\u30c0');

const agenda = [
  ['01', 'Cowork\u3068\u306f\uff1f', '\u6982\u8981\u30fb\u80cc\u666f\u30fb\u4f4d\u7f6e\u3065\u3051'],
  ['02', '\u4e3b\u306a\u4f7f\u3044\u65b9', '\u64cd\u4f5c\u30d5\u30ed\u30fc\u30fbDispatch\u6a5f\u80fd'],
  ['03', '\u30e6\u30fc\u30b9\u30b1\u30fc\u30b9', '\u6d3b\u7528\u30b7\u30fc\u30f3\u30fb\u5b9f\u4f8b'],
  ['04', '\u30d9\u30b9\u30c8\u30d7\u30e9\u30af\u30c6\u30a3\u30b9', '\u52b9\u679c\u7684\u306a\u4f7f\u3044\u65b9\u306e\u30dd\u30a4\u30f3\u30c8'],
  ['05', '\u6ce8\u610f\u70b9\u30fb\u5236\u9650\u4e8b\u9805', '\u30bb\u30ad\u30e5\u30ea\u30c6\u30a3\u30fb\u904b\u7528\u4e0a\u306e\u5236\u7d04'],
];

const startY = 1.35;
const cardH = 0.66;
const gap = 0.1;

agenda.forEach((item, i) => {
  const y = startY + i * (cardH + gap);
  s2.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: y, w: 9.2, h: cardH,
    fill: { color: BG_LIGHT }, line: { color: BORDER_LIGHT }
  });
  addNumberBadge(s2, item[0], 0.55, y + 0.17);
  s2.addText(item[1], {
    x: 1.05, y: y + 0.05, w: 3.5, h: 0.32,
    fontSize: 14, bold: true, color: PRIMARY, fontFace: JA,
    valign: 'middle'
  });
  s2.addText(item[2], {
    x: 1.05, y: y + 0.35, w: 8, h: 0.26,
    fontSize: 11, color: TEXT_MID, fontFace: JA,
    valign: 'top'
  });
  s2.addShape(pres.shapes.RECTANGLE, {
    x: 5.0, y: y + 0.15, w: 0.02, h: cardH - 0.3,
    fill: { color: BORDER_LIGHT }, line: { color: BORDER_LIGHT }
  });
});

// ─── Slide 3: What is Cowork ───────────────────────────────────────────────

const s3 = pres.addSlide();
s3.background = { color: WHITE };
addBottomBar(s3);
addHeader(s3, 'Cowork \u4f7f\u3044\u65b9\u30ac\u30a4\u30c9  |  01. Cowork\u3068\u306f\uff1f');
addSlideTitle(s3, 'Cowork\u3068\u306f\uff1f');

s3.addText('Claude Desktop\u306b\u7d71\u5408\u3055\u308c\u305f\u30a8\u30fc\u30b8\u30a7\u30f3\u30c8\u6a5f\u80fd\u3002\u30ed\u30fc\u30ab\u30eb\u30d5\u30a1\u30a4\u30eb\u3078\u306e\u76f4\u63a5\u30a2\u30af\u30bb\u30b9\u3068\u8907\u6570\u30b9\u30c6\u30c3\u30d7\u306e\u81ea\u52d5\u5b9f\u884c\u3092\u901a\u3058\u3066\u3001\u77e5\u8b58\u4f5c\u696d\u3092\u5927\u5e45\u306b\u52b9\u7387\u5316\u3057\u307e\u3059\u3002', {
  x: 0.4, y: 1.3, w: 9.2, h: 0.55,
  fontSize: 13, color: TEXT_DARK, fontFace: JA, wrap: true
});

const features = [
  { label: '\u81ea\u5f8b\u5b9f\u884c', desc: '\u30e6\u30fc\u30b6\u30fc\u304c\u6700\u7d42\u6210\u679c\u3092\u6307\u793a\u3059\u308b\u3068\u3001Claude\u304c\u8907\u6570\u30b9\u30c6\u30c3\u30d7\u3092\u81ea\u5f8b\u7684\u306b\u8a08\u753b\u30fb\u5b9f\u884c', color: PRIMARY },
  { label: '\u30ed\u30fc\u30ab\u30eb\u30a2\u30af\u30bb\u30b9', desc: '\u30ed\u30fc\u30ab\u30eb\u30d5\u30a1\u30a4\u30eb\u306b\u76f4\u63a5\u30a2\u30af\u30bb\u30b9\u3002\u624b\u52d5\u30a2\u30c3\u30d7\u30ed\u30fc\u30c9/\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u4e0d\u8981', color: '065A82' },
  { label: '\u5b89\u5168\u306a\u5b9f\u884c\u74b0\u5883', desc: '\u4eee\u60f3\u30de\u30b7\u30f3\u74b0\u5883\u3067\u30b3\u30fc\u30c9\u3092\u5b89\u5168\u306b\u5b9f\u884c\u3002\u30d5\u30a1\u30a4\u30eb\u64cd\u4f5c\u306f\u672c\u7269\u306e\u74b0\u5883\u3067\u52d5\u4f5c', color: '1C7293' },
  { label: '\u9577\u6642\u9593\u30bf\u30b9\u30af\u5bfe\u5fdc', desc: '\u30bf\u30a4\u30e0\u30a2\u30a6\u30c8\u5236\u9650\u306a\u3057\u3002\u4f1a\u8a71\u306e\u4e2d\u65b7\u306a\u304f\u8907\u96d1\u306a\u30bf\u30b9\u30af\u3092\u6700\u5f8c\u307e\u3067\u5b9f\u884c\u53ef\u80fd', color: '36454F' },
];

const colW = 4.5;
const rowH = 1.4;
const gridStartX = 0.4;
const gridY = 2.0;

features.forEach((f, i) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  const x = gridStartX + col * (colW + 0.2);
  const y = gridY + row * (rowH + 0.12);

  s3.addShape(pres.shapes.RECTANGLE, {
    x: x, y: y, w: colW, h: rowH,
    fill: { color: BG_LIGHT }, line: { color: BORDER_LIGHT }
  });
  s3.addShape(pres.shapes.RECTANGLE, {
    x: x, y: y, w: 0.05, h: rowH,
    fill: { color: f.color }, line: { color: f.color }
  });
  s3.addText(f.label, {
    x: x + 0.18, y: y + 0.12, w: colW - 0.3, h: 0.34,
    fontSize: 13, bold: true, color: f.color, fontFace: JA
  });
  s3.addText(f.desc, {
    x: x + 0.18, y: y + 0.46, w: colW - 0.3, h: 0.8,
    fontSize: 11, color: TEXT_DARK, fontFace: JA, wrap: true
  });
});

// ─── Slide 4: Cowork vs Claude Code ───────────────────────────────────────

const s4 = pres.addSlide();
s4.background = { color: WHITE };
addBottomBar(s4);
addHeader(s4, 'Cowork \u4f7f\u3044\u65b9\u30ac\u30a4\u30c9  |  01. Cowork\u3068\u306f\uff1f');
addSlideTitle(s4, 'Cowork vs Claude Code\uff08CLI\uff09');

const rows = [
  ['\u6bd4\u8f03\u9805\u76ee', 'Cowork', 'Claude Code\uff08CLI\uff09'],
  ['\u30a4\u30f3\u30bf\u30fc\u30d5\u30a7\u30fc\u30b9', 'Claude Desktop \u30a2\u30d7\u30ea', '\u30bf\u30fc\u30df\u30ca\u30eb / IDE'],
  ['\u30bb\u30c3\u30c8\u30a2\u30c3\u30d7', '\u4e0d\u8981\uff08\u5373\u5ea7\u306b\u5229\u7528\u53ef\uff09', '\u30a4\u30f3\u30b9\u30c8\u30fc\u30eb\u30fb\u8a2d\u5b9a\u304c\u5fc5\u8981'],
  ['\u521d\u5fc3\u8005\u5411\u3051', '\u63a8\u5968', '\u6bb5\u968e\u7684\u306b\u79fb\u884c'],
  ['\u30ea\u30a2\u30eb\u30bf\u30a4\u30e0\u5236\u5fa1', '\u9650\u5b9a\u7684', '\u5b9f\u884c\u4e2d\u306b\u4e2d\u65ad\u30fb\u30ea\u30c0\u30a4\u30ec\u30af\u30c8\u53ef\u80fd'],
  ['\u30c8\u30fc\u30af\u30f3\u52b9\u7387', '\u30b9\u30af\u30ea\u30fc\u30f3\u30b7\u30e7\u30c3\u30c8\u51e6\u7406\u3067\u6d88\u8cbb\u591a\u3081', '\u52b9\u7387\u7684'],
  ['\u5927\u898f\u6a21\u81ea\u52d5\u5316', '\u5b89\u5b9a\u6027\u306b\u8ab2\u984c\u3042\u308a', '\u672c\u756a\u74b0\u5883\u30fb\u30d1\u30a4\u30d7\u30e9\u30a4\u30f3\u306b\u9069\u5408'],
];

const tableY = 1.3;
const tableH = 3.8;
const rH = tableH / rows.length;
const colWidths = [2.6, 3.3, 3.3];
const colXs = [0.4, 3.0, 6.3];

rows.forEach((row, ri) => {
  const ry = tableY + ri * rH;
  const isHeader = ri === 0;

  row.forEach((cell, ci) => {
    const bg = isHeader ? PRIMARY : (ri % 2 === 0 ? WHITE : BG_LIGHT);
    const textColor = isHeader ? WHITE : TEXT_DARK;
    const bold = isHeader || ci === 0;

    s4.addShape(pres.shapes.RECTANGLE, {
      x: colXs[ci], y: ry, w: colWidths[ci], h: rH,
      fill: { color: bg }, line: { color: BORDER_LIGHT }
    });
    s4.addText(cell, {
      x: colXs[ci] + 0.1, y: ry, w: colWidths[ci] - 0.15, h: rH,
      fontSize: ci === 0 && !isHeader ? 11 : 12,
      bold: bold, color: textColor, fontFace: JA,
      valign: 'middle', wrap: true
    });
  });
});

s4.addText('使い分けポイント: セットアップ不要で素早く始めたい場合はCowork、本番自動化やコスト最適化にはCLIを選択', {
  x: 0.4, y: 5.12, w: 9.2, h: 0.25,
  fontSize: 10, color: TEXT_MID, fontFace: JA, italic: true
});

// ─── Slide 5: How to use ───────────────────────────────────────────────────

const s5 = pres.addSlide();
s5.background = { color: WHITE };
addBottomBar(s5);
addHeader(s5, 'Cowork \u4f7f\u3044\u65b9\u30ac\u30a4\u30c9  |  02. \u4e3b\u306a\u4f7f\u3044\u65b9');
addSlideTitle(s5, '\u57fa\u672c\u7684\u306a\u64cd\u4f5c\u30d5\u30ed\u30fc');

const steps = [
  { num: '1', title: 'Cowork\u3092\u958b\u304f', desc: 'Claude Desktop\u306e\u5de6\u30d1\u30cd\u30eb\u304b\u3089\u300cCowork\u300d\u30bf\u30d6\u3092\u30af\u30ea\u30c3\u30af' },
  { num: '2', title: '\u76ee\u6a19\u3092\u6307\u793a\u3059\u308b', desc: '\u300c\u6700\u7d42\u6210\u679c\u300d\u300c\u51fa\u529b\u5f62\u5f0f\u300d\u300c\u4f5c\u696d\u7bc4\u56f2\u300d\u3092\u81ea\u7136\u8a00\u8a9e\u3067\u5177\u4f53\u7684\u306b\u8a18\u8ff0' },
  { num: '3', title: '\u8a08\u753b\u3092\u78ba\u8a8d\u3059\u308b', desc: 'Claude\u304c\u5b9f\u884c\u8a08\u753b\u3092\u63d0\u793a\u3002\u5185\u5bb9\u3092\u78ba\u8a8d\u3057\u3066\u627f\u8a8d\u3059\u308b' },
  { num: '4', title: '\u81ea\u52d5\u5b9f\u884c', desc: '\u8907\u6570\u30b9\u30c6\u30c3\u30d7\u3092\u81ea\u52d5\u5b9f\u884c\u3002\u30ed\u30fc\u30ab\u30eb\u30d5\u30a1\u30a4\u30eb\u306b\u76f4\u63a5\u30a2\u30af\u30bb\u30b9\u3057\u3066\u51e6\u7406' },
  { num: '5', title: '\u7d50\u679c\u3092\u78ba\u8a8d\u3059\u308b', desc: '\u30d5\u30a1\u30a4\u30eb\u30b7\u30b9\u30c6\u30e0\u3078\u306e\u51fa\u529b\u3092\u78ba\u8a8d\u3002\u5fc5\u8981\u306b\u5fdc\u3058\u3066\u8ffd\u52a0\u6307\u793a' },
];

const stepY = 1.32;
const stepH = 0.68;
const stepGap = 0.1;

steps.forEach((step, i) => {
  const y = stepY + i * (stepH + stepGap);

  s5.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: y, w: 9.2, h: stepH,
    fill: { color: BG_LIGHT }, line: { color: BORDER_LIGHT }
  });
  addNumberBadge(s5, step.num, 0.6, y + (stepH - 0.32) / 2);
  s5.addShape(pres.shapes.RECTANGLE, {
    x: 1.1, y: y, w: 0.01, h: stepH,
    fill: { color: BORDER_LIGHT }, line: { color: BORDER_LIGHT }
  });
  s5.addText(step.title, {
    x: 1.25, y: y + 0.05, w: 2.8, h: 0.32,
    fontSize: 13, bold: true, color: PRIMARY, fontFace: JA, valign: 'middle'
  });
  s5.addText(step.desc, {
    x: 1.25, y: y + 0.35, w: 8.1, h: 0.3,
    fontSize: 11, color: TEXT_DARK, fontFace: JA, valign: 'top'
  });
});

// ─── Slide 6: Dispatch ────────────────────────────────────────────────────

const s6 = pres.addSlide();
s6.background = { color: WHITE };
addBottomBar(s6);
addHeader(s6, 'Cowork \u4f7f\u3044\u65b9\u30ac\u30a4\u30c9  |  02. \u4e3b\u306a\u4f7f\u3044\u65b9');
addSlideTitle(s6, 'Dispatch\u6a5f\u80fd - \u30ea\u30e2\u30fc\u30c8\u30bf\u30b9\u30af\u7ba1\u7406');

s6.addText('Dispatch\u3092\u4f7f\u3046\u3068\u3001\u30b9\u30de\u30fc\u30c8\u30d5\u30a9\u30f3\u306a\u3069\u5916\u51fa\u5148\u304b\u3089\u30c7\u30b9\u30af\u30c8\u30c3\u30d7\u306eCowork\u306b\u30bf\u30b9\u30af\u3092\u5272\u308a\u5f53\u3066\u30fb\u7ba1\u7406\u3067\u304d\u307e\u3059\u3002', {
  x: 0.4, y: 1.3, w: 9.2, h: 0.45,
  fontSize: 12, color: TEXT_DARK, fontFace: JA, wrap: true
});

s6.addText('\u30bb\u30c3\u30c8\u30a2\u30c3\u30d7\u624b\u9806', {
  x: 0.4, y: 1.82, w: 4.5, h: 0.32,
  fontSize: 14, bold: true, color: PRIMARY, fontFace: JA
});

const setupSteps = [
  'Claude Desktop\u3092\u6700\u65b0\u7248\u306b\u66f4\u65b0',
  '\u30e2\u30d0\u30a4\u30eb\u30a2\u30d7\u30ea\u3082\u6700\u65b0\u7248\u306b\u66f4\u65b0',
  'Cowork\u753b\u9762\u306e\u5de6\u30d1\u30cd\u30eb\u300cDispatch\u300d\u3092\u30af\u30ea\u30c3\u30af',
  '\u300cGet started\u300d\u30dc\u30bf\u30f3\u3092\u9078\u629e',
  '\u30d5\u30a1\u30a4\u30eb\u30a2\u30af\u30bb\u30b9\u8a31\u53ef\u30fb\u30b9\u30ea\u30fc\u30d7\u9632\u6b62\u8a2d\u5b9a\u3092\u30aa\u30f3',
  '\u300cFinish setup\u300d\u3092\u30af\u30ea\u30c3\u30af\u3057\u3066\u5b8c\u4e86',
];

setupSteps.forEach((s, i) => {
  const y = 2.2 + i * 0.42;
  addNumberBadge(s6, i + 1, 0.4, y + 0.04);
  s6.addText(s, {
    x: 0.85, y: y, w: 3.9, h: 0.38,
    fontSize: 11, color: TEXT_DARK, fontFace: JA, valign: 'middle'
  });
});

s6.addShape(pres.shapes.RECTANGLE, {
  x: 5.1, y: 1.82, w: 4.5, h: 3.2,
  fill: { color: 'FFF5F5' }, line: { color: ACCENT }
});
s6.addShape(pres.shapes.RECTANGLE, {
  x: 5.1, y: 1.82, w: 4.5, h: 0.38,
  fill: { color: ACCENT }, line: { color: ACCENT }
});
s6.addText('Dispatch \u5236\u9650\u4e8b\u9805', {
  x: 5.2, y: 1.82, w: 4.2, h: 0.38,
  fontSize: 12, bold: true, color: WHITE, fontFace: JA, valign: 'middle'
});

const limits = [
  '\u30c7\u30b9\u30af\u30c8\u30c3\u30d7\u304c\u8d77\u52d5\u72b6\u614b\u3067\u3042\u308b\u5fc5\u8981\u3042\u308a',
  'Claude\u306f\u53d7\u4fe1\u30e1\u30c3\u30bb\u30fc\u30b8\u306b\u5fdc\u7b54\u306e\u307f\uff08\u4e3b\u52d5\u7684\u9023\u7d61\u306a\u3057\uff09',
  '\u5358\u4e00\u30b9\u30ec\u30c3\u30c9\u69cb\u9020\uff08\u8907\u6570\u30bf\u30b9\u30af\u306e\u540c\u6642\u7ba1\u7406\u4e0d\u53ef\uff09',
  '\u30bf\u30b9\u30af\u5b8c\u4e86\u6642\u306e\u81ea\u52d5\u901a\u77e5\u306a\u3057\uff08\u624b\u52d5\u78ba\u8a8d\u304c\u5fc5\u8981\uff09',
];
limits.forEach((lim, i) => {
  const y = 2.32 + i * 0.6;
  s6.addShape(pres.shapes.RECTANGLE, {
    x: 5.25, y: y + 0.12, w: 0.1, h: 0.1,
    fill: { color: ACCENT }, line: { color: ACCENT }
  });
  s6.addText(lim, {
    x: 5.45, y: y, w: 4.0, h: 0.55,
    fontSize: 11, color: TEXT_DARK, fontFace: JA, wrap: true, valign: 'middle'
  });
});

// ─── Slide 7: Use cases ───────────────────────────────────────────────────

const s7 = pres.addSlide();
s7.background = { color: WHITE };
addBottomBar(s7);
addHeader(s7, 'Cowork \u4f7f\u3044\u65b9\u30ac\u30a4\u30c9  |  03. \u30e6\u30fc\u30b9\u30b1\u30fc\u30b9');
addSlideTitle(s7, '\u30e6\u30fc\u30b9\u30b1\u30fc\u30b9\u30fb\u6d3b\u7528\u4f8b');

const usecases = [
  { cat: '\u30d5\u30a1\u30a4\u30eb\u7ba1\u7406', color: PRIMARY, items: ['\u30d5\u30a9\u30eb\u30c0\u5185\u306e\u5927\u91cf\u30d5\u30a1\u30a4\u30eb\u3092\u7a2e\u985e\u30fb\u65e5\u4ed8\u3067\u81ea\u52d5\u5206\u985e', '\u8907\u6570\u30d5\u30a9\u30eb\u30c0\u3092\u307e\u305f\u3044\u3060\u30c7\u30fc\u30bf\u7d71\u5408\u30fb\u91cd\u8907\u524a\u9664'] },
  { cat: '\u30ec\u30dd\u30fc\u30c8\u4f5c\u6210', color: '065A82', items: ['\u30a6\u30a7\u30d6\u30fbPDF\u30fb\u30e1\u30e2\u3092\u7d71\u5408\u3057\u305f\u7dcf\u5408\u5831\u544a\u66f8\u306e\u81ea\u52d5\u4f5c\u6210', '\u5e02\u5834\u8abf\u67fb\u30fb\u7af6\u5408\u5206\u6790\u30fb\u30c8\u30ec\u30f3\u30c9\u5206\u6790'] },
  { cat: '\u30c7\u30fc\u30bf\u51e6\u7406', color: '1C7293', items: ['CSV/Excel\u30c7\u30fc\u30bf\u306e\u5909\u63db\u30fb\u30af\u30ea\u30fc\u30cb\u30f3\u30b0\u30fb\u96c6\u8a08', '\u7d71\u8a08\u5206\u6790\u30fb\u30b0\u30e9\u30d5/\u30c1\u30e3\u30fc\u30c8\u751f\u6210'] },
  { cat: '\u30c9\u30ad\u30e5\u30e1\u30f3\u30c8\u751f\u6210', color: '36454F', items: ['Excel\u30b9\u30d7\u30ec\u30c3\u30c9\u30b7\u30fc\u30c8\uff08\u52d5\u4f5c\u3059\u308b\u6570\u5f0f\u4ed8\u304d\uff09', 'PowerPoint\u30fbWord\u30fbPDF\u306e\u81ea\u52d5\u751f\u6210'] },
];

const ucCardW = 4.5;
const ucCardH = 1.6;
const ucGap = 0.18;
const ucStartY = 1.35;

usecases.forEach((uc, i) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  const x = 0.4 + col * (ucCardW + ucGap);
  const y = ucStartY + row * (ucCardH + ucGap);

  s7.addShape(pres.shapes.RECTANGLE, {
    x: x, y: y, w: ucCardW, h: ucCardH,
    fill: { color: BG_LIGHT }, line: { color: BORDER_LIGHT }
  });
  s7.addShape(pres.shapes.RECTANGLE, {
    x: x, y: y, w: ucCardW, h: 0.38,
    fill: { color: uc.color }, line: { color: uc.color }
  });
  s7.addText(uc.cat, {
    x: x + 0.12, y: y, w: ucCardW - 0.2, h: 0.38,
    fontSize: 13, bold: true, color: WHITE, fontFace: JA, valign: 'middle'
  });

  uc.items.forEach((item, ii) => {
    const iy = y + 0.46 + ii * 0.5;
    s7.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.18, y: iy + 0.1, w: 0.08, h: 0.08,
      fill: { color: uc.color }, line: { color: uc.color }
    });
    s7.addText(item, {
      x: x + 0.35, y: iy, w: ucCardW - 0.5, h: 0.46,
      fontSize: 11, color: TEXT_DARK, fontFace: JA, wrap: true, valign: 'middle'
    });
  });
});

// ─── Slide 8: Best Practices ──────────────────────────────────────────────

const s8 = pres.addSlide();
s8.background = { color: WHITE };
addBottomBar(s8);
addHeader(s8, 'Cowork \u4f7f\u3044\u65b9\u30ac\u30a4\u30c9  |  04. \u30d9\u30b9\u30c8\u30d7\u30e9\u30af\u30c6\u30a3\u30b9');
addSlideTitle(s8, '\u30d9\u30b9\u30c8\u30d7\u30e9\u30af\u30c6\u30a3\u30b9');

const bps = [
  { num: '1', title: '\u660e\u78ba\u306a\u6307\u793a\u3092\u5fc3\u304c\u3051\u308b', desc: '\u300c\u6700\u7d42\u6210\u679c\u300d\u300c\u51fa\u529b\u5f62\u5f0f\u300d\u300c\u4f5c\u696d\u7bc4\u56f2\u300d\u3092\u5177\u4f53\u7684\u306b\u8a18\u8ff0\u3059\u308b\u3002\u66d6\u6627\u306a\u6307\u793a\u306f\u610f\u56f3\u3057\u306a\u3044\u7d50\u679c\u3092\u62db\u304f\u3002' },
  { num: '2', title: '\u30bf\u30b9\u30af\u3092\u5c0f\u5206\u3051\u306b\u3059\u308b', desc: '\u8907\u96d1\u306a\u30bf\u30b9\u30af\u306f\u6bb5\u968e\u7684\u306b\u5206\u5272\u3057\u3066\u5b9f\u884c\u3002\u4e00\u5ea6\u306b\u5927\u304d\u3059\u304e\u308b\u30bf\u30b9\u30af\u306f\u5b89\u5b9a\u6027\u304c\u4f4e\u4e0b\u3059\u308b\u3002' },
  { num: '3', title: '\u51fa\u529b\u7d50\u679c\u3092\u5fc5\u305a\u78ba\u8a8d\u3059\u308b', desc: '\u30c7\u30fc\u30bf\u51e6\u7406\u30fb\u524a\u9664\u3092\u542b\u3080\u5834\u5408\u306f\u7279\u306b\u6ce8\u610f\u3002\u60f3\u5b9a\u901a\u308a\u306e\u7d50\u679c\u304b\u78ba\u8a8d\u3057\u3066\u304b\u3089\u6b21\u306e\u30b9\u30c6\u30c3\u30d7\u3078\u3002' },
  { num: '4', title: '\u6a5f\u5bc6\u6027\u306e\u4f4e\u3044\u30bf\u30b9\u30af\u304b\u3089\u59cb\u3081\u308b', desc: '\u65b0\u6a5f\u80fd\u306f\u307e\u305a\u8efd\u5fae\u306a\u30bf\u30b9\u30af\u3067\u8a66\u3059\u3002\u7814\u7a76\u30d7\u30ec\u30d3\u30e5\u30fc\u6bb5\u968e\u306e\u305f\u3081\u4ed5\u69d8\u5909\u66f4\u306e\u53ef\u80fd\u6027\u304c\u3042\u308b\u3002' },
];

const bpY = 1.35;
const bpH = 0.88;
const bpGap = 0.12;

bps.forEach((bp, i) => {
  const y = bpY + i * (bpH + bpGap);

  s8.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: y, w: 9.2, h: bpH,
    fill: { color: BG_LIGHT }, line: { color: BORDER_LIGHT }
  });
  s8.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: y, w: 0.05, h: bpH,
    fill: { color: PRIMARY }, line: { color: PRIMARY }
  });
  addNumberBadge(s8, bp.num, 0.58, y + 0.28);
  s8.addText(bp.title, {
    x: 1.05, y: y + 0.08, w: 8.2, h: 0.34,
    fontSize: 13, bold: true, color: PRIMARY, fontFace: JA, valign: 'middle'
  });
  s8.addText(bp.desc, {
    x: 1.05, y: y + 0.45, w: 8.2, h: 0.4,
    fontSize: 11, color: TEXT_DARK, fontFace: JA, wrap: true, valign: 'top'
  });
});

// ─── Slide 9: Cautions ────────────────────────────────────────────────────

const s9 = pres.addSlide();
s9.background = { color: WHITE };
addBottomBar(s9);
addHeader(s9, 'Cowork \u4f7f\u3044\u65b9\u30ac\u30a4\u30c9  |  05. \u6ce8\u610f\u70b9\u30fb\u5236\u9650\u4e8b\u9805');
addSlideTitle(s9, '\u6ce8\u610f\u70b9\u30fb\u5236\u9650\u4e8b\u9805');

s9.addShape(pres.shapes.RECTANGLE, {
  x: 0.4, y: 1.32, w: 4.5, h: 1.85,
  fill: { color: 'FFF5F5' }, line: { color: ACCENT }
});
s9.addShape(pres.shapes.RECTANGLE, {
  x: 0.4, y: 1.32, w: 4.5, h: 0.38,
  fill: { color: ACCENT }, line: { color: ACCENT }
});
s9.addText('\u30bb\u30ad\u30e5\u30ea\u30c6\u30a3\u4e0a\u306e\u6ce8\u610f', {
  x: 0.5, y: 1.32, w: 4.2, h: 0.38,
  fontSize: 12, bold: true, color: WHITE, fontFace: JA, valign: 'middle'
});

const secItems = [
  '\u4f1a\u8a71\u5c65\u6b74\u306f\u30ed\u30fc\u30ab\u30eb\u4fdd\u5b58\uff08Anthropic\u306e\u4fdd\u6301\u671f\u9593\u30eb\u30fc\u30eb\u5916\uff09',
  '\u76e3\u67fb\u30ed\u30b0/Compliance API \u672a\u5bfe\u5fdc',
  'Claude\u304c\u8aa4\u3063\u3066\u30d5\u30a1\u30a4\u30eb\u524a\u9664\u3059\u308b\u53ef\u80fd\u6027\u3042\u308a',
  '\u6a5f\u5bc6\u60c5\u5831\u306e\u5171\u6709\u306f\u907f\u3051\u308b\u3053\u3068',
];
secItems.forEach((s, i) => {
  const y = 1.82 + i * 0.33;
  s9.addShape(pres.shapes.RECTANGLE, {
    x: 0.55, y: y + 0.11, w: 0.1, h: 0.1,
    fill: { color: ACCENT }, line: { color: ACCENT }
  });
  s9.addText(s, {
    x: 0.75, y: y, w: 4.0, h: 0.32,
    fontSize: 10, color: TEXT_DARK, fontFace: JA, valign: 'middle'
  });
});

s9.addShape(pres.shapes.RECTANGLE, {
  x: 5.1, y: 1.32, w: 4.5, h: 1.85,
  fill: { color: BG_LIGHT }, line: { color: BORDER_LIGHT }
});
s9.addShape(pres.shapes.RECTANGLE, {
  x: 5.1, y: 1.32, w: 4.5, h: 0.38,
  fill: { color: PRIMARY }, line: { color: PRIMARY }
});
s9.addText('\u6a5f\u80fd\u30fb\u904b\u7528\u9762\u306e\u5236\u9650', {
  x: 5.2, y: 1.32, w: 4.2, h: 0.38,
  fontSize: 12, bold: true, color: WHITE, fontFace: JA, valign: 'middle'
});

const funcItems = [
  'macOS/Windows\u7248Desktop\u306e\u307f\uff08Web/\u30e2\u30d0\u30a4\u30eb\u672a\u5bfe\u5fdc\uff09',
  'Pro\u30fbMax\u30fbTeam\u30fbEnterprise\u30d7\u30e9\u30f3\u306e\u307f\u5229\u7528\u53ef',
  '\u5358\u4e00\u30b9\u30ec\u30c3\u30c9\u69cb\u9020\uff08\u8907\u6570\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u540c\u6642\u7ba1\u7406\u4e0d\u53ef\uff09',
  '\u7814\u7a76\u30d7\u30ec\u30d3\u30e5\u30fc\u6bb5\u968e\uff08\u4ed5\u69d8\u5909\u66f4\u30fb\u7d42\u4e86\u306e\u53ef\u80fd\u6027\u3042\u308a\uff09',
];
funcItems.forEach((f, i) => {
  const y = 1.82 + i * 0.33;
  s9.addShape(pres.shapes.RECTANGLE, {
    x: 5.25, y: y + 0.11, w: 0.1, h: 0.1,
    fill: { color: PRIMARY }, line: { color: PRIMARY }
  });
  s9.addText(f, {
    x: 5.45, y: y, w: 4.0, h: 0.32,
    fontSize: 10, color: TEXT_DARK, fontFace: JA, valign: 'middle'
  });
});

s9.addShape(pres.shapes.RECTANGLE, {
  x: 0.4, y: 3.32, w: 9.2, h: 1.7,
  fill: { color: 'EEF3FA' }, line: { color: BORDER_LIGHT }
});
s9.addText('Claude Code\uff08CLI\uff09\u306b\u79fb\u884c\u3059\u3079\u304d\u30b1\u30fc\u30b9', {
  x: 0.6, y: 3.42, w: 8.8, h: 0.34,
  fontSize: 13, bold: true, color: PRIMARY, fontFace: JA
});

const cliCases = [
  '\u30c8\u30fc\u30af\u30f3\u6d88\u8cbb\u3092\u6700\u9069\u5316\u3057\u305f\u3044\u5834\u5408',
  '\u5b9f\u884c\u4e2d\u306e\u30ea\u30a2\u30eb\u30bf\u30a4\u30e0\u5236\u5fa1\u304c\u5fc5\u9808\u306a\u5834\u5408',
  'Slack\u30fb\u30b9\u30b1\u30b8\u30e5\u30fc\u30eb\u9023\u643a\u306a\u3069\u306e\u5b8c\u5168\u81ea\u52d5\u5316\u30d1\u30a4\u30d7\u30e9\u30a4\u30f3',
  '\u672c\u756a\u74b0\u5883\u3067\u306e\u5b89\u5b9a\u6027\u91cd\u8996\u30fb\u5927\u898f\u6a21\u30bf\u30b9\u30af\u51e6\u7406',
];
const cliCols = [
  [cliCases[0], cliCases[1]],
  [cliCases[2], cliCases[3]],
];
cliCols.forEach((col, ci) => {
  col.forEach((item, ri) => {
    const cx = 0.6 + ci * 4.6;
    const cy = 3.85 + ri * 0.44;
    s9.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy + 0.12, w: 0.1, h: 0.1,
      fill: { color: '065A82' }, line: { color: '065A82' }
    });
    s9.addText(item, {
      x: cx + 0.18, y: cy, w: 4.2, h: 0.4,
      fontSize: 11, color: TEXT_DARK, fontFace: JA, valign: 'middle'
    });
  });
});

// ─── Slide 10: Summary ────────────────────────────────────────────────────

const s10 = pres.addSlide();
s10.background = { color: WHITE };
addBottomBar(s10);


s10.addText('\u307e\u3068\u3081', {
  x: 0.5, y: 0.5, w: 9, h: 0.5,
  fontSize: 28, bold: true, color: PRIMARY, fontFace: JA
});
s10.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 1.1, w: 3.5, h: 0.015,
  fill: { color: ACCENT }, line: { color: ACCENT }
});

const summaryItems = [
  { label: 'Cowork\u3068\u306f', text: 'Claude Desktop\u306e\u30a8\u30fc\u30b8\u30a7\u30f3\u30c8\u6a5f\u80fd\u3002\u30bb\u30c3\u30c8\u30a2\u30c3\u30d7\u4e0d\u8981\u3067\u30ed\u30fc\u30ab\u30eb\u30d5\u30a1\u30a4\u30eb\u306b\u76f4\u63a5\u30a2\u30af\u30bb\u30b9\u3057\u3001\u8907\u6570\u30b9\u30c6\u30c3\u30d7\u3092\u81ea\u5f8b\u5b9f\u884c' },
  { label: '\u4e3b\u306a\u4f7f\u3044\u65b9', text: '\u76ee\u6a19\u3092\u81ea\u7136\u8a00\u8a9e\u3067\u6307\u793a\u2192\u8a08\u753b\u78ba\u8a8d\u2192\u81ea\u52d5\u5b9f\u884c\u3002Dispatch\u6a5f\u80fd\u3067\u30e2\u30d0\u30a4\u30eb\u304b\u3089\u306e\u30ea\u30e2\u30fc\u30c8\u7ba1\u7406\u3082\u53ef\u80fd' },
  { label: '\u6d3b\u7528\u5834\u9762', text: '\u30d5\u30a1\u30a4\u30eb\u6574\u7406\u30fb\u30ec\u30dd\u30fc\u30c8\u4f5c\u6210\u30fb\u30c7\u30fc\u30bf\u51e6\u7406\u30fb\u30c9\u30ad\u30e5\u30e1\u30f3\u30c8\u751f\u6210\u306a\u3069\u3001\u5e45\u5e83\u3044\u77e5\u8b58\u4f5c\u696d\u306b\u5bfe\u5fdc' },
  { label: '\u4f7f\u3044\u5206\u3051', text: '\u7d20\u65e9\u304f\u59cb\u3081\u305f\u3044\u30fbUI\u30d9\u30fc\u30b9\u4f5c\u696d\u306fCowork\u3001\u672c\u756a\u81ea\u52d5\u5316\u30fb\u30b3\u30b9\u30c8\u6700\u9069\u5316\u30fb\u7d30\u304b\u3044\u5236\u5fa1\u306fCLI\u3092\u9078\u629e' },
];

summaryItems.forEach((item, i) => {
  const y = 1.25 + i * 0.9;
  s10.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: y, w: 1.5, h: 0.72,
    fill: { color: PRIMARY }, line: { color: BORDER_LIGHT }
  });
  s10.addText(item.label, {
    x: 0.5, y: y, w: 1.5, h: 0.72,
    fontSize: 11, bold: true, color: WHITE, fontFace: JA,
    align: 'center', valign: 'middle'
  });
  s10.addShape(pres.shapes.RECTANGLE, {
    x: 2.1, y: y, w: 7.4, h: 0.72,
    fill: { color: BG_LIGHT }, line: { color: BORDER_LIGHT }
  });
  s10.addText(item.text, {
    x: 2.25, y: y, w: 7.15, h: 0.72,
    fontSize: 12, color: TEXT_DARK, fontFace: JA,
    valign: 'middle', wrap: true
  });
});

// ─── Save ─────────────────────────────────────────────────────────────────

const outPath = 'outputs/pptx/cowork_guide.pptx';
pres.writeFile({ fileName: outPath })
  .then(() => console.log('Saved: ' + outPath))
  .catch(e => console.error(e));
