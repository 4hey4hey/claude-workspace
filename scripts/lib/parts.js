// ============================================================
// 再利用パーツライブラリ
// 全関数のシグネチャ: (slide, pres, theme, opts)
// theme は themes.js のトークンオブジェクト
// ============================================================

const { DEFAULTS, SLIDE } = require("./layout");
const { getFontSize } = require("./fonts");

// ─── ヘルパー ──────────────────────────────────────────────

function makeShadow(opacity = 0.08) {
  return {
    type: "outer",
    blur: 4,
    offset: 2,
    angle: 135,
    color: "000000",
    opacity,
  };
}

// ─── 構造パーツ ────────────────────────────────────────────

/**
 * ボトムバー（全スライド必須のブランドライン）
 */
function addBottomBar(slide, pres, theme) {
  const y = DEFAULTS.bottomBarY;
  const h = DEFAULTS.bottomBarH;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0,
    y,
    w: SLIDE.W * 0.8,
    h,
    fill: { color: theme.P },
    line: { color: theme.P },
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: SLIDE.W * 0.8,
    y,
    w: SLIDE.W * 0.2,
    h,
    fill: { color: theme.A },
    line: { color: theme.A },
  });
}

/**
 * ヘッダー（パンくず + セパレータ）
 * @param {object} opts
 * @param {string} opts.breadcrumb - パンくずテキスト
 * @param {object} [opts.font] - フォントプリセット { jp, en }
 */
function addHeader(slide, pres, theme, opts = {}) {
  const { breadcrumb = "", font = { jp: "Meiryo" } } =
    typeof opts === "string" ? { breadcrumb: opts } : opts;
  slide.addText(breadcrumb, {
    x: 0.4,
    y: 0.08,
    w: 9.2,
    h: 0.22,
    fontSize: 9,
    color: theme.ST,
    fontFace: font.jp,
    align: "left",
    valign: "middle",
    margin: 0,
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0,
    y: 0.34,
    w: SLIDE.W,
    h: 0.01,
    fill: { color: theme.S },
    line: { color: theme.S },
  });
}

/**
 * スライドタイトル（主張文 + セパレータ）
 * @param {object} opts
 * @param {string} opts.title - 主張文
 * @param {object} [opts.font] - フォントプリセット { jp, en }
 */
function addSlideTitle(slide, pres, theme, opts = {}) {
  const { title = "", font = { jp: "Meiryo" } } =
    typeof opts === "string" ? { title: opts } : opts;
  slide.addText(title, {
    x: 0.4,
    y: 0.42,
    w: 9.2,
    h: 0.65,
    fontSize: 22,
    bold: true,
    color: theme.DT,
    fontFace: font.jp,
    align: "left",
    valign: "middle",
    margin: 0,
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0,
    y: 1.15,
    w: SLIDE.W,
    h: 0.01,
    fill: { color: theme.S },
    line: { color: theme.S },
  });
}

/**
 * 表紙タイトル（上部バンド + タイトル + サブタイトル + 日付）
 * @param {object} opts
 * @param {string} opts.title
 * @param {string} [opts.subtitle]
 * @param {string} [opts.date]
 * @param {string} [opts.author]
 * @param {object} [opts.font]
 */
