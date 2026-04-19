const PptxGenJS = require("pptxgenjs");
const { getTheme, getFontPreset, parts } = require("./lib");

const theme = getTheme("corporate");
const font = getFontPreset("corporate");
const pres = new PptxGenJS();
pres.title = "KR② 位置づけスライド";

const slide = pres.addSlide();
slide.background = { color: "FFFFFF" };

parts.addBottomBar(slide, pres, theme);
parts.addHeader(slide, pres, theme, { breadcrumb: "挑戦KR② ＞ 本日の話の置き場所", font });
parts.addSlideTitle(slide, pres, theme, {
  title: "KR②は組織能力指標。KR①の達成確度を高める早期予測装置",
  font,
});

// === 左カラム: KR①／KR②の対比 ===
const leftX = 0.4;
const leftW = 5.0;

parts.addCard(slide, pres, theme, {
  x: leftX, y: 1.3, w: leftW, h: 1.4,
  accentColor: theme.ACCENTS[0],
  title: "KR① 会員数・契約数",
  body: "アウトカム指標／遅行(年度末まで結果が見えない)",
  font,
});

// 矢印（KR②→KR①ということで上向きに、KR②カードの上に描画）
slide.addText("↑ 達成確度を高める", {
  x: leftX, y: 2.8, w: leftW, h: 0.4,
  fontSize: 13, bold: true, color: theme.A, fontFace: font.jp,
  align: "center", valign: "middle", margin: 0,
});

parts.addCard(slide, pres, theme, {
  x: leftX, y: 3.3, w: leftW, h: 1.4,
  accentColor: theme.ACCENTS[1],
  title: "KR② 開発組織の組織能力",
  body: "ケイパビリティ指標／先行(早期予測・原因分析)",
  font,
});

// === 右カラム: 本日のスコープ ===
const rightX = 5.6;
const rightW = 4.0;

slide.addText("本日のスコープ", {
  x: rightX, y: 1.3, w: rightW, h: 0.35,
  fontSize: 14, bold: true, color: theme.P, fontFace: font.jp,
  align: "left", valign: "middle", margin: 0,
});

slide.addText([
  { text: "◆ 話すこと\n", options: { bold: true, fontSize: 12, color: theme.P, fontFace: font.jp } },
  { text: "KR②の方針・KPI・3アプローチ・Q1計画", options: { fontSize: 12, color: theme.DT, fontFace: font.jp } },
], {
  x: rightX, y: 1.75, w: rightW, h: 0.95,
  align: "left", valign: "top", margin: 0,
  lineSpacingMultiple: 1.4,
});

slide.addText([
  { text: "◆ 話さないこと\n", options: { bold: true, fontSize: 12, color: theme.ST, fontFace: font.jp } },
  { text: "KR①の事業数値計画", options: { fontSize: 12, color: theme.DT, fontFace: font.jp } },
], {
  x: rightX, y: 2.85, w: rightW, h: 0.85,
  align: "left", valign: "top", margin: 0,
  lineSpacingMultiple: 1.4,
});

slide.addText([
  { text: "◆ 進捗報告\n", options: { bold: true, fontSize: 12, color: theme.A, fontFace: font.jp } },
  { text: "6月末(ベースライン数値とQ2目標を持参)", options: { fontSize: 12, color: theme.DT, fontFace: font.jp } },
], {
  x: rightX, y: 3.85, w: rightW, h: 0.85,
  align: "left", valign: "top", margin: 0,
  lineSpacingMultiple: 1.4,
});

// === 下部メッセージバー ===
slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.4, y: 4.85, w: 9.2, h: 0.45,
  fill: { color: theme.CB },
  rectRadius: 0.03,
});
slide.addText("KR②は、KR①の早期予測と原因分析を担う装置として別建てに置く", {
  x: 0.4, y: 4.85, w: 9.2, h: 0.45,
  fontSize: 12, bold: true, color: theme.P, fontFace: font.jp,
  align: "center", valign: "middle", margin: 0,
});

pres.writeFile({ fileName: "outputs/pptx/2026-04-15_kr2-position-slide.pptx" });
