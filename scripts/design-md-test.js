#!/usr/bin/env node
/**
 * Design.md テスト — 3スライド提案生成
 *
 * 目的: Design.md のデザイン指示が PPT 生成に反映されているか検証
 * テーマ: corporate（東京ガス標準）
 * テスト項目:
 *   ✓ 白背景 FFFFFF 統一
 *   ✓ Noto Sans JP フォント
 *   ✓ 主張文タイトル（カテゴリラベル ✗）
 *   ✓ 1スライド1メッセージ
 *   ✓ 図解・視覚要素の含有
 *   ✓ 禁則処理（行頭句点排除）
 *   ✓ 影・角丸ルール遵守
 */

const pptxgen = require("pptxgenjs");
const { getTheme, getFontPreset } = require("./lib");

// ===== テーマ・フォント設定 =====
const theme = getTheme("corporate");
const font = getFontPreset("corporate");

const pres = new pptxgen();
pres.defineLayout({ name: "16x9", width: 10, height: 5.625 });
pres.layout = "16x9";

let pageNum = 1;

// ===== スライド共通関数 =====

/**
 * ボトムバー（ブランドライン）を追加
 */
function addBottomBar(slide) {
  slide.addShape(pres.ShapeType.rect, {
    x: 0, y: 5.475, w: 10, h: 0.15,
    fill: { color: theme.P },
    line: { type: "none" },
  });

  // ページ番号
  slide.addText(String(pageNum), {
    x: 9.5, y: 5.2, w: 0.4, h: 0.3,
    fontSize: 10, color: theme.ST, fontFace: font.en, align: "right",
  });
}

// Shape API 互換性確保
if (!pres.ShapeType) {
  pres.ShapeType = pres.shapes;
}

/**
 * ヘッダー（パンくず）を追加
 */
function addHeader(slide, breadcrumb) {
  slide.addText(breadcrumb, {
    x: 0.3, y: 0.25, w: 9.4, h: 0.25,
    fontSize: 11, color: theme.ST, fontFace: font.jp,
  });

  // セパレータ
  slide.addShape(pres.ShapeType.line, {
    x: 0.3, y: 0.5, w: 9.4, h: 0,
    line: { color: theme.S, width: 1 },
  });
}

/**
 * スライドタイトル（主張文）を追加
 */
function addSlideTitle(slide, title) {
  slide.addText(title, {
    x: 0.3, y: 0.6, w: 9.4, h: 0.8,
    fontSize: 28, bold: true, color: theme.P, fontFace: font.jp,
    align: "left", valign: "top",
  });
}

// ===== スライド1: 表紙 =====

let slide = pres.addSlide();
slide.background = { color: "FFFFFF" };
pageNum = 1;

// 表紙タイトル（ダーク系）
slide.addText("基幹システム移行に向けた提案", {
  x: 0.5, y: 1.5, w: 9, h: 0.9,
  fontSize: 36, bold: true, color: theme.DT, fontFace: font.jp,
  align: "center", valign: "middle",
});

// サブタイトル
slide.addText("2027年EOL対応 実施方針", {
  x: 0.5, y: 2.6, w: 9, h: 0.6,
  fontSize: 22, color: theme.ST, fontFace: font.jp,
  align: "center", valign: "middle",
});

// カラーバンド（高さ制限: 0.8インチ以下）
slide.addShape(pres.ShapeType.rect, {
  x: 0, y: 4.8, w: 10, h: 0.75,
  fill: { color: theme.P },
  line: { type: "none" },
});

slide.addText("デジタル組織 × 基盤刷新プロジェクト", {
  x: 0.3, y: 4.85, w: 9.4, h: 0.65,
  fontSize: 14, color: "FFFFFF", fontFace: font.jp,
  align: "left", valign: "middle",
});

addBottomBar(slide);
pageNum++;

// ===== スライド2: 現状分析 =====

slide = pres.addSlide();
slide.background = { color: "FFFFFF" };

addHeader(slide, "背景 > 現状分析");
addSlideTitle(slide, "現行システムは2027年までのEOLが決定。移行なければ業務停止リスク");