function addCoverTitle(slide, pres, theme, opts = {}) {
  const {
    title,
    subtitle,
    date,
    author,
    font = { jp: "Meiryo", en: "Arial" },
  } = opts;

  // 上部アクセントバンド（薄く控えめ — スライド高さの14%以下）
  const bandH = 0.8;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0,
    y: 0,
    w: SLIDE.W,
    h: bandH,
    fill: { color: theme.P },
  });

  // アクセントライン（バンド直下）
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.6,
    y: bandH,
    w: 1.2,
    h: 0.04,
    fill: { color: theme.A },
  });

  // タイトル（白エリアにダーク色で配置）
  slide.addText(title, {
    x: 0.6,
    y: 1.2,
    w: 8.8,
    h: 1.6,
    fontSize: 36,
    bold: true,
    color: theme.P,
    fontFace: font.jp,
    align: "left",
    valign: "middle",
    margin: 0,
    lineSpacingMultiple: 1.2,
  });

  // サブタイトル
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.6,
      y: 2.9,
      w: 8.8,
      h: 0.5,
      fontSize: 16,
      color: theme.ST,
      fontFace: font.jp,
      align: "left",
      valign: "top",
      margin: 0,
    });
  }

  // 日付・著者（下部）
  const infoY = 3.7;
  if (date) {
    slide.addText(date, {
      x: 0.6,
      y: infoY,
      w: 4,
      h: 0.3,
      fontSize: 12,
      color: theme.ST,
      fontFace: font.en,
      align: "left",
      valign: "middle",
    });
  }
  if (author) {
    slide.addText(author, {
      x: 0.6,
      y: infoY + 0.3,
      w: 4,
      h: 0.3,
      fontSize: 12,
      color: theme.ST,
      fontFace: font.jp,
      align: "left",
      valign: "middle",
    });
  }
}

// ─── カード・ボックスパーツ ────────────────────────────────

/**
 * カード（角丸矩形 + アクセントバー + タイトル + 本文）
 * @param {object} opts
 * @param {number} opts.x, opts.y, opts.w, opts.h
 * @param {string} [opts.accentColor] - 上部バーの色（省略時 theme.P）
 * @param {string} [opts.title]
 * @param {string} [opts.body]
 * @param {object} [opts.font]
 */
function addCard(slide, pres, theme, opts = {}) {
  const {
    x,
    y,
    w,
    h,
    accentColor,
    title,
    body,
    font = { jp: "Meiryo" },
  } = opts;
  const ac = accentColor || theme.P;

  // カード背景
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x,
    y,
    w,
    h,
    fill: { color: theme.CB },
    rectRadius: 0.03,
    shadow: makeShadow(),
  });

  // アクセントバー
  slide.addShape(pres.shapes.RECTANGLE, {
    x: x + 0.02,
    y,
    w: w - 0.04,
    h: 0.06,
    fill: { color: ac },
  });

  // タイトル
  if (title) {
    slide.addText(title, {
      x: x + 0.15,
      y: y + 0.15,
      w: w - 0.3,
      h: 0.4,
      fontSize: 14,
      bold: true,
      color: ac,
      fontFace: font.jp,
      align: "left",
      valign: "top",
      margin: 0,
    });
  }

  // 本文
  if (body) {
    const bodyY = title ? y + 0.55 : y + 0.2;
    const bodyH = h - (title ? 0.7 : 0.35);
    slide.addText(body, {
      x: x + 0.15,
      y: bodyY,
      w: w - 0.3,
      h: bodyH,
      fontSize: 13,
      color: theme.DT,
      fontFace: font.jp,
      align: "left",
      valign: "top",
      margin: 0,
      lineSpacingMultiple: 1.5,
    });
  }
}

/**
 * メトリクスカード（大数字 + ラベル + 出典）
 * @param {object} opts
 * @param {number} opts.x, opts.y, opts.w, opts.h
 * @param {string} opts.number - 表示数値
 * @param {string} [opts.unit] - 単位
 * @param {string} opts.label - ラベル
 * @param {string} [opts.source] - 出典
 * @param {string} [opts.accentColor]
 * @param {number} [opts.columns=3] - フォントサイズ決定用カラム数
 * @param {object} [opts.font]
 */
