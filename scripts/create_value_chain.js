"use strict";
// ============================================================
// バリューチェーン全体像 — POの守備範囲と"その手前"
// Theme: corporate
// Font: corporate (Meiryo)
// Output: outputs/pptx/2026-04-10_value-chain-po-scope.pptx
// ============================================================

const path = require("path");
const PptxGenJS = require("pptxgenjs");
const { getTheme, parts, getFontPreset } = require("./lib");

const theme = getTheme("corporate");
const font = getFontPreset("corporate");
const pres = new PptxGenJS();
pres.title = 'バリューチェーン全体像 ー POの守備範囲と"その手前"';

const slide = pres.addSlide();
slide.background = { color: "FFFFFF" };

// ─── 定数 ───────────────────────────────────────────────────
const SL = { W: 10, H: 5.625 };
const MARGIN_L = 0.3;
const MARGIN_R = 0.3;
const USABLE_W = SL.W - MARGIN_L - MARGIN_R;

// 色定義
const COL = {
  GRAY_BG: "E8E8E8",       // 事業ニーズ背景
  BLUE_BG: "DCEAF8",       // PO守備範囲の各ボックス背景
  HIGHLIGHT_BG: "FFF4EC",  // 施策の前提整理 背景（薄オレンジ）
  HIGHLIGHT_BD: "D94000",  // 施策の前提整理 ボーダー（赤）
  ARROW: "AAAAAA",         // 矢印色
  DARK_TEXT: "1A1A1A",     // メインテキスト
  SUB_TEXT: "444444",      // サブテキスト
  RED_TEXT: "D94000",      // 赤テキスト
  ZONE_LINE: "D94000",     // ゾーン分割線
  DASHED_ARROW: "BBBBBB",  // フィードバック矢印
};

// ─── タイトル ─────────────────────────────────────────────────
slide.addText(
  [
    { text: "バリューチェーン全体像 ー POの守備範囲と", options: { bold: true } },
    { text: '"その手前"', options: { bold: true } },
  ],
  {
    x: MARGIN_L,
    y: 0.15,
    w: USABLE_W,
    h: 0.55,
    fontSize: 24,
    color: COL.DARK_TEXT,
    fontFace: font.jp,
    align: "left",
    valign: "middle",
  }
);

// ─── ゾーンラベル ──────────────────────────────────────────────
const ZONE_LABEL_Y = 0.85;

slide.addText("Pdmの守備範囲（What/Why）", {
  x: MARGIN_L,
  y: ZONE_LABEL_Y,
  w: 3.8,
  h: 0.32,
  fontSize: 12,
  color: COL.DARK_TEXT,
  fontFace: font.jp,
  align: "left",
  valign: "middle",
  bold: true,
});

slide.addText("POの守備範囲（How/When）", {
  x: 5.0,
  y: ZONE_LABEL_Y,
  w: 4.6,
  h: 0.32,
  fontSize: 12,
  color: COL.DARK_TEXT,
  fontFace: font.jp,
  align: "left",
  valign: "middle",
  bold: true,
});

// ─── ゾーン分割線（赤の破線） ────────────────────────────────
const DIVIDER_X = 4.55;
slide.addShape(pres.shapes.LINE, {
  x: DIVIDER_X,
  y: ZONE_LABEL_Y - 0.05,
  w: 0,
  h: 3.95,
  line: { color: COL.ZONE_LINE, width: 1.5, dashType: "dash" },
});

// ─── ボックス定義 ─────────────────────────────────────────────
const BOX_Y = 1.35;
const BOX_H = 3.15;
const BOX_GAP = 0.12;
const ARROW_W = 0.35;

// 5つのボックスの x, w を計算
// ボックス1,2 は左ゾーン、ボックス3,4,5 は右ゾーン
const boxes = [
  { x: MARGIN_L,  w: 1.55 },       // 事業ニーズ
  { x: 2.10,      w: 2.15 },       // 施策の前提整理
  { x: 4.80,      w: 1.55 },       // 要件定義
  { x: 6.55,      w: 1.55 },       // 開発〜リリース
  { x: 8.30,      w: 1.40 },       // 検証
];

