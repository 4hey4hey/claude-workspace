// ============================================================
// スライドデザインシステム — エントリポイント
// Usage: const { getTheme, getPreset, parts, getFontSize, getFontPreset } = require('./lib');
// ============================================================

const { THEMES, getTheme } = require('./themes');
const { FONT_PRESETS, getFontPreset, FONT_SIZE_TABLE, getFontSize } = require('./fonts');
const { SLIDE, DEFAULTS, calcLayout, getPreset, PRESETS } = require('./layout');
const parts = require('./parts');

module.exports = {
  // テーマ
  THEMES,
  getTheme,
  // フォント
  FONT_PRESETS,
  getFontPreset,
  FONT_SIZE_TABLE,
  getFontSize,
  // レイアウト
  SLIDE,
  DEFAULTS,
  calcLayout,
  getPreset,
  PRESETS,
  // パーツ
  parts,
};