function addMetricCard(slide, pres, theme, opts = {}) {
  const {
    x,
    y,
    w,
    h,
    number,
    unit,
    label,
    source,
    accentColor,
    columns = 3,
    font = { jp: "Meiryo", en: "Arial" },
  } = opts;
  const ac = accentColor || theme.P;

  // カード背景
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x,
    y,
    w,
    h,
    fill: { color: theme.CB },
    rectRadius: 0.03,
    shadow: makeShadow(),
  });

  // 数値
  const numParts = [
    {
      text: number,
      options: {
        fontSize: getFontSize("metric", columns),
        bold: true,
        color: ac,
        fontFace: font.en,
      },
    },
  ];
  if (unit) {
    numParts.push({
      text: unit,
      options: {
        fontSize: getFontSize("metricUnit", columns),
        color: ac,
        fontFace: font.en,
      },
    });
  }
  slide.addText(numParts, {
    x: x + 0.1,
    y: y + 0.1,
    w: w - 0.2,
    h: h * 0.5,
    align: "center",
    valign: "bottom",
    margin: 0,
  });

  // ラベル
  slide.addText(label, {
    x: x + 0.1,
    y: y + h * 0.55,
    w: w - 0.2,
    h: h * 0.2,
    fontSize: getFontSize("metricLabel", columns),
    color: theme.ST,
    fontFace: font.jp,
    align: "center",
    valign: "middle",
    margin: 0,
  });

  // 出典
  if (source) {
    slide.addText(source, {
      x: x + 0.1,
      y: y + h * 0.78,
      w: w - 0.2,
      h: h * 0.15,
      fontSize: 8,
      color: theme.ST,
      fontFace: font.jp,
      align: "center",
      valign: "middle",
      margin: 0,
    });
  }
}

/**
 * 番号バッジ（丸に数字）
 */
function addNumberBadge(slide, pres, theme, opts = {}) {
  const { x, y, num, size = 0.32, color } = opts;
  const c = color || theme.P;
  slide.addShape(pres.shapes.OVAL, {
    x,
    y,
    w: size,
    h: size,
    fill: { color: c },
  });
  slide.addText(String(num), {
    x,
    y,
    w: size,
    h: size,
    fontSize: 13,
    bold: true,
    color: theme.WH,
    fontFace: "Arial",
    align: "center",
    valign: "middle",
    margin: 0,
  });
}

/**
 * テキストバッジ（ラベル付き小矩形）
 */
function addBadge(slide, pres, theme, opts = {}) {
  const {
    x,
    y,
    label,
    color,
    w = 1.2,
    h = 0.28,
    font = { jp: "Meiryo" },
  } = opts;
  const c = color || theme.P;
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x,
    y,
    w,
    h,
    fill: { color: c },
    rectRadius: 0.02,
  });
  slide.addText(label, {
    x,
    y,
    w,
    h,
    fontSize: 10,
    bold: true,
    color: theme.WH,
    fontFace: font.jp,
    align: "center",
    valign: "middle",
    margin: 0,
  });
}

/**
 * アラートボックス（警告/情報/エラー）
 * @param {object} opts
 * @param {number} opts.x, opts.y, opts.w, opts.h
 * @param {'warn'|'info'|'error'|'ok'} [opts.type='info']
 * @param {string} opts.text
 * @param {object} [opts.font]
 */
function addAlertBox(slide, pres, theme, opts = {}) {
  const { x, y, w, h, type = "info", text, font = { jp: "Meiryo" } } = opts;

  const styles = {
    warn: { bg: theme.WARN_BG, bd: theme.WARN_BD, tx: theme.WARN_TX },
    info: { bg: theme.INFO_BG, bd: theme.INFO_BD, tx: theme.INFO_TX },
    error: { bg: theme.ERROR_BG, bd: theme.ERROR_BD, tx: theme.ERROR_TX },
    ok: { bg: theme.OK_BG, bd: theme.OK_BD, tx: theme.OK_TX },
  };
  const s = styles[type] || styles.info;

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x,
    y,
    w,
    h,
    fill: { color: s.bg },
    line: { color: s.bd, width: 1 },
    rectRadius: 0.03,
  });
  slide.addText(text, {
    x: x + 0.15,
    y,
    w: w - 0.3,
    h,
    fontSize: 12,
    color: s.tx,
    fontFace: font.jp,
    align: "left",
    valign: "middle",
    margin: 0,
    lineSpacingMultiple: 1.4,
  });
}