// ─── ボックス1: 事業ニーズ ────────────────────────────────────
{
  const b = boxes[0];
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: b.x, y: BOX_Y, w: b.w, h: BOX_H,
    fill: { color: COL.GRAY_BG },
    rectRadius: 0.03,
  });
  slide.addText("事業ニーズ", {
    x: b.x, y: BOX_Y + 0.8, w: b.w, h: 0.45,
    fontSize: 16, bold: true, color: COL.DARK_TEXT, fontFace: font.jp,
    align: "center", valign: "middle",
  });
  slide.addText("What / Why", {
    x: b.x, y: BOX_Y + 1.3, w: b.w, h: 0.35,
    fontSize: 12, color: COL.SUB_TEXT, fontFace: font.en,
    align: "center", valign: "middle",
  });
  slide.addText("PdM", {
    x: b.x, y: BOX_Y + BOX_H - 0.55, w: b.w, h: 0.4,
    fontSize: 14, bold: true, color: COL.DARK_TEXT, fontFace: font.jp,
    align: "center", valign: "middle",
  });
}

// ─── ボックス2: 施策の前提整理・要求定義（ハイライト） ──────────
{
  const b = boxes[1];
  // 破線枠の背景
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: b.x, y: BOX_Y, w: b.w, h: BOX_H,
    fill: { color: COL.HIGHLIGHT_BG },
    line: { color: COL.HIGHLIGHT_BD, width: 2, dashType: "dash" },
    rectRadius: 0.03,
  });
  slide.addText("施策の前提整\n理・要求定義", {
    x: b.x + 0.1, y: BOX_Y + 0.2, w: b.w - 0.2, h: 0.7,
    fontSize: 15, bold: true, color: COL.DARK_TEXT, fontFace: font.jp,
    align: "center", valign: "middle", lineSpacingMultiple: 1.1,
  });
  slide.addText("前提を揃える", {
    x: b.x + 0.1, y: BOX_Y + 0.95, w: b.w - 0.2, h: 0.3,
    fontSize: 11, color: COL.SUB_TEXT, fontFace: font.jp,
    align: "center", valign: "middle",
  });
  // 詳細リスト
  const items = [
    "・as-is / to-be整理",
    "・ビジネス試算",
    "・業務フロー調整",
    "・SH間合意形成",
    "・既存業者・契約整理",
  ];
  slide.addText(items.join("\n"), {
    x: b.x + 0.15, y: BOX_Y + 1.35, w: b.w - 0.3, h: 1.3,
    fontSize: 10, color: COL.DARK_TEXT, fontFace: font.jp,
    align: "left", valign: "top", lineSpacingMultiple: 1.5,
  });
  slide.addText("Pdm", {
    x: b.x, y: BOX_Y + BOX_H - 0.55, w: b.w, h: 0.4,
    fontSize: 16, bold: true, color: COL.RED_TEXT, fontFace: font.jp,
    align: "center", valign: "middle",
  });
}

// ─── ボックス3: 要件定義・要件分割 ────────────────────────────
{
  const b = boxes[2];
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: b.x, y: BOX_Y, w: b.w, h: BOX_H,
    fill: { color: COL.BLUE_BG },
    rectRadius: 0.03,
  });
  slide.addText("要件定義・\n要件分割", {
    x: b.x, y: BOX_Y + 0.8, w: b.w, h: 0.55,
    fontSize: 15, bold: true, color: COL.DARK_TEXT, fontFace: font.jp,
    align: "center", valign: "middle", lineSpacingMultiple: 1.1,
  });
  slide.addText("How / When", {
    x: b.x, y: BOX_Y + 1.4, w: b.w, h: 0.35,
    fontSize: 12, color: COL.SUB_TEXT, fontFace: font.en,
    align: "center", valign: "middle",
  });
  slide.addText("PO", {
    x: b.x, y: BOX_Y + BOX_H - 0.55, w: b.w, h: 0.4,
    fontSize: 14, bold: true, color: COL.DARK_TEXT, fontFace: font.jp,
    align: "center", valign: "middle",
  });
}

