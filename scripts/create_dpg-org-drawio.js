const path = require('path');
const PptxGenJS = require(path.join(__dirname, '../node_modules/pptxgenjs'));
const { getTheme, getFontPreset, parts } = require('./lib');

const ROOT = path.join(__dirname, '..');
const OUT  = path.join(ROOT, 'outputs/pptx/dpg-org.pptx');
const IMG  = path.join(ROOT, 'assets/diagrams/dpg-org-drawio.png');

// PNG実サイズ: 889×409px → ratio 2.1736
// PPTX: y=1.25〜5.45(高さ4.20インチ最大) → w=9.13, h=4.20 でアスペクト比保持
const IMG_W = 9.13;
const IMG_H = 4.20;
const IMG_X = (10 - IMG_W) / 2;  // 水平中央

async function main() {
  const pres  = new PptxGenJS();
  const theme = getTheme('corporate');
  const font  = getFontPreset('corporate');

  const slide = pres.addSlide();
  slide.background = { color: 'FFFFFF' };

  parts.addBottomBar(slide, pres, theme);
  parts.addHeader(slide, pres, theme, { breadcrumb: '組織体制', font });
  parts.addSlideTitle(slide, pres, theme, {
    title: 'デジタルプラットフォームＧ 組織体制（2026/4/1現在）',
    font,
  });

  slide.addImage({ path: IMG, x: IMG_X, y: 1.25, w: IMG_W, h: IMG_H });

  await pres.writeFile({ fileName: OUT });
  console.log('OK:', OUT);
}

main().catch(e => { console.error(e.message); process.exit(1); });