/**
 * スタイル付きテーブル
 * @param {object} opts
 * @param {number} opts.x, opts.y, opts.w
 * @param {string[]} opts.headers - ヘッダー行テキスト
 * @param {string[][]} opts.rows - データ行
 * @param {number[]} [opts.colW] - 各列の幅（省略時均等）
 * @param {object} [opts.font]
 */
function addStyledTable(slide, pres, theme, opts = {}) {
  const { x, y, w, headers, rows, colW, rowH, fontSize: fs, font = { jp: "Meiryo" } } = opts;
  const fSize = fs || 11;

  const numCols = headers.length;
  const widths = colW || headers.map(() => w / numCols);

  const headerRow = headers.map((text) => ({
    text,
    options: {
      fontSize: fSize,
      bold: true,
      color: theme.TBL_HEADER_TX,
      fontFace: font.jp,
      fill: { color: theme.TBL_HEADER_BG },
      align: "center",
      valign: "middle",
      margin: [4, 6, 4, 6],
    },
  }));

  const dataRows = rows.map((row, ri) =>
    row.map((text) => ({
      text,
      options: {
        fontSize: fSize,
        color: theme.DT,
        fontFace: font.jp,
        align: "left",
        valign: "middle",
        margin: [4, 6, 4, 6],
        border:
          ri < rows.length - 1
            ? [null, null, { color: theme.TBL_ROW_BD, pt: 0.5 }, null]
            : [null, null, null, null],
      },
    })),
  );

  slide.addTable([headerRow, ...dataRows], {
    x,
    y,
    w,
    colW: widths,
    ...(rowH && { rowH }),
    border: { type: "none" },
  });
}

// ─── 図解パーツ ─────────────────────────────────────────────

/**
 * 横フロー（ステップ + 矢印）
 * @param {object} opts
 * @param {number} opts.x, opts.y, opts.w, opts.h
 * @param {Array<{title: string, body?: string}>} opts.steps
 * @param {object} [opts.font]
 */
function addFlowHorizontal(slide, pres, theme, opts = {}) {
  const { x, y, w, h, steps, font = { jp: "Meiryo" } } = opts;
  const n = steps.length;
  const arrowW = 0.25;
  const gap = 0.1;
  const boxW = (w - arrowW * (n - 1) - gap * (n - 1) * 2) / n;

  steps.forEach((step, i) => {
    const bx = x + i * (boxW + arrowW + gap * 2);
    const ac = theme.ACCENTS[i % theme.ACCENTS.length];

    // ステップボックス
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: bx,
      y,
      w: boxW,
      h,
      fill: { color: theme.CB },
      line: { color: ac, width: 1.5 },
      rectRadius: 0.03,
    });

    // ステップタイトル
    slide.addText(step.title, {
      x: bx + 0.08,
      y: y + 0.08,
      w: boxW - 0.16,
      h: step.body ? h * 0.35 : h - 0.16,
      fontSize: 13,
      bold: true,
      color: ac,
      fontFace: font.jp,
      align: "center",
      valign: "middle",
      margin: 0,
    });

    // ステップ本文
    if (step.body) {
      slide.addText(step.body, {
        x: bx + 0.08,
        y: y + h * 0.4,
        w: boxW - 0.16,
        h: h * 0.55,
        fontSize: 11,
        color: theme.DT,
        fontFace: font.jp,
        align: "left",
        valign: "top",
        margin: 0,
        lineSpacingMultiple: 1.4,
      });
    }

    // 矢印（最後のステップ以外）
    if (i < n - 1) {
      const ax = bx + boxW + gap;
      slide.addText("\u25B6", {
        x: ax,
        y: y + h * 0.3,
        w: arrowW,
        h: h * 0.4,
        fontSize: 16,
        color: theme.ST,
        fontFace: "Arial",
        align: "center",
        valign: "middle",
        margin: 0,
      });
    }
  });
}

