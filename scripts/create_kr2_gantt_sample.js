// ============================================================
// Q1 ガントチャート サンプル
// ============================================================

const PptxGenJS = require("pptxgenjs");
const { getTheme, getFontPreset, parts, DEFAULTS } = require("./lib");

const theme = getTheme("dads");
const font = getFontPreset("dads");
const pres = new PptxGenJS();

const BREADCRUMB = "DPG OKR FY26  >  挑戦KR②  >  初回報告";
const OUTPUT = "outputs/pptx/2026-04-15_kr2-q1-gantt-sample.pptx";

// ============================================================
// ガントチャート描画関数
// ============================================================
function addGanttChart(slide, pres, theme, opts) {
  const {
    x, y, w, h,
    months,       // ["4月", "5月", "6月"]
    categories,   // [{ label, color, tasks: [{ name, start, end }] }]
    font: f = { jp: "Noto Sans JP", en: "Noto Sans JP" },
  } = opts;

  const labelW = 2.2;        // 左ラベル幅
  const chartX = x + labelW;
  const chartW = w - labelW;
  const headerH = 0.35;
  const catGap = 0.06;

  // --- 月数から1単位の幅を計算（半月単位 = months * 2） ---
  const totalUnits = months.length * 2; // 半月単位
  const unitW = chartW / totalUnits;

  // --- ヘッダー（月ラベル）---
  months.forEach((m, i) => {
    const mx = chartX + i * 2 * unitW;
    // 月ラベル背景
    slide.addShape(pres.shapes.RECTANGLE, {
      x: mx, y, w: unitW * 2, h: headerH,
      fill: { color: theme.P },
    });
    slide.addText(m, {
      x: mx, y, w: unitW * 2, h: headerH,
      fontSize: 11, bold: true, color: theme.WH, fontFace: f.jp,
      align: "center", valign: "middle", margin: 0,
    });
    // 前半/後半の区切り線
    slide.addShape(pres.shapes.RECTANGLE, {
      x: mx + unitW, y, w: 0.005, h: headerH,
      fill: { color: theme.WH },
    });
  });

  // 左上角（「施策」ラベル）
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w: labelW, h: headerH,
    fill: { color: theme.P },
  });
  slide.addText("施策", {
    x, y, w: labelW, h: headerH,
    fontSize: 11, bold: true, color: theme.WH, fontFace: f.jp,
    align: "center", valign: "middle", margin: 0,
  });

  // --- カテゴリごとに行を描画 ---
  let rowY = y + headerH + 0.08;

  categories.forEach((cat) => {
    const taskCount = cat.tasks.length;
    const rowH = 0.32;
    const taskGap = 0.04;
    const catH = taskCount * rowH + (taskCount - 1) * taskGap + 0.16;

    // カテゴリ背景帯
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: rowY, w: labelW - 0.06, h: catH,
      fill: { color: cat.color },
      rectRadius: 0.02,
    });
    slide.addText(cat.label, {
      x, y: rowY, w: labelW - 0.06, h: catH,
      fontSize: 11, bold: true, color: theme.WH, fontFace: f.jp,
      align: "center", valign: "middle", margin: 0,
    });

    // チャート背景（薄い帯）
    slide.addShape(pres.shapes.RECTANGLE, {
      x: chartX, y: rowY, w: chartW, h: catH,
      fill: { color: theme.CB },
    });

    // グリッド線（月区切り）
    months.forEach((_, i) => {
      if (i > 0) {
        slide.addShape(pres.shapes.RECTANGLE, {
          x: chartX + i * 2 * unitW, y: rowY, w: 0.005, h: catH,
          fill: { color: theme.S },
        });
      }
      // 半月区切り（点線的に薄く）
      slide.addShape(pres.shapes.RECTANGLE, {
        x: chartX + i * 2 * unitW + unitW, y: rowY, w: 0.003, h: catH,
        fill: { color: "E0E0E0" },
      });
    });

    // タスクバー描画
    cat.tasks.forEach((task, ti) => {
      const barY = rowY + 0.08 + ti * (rowH + taskGap);
      const barX = chartX + task.start * unitW;
      const barW = (task.end - task.start) * unitW;

      // バー
      slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: barX + 0.03, y: barY, w: barW - 0.06, h: rowH,
        fill: { color: cat.color },
        rectRadius: 0.02,
      });

      // タスク名（バー内 or 横）
      const textW = Math.max(barW - 0.1, 0.5);
      slide.addText(task.name, {
        x: barX + 0.08, y: barY, w: textW, h: rowH,
        fontSize: 10, color: theme.WH, fontFace: f.jp,
        align: "left", valign: "middle", margin: 0,
      });
    });

    rowY += catH + catGap;
  });

  // 「今」マーカー（4月中旬 = unit 1 あたり）
  const nowX = chartX + 0.8 * unitW;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: nowX, y: y + headerH, w: 0.015, h: rowY - (y + headerH),
    fill: { color: theme.ACCENTS[3] },
  });
  slide.addText("今", {
    x: nowX - 0.15, y: y + headerH - 0.01, w: 0.32, h: 0.2,
    fontSize: 9, bold: true, color: theme.ACCENTS[3], fontFace: f.jp,
    align: "center", valign: "middle", margin: 0,
  });
}

// ============================================================
// スライド
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addHeader(slide, pres, theme, { breadcrumb: BREADCRUMB, font });
  parts.addSlideTitle(slide, pres, theme, {
    title: "Q1（4-6月）の施策スケジュール",
    font,
  });
  parts.addBottomBar(slide, pres, theme);

  // start/end: 半月単位（0=4月前半, 1=4月後半, 2=5月前半, ... 5=6月後半）
  addGanttChart(slide, pres, theme, {
    x: 0.4, y: 1.25, w: 9.2, h: 4.1,
    months: ["4月", "5月", "6月"],
    categories: [
      {
        label: "共通基盤",
        color: theme.P,
        tasks: [
          { name: "工程整理・計測設計", start: 0, end: 2 },
          { name: "Naikist計測仕組み開発", start: 1, end: 4 },
          { name: "他チームNotion計測開始", start: 3, end: 6 },
          { name: "ベースライン確定", start: 5, end: 6 },
        ],
      },
      {
        label: "入口品質",
        color: theme.ACCENTS[0],
        tasks: [
          { name: "外部講師レクチャー", start: 0, end: 2 },
          { name: "継続支援・定着", start: 2, end: 6 },
        ],
      },
      {
        label: "フロー効率",
        color: theme.ACCENTS[1],
        tasks: [
          { name: "チーム構成検討・設計", start: 0, end: 2 },
          { name: "フィーチャーチーム移行", start: 2, end: 5 },
        ],
      },
      {
        label: "学習ループ",
        color: theme.ACCENTS[2],
        tasks: [
          { name: "ログテンプレート設計", start: 1, end: 3 },
          { name: "検証ログ運用開始", start: 3, end: 6 },
        ],
      },
    ],
    font,
  });
}

// ============================================================
// 出力
// ============================================================
pres.writeFile({ fileName: OUTPUT }).then(() => {
  console.log(`Created: ${OUTPUT}`);
});
