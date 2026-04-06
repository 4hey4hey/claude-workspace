"use strict";
const PptxGenJS = require("pptxgenjs");

const pres = new PptxGenJS();
pres.title = "作らせるな、埋めさせろ";

// ─── カラー・フォント定数（corporate テーマ / cowork_guide 準拠）──────────
const JA      = "Meiryo";
const EN      = "Arial";
const P       = "004098"; // プライマリ（ネイビー）
const A       = "DC2626"; // アクセント（レッド）
const S       = "CADCFC"; // セパレータ（ライトブルー）
const CB      = "EEF3FA"; // カード背景
const DT      = "1A1A2E"; // 本文テキスト
const ST      = "444466"; // サブテキスト
const WH      = "FFFFFF"; // 白
const WarnBG  = "FFF5F5"; // 警告カード背景
const MULTI   = ["004098", "065A82", "1C7293", "36454F"]; // マルチアクセント

// ─── 共通ヘルパー ──────────────────────────────────────────────────────────

/** ボトムバー（全スライド必須） */
function addBottomBar(slide) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.56, w: 8.0, h: 0.065,
    fill: { color: P }, line: { color: P },
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 8.0, y: 5.56, w: 2.0, h: 0.065,
    fill: { color: A }, line: { color: A },
  });
}

/** ヘッダー（パンくず + 区切り線） */
function addHeader(slide, breadcrumb) {
  slide.addText(breadcrumb, {
    x: 0.4, y: 0.08, w: 9.2, h: 0.22,
    fontSize: 9, color: P, fontFace: JA,
    align: "left", valign: "middle", margin: 0,
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0.34, w: 10, h: 0.01,
    fill: { color: S }, line: { color: S },
  });
}

/** スライドタイトル（主張文 + 区切り線） */
function addSlideTitle(slide, title) {
  slide.addText(title, {
    x: 0.4, y: 0.42, w: 9.2, h: 0.65,
    fontSize: 22, bold: true, color: P, fontFace: JA,
    align: "left", valign: "middle", margin: 0,
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 1.15, w: 10, h: 0.015,
    fill: { color: S }, line: { color: S },
  });
}

/** 左縦バー型カード（cowork_guide P3/P8 パターン） */
function addBarCard(slide, opts) {
  const { x, y, w, h, accent, title, body, bullets } = opts;
  const ac = accent || P;
  // カード背景
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h, fill: { color: CB },
  });
  // 左縦バー
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w: 0.05, h, fill: { color: ac },
  });
  // タイトル
  if (title) {
    slide.addText(title, {
      x: x + 0.2, y: y + 0.12, w: w - 0.3, h: 0.38,
      fontSize: 13, bold: true, color: ac, fontFace: JA,
      align: "left", valign: "middle",
    });
  }
  // 本文テキスト
  if (body) {
    const bodyY = title ? y + 0.52 : y + 0.14;
    slide.addText(body, {
      x: x + 0.2, y: bodyY, w: w - 0.3, h: h - (title ? 0.65 : 0.25),
      fontSize: 11, color: DT, fontFace: JA,
      align: "left", valign: "top", lineSpacingMultiple: 1.5,
    });
  }
  // 箇条書き（小正方形ドット）
  if (bullets) {
    const bStartY = title ? y + 0.52 : y + 0.14;
    bullets.forEach((b, bi) => {
      const bY = bStartY + bi * 0.44;
      slide.addShape(pres.shapes.RECTANGLE, {
        x: x + 0.2, y: bY + 0.15, w: 0.08, h: 0.08, fill: { color: ac },
      });
      slide.addText(b, {
        x: x + 0.38, y: bY, w: w - 0.5, h: 0.42,
        fontSize: 11, color: DT, fontFace: JA,
        align: "left", valign: "middle",
      });
    });
  }
}

/** 情報ボックス（ブルー系） */
function addInfoBox(slide, text, y, h = 0.55) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y, w: 9.2, h,
    fill: { color: CB }, line: { color: P, width: 0.75 },
  });
  slide.addText(text, {
    x: 0.6, y, w: 8.8, h,
    fontSize: 13, bold: true, color: P, fontFace: JA,
    align: "left", valign: "middle", lineSpacingMultiple: 1.4,
  });
}