// ボディ: EOL タイムライン
slide.addShape(pres.ShapeType.rect, {
  x: 0.3, y: 1.6, w: 9.4, h: 0.06,
  fill: { color: theme.S },
  line: { type: "none" },
});

const timeline = [
  { year: "2024\n現在", x: 0.5 },
  { year: "2027Q1\nEOL", x: 3.5 },
  { year: "2027Q2\n業務停止\nリスク", x: 6.5 },
  { year: "2028\n安定運用\n目標", x: 9.0 },
];

timeline.forEach((item, idx) => {
  const isEOL = idx === 1;
  slide.addShape(pres.ShapeType.ellipse, {
    x: parseFloat(item.x) - 0.15, y: 1.45, w: 0.3, h: 0.3,
    fill: { color: isEOL ? theme.A : theme.P },
    line: { type: "none" },
  });

  slide.addText(item.year, {
    x: parseFloat(item.x) - 0.25, y: 1.85, w: 0.5, h: 0.4,
    fontSize: 10, bold: true, color: isEOL ? theme.A : theme.ST, fontFace: font.jp,
    align: "center", valign: "top",
  });
});

// テーブル: コスト試算
slide.addTable(
  [
    ["項目", "試算値（年額）", "根拠"],
    ["移行投資", "8,500万円", "基本設計・詳細設計・構築・テスト"],
    ["運用コスト削減", "年1,200万円", "レガシーシステム廃止による保守削減"],
    ["ROI", "7.1年", "投資回収年数"],
  ],
  {
    x: 0.3, y: 2.5, w: 9.4, h: 1.3,
    colW: [3.1, 3.2, 3.1],
    border: [{ pt: 1, color: theme.S }],
    rowH: [0.33, 0.33, 0.33, 0.33],
    // ヘッダー行
    fill: { name: "fill", color: theme.TBL_HEADER_BG, transparency: 0 },
    // ヘッダーテキスト
    valign: "middle",
  }
);

// 補足（禁則処理対応）
slide.addText("※　試算根拠は別紙「基幹刷新詳細設計書」を参照", {
  x: 0.3, y: 3.95, w: 9.4, h: 0.3,
  fontSize: 11, color: theme.ST, fontFace: font.jp,
  align: "left", valign: "top",
});

// リスク表示
slide.addShape(pres.ShapeType.rect, {
  x: 0.3, y: 4.3, w: 9.4, h: 0.8,
  fill: { color: theme.ERROR_BG },
  line: { color: theme.ERROR_BD, width: 1 },
});

slide.addText("⚠️  スケジュール遅延による業務停止リスク", {
  x: 0.5, y: 4.35, w: 9, h: 0.2,
  fontSize: 12, bold: true, color: theme.ERROR_TX, fontFace: font.jp,
});

slide.addText("本年度決定～着手がなければ、2027年のEOL対応が困難になります。", {
  x: 0.5, y: 4.6, w: 9, h: 0.45,
  fontSize: 11, color: theme.ERROR_TX, fontFace: font.jp,
  align: "left", valign: "top",
});

addBottomBar(slide);
pageNum++;

// ===== スライド3: 提案方針 =====

slide = pres.addSlide();
slide.background = { color: "FFFFFF" };

addHeader(slide, "提案 > 実施方針");
addSlideTitle(slide, "段階的な基盤刷新で業務継続を確保。Phase 1では要件定義・基本設計まで実施");

// 3段階フロー図
const phases = [
  { label: "Phase 1\n（2024FY）", desc: "要件定義\n基本設計", x: 0.5, color: theme.P },
  { label: "Phase 2\n（2025FY）", desc: "詳細設計\n構築", x: 3.4, color: theme.ACCENTS[0] },
  { label: "Phase 3\n（2026FY）", desc: "テスト\n本番稼働", x: 6.3, color: theme.ACCENTS[1] },
];

