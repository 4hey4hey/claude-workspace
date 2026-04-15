const PptxGenJS = require("pptxgenjs");
const { getTheme, getFontPreset, parts, calcLayout } = require("./lib");

const theme = getTheme("corporate");
const font = getFontPreset("corporate");
const pres = new PptxGenJS();
pres.title = "挑戦KR②のKPIについて";

// ========================================================
// スライド0: 表紙
// ========================================================
const s0 = pres.addSlide();
s0.background = { color: "FFFFFF" };
parts.addBottomBar(s0, pres, theme);
parts.addCoverTitle(s0, pres, theme, {
  title: "挑戦KR②のKPIについて",
  subtitle: "仮説・検証・学習が高速に回る開発の型をつくる",
  date: "2026-04-15",
  font,
});

// ========================================================
// スライド1: 目標 — KPI 2つ + 3アプローチ（1枚に集約）
// ========================================================
const s1 = pres.addSlide();
s1.background = { color: "FFFFFF" };
parts.addBottomBar(s1, pres, theme);
parts.addHeader(s1, pres, theme, { breadcrumb: "挑戦KR② ＞ 目標", font });
parts.addSlideTitle(s1, pres, theme, {
  title: "仮説・検証・学習が高速に回るプロダクト開発の型を定常運用する",
  font,
});

// --- KPI 2カード（上段） ---
parts.addCard(s1, pres, theme, {
  x: 0.4, y: 1.3, w: 4.4, h: 1.1,
  accentColor: theme.P,
  title: "KPI① リードタイム",
  body: "1週間以内で機能を本番に出せること",
  font,
});
parts.addCard(s1, pres, theme, {
  x: 5.2, y: 1.3, w: 4.4, h: 1.1,
  accentColor: theme.P,
  title: "KPI② 学習サイクル",
  body: "出した結果を見て次の施策を決められること",
  font,
});

// --- サブ見出し ---
s1.addText("達成のための3つのアプローチ", {
  x: 0.4, y: 2.5, w: 9.2, h: 0.3,
  fontSize: 14, bold: true, color: theme.P, fontFace: font.jp,
  align: "left", valign: "middle",
});

// --- 3アプローチカード（下段） ---
const appW = 2.9;
const appGap = 0.25;
const appItems = [
  { title: "入口品質", body: "仕様を決める段階で「小さく作る」前提を揃える。無駄な手戻りを減らし、開発着手時の品質を上げる。" },
  { title: "フロー効率", body: "1チームで機能を完成できる体制にする。チーム間の調整待ちをなくし、リードタイムを短縮する。" },
  { title: "学習ループ", body: "リリース後の結果を計測・記録する仕組みを作る。出して終わりではなく、次の判断材料にする。" },
];
appItems.forEach((a, i) => {
  parts.addCard(s1, pres, theme, {
    x: 0.4 + i * (appW + appGap),
    y: 2.85,
    w: appW,
    h: 2.35,
    accentColor: theme.ACCENTS[i],
    title: a.title,
    body: a.body,
    font,
  });
});

// ========================================================
// スライド2: Q1の位置づけ — 横フロー図
// ========================================================
const s2 = pres.addSlide();
s2.background = { color: "FFFFFF" };
parts.addBottomBar(s2, pres, theme);
parts.addHeader(s2, pres, theme, { breadcrumb: "挑戦KR② ＞ ロードマップ", font });
parts.addSlideTitle(s2, pres, theme, {
  title: "Q1で計測基盤・体制を整え課題を分析し、Q2以降で改善を回す",
  font,
});

parts.addFlowHorizontal(s2, pres, theme, {
  x: 0.4, y: 1.5, w: 9.2, h: 3.0,
  steps: [
    {
      title: "Q1（4–6月）",
      body: "計測基盤・体制の整備\n課題分析\n\n今どこで時間がかかっているかを\n測れる状態を作る",
    },
    {
      title: "Q2（7–9月）",
      body: "チームごとの指標設定\n改善サイクル始動\n\nデータに基づく改善を開始する",
    },
    {
      title: "Q3–Q4（10月–）",
      body: "効果検証\n定着\n\n改善の成果を測り、\n型として定着させる",
    },
  ],
  font,
});

// 補足テキスト
s2.addText("いきなり改善施策は打たない。まず測れる状態を作り、課題を正しく把握してから改善サイクルを回す。", {
  x: 0.4, y: 4.75, w: 9.2, h: 0.4,
  fontSize: 11, color: theme.ST, fontFace: font.jp,
  align: "left", valign: "middle", lineSpacingMultiple: 1.4,
});

// ========================================================
// スライド3: Q1の計画 — テーブル
// ========================================================
const s3 = pres.addSlide();
s3.background = { color: "FFFFFF" };
parts.addBottomBar(s3, pres, theme);
parts.addHeader(s3, pres, theme, { breadcrumb: "挑戦KR② ＞ Q1計画", font });
parts.addSlideTitle(s3, pres, theme, {
  title: "リードタイムの可視化と、開発プロセスの前提を揃える",
  font,
});

