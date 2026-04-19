// ============================================================
// カラーテーマシステム
// 全テーマが同一トークン名を持ち、スクリプトはテーマ非依存で動作する
// ============================================================

const THEMES = {
  corporate: {
    name: "Corporate",
    description: "正式な提案・取締役会・公式資料",
    // メインカラー
    P: "004098", // プライマリ（ネイビー）
    A: "DC2626", // アクセント（レッド）
    S: "CADCFC", // サブ（ライトブルー）— セパレータ・罫線
    CB: "EEF3FA", // カード背景（アイスブルー）
    SF: "F8FAFC", // サーフェス（極薄グレー）— 帯・背景領域
    // テキスト
    DT: "1A1A2E", // ダークテキスト
    ST: "444466", // サブテキスト
    WH: "FFFFFF", // 白
    // テキスト on プライマリ
    TP: "FFFFFF", // プライマリ上のテキスト
    // アクセント色（カード・段階表示用）— ネイビー基調で統一
    ACCENTS: ["004098", "2563EB", "0891B2", "444466"],
    // セマンティック — 警告
    WARN_BG: "FEF3C7",
    WARN_BD: "F59E0B",
    WARN_TX: "92400E",
    // セマンティック — 情報
    INFO_BG: "EEF3FA",
    INFO_BD: "004098",
    INFO_TX: "004098",
    // セマンティック — エラー/注意
    ERROR_BG: "FEF2F2",
    ERROR_BD: "DC2626",
    ERROR_TX: "DC2626",
    // セマンティック — 成功
    OK_BG: "F0FDF4",
    OK_BD: "059669",
    OK_TX: "065F46",
    // テーブル
    TBL_HEADER_BG: "004098",
    TBL_HEADER_TX: "FFFFFF",
    TBL_ROW_BD: "F0F2F5",
  },

  modern: {
    name: "Modern",
    description: "スタートアップ・新規事業・DX提案",
    P: "1E40AF", // ディープネイビー（インディゴ700）
    A: "E85D3A", // オレンジアクセント
    S: "C7D2FE", // ライトインディゴ — セパレータ
    CB: "EEF2FF", // カード背景
    SF: "F5F7FF",
    DT: "1E293B",
    ST: "475569",
    WH: "FFFFFF",
    TP: "FFFFFF",
    ACCENTS: ["1E40AF", "0891B2", "475569", "C7D2FE"],
    WARN_BG: "FEF3C7",
    WARN_BD: "F59E0B",
    WARN_TX: "92400E",
    INFO_BG: "EEF2FF",
    INFO_BD: "1E40AF",
    INFO_TX: "1E40AF",
    ERROR_BG: "FEF2F2",
    ERROR_BD: "DC2626",
    ERROR_TX: "DC2626",
    OK_BG: "F0FDF4",
    OK_BD: "059669",
    OK_TX: "065F46",
    TBL_HEADER_BG: "1E40AF",
    TBL_HEADER_TX: "FFFFFF",
    TBL_ROW_BD: "F0F2F5",
  },

  earth: {
    name: "Earth",
    description: "ESG・サステナビリティ・環境",
    P: "3E2723",
    A: "BF5B3F",
    S: "D7CCC8",
    CB: "EFEBE9",
    SF: "FAF7F5",
    DT: "2C1810",
    ST: "5D4037",
    WH: "FFFFFF",
    TP: "FFFFFF",
    ACCENTS: ["3E2723", "5D4037", "8D6E63", "D7CCC8"],
    WARN_BG: "FEF3C7",
    WARN_BD: "F59E0B",
    WARN_TX: "92400E",
    INFO_BG: "EFEBE9",
    INFO_BD: "3E2723",
    INFO_TX: "3E2723",
    ERROR_BG: "FEF2F2",
    ERROR_BD: "DC2626",
    ERROR_TX: "DC2626",
    OK_BG: "F0FDF4",
    OK_BD: "558B2F",
    OK_TX: "33691E",
    TBL_HEADER_BG: "3E2723",
    TBL_HEADER_TX: "FFFFFF",
    TBL_ROW_BD: "F0F2F5",
  },

  cool: {
    name: "Cool",
    description: "テック・IT・データ分析",
    P: "334155",
    A: "0EA5E9",
    S: "CBD5E1",
    CB: "F1F5F9",
    SF: "F8FAFC",
    DT: "0F172A",
    ST: "475569",
    WH: "FFFFFF",
    TP: "FFFFFF",
    ACCENTS: ["334155", "0EA5E9", "0891B2", "CBD5E1"],
    WARN_BG: "FEF3C7",
    WARN_BD: "F59E0B",
    WARN_TX: "92400E",
    INFO_BG: "F0F9FF",
    INFO_BD: "0EA5E9",
    INFO_TX: "0369A1",
    ERROR_BG: "FEF2F2",
    ERROR_BD: "DC2626",
    ERROR_TX: "DC2626",
    OK_BG: "F0FDF4",
    OK_BD: "10B981",
    OK_TX: "065F46",
    TBL_HEADER_BG: "334155",
    TBL_HEADER_TX: "FFFFFF",
    TBL_ROW_BD: "F0F2F5",
  },

  warm: {
    name: "Warm",
    description: "社内報告・ワークショップ・チームMTG",
    P: "27272A",
    A: "D97706",
    S: "D6D3D1",
    CB: "FAFAF9",
    SF: "F5F5F4",
    DT: "18181B",
    ST: "52525B",
    WH: "FFFFFF",
    TP: "FFFFFF",
    ACCENTS: ["27272A", "52525B", "0891B2", "E11D48"],
    WARN_BG: "FEF3C7",
    WARN_BD: "D97706",
    WARN_TX: "92400E",
    INFO_BG: "FAFAF9",
    INFO_BD: "27272A",
    INFO_TX: "27272A",
    ERROR_BG: "FEF2F2",
    ERROR_BD: "DC2626",
    ERROR_TX: "DC2626",
    OK_BG: "F0FDF4",
    OK_BD: "059669",
    OK_TX: "065F46",
    TBL_HEADER_BG: "27272A",
    TBL_HEADER_TX: "FFFFFF",
    TBL_ROW_BD: "F0F2F5",
  },

  mono: {
    name: "Mono",
    description: "ミニマル・データ重視・付録",
    P: "1F2937",
    A: "6B7280",
    S: "E5E7EB",
    CB: "F9FAFB",
    SF: "F3F4F6",
    DT: "111827",
    ST: "6B7280",
    WH: "FFFFFF",
    TP: "FFFFFF",
    ACCENTS: ["374151", "6B7280", "9CA3AF", "4B5563"],
    WARN_BG: "FEF3C7",
    WARN_BD: "F59E0B",
    WARN_TX: "92400E",
    INFO_BG: "F9FAFB",
    INFO_BD: "1F2937",
    INFO_TX: "1F2937",
    ERROR_BG: "FEF2F2",
    ERROR_BD: "DC2626",
    ERROR_TX: "DC2626",
    OK_BG: "F0FDF4",
    OK_BD: "059669",
    OK_TX: "065F46",
    TBL_HEADER_BG: "1F2937",
    TBL_HEADER_TX: "FFFFFF",
    TBL_ROW_BD: "F0F2F5",
  },

  // ─── デジタル庁デザインシステム (DADS) ベーステーマ ───
  // https://design.digital.go.jp/dads/
  // @digital-go-jp/design-tokens カラーパレット準拠

  dads: {
    name: "DADS",
    description: "デジタル庁デザインシステム準拠・行政・公共・ガバナンス資料",
    // Blue.1000 をプライマリに採用（リンク・重要テキストとして定義された主色）
    P: "00118F", // Blue.1000
    A: "FB5B01", // Orange.600（注意喚起・アクセント）
    S: "CCCCCC", // SolidGray.200（セパレータ・罫線）
    CB: "F2F2F2", // SolidGray.50（カード背景）
    SF: "F2F2F2", // SolidGray.50（サーフェス）
    DT: "1A1A1A", // SolidGray.900（ダークテキスト）
    ST: "666666", // SolidGray.600（サブテキスト）
    WH: "FFFFFF", // White
    TP: "FFFFFF", // プライマリ上のテキスト
    // アクセント色: Blue.1000, Blue.700, Cyan.700, SolidGray.800（ネイビー基調で統一、オレンジ除外）
    ACCENTS: ["00118F", "264AF4", "0099E8", "333333"],
    // セマンティック — 警告（Yellow系）
    WARN_BG: "FBF5E0", // Yellow.50 近似
    WARN_BD: "B78F00", // Yellow.700 = Warning.Yellow.1
    WARN_TX: "927200", // Yellow.900 = Warning.Yellow.2
    // セマンティック — 情報（Blue系）
    INFO_BG: "E8F1FE", // Blue.50
    INFO_BD: "00118F", // Blue.1000
    INFO_TX: "00118F", // Blue.1000
    // セマンティック — エラー（Red系）
    ERROR_BG: "FDEEEE", // Red.50
    ERROR_BD: "EC0000", // Red.800 = Error.1
    ERROR_TX: "CE0000", // Red.900 = Error.2
    // セマンティック — 成功（Green系）
    OK_BG: "E6F5EC", // Green.50
    OK_BD: "259D63", // Green.600 = Success.1
    OK_TX: "197A4B", // Green.800 = Success.2
    // テーブル
    TBL_HEADER_BG: "00118F", // Blue.1000
    TBL_HEADER_TX: "FFFFFF",
    TBL_ROW_BD: "E6E6E6", // SolidGray.100
  },

  "dads-neutral": {
    name: "DADS Neutral",
    description: "デジタル庁デザインシステム・グレーベース（技術資料・付録）",
    P: "333333", // SolidGray.800
    A: "00118F", // Blue.1000
    S: "CCCCCC", // SolidGray.200
    CB: "F2F2F2", // SolidGray.50
    SF: "F2F2F2", // SolidGray.50
    DT: "1A1A1A", // SolidGray.900
    ST: "666666", // SolidGray.600
    WH: "FFFFFF",
    TP: "FFFFFF",
    ACCENTS: ["00118F", "264AF4", "0099E8", "333333"],
    WARN_BG: "FBF5E0",
    WARN_BD: "B78F00",
    WARN_TX: "927200",
    INFO_BG: "E8F1FE",
    INFO_BD: "00118F",
    INFO_TX: "00118F",
    ERROR_BG: "FDEEEE",
    ERROR_BD: "EC0000",
    ERROR_TX: "CE0000",
    OK_BG: "E6F5EC",
    OK_BD: "259D63",
    OK_TX: "197A4B",
    TBL_HEADER_BG: "333333",
    TBL_HEADER_TX: "FFFFFF",
    TBL_ROW_BD: "E6E6E6",
  },
};

/**
 * テーマを取得する
 * @param {string} name - テーマ名（corporate, modern, earth, cool, warm, mono）
 * @returns {object} テーマトークンオブジェクト
 */
function getTheme(name) {
  const theme = THEMES[name];
  if (!theme) {
    throw new Error(
      `Unknown theme: "${name}". Available: ${Object.keys(THEMES).join(", ")}`,
    );
  }
  return theme;
}

module.exports = { THEMES, getTheme };