/** セクション区切りスライド（大番号 + タイトル + トピック行） */
function addSectionSlide(slide, num, section, topics) {
  addBottomBar(slide);
  // 大きな番号（背景要素）
  slide.addText(num, {
    x: 0.4, y: 1.3, w: 1.4, h: 1.5,
    fontSize: 72, bold: true, color: S, fontFace: EN,
    align: "center", valign: "middle",
  });
  // セクション名
  slide.addText(section, {
    x: 1.9, y: 1.65, w: 7.6, h: 0.75,
    fontSize: 32, bold: true, color: P, fontFace: JA,
    align: "left", valign: "middle",
  });
  // レッドアクセントライン
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 1.9, y: 2.48, w: 3.0, h: 0.015, fill: { color: A },
  });
  // トピック行
  topics.forEach((t, i) => {
    const ty = 2.7 + i * 0.86;
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.4, y: ty, w: 9.2, h: 0.68, fill: { color: CB },
    });
    slide.addShape(pres.shapes.OVAL, {
      x: 0.58, y: ty + 0.18, w: 0.32, h: 0.32, fill: { color: P },
    });
    slide.addText(String(i + 1), {
      x: 0.58, y: ty + 0.18, w: 0.32, h: 0.32,
      fontSize: 11, bold: true, color: WH, fontFace: EN,
      align: "center", valign: "middle",
    });
    slide.addText(t, {
      x: 1.05, y: ty, w: 8.2, h: 0.68,
      fontSize: 14, color: DT, fontFace: JA,
      align: "left", valign: "middle",
    });
  });
}

// ======================================================================
// P1: 表紙
// ======================================================================
{
  const slide = pres.addSlide();
  addBottomBar(slide);

  slide.addText("Claude Code & AI スライド作成", {
    x: 0.5, y: 1.2, w: 9.0, h: 0.5,
    fontSize: 16, color: ST, fontFace: EN,
    align: "left", valign: "middle",
  });
  slide.addText("作らせるな、埋めさせろ。", {
    x: 0.5, y: 1.7, w: 9.0, h: 0.85,
    fontSize: 44, bold: true, color: P, fontFace: JA,
    align: "left", valign: "middle",
  });
  slide.addText("20回失敗して行き着いた成功手順をすべて書く", {
    x: 0.5, y: 2.62, w: 9.0, h: 0.65,
    fontSize: 26, color: ST, fontFace: JA,
    align: "left", valign: "middle",
  });
  // レッドアクセントライン
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.4, w: 4.0, h: 0.015, fill: { color: A },
  });
  slide.addText("問題発見 / 気づき / 方法論 / 実践結果 / まとめ", {
    x: 0.5, y: 3.5, w: 9.0, h: 0.4,
    fontSize: 13, color: ST, fontFace: JA,
    align: "left", valign: "middle",
  });
  slide.addText("2026.04", {
    x: 0.5, y: 4.9, w: 3.0, h: 0.3,
    fontSize: 11, color: ST, fontFace: EN,
    align: "left", valign: "middle",
  });
}

// ======================================================================
// P2: セクション区切り — 01. 問題発見
// ======================================================================
{
  const slide = pres.addSlide();
  addSectionSlide(slide, "01", "問題発見", [
    "テンプレを渡したのに、使えないスライドが出てきた",
    "プロンプトを詳しくしたら、余計にカオスになった",
  ]);
}

// ======================================================================
// P3: テンプレを渡したのに使えないスライドが出てきた
// ======================================================================
{
  const slide = pres.addSlide();
  addBottomBar(slide);
  addHeader(slide, "作らせるな、埋めさせろ  |  01. 問題発見");
  addSlideTitle(slide, "テンプレを渡したのに、使えないスライドが出てきた");

  slide.addText("営業スライドテンプレをコピーし、見た目を整えてAIに渡した。「商談用にスライドを作って」と指示。", {
    x: 0.4, y: 1.32, w: 9.2, h: 0.45,
    fontSize: 13, color: DT, fontFace: JA,
    align: "left", valign: "middle", lineSpacingMultiple: 1.5,
  });

  const cw = 4.3;
  const gap = 0.4;
  const cy = 1.9;
  const ch = 3.2;

  addBarCard(slide, {
    x: 0.4, y: cy, w: cw, h: ch,
    accent: MULTI[1],
    title: "やったこと",
    bullets: [
      "営業スライドテンプレをコピー",
      "見た目を整えてAIに渡した",
      "「商談用に作って」と指示",
    ],
  });
  addBarCard(slide, {
    x: 0.4 + cw + gap, y: cy, w: cw, h: ch,
    accent: A,
    title: "結果",
    bullets: [
      "見た目は整っている",
      "ストーリーが通らない",
      "「で、何が言いたいの？」",
      "修正に2時間。自分で\n作ったほうが早い。",
    ],
  });
}