/**
 * 縦フロー（ステップ + 矢印）
 * @param {object} opts
 * @param {number} opts.x, opts.y, opts.w, opts.h
 * @param {Array<{title: string, body?: string}>} opts.steps
 * @param {object} [opts.font]
 */
function addFlowVertical(slide, pres, theme, opts = {}) {
  const { x, y, w, h, steps, font = { jp: "Meiryo" } } = opts;
  const n = steps.length;
  const arrowH = 0.2;
  const gap = 0.05;
  const boxH = (h - arrowH * (n - 1) - gap * (n - 1) * 2) / n;

  steps.forEach((step, i) => {
    const by = y + i * (boxH + arrowH + gap * 2);
    const ac = theme.ACCENTS[i % theme.ACCENTS.length];

    // ステップボックス
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x,
      y: by,
      w,
      h: boxH,
      fill: { color: theme.CB },
      line: { color: ac, width: 1.5 },
      rectRadius: 0.03,
    });

    // 番号バッジ + タイトル（横並び）
    addNumberBadge(slide, pres, theme, {
      x: x + 0.1,
      y: by + (boxH - 0.28) / 2,
      num: i + 1,
      size: 0.28,
      color: ac,
    });

    slide.addText(step.title, {
      x: x + 0.5,
      y: by + 0.05,
      w: w - 0.65,
      h: step.body ? boxH * 0.4 : boxH - 0.1,
      fontSize: 14,
      bold: true,
      color: theme.DT,
      fontFace: font.jp,
      align: "left",
      valign: "middle",
      margin: 0,
    });

    if (step.body) {
      slide.addText(step.body, {
        x: x + 0.5,
        y: by + boxH * 0.42,
        w: w - 0.65,
        h: boxH * 0.52,
        fontSize: 12,
        color: theme.ST,
        fontFace: font.jp,
        align: "left",
        valign: "top",
        margin: 0,
        lineSpacingMultiple: 1.4,
      });
    }

    // 矢印（最後以外）
    if (i < n - 1) {
      const ay = by + boxH + gap;
      slide.addText("\u25BC", {
        x: x + w * 0.45,
        y: ay,
        w: w * 0.1,
        h: arrowH,
        fontSize: 14,
        color: theme.ST,
        fontFace: "Arial",
        align: "center",
        valign: "middle",
        margin: 0,
      });
    }
  });
}

/**
 * Before/After 比較カラム
 * @param {object} opts
 * @param {number} opts.x, opts.y, opts.w, opts.h
 * @param {object} opts.before - { title, items: string[] }
 * @param {object} opts.after - { title, items: string[] }
 * @param {object} [opts.font]
 */
function addComparisonColumns(slide, pres, theme, opts = {}) {
  const { x, y, w, h, before, after, font = { jp: "Meiryo" } } = opts;
  const gap = 0.3;
  const colW = (w - gap) / 2;
  const divX = x + colW + gap / 2;

  // Before 側
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x,
    y,
    w: colW,
    h,
    fill: { color: theme.SF },
    rectRadius: 0.03,
  });
  slide.addText(before.title || "Before", {
    x: x + 0.1,
    y: y + 0.1,
    w: colW - 0.2,
    h: 0.4,
    fontSize: 15,
    bold: true,
    color: theme.ST,
    fontFace: font.jp,
    align: "center",
    valign: "middle",
    margin: 0,
  });
  if (before.items) {
    slide.addText(
      before.items.map((t) => ({
        text: t,
        options: {
          bullet: true,
          fontSize: 13,
          color: theme.DT,
          fontFace: font.jp,
        },
      })),
      {
        x: x + 0.15,
        y: y + 0.55,
        w: colW - 0.3,
        h: h - 0.65,
        valign: "top",
        margin: 0,
        lineSpacingMultiple: 1.5,
      },
    );
  }

  // 中央ディバイダー + 矢印
  slide.addText("\u25B6", {
    x: divX - 0.15,
    y: y + h * 0.4,
    w: 0.3,
    h: 0.3,
    fontSize: 18,
    color: theme.A,
    fontFace: "Arial",
    align: "center",
    valign: "middle",
    margin: 0,
  });

  // After 側
  const afterX = x + colW + gap;
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: afterX,
    y,
    w: colW,
    h,
    fill: { color: theme.CB },
    line: { color: theme.P, width: 1 },
    rectRadius: 0.03,
  });
  slide.addText(after.title || "After", {
    x: afterX + 0.1,
    y: y + 0.1,
    w: colW - 0.2,
    h: 0.4,
    fontSize: 15,
    bold: true,
    color: theme.P,
    fontFace: font.jp,
    align: "center",
    valign: "middle",
    margin: 0,
  });
  if (after.items) {
    slide.addText(
      after.items.map((t) => ({
        text: t,
        options: {
          bullet: true,
          fontSize: 13,
          color: theme.DT,
          fontFace: font.jp,
        },
      })),
      {
        x: afterX + 0.15,
        y: y + 0.55,
        w: colW - 0.3,
        h: h - 0.65,
        valign: "top",
        margin: 0,
        lineSpacingMultiple: 1.5,
      },
    );
  }
}