// ─── ボックス4: 開発〜リリース ────────────────────────────────
{
  const b = boxes[3];
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: b.x, y: BOX_Y, w: b.w, h: BOX_H,
    fill: { color: COL.BLUE_BG },
    rectRadius: 0.03,
  });
  slide.addText("開発〜\nリリース", {
    x: b.x, y: BOX_Y + 0.8, w: b.w, h: 0.55,
    fontSize: 15, bold: true, color: COL.DARK_TEXT, fontFace: font.jp,
    align: "center", valign: "middle", lineSpacingMultiple: 1.1,
  });
  slide.addText("実行", {
    x: b.x, y: BOX_Y + 1.4, w: b.w, h: 0.35,
    fontSize: 12, color: COL.SUB_TEXT, fontFace: font.jp,
    align: "center", valign: "middle",
  });
  slide.addText("PO + Dev", {
    x: b.x, y: BOX_Y + BOX_H - 0.55, w: b.w, h: 0.4,
    fontSize: 14, bold: true, color: COL.DARK_TEXT, fontFace: font.jp,
    align: "center", valign: "middle",
  });
}

// ─── ボックス5: 検証 ──────────────────────────────────────────
{
  const b = boxes[4];
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: b.x, y: BOX_Y, w: b.w, h: BOX_H,
    fill: { color: COL.BLUE_BG },
    rectRadius: 0.03,
  });
  slide.addText("検証", {
    x: b.x, y: BOX_Y + 0.9, w: b.w, h: 0.4,
    fontSize: 16, bold: true, color: COL.DARK_TEXT, fontFace: font.jp,
    align: "center", valign: "middle",
  });
  slide.addText("学習ループ", {
    x: b.x, y: BOX_Y + 1.35, w: b.w, h: 0.35,
    fontSize: 12, color: COL.SUB_TEXT, fontFace: font.jp,
    align: "center", valign: "middle",
  });
  slide.addText("PO + PdM", {
    x: b.x, y: BOX_Y + BOX_H - 0.55, w: b.w, h: 0.4,
    fontSize: 14, bold: true, color: COL.DARK_TEXT, fontFace: font.jp,
    align: "center", valign: "middle",
  });
}

// ─── 矢印（ボックス間の → ） ──────────────────────────────────
function addArrow(x1, x2, y) {
  slide.addShape(pres.shapes.LINE, {
    x: x1, y: y, w: x2 - x1, h: 0,
    line: { color: COL.ARROW, width: 2, endArrowType: "triangle" },
  });
}

const ARROW_Y = BOX_Y + BOX_H / 2;

// ボックス1→2
addArrow(boxes[0].x + boxes[0].w + 0.02, boxes[1].x - 0.02, ARROW_Y);
// ボックス2→3
addArrow(boxes[1].x + boxes[1].w + 0.02, boxes[2].x - 0.02, ARROW_Y);
// ボックス3→4
addArrow(boxes[2].x + boxes[2].w + 0.02, boxes[3].x - 0.02, ARROW_Y);
// ボックス4→5
addArrow(boxes[3].x + boxes[3].w + 0.02, boxes[4].x - 0.02, ARROW_Y);

// ─── フィードバックループ（検証→事業ニーズ、下を通る破線矢印）──
const LOOP_Y = BOX_Y + BOX_H + 0.2;
const LOOP_RIGHT_X = boxes[4].x + boxes[4].w / 2;
const LOOP_LEFT_X = boxes[0].x + boxes[0].w / 2;

// 下方向の線（検証から下へ）
slide.addShape(pres.shapes.LINE, {
  x: LOOP_RIGHT_X, y: BOX_Y + BOX_H, w: 0, h: 0.2,
  line: { color: COL.DASHED_ARROW, width: 1.5, dashType: "dash" },
});
// 横の線（右から左へ）
slide.addShape(pres.shapes.LINE, {
  x: LOOP_LEFT_X, y: LOOP_Y, w: LOOP_RIGHT_X - LOOP_LEFT_X, h: 0,
  line: { color: COL.DASHED_ARROW, width: 1.5, dashType: "dash" },
});
// 上方向の線（事業ニーズへ戻る、矢印付き）
slide.addShape(pres.shapes.LINE, {
  x: LOOP_LEFT_X, y: LOOP_Y, w: 0, h: -(LOOP_Y - (BOX_Y + BOX_H)),
  line: { color: COL.DASHED_ARROW, width: 1.5, dashType: "dash", endArrowType: "triangle" },
});

// ─── ボトムバー ────────────────────────────────────────────────
parts.addBottomBar(slide, pres, theme);

// ─── 出力 ──────────────────────────────────────────────────────
const outPath = path.resolve(
  __dirname,
  "../outputs/pptx/2026-04-10_value-chain-po-scope.pptx"
);
pres.writeFile({ fileName: outPath }).then(() => {
  console.log("Created:", outPath);
});