// ======================================================================
// P4: プロンプトを詳しくしたら余計にカオスになった
// ======================================================================
{
  const slide = pres.addSlide();
  addBottomBar(slide);
  addHeader(slide, "作らせるな、埋めさせろ  |  01. 問題発見");
  addSlideTitle(slide, "プロンプトを詳しくしたら、余計にカオスになった");

  // タイムライン横ステップ
  const steps = [
    { ver: "v3",  label: "シンプル指示",  desc: "「スライド作って」\nストーリー散漫" },
    { ver: "v10", label: "詳細指示",      desc: "「課題→提案→効果の順で」\n1枚に詰め込みすぎ" },
    { ver: "v12", label: "さらに追加",    desc: "「1ページ1メッセージ」\n根本的に変わらず" },
  ];
  const tw = 2.7;
  const tgap = 0.3;
  const txStart = 0.6;
  const tyBase = 1.5;

  // 横線
  slide.addShape(pres.shapes.RECTANGLE, {
    x: txStart, y: tyBase + 0.65, w: tw * 3 + tgap * 2, h: 0.025,
    fill: { color: S },
  });

  steps.forEach((s, i) => {
    const sx = txStart + i * (tw + tgap);
    const ac = MULTI[i];
    // タイムラインドット
    slide.addShape(pres.shapes.OVAL, {
      x: sx + tw / 2 - 0.1, y: tyBase + 0.57, w: 0.2, h: 0.2,
      fill: { color: ac },
    });
    // バージョン
    slide.addText(s.ver, {
      x: sx, y: tyBase, w: tw, h: 0.4,
      fontSize: 20, bold: true, color: ac, fontFace: EN,
      align: "center", valign: "bottom",
    });
    // カード
    slide.addShape(pres.shapes.RECTANGLE, {
      x: sx, y: tyBase + 0.9, w: tw, h: 2.0, fill: { color: CB },
    });
    slide.addShape(pres.shapes.RECTANGLE, {
      x: sx, y: tyBase + 0.9, w: tw, h: 0.38, fill: { color: ac },
    });
    slide.addText(s.label, {
      x: sx, y: tyBase + 0.9, w: tw, h: 0.38,
      fontSize: 13, bold: true, color: WH, fontFace: JA,
      align: "center", valign: "middle",
    });
    slide.addText(s.desc, {
      x: sx + 0.15, y: tyBase + 1.35, w: tw - 0.3, h: 1.45,
      fontSize: 12, color: DT, fontFace: JA,
      align: "center", valign: "top", lineSpacingMultiple: 1.5,
    });
    // 矢印
    if (i < steps.length - 1) {
      slide.addText("\u2192", {
        x: sx + tw, y: tyBase + 0.5, w: tgap, h: 0.3,
        fontSize: 16, color: ST, fontFace: EN,
        align: "center", valign: "middle",
      });
    }
  });

  // 警告メッセージ
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 4.55, w: 9.2, h: 0.38, fill: { color: A },
  });
  slide.addText("指示を増やすほど、AIは律儀に全部入れようとして破綻する。問題はプロンプトの量ではなかった。", {
    x: 0.6, y: 4.55, w: 8.8, h: 0.38,
    fontSize: 12, bold: true, color: WH, fontFace: JA,
    align: "left", valign: "middle",
  });
}

// ======================================================================
// P5: セクション区切り — 02. 気づき
// ======================================================================
{
  const slide = pres.addSlide();
  addSectionSlide(slide, "02", "気づき", [
    "足りなかったのは「見た目」ではなく「中身の設計」だった",
    "テンプレには「見た目テンプレ」と「設計テンプレ」の2種類がある",
  ]);
}