/**
 * 2x2 マトリクス（軸ラベル + 4象限）
 * @param {object} opts
 * @param {number} opts.x, opts.y, opts.w, opts.h
 * @param {string} opts.xAxisLabel - X軸ラベル
 * @param {string} opts.yAxisLabel - Y軸ラベル
 * @param {Array<{title: string, body?: string}>} opts.quadrants - [左上, 右上, 左下, 右下]
 * @param {object} [opts.font]
 */
function addMatrix2x2(slide, pres, theme, opts = {}) {
  const {
    x,
    y,
    w,
    h,
    xAxisLabel,
    yAxisLabel,
    quadrants,
    font = { jp: "Meiryo" },
  } = opts;
  const labelW = 0.3;
  const labelH = 0.25;
  const gap = 0.08;
  const gridX = x + labelW;
  const gridY = y;
  const gridW = w - labelW;
  const gridH = h - labelH;
  const cellW = (gridW - gap) / 2;
  const cellH = (gridH - gap) / 2;

  const positions = [
    { cx: gridX, cy: gridY }, // 左上
    { cx: gridX + cellW + gap, cy: gridY }, // 右上
    { cx: gridX, cy: gridY + cellH + gap }, // 左下
    { cx: gridX + cellW + gap, cy: gridY + cellH + gap }, // 右下
  ];

  const colors = theme.ACCENTS;

  positions.forEach((pos, i) => {
    if (!quadrants[i]) return;
    const c = colors[i % colors.length];

    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: pos.cx,
      y: pos.cy,
      w: cellW,
      h: cellH,
      fill: { color: theme.CB },
      line: { color: c, width: 1 },
      rectRadius: 0.03,
    });

    slide.addText(quadrants[i].title, {
      x: pos.cx + 0.1,
      y: pos.cy + 0.08,
      w: cellW - 0.2,
      h: 0.35,
      fontSize: 13,
      bold: true,
      color: c,
      fontFace: font.jp,
      align: "center",
      valign: "middle",
      margin: 0,
    });

    if (quadrants[i].body) {
      slide.addText(quadrants[i].body, {
        x: pos.cx + 0.1,
        y: pos.cy + 0.45,
        w: cellW - 0.2,
        h: cellH - 0.55,
        fontSize: 11,
        color: theme.DT,
        fontFace: font.jp,
        align: "left",
        valign: "top",
        margin: 0,
        lineSpacingMultiple: 1.3,
      });
    }
  });

  // Y軸ラベル（左側、縦書き風）
  if (yAxisLabel) {
    slide.addText(yAxisLabel, {
      x,
      y: gridY,
      w: labelW - 0.05,
      h: gridH,
      fontSize: 10,
      color: theme.ST,
      fontFace: font.jp,
      align: "center",
      valign: "middle",
      margin: 0,
      rotate: 270,
    });
  }

  // X軸ラベル（下側）
  if (xAxisLabel) {
    slide.addText(xAxisLabel, {
      x: gridX,
      y: gridY + gridH + 0.02,
      w: gridW,
      h: labelH - 0.02,
      fontSize: 10,
      color: theme.ST,
      fontFace: font.jp,
      align: "center",
      valign: "middle",
      margin: 0,
    });
  }
}

