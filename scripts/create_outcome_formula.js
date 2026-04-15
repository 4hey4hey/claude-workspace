const PptxGenJS = require("pptxgenjs");
const { getTheme, getFontPreset, parts } = require("./lib");

const theme = getTheme("corporate");
const font = getFontPreset("corporate");

const pres = new PptxGenJS();
pres.title = "成果の方程式";

// ================================================================
// 表紙
// ================================================================
const s0 = pres.addSlide();
s0.background = { color: "FFFFFF" };
parts.addBottomBar(s0, pres, theme);
parts.addCoverTitle(s0, pres, theme, {
  title: "成果の方程式",
  subtitle: "試行回数 × 施策の精度 ＝ 事業成果",
  date: "2026-04-15",
  font,
});

// ================================================================
// Slide 1: OKR 挑戦KR2
// ================================================================
const KPI2_COLOR = "546E8A"; // KPI②施策の精度（blue-grey）
const MIN_COLOR = "757575";  // 最低ライン（neutral grey）

const sKR = pres.addSlide();
sKR.background = { color: "FFFFFF" };
parts.addBottomBar(sKR, pres, theme);
parts.addHeader(sKR, pres, theme, { breadcrumb: "OKR 挑戦KR2", font });

// バッジ
parts.addBadge(sKR, pres, theme, {
  x: 0.4, y: 0.48, label: "挑戦 KR2", color: theme.P, w: 1.4, h: 0.32, font,
});

// KR本文
sKR.addText("仮説・検証・学習が止まらず高速に巡るプロダクト開発の型を定常運用できている。\n小さく早く検証する考え方がメンバーに浸透し、不確実性に対してムダの少ない意思決定と実行ができている。", {
  x: 0.4, y: 0.88, w: 9.2, h: 0.8,
  fontSize: 15, color: theme.DT, fontFace: font.jp,
  align: "left", valign: "top", lineSpacingMultiple: 1.6,
});

// セパレータ
sKR.addShape(pres.shapes.RECTANGLE, {
  x: 0.4, y: 1.78, w: 9.2, h: 0.01,
  fill: { color: theme.S }, line: { color: theme.S },
});

// セクションタイトル
sKR.addText("この KR を支える 3 つのアプローチ", {
  x: 0.4, y: 1.9, w: 9.2, h: 0.32,
  fontSize: 14, bold: true, color: theme.P, fontFace: font.jp,
  align: "left", valign: "middle",
});
sKR.addText("「型を回す」を3つの構造的課題に分解して取り組む。", {
  x: 0.4, y: 2.2, w: 9.2, h: 0.25,
  fontSize: 11, color: theme.ST, fontFace: font.jp,
  align: "left", valign: "middle",
});

// ── 3 アプローチカード ──
const apW = 2.9;
const apGap = 0.25;
const apY = 2.55;
const apH = 2.35;
const apX = [0.4, 0.4 + apW + apGap, 0.4 + 2 * (apW + apGap)];

const approaches = [
  {
    num: "①", title: "入口品質をあげる",
    sub: "実装に入る前の要求定義の曖昧さをなくす",
    body: "作り始めてから「この要件、ちゃんと決まってなかった」と気づき、作り直しになるムダを防ぐ。決めるべきことを決めてから作り始める。",
    accent: theme.P,
  },
  {
    num: "②", title: "フロー効率をあげる",
    sub: "実装を詰まらせず流す",
    body: "開発工程のムリ・ムダ・ムラをなくし、案件を停滞させずにスムーズに整える。",
    accent: theme.P,
  },
  {
    num: "③", title: "学習ループを回す",
    sub: "結果を次の判断に繋ぐ",
    body: "リリースして終わりにせず、お客様の反応を見て「次に何をやるか／やめるか」を決める。同じリソースでも当たる施策に集中できる。",
    accent: KPI2_COLOR,
  },
];

