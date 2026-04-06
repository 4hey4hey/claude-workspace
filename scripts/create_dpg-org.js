// デジタルプラットフォームＧ 体制図 スライド生成
const path = require('path');
const PptxGenJS = require(path.join(__dirname, '../node_modules/pptxgenjs'));
const { getTheme, getFontPreset, parts } = require('./lib');

const ROOT = path.join(__dirname, '..');
const OUT  = path.join(ROOT, 'outputs/pptx/dpg-org.pptx');
const IMG  = path.join(ROOT, 'assets/diagrams/dpg-org.png');

async function main() {
  const pres  = new PptxGenJS();
  const theme = getTheme('corporate');
  const font  = getFontPreset('corporate');

  // ── スライド: デジタルプラットフォームＧ 体制図 ──
  const slide = pres.addSlide();
  slide.background = { color: 'FFFFFF' };

  parts.addBottomBar(slide, pres, theme);
  parts.addHeader(slide, pres, theme, { breadcrumb: '組織体制', font });
  parts.addSlideTitle(slide, pres, theme, {
    title: 'デジタルプラットフォームＧ 組織体制（2026/4/1現在）',
    font,
  });

  parts.addDiagramImage(slide, pres, theme, {
    path: IMG,
    x: 0.4,
    y: 1.25,
    w: 9.2,
    h: 4.0,
    caption: '※デリバリーマネジメントT（赤）が杉﨑チーム。SWEチームは企画部兼務。',
  });

  await pres.writeFile({ fileName: OUT });
  console.log('OK:', OUT);
}

main().catch(e => { console.error(e.message); process.exit(1); });