// ======================================================================
// P6: 足りなかったのは「中身の設計」だった
// ======================================================================
{
  const slide = pres.addSlide();
  addBottomBar(slide);
  addHeader(slide, "作らせるな、埋めさせろ  |  02. 気づき");
  addSlideTitle(slide, "足りなかったのは「見た目」ではなく「中身の設計」だった");

  slide.addText("テンプレには「見た目テンプレ」と「設計テンプレ」の2種類がある。多くの人は見た目だけ渡して、設計をAIに丸投げしていた。", {
    x: 0.4, y: 1.32, w: 9.2, h: 0.5,
    fontSize: 13, color: DT, fontFace: JA,
    align: "left", valign: "middle", lineSpacingMultiple: 1.5,
  });

  // ピラミッド（3階層ボックス）
  const levels = [
    { label: "ゴール",      desc: "誰に何を判断してもらうか",   color: MULTI[0] },
    { label: "設計テンプレ", desc: "各ページの主張・順番・結論", color: MULTI[1] },
    { label: "見た目テンプレ", desc: "色・フォント・配置・ロゴ", color: MULTI[2] },
  ];
  const centerX = 5.0;
  const pyStart = 2.05;
  const pyRowH  = 0.72;
  const pyGap   = 0.10;

  levels.forEach((lv, i) => {
    const ratio = 0.42 + 0.58 * (i / 2);
    const bw = 6.8 * ratio;
    const bx = centerX - bw / 2;
    const by = pyStart + i * (pyRowH + pyGap);
    slide.addShape(pres.shapes.RECTANGLE, {
      x: bx, y: by, w: bw, h: pyRowH,
      fill: { color: lv.color },
    });
    slide.addText(`${lv.label}  ─  ${lv.desc}`, {
      x: bx + 0.2, y: by, w: bw - 0.4, h: pyRowH,
      fontSize: 13, bold: i === 0, color: WH, fontFace: JA,
      align: "center", valign: "middle",
    });
  });

  // 注釈
  slide.addText("多くの人は最下層だけ渡して、上2層をAIに丸投げしていた", {
    x: 0.4, y: 4.82, w: 9.2, h: 0.3,
    fontSize: 13, bold: true, color: A, fontFace: JA,
    align: "center", valign: "middle",
  });
}

// ======================================================================
// P7: テンプレには2種類ある — 比較テーブル
// ======================================================================
{
  const slide = pres.addSlide();
  addBottomBar(slide);
  addHeader(slide, "作らせるな、埋めさせろ  |  02. 気づき");
  addSlideTitle(slide, "テンプレには「見た目テンプレ」と「設計テンプレ」の2種類がある");

  // 3列比較テーブル
  const cols = [
    { x: 0.4,  w: 2.6 },
    { x: 3.0,  w: 3.2 },
    { x: 6.2,  w: 3.4 },
  ];
  const headers = ["比較項目", "見た目テンプレ", "設計テンプレ"];
  const headerColors = [P, MULTI[1], P];
  const rows = [
    ["含まれるもの", "色・フォント・ロゴ・配置", "主張・順番・結論・ゴール"],
    ["渡した経験",   "ほとんどの人がある",         "ほとんどの人がない"],
    ["AIへの影響",   "見た目は整う",               "ストーリーが通る"],
    ["欠けると",     "個性がない",                 "使えない資料になる"],
  ];
  const rowH = 0.55;
  const headerH = 0.55;
  const startY = 1.35;

  // ヘッダー行
  headers.forEach((h, ci) => {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: cols[ci].x, y: startY, w: cols[ci].w, h: headerH,
      fill: { color: headerColors[ci] },
    });
    slide.addText(h, {
      x: cols[ci].x + 0.1, y: startY, w: cols[ci].w - 0.2, h: headerH,
      fontSize: 12, bold: true, color: WH, fontFace: JA,
      align: "center", valign: "middle",
    });
  });

  // データ行
  rows.forEach((row, ri) => {
    const ry = startY + headerH + ri * rowH;
    const bg0 = ri % 2 === 0 ? CB : WH;
    row.forEach((cell, ci) => {
      slide.addShape(pres.shapes.RECTANGLE, {
        x: cols[ci].x, y: ry, w: cols[ci].w, h: rowH,
        fill: { color: ci === 2 ? (ri % 2 === 0 ? "E8F4ED" : WH) : bg0 },
        line: { color: "E0E0E0", width: 0.3 },
      });
      slide.addText(cell, {
        x: cols[ci].x + 0.1, y: ry, w: cols[ci].w - 0.2, h: rowH,
        fontSize: 12, bold: ci === 2, color: ci === 2 ? MULTI[2] : DT, fontFace: JA,
        align: ci === 0 ? "left" : "center", valign: "middle",
      });
    });
  });

  slide.addText("設計テンプレがない状態でAIにスライドを作らせることは、目的地を伝えずにカーナビを操作するようなもの。", {
    x: 0.4, y: 4.88, w: 9.2, h: 0.28,
    fontSize: 10, color: ST, fontFace: JA, align: "left", valign: "middle",
  });
}

