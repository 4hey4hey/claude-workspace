// ============================================================
// 統一レイアウトシステム
// パラメータを渡すだけで座標が自動計算される
// LAYOUT_16x9 = 10 x 5.625 インチ基準
// ============================================================

const SLIDE = { W: 10, H: 5.625 };

// 標準マージン・高さ
const DEFAULTS = {
  margin:     { top: 0.08, right: 0.4, bottom: 0.12, left: 0.4 },
  headerH:    0.34,   // パンくず + セパレータ
  titleH:     0.81,   // スライドタイトル（0.42〜1.15 の領域）
  bottomBarH: 0.07,   // ボトムブランドバー
  bottomBarY: 5.56,
  gap:        0.2,    // カード間のギャップ
  cardPadY:   0.15,   // コンテンツ領域上下の余白
};

/**
 * レイアウトを計算する
 * @param {object} opts
 * @param {number} opts.columns - カラム数（1〜5）
 * @param {boolean} [opts.hasHeader=true] - ヘッダー（パンくず）の有無
 * @param {boolean} [opts.hasTitle=true] - スライドタイトルの有無
 * @param {boolean} [opts.hasTopBand=false] - 上部カラーバンドの有無（表紙用）
 * @param {number} [opts.topBandH=2.5] - 上部バンドの高さ
 * @param {boolean} [opts.hasSidebar=false] - サイドバーの有無
 * @param {number} [opts.sidebarRatio=0.4] - サイドバーの幅比率（0〜1）
 * @param {number} [opts.rows=1] - 行数（グリッドレイアウト用）
 * @returns {object} レイアウト座標オブジェクト
 */
function calcLayout(opts = {}) {
  const {
    columns = 1,
    hasHeader = true,
    hasTitle = true,
    hasTopBand = false,
    topBandH = 2.5,
    hasSidebar = false,
    sidebarRatio = 0.4,
    rows = 1,
  } = opts;

  const d = DEFAULTS;

  // --- ヘッダー領域 ---
  const header = hasHeader ? {
    x: d.margin.left,
    y: d.margin.top,
    w: SLIDE.W - d.margin.left - d.margin.right,
    h: d.headerH - d.margin.top,
  } : null;

  // --- タイトル領域 ---
  const titleY = hasHeader ? d.headerH + 0.08 : d.margin.top;
  const title = hasTitle ? {
    x: d.margin.left,
    y: titleY,
    w: SLIDE.W - d.margin.left - d.margin.right,
    h: 0.65,
  } : null;

  // --- コンテンツ領域の開始Y ---
  let contentY;
  if (hasTopBand) {
    contentY = topBandH + d.cardPadY;
  } else if (hasTitle) {
    contentY = titleY + 0.65 + 0.08 + d.cardPadY; // タイトル下 + セパレータ + パディング
  } else if (hasHeader) {
    contentY = d.headerH + d.cardPadY;
  } else {
    contentY = d.margin.top + d.cardPadY;
  }

  // コンテンツ領域の終了Y（ボトムバーの上）
  const contentEndY = d.bottomBarY - d.cardPadY;
  const contentH = contentEndY - contentY;

  // --- サイドバー ---
  const usableW = SLIDE.W - d.margin.left - d.margin.right;
  let mainW, sidebarObj;

  if (hasSidebar) {
    const sbW = usableW * sidebarRatio;
    mainW = usableW - sbW - d.gap;
    sidebarObj = {
      x: d.margin.left + mainW + d.gap,
      y: contentY,
      w: sbW,
      h: contentH,
    };
  } else {
    mainW = usableW;
    sidebarObj = null;
  }

  // --- メインコンテンツ領域 ---
  const content = {
    x: d.margin.left,
    y: contentY,
    w: mainW,
    h: contentH,
  };

  // --- カラム計算 ---
  const colW = (mainW - d.gap * (columns - 1)) / columns;
  const rowH = (contentH - d.gap * (rows - 1)) / rows;

  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      cells.push({
        x: d.margin.left + c * (colW + d.gap),
        y: contentY + r * (rowH + d.gap),
        w: colW,
        h: rowH,
        row: r,
        col: c,
      });
    }
  }

  // --- 上部バンド ---
  const topBand = hasTopBand ? {
    x: 0,
    y: 0,
    w: SLIDE.W,
    h: topBandH,
  } : null;

  // --- ボトムバー ---
  const bottomBar = {
    y: d.bottomBarY,
    h: d.bottomBarH,
    leftW: SLIDE.W * 0.8,
    rightW: SLIDE.W * 0.2,
    rightX: SLIDE.W * 0.8,
  };

  return {
    slide: SLIDE,
    header,
    title,
    topBand,
    content,
    sidebar: sidebarObj,
    cells,         // rows * columns のフラット配列
    columns: cells.filter(c => c.row === 0),  // 最初の行のカラムだけ（後方互換）
    bottomBar,
    meta: { columns: columns, rows, gap: d.gap, colW, rowH },
  };
}

// ============================================================
// 名前付きプリセット
// ============================================================

const PRESETS = {
  // 基本レイアウト
  standard:     () => calcLayout({ columns: 1 }),
  twoColumn:    () => calcLayout({ columns: 2 }),
  threeColumn:  () => calcLayout({ columns: 3 }),
  fourColumn:   () => calcLayout({ columns: 4 }),

  // サイドバー
  sidebar:      () => calcLayout({ columns: 1, hasSidebar: true, sidebarRatio: 0.38 }),

  // グリッド
  twoByTwo:     () => calcLayout({ columns: 2, rows: 2 }),
  twoByThree:   () => calcLayout({ columns: 3, rows: 2 }),
  threeByTwo:   () => calcLayout({ columns: 2, rows: 3 }),

  // 表紙
  cover:        () => calcLayout({ columns: 1, hasHeader: false, hasTitle: false, hasTopBand: true, topBandH: 2.85 }),

  // Before/After 比較（2カラム、タイトルあり）
  comparison:   () => calcLayout({ columns: 2 }),

  // まとめスライド（上部バンド + 3カラム）
  summary:      () => calcLayout({ columns: 3, hasHeader: false, hasTitle: false, hasTopBand: true, topBandH: 1.7 }),
};

/**
 * 名前付きプリセットを取得する
 * @param {string} name - プリセット名
 * @returns {object} レイアウト座標オブジェクト
 */
function getPreset(name) {
  const factory = PRESETS[name];
  if (!factory) {
    throw new Error(`Unknown preset: "${name}". Available: ${Object.keys(PRESETS).join(', ')}`);
  }
  return factory();
}

module.exports = { SLIDE, DEFAULTS, calcLayout, getPreset, PRESETS };