// Q1 KPIテキスト
s3.addText([
  {
    text: "Q1のKPI: ",
    options: { bold: true, fontSize: 12, color: theme.P, fontFace: font.jp },
  },
  {
    text: "リードタイムが計測できていて、Q2の目標が設定できている状態",
    options: { fontSize: 12, color: theme.DT, fontFace: font.jp },
  },
], {
  x: 0.4, y: 1.3, w: 9.2, h: 0.35,
  align: "left", valign: "middle",
});

// テーブル
parts.addStyledTable(s3, pres, theme, {
  x: 0.4, y: 1.8, w: 9.2,
  headers: ["アプローチ", "Q1でやること"],
  colW: [2.3, 6.9],
  rowH: 0.6,
  rows: [
    ["共通基盤", "バリューチェーン全体の工程別リードタイムを可視化する"],
    ["入口品質", "PdM・ビジネスメンバー含め「小さく作る」考え方を外部講師と浸透させる"],
    ["フロー効率", "技術領域別チーム → フィーチャーチームへシフトする"],
    ["学習ループ", "リリース後のログ計測の仕組みを整備する"],
  ],
  font,
});

// 補足
s3.addText("3アプローチそれぞれに手を打ち、Q2以降の改善サイクルの土台を作る", {
  x: 0.4, y: 4.9, w: 9.2, h: 0.35,
  fontSize: 11, color: theme.ST, fontFace: font.jp,
  align: "left", valign: "middle",
});

// ========================================================
// スライド4: 現状進めていること ★一番厚く — 2×2 カード
// ========================================================
const s4 = pres.addSlide();
s4.background = { color: "FFFFFF" };
parts.addBottomBar(s4, pres, theme);
parts.addHeader(s4, pres, theme, { breadcrumb: "挑戦KR② ＞ Q1進捗", font });
parts.addSlideTitle(s4, pres, theme, {
  title: "4つの取り組みすべてで動き始めている",
  font,
});

const grid = calcLayout({ columns: 2, rows: 2 });
const progressItems = [
  {
    title: "① 可視化",
    body: "アイデアからリリースまで、工程別のリードタイムを可視化する仕組みに取り組んでいる。どこで時間がかかっているかを正しく把握する起点になる。",
    accent: theme.ACCENTS[0],
  },
  {
    title: "② 入口品質",
    body: "外部講師を交え、PdM・ビジネス推進メンバーも含めたレクチャーを実施中。継続支援も受けている。仕様を決める側も含めて「大きいまま作らない」前提を揃える。",
    accent: theme.ACCENTS[1],
  },
  {
    title: "③ フロー効率",
    body: "技術領域別のチーム構成から、1チームで機能を完成できるフィーチャーチームへのシフトを進めている。チーム間の調整待ちをなくす。",
    accent: theme.ACCENTS[2],
  },
  {
    title: "④ 学習ループ",
    body: "リリース後の結果を記録・計測する仕組みを整備中。出して終わりではなく、次の判断に使えるようにする。",
    accent: theme.ACCENTS[3],
  },
];

progressItems.forEach((p, i) => {
  const cell = grid.cells[i];
  parts.addCard(s4, pres, theme, {
    x: cell.x, y: cell.y, w: cell.w, h: cell.h,
    accentColor: p.accent,
    title: p.title,
    body: p.body,
    font,
  });
});

// ========================================================
// スライド5: Q1末に再報告 — Before/After比較
// ========================================================
const s5 = pres.addSlide();
s5.background = { color: "FFFFFF" };
parts.addBottomBar(s5, pres, theme);
parts.addHeader(s5, pres, theme, { breadcrumb: "挑戦KR② ＞ ネクストアクション", font });
parts.addSlideTitle(s5, pres, theme, {
  title: "6月末にベースライン数値とQ2目標を持って再報告する",
  font,
});

parts.addComparisonColumns(s5, pres, theme, {
  x: 0.4, y: 1.5, w: 9.2, h: 3.4,
  before: {
    title: "今回の報告",
    items: [
      "KR②の目標とKPI",
      "3アプローチの設計",
      "Q1の計画と着手状況",
    ],
  },
  after: {
    title: "次回（6月末）",
    items: [
      "リードタイムのベースライン数値",
      "チームごとの改善目標",
      "Q2以降の具体計画",
    ],
  },
  font,
});

// メッセージ
s5.addText("今日は方針と取り組みの報告。次回はデータで語る。", {
  x: 0.4, y: 5.1, w: 9.2, h: 0.3,
  fontSize: 13, bold: true, color: theme.P, fontFace: font.jp,
  align: "center", valign: "middle",
});

// ========================================================
// 出力
// ========================================================
pres.writeFile({ fileName: "outputs/pptx/2026-04-15_kr2-kpi-report.pptx" });