// ======================================================================
// P8: セクション区切り — 03. 方法論
// ======================================================================
{
  const slide = pres.addSlide();
  addSectionSlide(slide, "03", "方法論", [
    "設計テンプレは3ステップで作れる",
    "AIへの渡し方を「作って」から「埋めて」に変える",
  ]);
}

// ======================================================================
// P9: 設計テンプレは3ステップで作れる
// ======================================================================
{
  const slide = pres.addSlide();
  addBottomBar(slide);
  addHeader(slide, "作らせるな、埋めさせろ  |  03. 方法論");
  addSlideTitle(slide, "設計テンプレは3ステップで作れる");

  slide.addText("「作って」ではなく「埋めて」。各ステップでユーザーの確認を取ってから次に進む。", {
    x: 0.4, y: 1.32, w: 9.2, h: 0.35,
    fontSize: 13, color: DT, fontFace: JA,
    align: "left", valign: "middle",
  });

  // 3カード（ヘッダーバー型）
  const steps = [
    { num: "STEP 1", title: "ゴールを\n1行で書く",    desc: "この資料で誰に何を\n判断してもらうか" },
    { num: "STEP 2", title: "主張だけ\n先に並べる",   desc: "タイトルだけ読んで\nストーリーが通るか確認" },
    { num: "STEP 3", title: "「だから何？」\nを足す", desc: "データに結論を1行追加\nこれは人間の仕事" },
  ];
  const sw = 2.85;
  const sgap = 0.17;
  const sxStart = (10 - sw * 3 - sgap * 2) / 2;
  const sy = 1.78;
  const sh = 3.25;

  steps.forEach((s, i) => {
    const sx = sxStart + i * (sw + sgap);
    const ac = MULTI[i];

    // カード背景
    slide.addShape(pres.shapes.RECTANGLE, {
      x: sx, y: sy, w: sw, h: sh, fill: { color: CB },
    });
    // 上部ヘッダーバー
    slide.addShape(pres.shapes.RECTANGLE, {
      x: sx, y: sy, w: sw, h: 0.42, fill: { color: ac },
    });
    slide.addText(s.num, {
      x: sx, y: sy, w: sw, h: 0.42,
      fontSize: 13, bold: true, color: WH, fontFace: EN,
      align: "center", valign: "middle",
    });
    // タイトル
    slide.addText(s.title, {
      x: sx + 0.15, y: sy + 0.55, w: sw - 0.3, h: 1.0,
      fontSize: 18, bold: true, color: ac, fontFace: JA,
      align: "center", valign: "middle", lineSpacingMultiple: 1.3,
    });
    // 区切り線
    slide.addShape(pres.shapes.RECTANGLE, {
      x: sx + 0.4, y: sy + 1.62, w: sw - 0.8, h: 0.012, fill: { color: S },
    });
    // 説明
    slide.addText(s.desc, {
      x: sx + 0.15, y: sy + 1.78, w: sw - 0.3, h: 1.25,
      fontSize: 13, color: ST, fontFace: JA,
      align: "center", valign: "top", lineSpacingMultiple: 1.5,
    });
    // 矢印
    if (i < steps.length - 1) {
      slide.addText("\u2192", {
        x: sx + sw, y: sy + sh / 2 - 0.2, w: sgap, h: 0.4,
        fontSize: 16, color: ST, fontFace: EN,
        align: "center", valign: "middle",
      });
    }
  });
}