approaches.forEach((ap, i) => {
  // カード背景
  sKR.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: apX[i], y: apY, w: apW, h: apH,
    fill: { color: "F5F5F5" }, rectRadius: 0.03,
  });
  // アクセントトップライン
  sKR.addShape(pres.shapes.RECTANGLE, {
    x: apX[i], y: apY, w: apW, h: 0.04,
    fill: { color: ap.accent }, rectRadius: 0,
  });
  // ラベル
  sKR.addText(`アプローチ ${ap.num}`, {
    x: apX[i] + 0.15, y: apY + 0.15, w: 2.0, h: 0.28,
    fontSize: 11, bold: true, color: ap.accent, fontFace: font.jp,
    align: "left", valign: "middle",
  });
  // タイトル
  sKR.addText(ap.title, {
    x: apX[i] + 0.15, y: apY + 0.45, w: apW - 0.3, h: 0.32,
    fontSize: 14, bold: true, color: theme.DT, fontFace: font.jp,
    align: "left", valign: "middle",
  });
  // サブタイトル
  sKR.addText(ap.sub, {
    x: apX[i] + 0.15, y: apY + 0.78, w: apW - 0.3, h: 0.25,
    fontSize: 11, color: theme.ST, fontFace: font.jp,
    align: "left", valign: "middle",
  });
  // カード内セパレータ
  sKR.addShape(pres.shapes.RECTANGLE, {
    x: apX[i] + 0.15, y: apY + 1.1, w: apW - 0.3, h: 0.005,
    fill: { color: "DDDDDD" }, line: { color: "DDDDDD" },
  });
  // 本文
  sKR.addText(ap.body, {
    x: apX[i] + 0.15, y: apY + 1.18, w: apW - 0.3, h: 1.1,
    fontSize: 11, color: theme.DT, fontFace: font.jp,
    align: "left", valign: "top", lineSpacingMultiple: 1.6,
  });
});

// ボトムノート（アプローチ → KPI の対応関係）
sKR.addText([
  { text: "①②", options: { fontSize: 11, bold: true, color: theme.P, fontFace: font.jp } },
  { text: " が ", options: { fontSize: 11, color: theme.ST, fontFace: font.jp } },
  { text: "試行回数", options: { fontSize: 11, bold: true, color: theme.P, fontFace: font.jp } },
  { text: " を、", options: { fontSize: 11, color: theme.ST, fontFace: font.jp } },
  { text: "③", options: { fontSize: 11, bold: true, color: KPI2_COLOR, fontFace: font.jp } },
  { text: " が ", options: { fontSize: 11, color: theme.ST, fontFace: font.jp } },
  { text: "施策の精度", options: { fontSize: 11, bold: true, color: KPI2_COLOR, fontFace: font.jp } },
  { text: " を引き上げる。", options: { fontSize: 11, color: theme.ST, fontFace: font.jp } },
], {
  x: 0.4, y: 5.0, w: 9.2, h: 0.3,
  align: "center", valign: "middle",
});

// ================================================================
// Slide 2: 成果の方程式（全体像）
// ================================================================
const s1 = pres.addSlide();
s1.background = { color: "FFFFFF" };
parts.addBottomBar(s1, pres, theme);
parts.addHeader(s1, pres, theme, { breadcrumb: "成果の方程式", font });

// 「成果の方程式」ラベル
s1.addText("成果の方程式", {
  x: 0.4, y: 0.45, w: 9.2, h: 0.35,
  fontSize: 12, color: theme.ST, fontFace: font.jp,
  align: "center", valign: "middle",
});

// 方程式メイン
const eqY = 0.85;
const boxW = 2.3;
const boxH = 0.7;
const opW = 0.45;
const gp = 0.12;
// total = 3*boxW + 2*opW + 4*gp = 6.9+0.9+0.48 = 8.28
const startX = (10 - (3 * boxW + 2 * opW + 4 * gp)) / 2;

// 試行回数
s1.addText("試行回数", {
  x: startX, y: eqY, w: boxW, h: boxH,
  fontSize: 26, bold: true, color: theme.P,
  fontFace: font.jp, align: "center", valign: "middle",
});

// ×
s1.addText("×", {
  x: startX + boxW + gp, y: eqY, w: opW, h: boxH,
  fontSize: 28, bold: true, color: theme.DT,
  fontFace: font.en, align: "center", valign: "middle",
});

