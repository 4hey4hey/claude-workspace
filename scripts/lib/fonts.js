// ============================================================
// フォントプリセット + 動的フォントサイジング
// カラム数を渡すとフォントサイズが自動決定される
// ============================================================

const FONT_PRESETS = {
  corporate: {
    jp: "Meiryo",
    en: "Arial",
    description: "ビジネス全般（デフォルト）",
  },
  modern: { jp: "Yu Gothic", en: "Segoe UI", description: "モダンな印象" },
  premium: { jp: "Yu Mincho", en: "Garamond", description: "経営・コンサル" },
  clean: {
    jp: "BIZ UDPGothic",
    en: "Calibri",
    description: "ユニバーサルデザイン",
  },
  dads: {
    jp: "Noto Sans JP",
    en: "Noto Sans JP",
    mono: "Noto Sans Mono",
    description: "デジタル庁デザインシステム準拠",
  },
};

// フォントサイズテーブル: [1列, 2列, 3列, 4列, 5列以上]
const FONT_SIZE_TABLE = {
  // KPI・メトリクス
  metric: [60, 50, 44, 36, 28],
  metricUnit: [20, 18, 16, 14, 12],
  metricLabel: [14, 13, 12, 11, 10],

  // 見出し
  coverTitle: [36, 36, 36, 36, 36], // 表紙は固定
  slideTitle: [22, 22, 22, 22, 22], // H2 — 固定
  sectionHead: [14, 13, 12, 11, 10], // H3

  // カード内
  cardTitle: [16, 14, 12, 11, 10],
  cardBody: [13, 12, 11, 10, 9],

  // 本文
  body: [18, 16, 15, 14, 13],
  caption: [14, 13, 12, 11, 10],
  footnote: [10, 10, 9, 9, 9],

  // バッジ・ラベル
  badge: [14, 13, 12, 11, 10],

  // ヘッダー・フッター
  breadcrumb: [9, 9, 9, 9, 9],
  source: [8, 8, 8, 8, 8],
};

/**
 * フォントプリセットを取得する
 * @param {string} name - プリセット名（corporate, modern, premium, clean）
 * @returns {{ jp: string, en: string, description: string }}
 */
function getFontPreset(name) {
  const preset = FONT_PRESETS[name];
  if (!preset) {
    throw new Error(
      `Unknown font preset: "${name}". Available: ${Object.keys(FONT_PRESETS).join(", ")}`,
    );
  }
  return preset;
}

/**
 * カラム数に応じたフォントサイズを返す
 * @param {string} role - 役割名（metric, cardTitle, body 等）
 * @param {number} columns - カラム数（1〜5）
 * @returns {number} フォントサイズ（pt）
 */
function getFontSize(role, columns) {
  const sizes = FONT_SIZE_TABLE[role];
  if (!sizes) {
    throw new Error(
      `Unknown font role: "${role}". Available: ${Object.keys(FONT_SIZE_TABLE).join(", ")}`,
    );
  }
  const idx = Math.min(Math.max(columns - 1, 0), 4);
  return sizes[idx];
}

module.exports = { FONT_PRESETS, getFontPreset, FONT_SIZE_TABLE, getFontSize };