// ======================================================================
// P10: AIへの渡し方を変える — 縦フロー
// ======================================================================
{
  const slide = pres.addSlide();
  addBottomBar(slide);
  addHeader(slide, "作らせるな、埋めさせろ  |  03. 方法論");
  addSlideTitle(slide, "AIへの渡し方を「作って」から「埋めて」に変える");

  const flowX    = 1.2;
  const flowW    = 7.6;
  const fRowH    = 0.72;
  const fGap     = 0.28;
  const fStartY  = 1.38;
  const flowSteps = [
    { title: "Step 1: 設計テンプレの壁打ち",  desc: "主張の並びをAIにレビューさせる。ストーリーの抜け漏れを確認。" },
    { title: "Step 2: ボディ要素の設計",        desc: "各ページに入れるべきデータ・グラフ・比較表をAIに提案させる。" },
    { title: "Step 3: テンプレートに挿入",      desc: "合意した構成でデータを「埋める」だけ。タイトルと主張は変えない。" },
  ];

  flowSteps.forEach((s, i) => {
    const fy = fStartY + i * (fRowH + fGap);
    const ac = MULTI[i];

    // 番号バッジ（丸）
    slide.addShape(pres.shapes.OVAL, {
      x: flowX - 0.52, y: fy + (fRowH - 0.36) / 2, w: 0.36, h: 0.36,
      fill: { color: ac },
    });
    slide.addText(String(i + 1), {
      x: flowX - 0.52, y: fy + (fRowH - 0.36) / 2, w: 0.36, h: 0.36,
      fontSize: 13, bold: true, color: WH, fontFace: EN,
      align: "center", valign: "middle",
    });

    // 行カード
    slide.addShape(pres.shapes.RECTANGLE, {
      x: flowX, y: fy, w: flowW, h: fRowH, fill: { color: CB },
      line: { color: ac, width: 0.75 },
    });
    // 縦仕切り線
    slide.addShape(pres.shapes.RECTANGLE, {
      x: flowX + 2.6, y: fy, w: 0.012, h: fRowH, fill: { color: S },
    });
    // ステップタイトル
    slide.addText(s.title, {
      x: flowX + 0.15, y: fy, w: 2.4, h: fRowH,
      fontSize: 13, bold: true, color: ac, fontFace: JA,
      align: "left", valign: "middle",
    });
    // 説明
    slide.addText(s.desc, {
      x: flowX + 2.75, y: fy, w: flowW - 2.9, h: fRowH,
      fontSize: 12, color: DT, fontFace: JA,
      align: "left", valign: "middle", lineSpacingMultiple: 1.4,
    });

    // 矢印
    if (i < flowSteps.length - 1) {
      slide.addText("\u25BC", {
        x: flowX + flowW / 2 - 0.2, y: fy + fRowH, w: 0.4, h: fGap,
        fontSize: 12, color: ST, fontFace: EN,
        align: "center", valign: "middle",
      });
    }
  });

  // ポイントボックス
  addInfoBox(slide, "ポイント：タイトルと「だから何？」のメッセージ方向性は、ユーザーの承認なしに変えない。", 4.82, 0.35);
}

// ======================================================================
// P11: 個別提案資料が10時間から30分になった
// ======================================================================
{
  const slide = pres.addSlide();
  addBottomBar(slide);
  addHeader(slide, "作らせるな、埋めさせろ  |  04. 実践結果");
  addSlideTitle(slide, "個別提案資料の作成が10時間から30分になった");

  slide.addText("変わったのはAIの性能ではない。渡し方を変えただけ。", {
    x: 0.4, y: 1.32, w: 9.2, h: 0.35,
    fontSize: 13, color: DT, fontFace: JA,
    align: "left", valign: "middle",
  });

  // 3つのメトリクスカード
  const metrics = [
    { num: "10h",  label: "変更前の所要時間", color: ST },
    { num: "30min",label: "変更後の所要時間", color: MULTI[0] },
    { num: "95%",  label: "時間削減率",        color: MULTI[3] },
  ];
  const mw = 2.85;
  const mgap = 0.17;
  const mxStart = (10 - mw * 3 - mgap * 2) / 2;
  const my = 1.8;
  const mh = 2.35;

  metrics.forEach((m, i) => {
    const mx = mxStart + i * (mw + mgap);

    slide.addShape(pres.shapes.RECTANGLE, {
      x: mx, y: my, w: mw, h: mh, fill: { color: CB },
    });
    slide.addShape(pres.shapes.RECTANGLE, {
      x: mx, y: my, w: mw, h: 0.05, fill: { color: m.color },
    });
    slide.addText(m.num, {
      x: mx, y: my + 0.25, w: mw, h: mh * 0.5,
      fontSize: 44, bold: true, color: m.color, fontFace: EN,
      align: "center", valign: "bottom",
    });
    slide.addText(m.label, {
      x: mx + 0.15, y: my + mh * 0.62, w: mw - 0.3, h: 0.6,
      fontSize: 13, color: ST, fontFace: JA,
      align: "center", valign: "middle",
    });
  });

  addInfoBox(slide, "手修正5分で商談に持っていけるレベル。見た目テンプレ設計は初回1日だが、2回目以降は使い回せる。", 4.42, 0.6);
}