// 施策の精度
const b2x = startX + boxW + opW + gp * 2;
s1.addText("施策の精度", {
  x: b2x, y: eqY, w: boxW, h: boxH,
  fontSize: 26, bold: true, color: KPI2_COLOR,
  fontFace: font.jp, align: "center", valign: "middle",
});

// ＝
const op2x = b2x + boxW + gp;
s1.addText("＝", {
  x: op2x, y: eqY, w: opW, h: boxH,
  fontSize: 28, bold: true, color: theme.DT,
  fontFace: font.en, align: "center", valign: "middle",
});

// 事業成果
const b3x = op2x + opW + gp;
s1.addText("事業成果", {
  x: b3x, y: eqY, w: boxW, h: boxH,
  fontSize: 26, bold: true, color: theme.DT,
  fontFace: font.jp, align: "center", valign: "middle",
});

// サブテキスト
s1.addText("不確実性が高い施策を、小さく・早く・数多く 試す", {
  x: 0.4, y: 1.65, w: 9.2, h: 0.35,
  fontSize: 13, color: theme.ST, fontFace: font.jp,
  align: "center", valign: "middle",
});

// セパレータ
s1.addShape(pres.shapes.RECTANGLE, {
  x: 0.4, y: 2.15, w: 9.2, h: 0.01,
  fill: { color: theme.S }, line: { color: theme.S },
});

// ── KPI ① カード ──
const cardY1 = 2.35;
const cardW = 9.2;
const cardH = 1.45;

// KPI①背景カード
s1.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.4, y: cardY1, w: cardW, h: cardH,
  fill: { color: "F5F5F5" }, rectRadius: 0.03,
});
// KPIラベル
s1.addText([
  { text: "KPI ", options: { fontSize: 11, color: theme.P, fontFace: font.en, bold: true } },
  { text: "①", options: { fontSize: 11, color: theme.P, fontFace: font.jp, bold: true } },
  { text: "　試行回数", options: { fontSize: 11, color: theme.P, fontFace: font.jp, bold: true } },
], {
  x: 0.6, y: cardY1 + 0.1, w: 4.0, h: 0.3,
  align: "left", valign: "middle",
});
// KPI①タイトル
s1.addText("顧客価値領域の施策について、企画 → リリースまでのリードタイムが平均1ヶ月以内", {
  x: 0.6, y: cardY1 + 0.4, w: 8.8, h: 0.4,
  fontSize: 14, bold: true, color: theme.DT, fontFace: font.jp,
  align: "left", valign: "middle",
});
// KPI①サブ
s1.addText("思いついてから届けるまでの時間が短い ＝ 試行回数が増える", {
  x: 0.6, y: cardY1 + 0.8, w: 8.8, h: 0.3,
  fontSize: 11, color: theme.ST, fontFace: font.jp,
  align: "left", valign: "middle",
});

// ── KPI ② カード ──
const cardY2 = 3.95;

s1.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.4, y: cardY2, w: cardW, h: cardH,
  fill: { color: "F5F5F5" }, rectRadius: 0.03,
});
s1.addText([
  { text: "KPI ", options: { fontSize: 11, color: KPI2_COLOR, fontFace: font.en, bold: true } },
  { text: "②", options: { fontSize: 11, color: KPI2_COLOR, fontFace: font.jp, bold: true } },
  { text: "　施策の精度", options: { fontSize: 11, color: KPI2_COLOR, fontFace: font.jp, bold: true } },
], {
  x: 0.6, y: cardY2 + 0.1, w: 4.0, h: 0.3,
  align: "left", valign: "middle",
});
s1.addText("リリース後の検証結果 → 次の施策への反映までのリードタイムが平均1ヶ月以内", {
  x: 0.6, y: cardY2 + 0.4, w: 8.8, h: 0.4,
  fontSize: 14, bold: true, color: theme.DT, fontFace: font.jp,
  align: "left", valign: "middle",
});
s1.addText("出した結果を見て「次に何をやるか」を変えられる ＝ 施策の精度が上がる", {
  x: 0.6, y: cardY2 + 0.8, w: 8.8, h: 0.3,
  fontSize: 11, color: theme.ST, fontFace: font.jp,
  align: "left", valign: "middle",
});