/**
 * ピラミッド（上から下へ広がる階層構造）
 * @param {object} opts
 * @param {number} opts.x, opts.y, opts.w, opts.h
 * @param {Array<{title: string, body?: string}>} opts.levels - 上（頂点）から順
 * @param {object} [opts.font]
 */
function addPyramid(slide, pres, theme, opts = {}) {
  const { x, y, w, h, levels, font = { jp: "Meiryo" } } = opts;
  const n = levels.length;
  const gap = 0.06;
  const rowH = (h - gap * (n - 1)) / n;
  const centerX = x + w / 2;

  levels.forEach((level, i) => {
    const ratio = 0.4 + 0.6 * (i / (n - 1 || 1)); // 上が狭く下が広い
    const bw = w * ratio;
    const bx = centerX - bw / 2;
    const by = y + i * (rowH + gap);
    const ac = theme.ACCENTS[i % theme.ACCENTS.length];

    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: bx,
      y: by,
      w: bw,
      h: rowH,
      fill: { color: ac },
      rectRadius: 0.02,
    });

    const textParts = [
      {
        text: level.title,
        options: {
          fontSize: 14,
          bold: true,
          color: theme.WH,
          fontFace: font.jp,
        },
      },
    ];
    if (level.body) {
      textParts.push({
        text: "\n" + level.body,
        options: { fontSize: 11, color: theme.WH, fontFace: font.jp },
      });
    }

    slide.addText(textParts, {
      x: bx + 0.1,
      y: by,
      w: bw - 0.2,
      h: rowH,
      align: "center",
      valign: "middle",
      margin: 0,
    });
  });
}

/**
 * タイムライン（横方向のマイルストーン表示）
 * @param {object} opts
 * @param {number} opts.x, opts.y, opts.w, opts.h
 * @param {Array<{date: string, title: string, body?: string}>} opts.events
 * @param {object} [opts.font]
 */
function addTimeline(slide, pres, theme, opts = {}) {
  const { x, y, w, h, events, font = { jp: "Meiryo", en: "Arial" } } = opts;
  const n = events.length;
  const lineY = y + h * 0.4;
  const dotR = 0.12;

  // 横線
  slide.addShape(pres.shapes.RECTANGLE, {
    x,
    y: lineY,
    w,
    h: 0.03,
    fill: { color: theme.S },
  });

  const segW = w / n;

  events.forEach((ev, i) => {
    const cx = x + segW * i + segW / 2;
    const ac = theme.ACCENTS[i % theme.ACCENTS.length];

    // ドット
    slide.addShape(pres.shapes.OVAL, {
      x: cx - dotR / 2,
      y: lineY - dotR / 2 + 0.015,
      w: dotR,
      h: dotR,
      fill: { color: ac },
    });

    // 日付（上）
    slide.addText(ev.date, {
      x: cx - segW / 2,
      y: y,
      w: segW,
      h: h * 0.35,
      fontSize: 12,
      bold: true,
      color: ac,
      fontFace: font.en,
      align: "center",
      valign: "bottom",
      margin: 0,
    });

    // タイトル（下）
    slide.addText(ev.title, {
      x: cx - segW / 2,
      y: lineY + 0.12,
      w: segW,
      h: h * 0.25,
      fontSize: 13,
      bold: true,
      color: theme.DT,
      fontFace: font.jp,
      align: "center",
      valign: "top",
      margin: 0,
    });

    // 本文（さらに下）
    if (ev.body) {
      slide.addText(ev.body, {
        x: cx - segW / 2,
        y: lineY + 0.12 + h * 0.25,
        w: segW,
        h: h * 0.25,
        fontSize: 10,
        color: theme.ST,
        fontFace: font.jp,
        align: "center",
        valign: "top",
        margin: 0,
        lineSpacingMultiple: 1.3,
      });
    }
  });
}