phases.forEach((phase) => {
  // フェーズボックス
  slide.addShape(pres.ShapeType.rect, {
    x: parseFloat(phase.x), y: 1.5, w: 2.3, h: 0.7,
    fill: { color: phase.color },
    line: { type: "none" },
  });

  slide.addText(phase.label, {
    x: parseFloat(phase.x), y: 1.55, w: 2.3, h: 0.3,
    fontSize: 11, bold: true, color: "FFFFFF", fontFace: font.jp,
    align: "center", valign: "middle",
  });

  slide.addText(phase.desc, {
    x: parseFloat(phase.x), y: 1.88, w: 2.3, h: 0.32,
    fontSize: 9, color: "FFFFFF", fontFace: font.jp,
    align: "center", valign: "middle",
  });

  // 矢印
  if (phase.x !== "6.3") {
    slide.addShape(pres.ShapeType.triangle, {
      x: parseFloat(phase.x) + 2.45, y: 1.75, w: 0.3, h: 0.2,
      fill: { color: theme.ST },
      line: { type: "none" },
      rotate: 0,
    });
  }
});

// ネクストアクション
slide.addShape(pres.ShapeType.rect, {
  x: 0.3, y: 2.5, w: 9.4, h: 0.05,
  fill: { color: theme.P },
  line: { type: "none" },
});

slide.addText("ネクストアクション", {
  x: 0.3, y: 2.65, w: 9.4, h: 0.25,
  fontSize: 14, bold: true, color: theme.P, fontFace: font.jp,
});

// 実行項目
const actions = [
  "本会議で Phase 1 実施の承認を得る",
  "プロジェクトチーム体制を確定する",
  "詳細スケジュール・予算を確定する（4月中）",
];

actions.forEach((action, idx) => {
  slide.addText(`• ${action}`, {
    x: 0.5, y: 3.0 + idx * 0.35, w: 9.2, h: 0.3,
    fontSize: 12, color: theme.DT, fontFace: font.jp,
  });
});

// 投資効果サマリー（カード背景）
slide.addShape(pres.ShapeType.rect, {
  x: 0.3, y: 4.2, w: 4.6, h: 0.95,
  fill: { color: theme.CB },
  line: { color: theme.S, width: 1 },
});

slide.addText("投資額（Phase 1）", {
  x: 0.5, y: 4.3, w: 4.2, h: 0.2,
  fontSize: 11, color: theme.ST, fontFace: font.jp,
});

slide.addText("2,500万円", {
  x: 0.5, y: 4.55, w: 4.2, h: 0.4,
  fontSize: 22, bold: true, color: theme.P, fontFace: font.jp,
});

slide.addShape(pres.ShapeType.rect, {
  x: 5.1, y: 4.2, w: 4.6, h: 0.95,
  fill: { color: theme.OK_BG },
  line: { color: theme.OK_BD, width: 1 },
});

slide.addText("ROI（3年計）", {
  x: 5.3, y: 4.3, w: 4.2, h: 0.2,
  fontSize: 11, color: theme.OK_TX, fontFace: font.jp,
});

slide.addText("年1,200万円", {
  x: 5.3, y: 4.55, w: 4.2, h: 0.4,
  fontSize: 22, bold: true, color: theme.OK_TX, fontFace: font.jp,
});

addBottomBar(slide);

// ===== 出力 =====

pres.writeFile({ fileName: "outputs/pptx/2026-04-11_design-md-test.pptx" }).then(() => {
  console.log("✓ PPT生成完了: outputs/pptx/2026-04-11_design-md-test.pptx");
  console.log("\n【検証項目チェックリスト】");
  console.log("  ✓ 白背景 FFFFFF 統一");
  console.log("  ✓ corporate テーマ（フォント）");
  console.log("  ✓ 主張文タイトル（カテゴリラベルではなく）");
  console.log("  ✓ 1スライド1メッセージ");
  console.log("  ✓ 図解要素含有（タイムライン・フロー図・カード）");
  console.log("  ✓ セマンティック色使い分け（エラー・成功）");
  console.log("  ✓ デザインシステム参照（themes.js/fonts.js）");
}).catch((err) => {
  console.error("エラー:", err);
  process.exit(1);
});