// ================================================================
// Slide: なぜ「1ヶ月」が目標なのか（DORA）
// ================================================================
const sDora = pres.addSlide();
sDora.background = { color: "FFFFFF" };
parts.addBottomBar(sDora, pres, theme);
parts.addHeader(sDora, pres, theme, { breadcrumb: "成果の方程式 ＞ 目標根拠", font });

// スライドタイトル
sDora.addText("なぜ「1ヶ月」が目標なのか", {
  x: 0.4, y: 0.45, w: 9.2, h: 0.4,
  fontSize: 20, bold: true, color: theme.DT, fontFace: font.jp,
  align: "left", valign: "middle",
});

// 冒頭 1 行
sDora.addText([
  { text: "開発組織能力の世界標準指標 ", options: { fontSize: 13, color: theme.ST, fontFace: font.jp } },
  { text: '"DORA"', options: { fontSize: 13, bold: true, color: theme.P, fontFace: font.en } },
  { text: " の High レベルに相当する。", options: { fontSize: 13, color: theme.ST, fontFace: font.jp } },
], {
  x: 0.4, y: 0.88, w: 9.2, h: 0.3,
  align: "left", valign: "middle",
});

// DORA 4 段階ベンチマーク表
const doraRows = [
  [
    { text: "レベル", options: { fontSize: 11, bold: true, color: "FFFFFF", fill: { color: theme.P }, fontFace: font.jp, align: "center", valign: "middle" } },
    { text: "Lead Time", options: { fontSize: 11, bold: true, color: "FFFFFF", fill: { color: theme.P }, fontFace: font.en, align: "center", valign: "middle" } },
    { text: "該当する組織", options: { fontSize: 11, bold: true, color: "FFFFFF", fill: { color: theme.P }, fontFace: font.jp, align: "center", valign: "middle" } },
  ],
  [
    { text: "Elite", options: { fontSize: 11, color: theme.DT, fill: { color: "FFFFFF" }, fontFace: font.en, align: "center", valign: "middle" } },
    { text: "1日未満", options: { fontSize: 11, color: theme.DT, fill: { color: "FFFFFF" }, fontFace: font.jp, align: "center", valign: "middle" } },
    { text: "Amazon, Netflix, Google", options: { fontSize: 11, color: theme.ST, fill: { color: "FFFFFF" }, fontFace: font.en, align: "left", valign: "middle" } },
  ],
  [
    { text: "★ High（目標）", options: { fontSize: 11, bold: true, color: theme.P, fill: { color: "E8ECF8" }, fontFace: font.jp, align: "center", valign: "middle" } },
    { text: "1日〜1ヶ月", options: { fontSize: 11, bold: true, color: theme.P, fill: { color: "E8ECF8" }, fontFace: font.jp, align: "center", valign: "middle" } },
    { text: "メガベンチャー、デジタル先進企業", options: { fontSize: 11, bold: true, color: theme.P, fill: { color: "E8ECF8" }, fontFace: font.jp, align: "left", valign: "middle" } },
  ],
  [
    { text: "Medium", options: { fontSize: 11, color: theme.DT, fill: { color: "FFFFFF" }, fontFace: font.en, align: "center", valign: "middle" } },
    { text: "1週間〜半年", options: { fontSize: 11, color: theme.DT, fill: { color: "FFFFFF" }, fontFace: font.jp, align: "center", valign: "middle" } },
    { text: "標準的な大企業", options: { fontSize: 11, color: theme.ST, fill: { color: "FFFFFF" }, fontFace: font.jp, align: "left", valign: "middle" } },
  ],
  [
    { text: "Low", options: { fontSize: 11, color: theme.DT, fill: { color: "F5F5F5" }, fontFace: font.en, align: "center", valign: "middle" } },
    { text: "半年以上", options: { fontSize: 11, color: theme.DT, fill: { color: "F5F5F5" }, fontFace: font.jp, align: "center", valign: "middle" } },
    { text: "レガシー組織", options: { fontSize: 11, color: theme.ST, fill: { color: "F5F5F5" }, fontFace: font.jp, align: "left", valign: "middle" } },
  ],
];