/**
 * ステッププロセス（シェブロン矢印風）
 * @param {object} opts
 * @param {number} opts.x, opts.y, opts.w, opts.h
 * @param {Array<{title: string, body?: string}>} opts.steps
 * @param {object} [opts.font]
 */
function addStepProcess(slide, pres, theme, opts = {}) {
  const { x, y, w, h, steps, font = { jp: "Meiryo" } } = opts;
  const n = steps.length;
  const gap = 0.04;
  const stepW = (w - gap * (n - 1)) / n;

  steps.forEach((step, i) => {
    const sx = x + i * (stepW + gap);
    const ac = theme.ACCENTS[i % theme.ACCENTS.length];

    // シェブロン形状（矩形 + 三角で近似）
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: sx,
      y,
      w: stepW,
      h,
      fill: { color: ac },
      rectRadius: 0.02,
    });

    // ステップ番号
    slide.addText(`STEP ${i + 1}`, {
      x: sx,
      y: y + 0.06,
      w: stepW,
      h: 0.25,
      fontSize: 10,
      bold: true,
      color: theme.WH,
      fontFace: "Arial",
      align: "center",
      valign: "middle",
      margin: 0,
      characterSpacing: 2,
    });

    // タイトル
    slide.addText(step.title, {
      x: sx + 0.08,
      y: y + 0.32,
      w: stepW - 0.16,
      h: step.body ? h * 0.28 : h - 0.42,
      fontSize: 14,
      bold: true,
      color: theme.WH,
      fontFace: font.jp,
      align: "center",
      valign: "middle",
      margin: 0,
    });

    // 本文
    if (step.body) {
      slide.addText(step.body, {
        x: sx + 0.08,
        y: y + 0.32 + h * 0.28,
        w: stepW - 0.16,
        h: h - 0.32 - h * 0.28 - 0.08,
        fontSize: 11,
        color: theme.WH,
        fontFace: font.jp,
        align: "center",
        valign: "top",
        margin: 0,
        lineSpacingMultiple: 1.3,
      });
    }
  });
}

/**
 * 図解画像をスライドに埋め込む（Mermaid/draw.io → PNG → addImage）
 * @param {object} opts
 * @param {string} opts.path - PNGファイルパス（assets/diagrams/{name}.png）
 * @param {number} [opts.x=0.4]
 * @param {number} [opts.y=1.25] - タイトル直下（y=1.15）の余白込み
 * @param {number} [opts.w=9.2]
 * @param {number} [opts.h=4.0]  - y+h ≤ 5.45 を守ること
 * @param {string} [opts.caption] - キャプション・出典（任意）
 * @param {object} [opts.font]
 */
function addDiagramImage(slide, pres, theme, opts = {}) {
  const {
    path,
    x = 0.4,
    y = 1.25,
    w = 9.2,
    h = 4.0,
    caption,
    font = { jp: "Meiryo" },
  } = opts;

  slide.addImage({ path, x, y, w, h });

  if (caption) {
    slide.addText(caption, {
      x,
      y: y + h + 0.05,
      w,
      h: 0.2,
      fontSize: 9,
      color: theme.ST,
      fontFace: font.jp,
      align: "center",
      italic: true,
      margin: 0,
    });
  }
}

// ─── エクスポート ───────────────────────────────────────────

module.exports = {
  // 構造
  addBottomBar,
  addHeader,
  addSlideTitle,
  addCoverTitle,
  // カード・ボックス
  addCard,
  addMetricCard,
  addNumberBadge,
  addBadge,
  addAlertBox,
  addStyledTable,
  // 図解
  addFlowHorizontal,
  addFlowVertical,
  addComparisonColumns,
  addMatrix2x2,
  addPyramid,
  addTimeline,
  addStepProcess,
  addDiagramImage,
  // ヘルパー
  makeShadow,
};