// ======================================================================
// P12: AIはノウハウを言葉にすることを強制してくれた
// ======================================================================
{
  const slide = pres.addSlide();
  addBottomBar(slide);
  addHeader(slide, "作らせるな、埋めさせろ  |  04. 実践結果");
  addSlideTitle(slide, "AIはノウハウを言葉にすることを強制してくれた");

  slide.addText("設計テンプレを作るのに1日かかった。しかし一度作れば組織の武器になる。", {
    x: 0.4, y: 1.32, w: 9.2, h: 0.35,
    fontSize: 13, color: DT, fontFace: JA,
    align: "left", valign: "middle",
  });

  const cw = 4.3;
  const gap = 0.4;
  const cy = 1.82;
  const ch = 3.15;

  addBarCard(slide, {
    x: 0.4, y: cy, w: cw, h: ch,
    accent: MULTI[0],
    title: "型は組織の武器になる",
    bullets: [
      "設計テンプレを1日で作成",
      "自分以外も同じ品質のスライドが\n作れる",
      "CS定例用フォーマットにも横展開",
    ],
  });
  addBarCard(slide, {
    x: 0.4 + cw + gap, y: cy, w: cw, h: ch,
    accent: MULTI[2],
    title: "AIに預けすぎない",
    bullets: [
      "AIはあまりに頭が良く設計すら\nやってくれる",
      "顧客を考える時間は\n人間に残すべき",
      "自信を持って商談に臨める",
    ],
  });
}

// ======================================================================
// P13: まとめ（Summary Row Table スタイル）
// ======================================================================
{
  const slide = pres.addSlide();
  addBottomBar(slide);

  // 見出し
  slide.addText("まとめ", {
    x: 0.5, y: 0.5, w: 9.0, h: 0.55,
    fontSize: 28, bold: true, color: P, fontFace: JA,
    align: "left", valign: "middle",
  });
  // レッドアクセントライン
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.12, w: 3.5, h: 0.015, fill: { color: A },
  });

  // サマリー行テーブル（ラベルセル + コンテンツセル）
  const summaryRows = [
    {
      label: "問題",
      content: "見た目テンプレだけ渡してAIに「作って」と言うから、ストーリーが通らない資料になる",
    },
    {
      label: "気づき",
      content: "設計テンプレ（ゴール・主張の並び・だから何？）が抜けていた。AIに投げる前に人間が決める",
    },
    {
      label: "方法論",
      content: "3ステップで設計テンプレを作り、AIは「埋める」だけにする。タイトルと結論はユーザーが承認",
    },
    {
      label: "結果",
      content: "10時間 → 30分。型が組織の資産になり、誰でも同じ品質のスライドを作れるようになった",
    },
  ];

  const labelW   = 1.4;
  const labelX   = 0.5;
  const contentX = labelX + labelW + 0.08;
  const contentW = 8.0;
  const rowH     = 0.72;
  const startY   = 1.35;
  const rowGap   = 0.09;

  summaryRows.forEach((row, i) => {
    const ry = startY + i * (rowH + rowGap);
    // ラベルセル
    slide.addShape(pres.shapes.RECTANGLE, {
      x: labelX, y: ry, w: labelW, h: rowH, fill: { color: P },
    });
    slide.addText(row.label, {
      x: labelX, y: ry, w: labelW, h: rowH,
      fontSize: 12, bold: true, color: WH, fontFace: JA,
      align: "center", valign: "middle",
    });
    // コンテンツセル
    slide.addShape(pres.shapes.RECTANGLE, {
      x: contentX, y: ry, w: contentW, h: rowH, fill: { color: CB },
    });
    slide.addText(row.content, {
      x: contentX + 0.15, y: ry, w: contentW - 0.2, h: rowH,
      fontSize: 12, color: DT, fontFace: JA,
      align: "left", valign: "middle", lineSpacingMultiple: 1.4,
    });
  });
}

// ======================================================================
// 出力
// ======================================================================
pres.writeFile({ fileName: "outputs/pptx/dont_create_fill.pptx" })
  .then(() => console.log("Done: outputs/pptx/dont_create_fill.pptx (13 slides, corporate theme)"))
  .catch((err) => console.error("Error:", err));