sDora.addTable(doraRows, {
  x: 0.4, y: 1.25, w: 9.2,
  colW: [2.2, 2.0, 5.0],
  rowH: [0.35, 0.3, 0.38, 0.3, 0.3],
  border: { type: "solid", pt: 0.5, color: "DDDDDD" },
});

// ── 補足 3 ブロック ──
const infoY = 3.0;
const infoH = 2.15;
const infoW = 2.9;
const infoGap = 0.25;
const infoX = [0.4, 0.4 + infoW + infoGap, 0.4 + 2 * (infoW + infoGap)];

const infoBlocks = [
  {
    title: "DORAとは",
    body: "Google傘下の研究チームが10年以上継続している、世界最大の開発組織ベンチマーク調査。Amazon・Google・Microsoftから伝統的大企業まで、累計3万人以上の開発者を調査。",
  },
  {
    title: "なぜこの指標を採用するか",
    body: "DORA調査により「開発スピードと事業成果は連動する」ことが統計的に証明されている。Eliteレベル組織はLowレベル組織と比べて収益成長が2倍以上というデータも出ており、業界標準として広く採用されている。",
  },
  {
    title: "なぜHighレベルを狙うか",
    body: "Eliteレベル（1日未満）は組織・文化・基盤の三位一体の変革が必要で、3年では届かない。一方、Highレベル（1ヶ月以内）はメガベンチャーの標準水準であり、JTC先進部門が現在目指している到達点。我々の3年計画として現実的かつ挑戦的なライン。",
  },
];

infoBlocks.forEach((blk, i) => {
  // カード背景
  sDora.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: infoX[i], y: infoY, w: infoW, h: infoH,
    fill: { color: "F5F5F5" }, rectRadius: 0.03,
  });
  // タイトル
  sDora.addText(blk.title, {
    x: infoX[i] + 0.15, y: infoY + 0.12, w: infoW - 0.3, h: 0.3,
    fontSize: 12, bold: true, color: theme.P, fontFace: font.jp,
    align: "left", valign: "middle",
  });
  // セパレータ
  sDora.addShape(pres.shapes.RECTANGLE, {
    x: infoX[i] + 0.15, y: infoY + 0.48, w: infoW - 0.3, h: 0.005,
    fill: { color: "DDDDDD" }, line: { color: "DDDDDD" },
  });
  // 本文
  sDora.addText(blk.body, {
    x: infoX[i] + 0.15, y: infoY + 0.55, w: infoW - 0.3, h: 1.45,
    fontSize: 11, color: theme.DT, fontFace: font.jp,
    align: "left", valign: "top", lineSpacingMultiple: 1.6,
  });
});

// ================================================================
// Slide: KPI ① 試行回数
// ================================================================
const s2 = pres.addSlide();
s2.background = { color: "FFFFFF" };
parts.addBottomBar(s2, pres, theme);
parts.addHeader(s2, pres, theme, { breadcrumb: "成果の方程式 ＞ KPI ① 試行回数", font });

// KPIラベル
s2.addText([
  { text: "KPI ", options: { fontSize: 11, color: theme.P, fontFace: font.en, bold: true } },
  { text: "①", options: { fontSize: 11, color: theme.P, fontFace: font.jp, bold: true } },
  { text: "　試行回数", options: { fontSize: 11, color: theme.P, fontFace: font.jp, bold: true } },
], {
  x: 0.4, y: 0.4, w: 4.0, h: 0.28,
  align: "left", valign: "middle",
});

// タイトル（画像の原文そのまま）
s2.addText("顧客価値領域の施策について、企画 → リリースまでのリードタイムが平均1ヶ月以内", {
  x: 0.4, y: 0.68, w: 9.2, h: 0.45,
  fontSize: 18, bold: true, color: theme.DT, fontFace: font.jp,
  align: "left", valign: "middle",
});

// サブテキスト
s2.addText("思いついてから届けるまでの時間が短い ＝ 試行回数が増える", {
  x: 0.4, y: 1.15, w: 9.2, h: 0.3,
  fontSize: 12, color: theme.ST, fontFace: font.jp,
  align: "left", valign: "middle",
});

// セパレータ
s2.addShape(pres.shapes.RECTANGLE, {
  x: 0.4, y: 1.5, w: 9.2, h: 0.01,
  fill: { color: theme.S }, line: { color: theme.S },
});

// 左右比較カード共通
const kY = 1.7;
const kH = 3.65;
const kW = 4.35;
const kGap = 0.5;
const rX = 0.4 + kW + kGap;

// --- 理想状態 (100) ---
s2.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.4, y: kY, w: kW, h: kH,
  fill: { color: theme.CB }, rectRadius: 0.03,
});

// 100 バッジ
s2.addText("100", {
  x: 0.6, y: kY + 0.15, w: 0.7, h: 0.5,
  fontSize: 28, bold: true, color: theme.P,
  fontFace: font.en, align: "left", valign: "middle",
});
s2.addText("理想状態", {
  x: 1.35, y: kY + 0.15, w: 2.0, h: 0.5,
  fontSize: 13, color: theme.ST, fontFace: font.jp,
  align: "left", valign: "middle",
});

// KPIバッジ
s2.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.6, y: kY + 0.8, w: 3.9, h: 0.35,
  fill: { color: theme.P }, rectRadius: 0.02,
});
s2.addText("企画 → リリース　平均 1ヶ月以内", {
  x: 0.6, y: kY + 0.8, w: 3.9, h: 0.35,
  fontSize: 12, bold: true, color: theme.WH,
  fontFace: font.jp, align: "center", valign: "middle",
});

// 説明文（原文そのまま）
s2.addText("試したい施策を、平均1ヶ月以内にお客様に届けて反応を見れる。試行回数が多いから、当たる施策を早く見つけられる。", {
  x: 0.6, y: kY + 1.35, w: 3.95, h: 2.0,
  fontSize: 13, color: theme.DT, fontFace: font.jp,
  align: "left", valign: "top", lineSpacingMultiple: 1.6,
});

// --- 最低ライン (30) ---
s2.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: rX, y: kY, w: kW, h: kH,
  fill: { color: theme.SF }, rectRadius: 0.03,
});

s2.addText("30", {
  x: rX + 0.2, y: kY + 0.15, w: 0.6, h: 0.5,
  fontSize: 28, bold: true, color: MIN_COLOR,
  fontFace: font.en, align: "left", valign: "middle",
});
s2.addText("最低ライン", {
  x: rX + 0.85, y: kY + 0.15, w: 2.0, h: 0.5,
  fontSize: 13, color: theme.ST, fontFace: font.jp,
  align: "left", valign: "middle",
});

s2.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: rX + 0.2, y: kY + 0.8, w: 3.9, h: 0.35,
  fill: { color: MIN_COLOR }, rectRadius: 0.02,
});
s2.addText("企画 → リリース　平均 3ヶ月以上", {
  x: rX + 0.2, y: kY + 0.8, w: 3.9, h: 0.35,
  fontSize: 12, bold: true, color: theme.WH,
  fontFace: font.jp, align: "center", valign: "middle",
});

s2.addText("試したい施策が、お客様に届くまで平均3ヶ月以上かかる。大型案件に引きずられ、新しいことを試す回数が限られる。当たる施策にたどり着く前に時間切れになりやすい。", {
  x: rX + 0.2, y: kY + 1.35, w: 3.95, h: 2.0,
  fontSize: 13, color: theme.DT, fontFace: font.jp,
  align: "left", valign: "top", lineSpacingMultiple: 1.6,
});

// ================================================================
// Slide 3: KPI ② 施策の精度
// ================================================================
const s3 = pres.addSlide();
s3.background = { color: "FFFFFF" };
parts.addBottomBar(s3, pres, theme);
parts.addHeader(s3, pres, theme, { breadcrumb: "成果の方程式 ＞ KPI ② 施策の精度", font });

// KPIラベル
s3.addText([
  { text: "KPI ", options: { fontSize: 11, color: KPI2_COLOR, fontFace: font.en, bold: true } },
  { text: "②", options: { fontSize: 11, color: KPI2_COLOR, fontFace: font.jp, bold: true } },
  { text: "　施策の精度", options: { fontSize: 11, color: KPI2_COLOR, fontFace: font.jp, bold: true } },
], {
  x: 0.4, y: 0.4, w: 4.0, h: 0.28,
  align: "left", valign: "middle",
});

// タイトル（原文そのまま）
s3.addText("リリース後の検証結果 → 次の施策への反映までのリードタイムが平均1ヶ月以内", {
  x: 0.4, y: 0.68, w: 9.2, h: 0.45,
  fontSize: 18, bold: true, color: theme.DT, fontFace: font.jp,
  align: "left", valign: "middle",
});

// サブテキスト
s3.addText("出した結果を見て「次に何をやるか」を変えられる ＝ 施策の精度が上がる", {
  x: 0.4, y: 1.15, w: 9.2, h: 0.3,
  fontSize: 12, color: theme.ST, fontFace: font.jp,
  align: "left", valign: "middle",
});

s3.addShape(pres.shapes.RECTANGLE, {
  x: 0.4, y: 1.5, w: 9.2, h: 0.01,
  fill: { color: theme.S }, line: { color: theme.S },
});

// --- 理想状態 (100) ---
s3.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.4, y: kY, w: kW, h: kH,
  fill: { color: theme.CB }, rectRadius: 0.03,
});

s3.addText("100", {
  x: 0.6, y: kY + 0.15, w: 0.7, h: 0.5,
  fontSize: 28, bold: true, color: theme.P,
  fontFace: font.en, align: "left", valign: "middle",
});
s3.addText("理想状態", {
  x: 1.35, y: kY + 0.15, w: 2.0, h: 0.5,
  fontSize: 13, color: theme.ST, fontFace: font.jp,
  align: "left", valign: "middle",
});

s3.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.6, y: kY + 0.8, w: 3.9, h: 0.35,
  fill: { color: theme.P }, rectRadius: 0.02,
});
s3.addText("検証 → 次の施策へ反映　平均 1ヶ月以内", {
  x: 0.6, y: kY + 0.8, w: 3.9, h: 0.35,
  fontSize: 12, bold: true, color: theme.WH,
  fontFace: font.jp, align: "center", valign: "middle",
});

s3.addText("効果のない施策を早く止めて、効く施策に人手を寄せられる。同じリソースでも、成果に繋がる仕事の比率が上がる。", {
  x: 0.6, y: kY + 1.35, w: 3.95, h: 2.0,
  fontSize: 13, color: theme.DT, fontFace: font.jp,
  align: "left", valign: "top", lineSpacingMultiple: 1.6,
});

// --- 最低ライン (30) ---
s3.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: rX, y: kY, w: kW, h: kH,
  fill: { color: theme.SF }, rectRadius: 0.03,
});

s3.addText("30", {
  x: rX + 0.2, y: kY + 0.15, w: 0.6, h: 0.5,
  fontSize: 28, bold: true, color: MIN_COLOR,
  fontFace: font.en, align: "left", valign: "middle",
});
s3.addText("最低ライン", {
  x: rX + 0.85, y: kY + 0.15, w: 2.0, h: 0.5,
  fontSize: 13, color: theme.ST, fontFace: font.jp,
  align: "left", valign: "middle",
});

s3.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: rX + 0.2, y: kY + 0.8, w: 3.9, h: 0.35,
  fill: { color: MIN_COLOR }, rectRadius: 0.02,
});
s3.addText("検証 → 次の施策へ反映　3ヶ月以上 or 未反映", {
  x: rX + 0.2, y: kY + 0.8, w: 3.9, h: 0.35,
  fontSize: 12, bold: true, color: theme.WH,
  fontFace: font.jp, align: "center", valign: "middle",
});

s3.addText("効いたかどうかわからないまま次に進む。効果のない施策を止められず、人手が分散したまま成果が出ない。", {
  x: rX + 0.2, y: kY + 1.35, w: 3.95, h: 2.0,
  fontSize: 13, color: theme.DT, fontFace: font.jp,
  align: "left", valign: "top", lineSpacingMultiple: 1.6,
});

// ================================================================
// 出力
// ================================================================
pres.writeFile({ fileName: "outputs/pptx/2026-04-15_outcome-formula.pptx" });
