# DESIGN.md — Tokyo Gas Digital Design System

**AI エージェント向けの統一デザイン指定書**  
Claude Code スキル（ai-cos, pptx-creator, notion-export 等）と Copilot が参照する北極星

---

## 1. Visual Theme & Atmosphere

**Design Philosophy**: 都市ガス事業の「信頼・効率・透明性」を、ビジネス文書に翻訳する設計

**Tone Keywords**:
- 「白背景」=ニュートラル・信頼感
- 「紺系アクセント」=事業の堅牢性
- 「グレースケール」=情報を視覚的に階層化
- 「飾りなし」=実務的・判断志向

**Primary Use Cases**:
- 経営報告・施策報告（ユーザー：GM・役員）
- 開発・組織デザイン提案（ユーザー：スクラムマスター・プロダクトマネージャー）
- 技術基盤・基幹刷新の構想企画（ユーザー：EA・デジタル組織）

---

## 2. Color Palette & Roles

> 色はすべて hex 値で記述  
> **重要**: hex に `#` をつけない（PptxGenJS ファイル破損の原因）

### Primary Colors (ブランディング)

| 用途 | 色 | Hex | 使用例 |
|------|-----|-----|--------|
| **Background** | 白（フラット） | `FFFFFF` | 全スライド背景 ★絶対禁止: グラデーション・暗色背景 |
| **Accent (Blue)** | 紺（DADS Blue.700） | `264AF4` | セクション区切りスライド、重要なハイライト、見出しライン |
| **Accent (Gray)** | ダークグレー | `404040` | 見出し、ボトムバー、ボーダー |
| **Text Primary** | ダーク（本文） | `212121` | 本文テキスト、箇条書き |
| **Text Secondary** | ミッドグレー | `616161` | 補足・引用文、小字 |
| **Background Light** | ライトグレー | `F5F5F5` | カード背景、セクション背景（薄色のみ） |

### Semantic Colors

| 用途 | 色 | Hex | 用例 |
|------|-----|-----|------|
| **Success** | グリーン（DADS Green.700） | `00A92F` | 完了・達成・✓マーク |
| **Warning** | オレンジ（DADS Orange.700） | `FF7800` | 注意・進行中 |
| **Error** | レッド（DADS Red.700） | `D41836` | ブロッカー・リスク・失敗 |
| **Info** | シアン（DADS Cyan.700） | `0099E8` | 情報提供・補説 |

### Contrast Requirements

- **白背景上の本文テキスト**: コントラスト比 4.5:1 以上（`212121` / `404040` を必須使用）
- **色付き背景（中～濃色）**: 必ず白テキスト `FFFFFF` を重ねる
- **薄色背景** (`EEF3FA`, `F2F2F2`, `F5F5F5`): ダーク文字 `212121` / `616161` を許容
- **【絶対禁止】紺背景 + 濃紺文字** など可読性が低い組み合わせ

---

## 3. Typography Rules

### 3.1 Font Stack & Fallback Chain

```
Primary: "Noto Sans JP", "Hiragino Sans", "Meiryo UI", sans-serif

Weight Options:
  - Regular (400) — 本文・説明
  - Bold (700) — 見出し・強調
  ★禁止: 300, 500, 600, 800, 900（使わない）
```

**理由**: DADS テーマ対応・CJK フォント整理・Windows / Mac / Linux 横断互換性

### 3.2 Japanese Typography Specifications

#### 3.2.1 Kinsoku Shori (禁則処理)

行頭禁則（句読点・括弧）:
- `、` `。` `)` `」` は行頭に出さない
- Markdown 出力時は `\u00A0` (non-breaking space) で前行末に接着

例）
```markdown
これはテスト。
（禁則適用）  # ← ` （禁則適用）` が行頭に来ない
```

#### 3.2.2 Line-Height & Letter-Spacing

| 用途 | サイズ | 行間 | 文字間 |
|------|--------|------|--------|
| **Heading 1** | 32px (Bold) | 1.4 | 0.04em |
| **Heading 2** | 24px (Bold) | 1.4 | 0.04em |
| **Heading 3** | 18px (Bold) | 1.4 | 0.04em |
| **Body Text** | 16px (Regular) | 1.5–1.6 | 0.04–0.05em |
| **Small Text** | 14px (Regular) | 1.5 | 0.05em |
| **Footnote** | 12px (Regular) | 1.6 | 0.06em |

**日本語最小サイズ**: 12pt (16CSS px) 未満は不許可（可読性 × WCAG AA）

#### 3.2.3 OpenType Features

Japanese locale での以下を有効化:
```
font-feature-settings: "palt" 1; /* プロポーショナル約物 */
```

#### 3.2.4 Vertical Writing (今後対応)

現在は横書き統一。将来的に縦書き対応が必要な場合:
- `writing-mode: vertical-lr;`
- 禁則処理：句点を「右側」指定

---

## 4. Component Stylings

### 4.1 Button

```
Default:
  - Background: F5F5F5
  - Text: 212121 (Bold, 16px)
  - Border: 1px 949494
  - Padding: 12px 24px
  - Border-radius: 4px (0.03インチ以下)
  - Hover: Background → E0E0E0

Primary:
  - Background: 264AF4
  - Text: FFFFFF (Bold, 16px)
  - Padding: 12px 24px
  - Border-radius: 4px
  - Hover: Background → 1B38A8
```

### 4.2 Card

```
Default:
  - Background: FFFFFF
  - Border: 1px F5F5F5
  - Padding: 16px
  - Border-radius: 4px
  - Shadow: rgba(0, 0, 0, 0.08) / offset 0px 2px 4px
    ★制約: opacity 0.08 以下、1スライドに最大2箇所
```

### 4.3 Input Field

```
Default:
  - Background: FFFFFF
  - Border: 1px BDBDBD
  - Padding: 8px 12px
  - Font: 16px (12pt 以上)
  - Border-radius: 4px

Focus:
  - Border: 2px 264AF4
  - Box-shadow: inset 0 0 0 1px 264AF4
```

---

## 5. Layout Principles

### 5.1 PPT (PptxGenJS) Layout

- **Aspect Ratio**: 16:9（LAYOUT_16x9）
- **Absolute Dimensions**: 幅 10インチ × 高さ 5.625インチ
- **All coordinates**: インチ単位で指定（px 変換なし）
- **Grid**: 基本スペースのみ（複雑な grid 定義不要）

### 5.2 Spacing Tokens

```
XS: 4px
S:  8px
M:  16px
L:  24px
XL: 32px
XXL: 48px
```

### 5.3 Mandatory Elements

- **全スライド**: ボトムバー（ブランドライン、高さ 6pt 以下、色 264AF4 または 404040）
- **コンテンツスライド**: 
  - ヘッダー（パンくず、フォント 12px 606060）
  - スライドタイトル（主張文、フォント 24-28px Bold 264AF4）
- **表紙**:
  - 背景：必ず FFFFFF
  - タイトル・サブタイトル：ダーク系 (212121)テキスト
  - カラーバンド: 高さ 1.0インチ以下（スライド高さの18%以下）
  - ★【絶対禁止】`theme.TP`（白文字）を表紙タイトルに使用

---

## 6. Depth & Elevation

### Shadow Levels

```
Level 0: No shadow
Level 1: offset 0 2px 4px, rgba(0, 0, 0, 0.08) — カード
Level 2: offset 0 4px 8px, rgba(0, 0, 0, 0.12) — 浮遊要素
Level 3: offset 0 8px 16px, rgba(0, 0, 0, 0.15) — ポップアップ
```

**制約**: 
- 全スライド・全要素で shadow opacity は 0.08 以下
- 1スライドに shadow は最大 2箇所まで

### Border Radius

```
Standard: 4px (0.03インチ)
Tight: 2px (0.015インチ)
Full: 50% (サークル)

★【禁止】4px を超える角丸（AI生成文書の典型パターン）
```

---

## 7. Do's and Don'ts

### ✅ DO: 必ず実装

- [ ] **白背景統一**: 全スライド `slide.background = { color: 'FFFFFF' }`
- [ ] **主張文のみ**: スライドタイトルは「〜について」ではなく「〜により〜が起きている」形式
- [ ] **3種類以上のレイアウト混在**: 全スライド同じ構成は避ける
- [ ] **図解を含める**: 10枚以上のデッキは図解スライド最低 3枚（フロー・マトリクス・比較等）
- [ ] **出典明示**: 数値には出典を添える
- [ ] **Hex 値検査**: `#` なしで 6文字 hex のみ
- [ ] **フォント指定**: Noto Sans JP のフォールバックチェーン完全記述
- [ ] **コントラスト確認**: 背景色と文字色の組み合わせは WCAG AA（4.5:1）以上

### ❌ DON'T: 絶対禁止

- [ ] **暗い背景 + ネオン色**: 白背景 + 落ち着いた配色のみ
- [ ] **グラデーション背景**: フラットカラー固定
- [ ] **ドロップシャドウ多用**: opacity 0.08 以下、1スライド 2箇所まで
- [ ] **スライド全面を覆う色付き矩形**: 部分的なバンド・ラインのみ許容
- [ ] **英語カテゴリラベル見出し**: "FEATURES", "CASE STUDIES" など → 日本語で具体的に
- [ ] **絵文字**: ビジネス資料では使用禁止
- [ ] **リストの羅列（5項目以上）**: カード・テーブルに構造化
- [ ] **共有オブジェクトの使い回し**: PptxGenJS は破壊的に変換するため、各要素に新規オブジェクト生成
- [ ] **テーブルセルの共有オプション**: 各セルに直接スタイル指定

### DADS テーマ追加ルール

DADSテーマ（`dads`, `dads-neutral`）を使用する場合：
- セクション区切りスライドのみ Blue.700（`264AF4`）背景を許容
- その場合、ボトムバー・ヘッダー省略、全テキストを白（`FFFFFF`）に統一
- カラーは `@digital-go-jp/design-tokens` のプリミティブカラーのみ

---

## 8. Responsive Behavior

### Breakpoints

```
Desktop:  1920px + （標準設定）
Tablet:   768px–1024px
Mobile:   <768px
```

### Touch Target Minimums

- ボタン・リンク: 48px × 48px 以上
- アイコン: 24px 以上

### Typography Scaling

*PPT 出力では固定値（スケーリング不要）*
*Markdown 出力では以下に従う：*

```
Mobile: 本文 14–16px, 見出し 18–20px
Tablet: 本文 16px, 見出し 24px
Desktop: 本文 16px, 見出し 28px
```

---

## 9. Agent Prompt Guide

### Format: AI が参照する「魔法の一行」

**For Claude Code** (`pptx-creator`, `ai-cos`):
```
「白背景 + 紺アクセント + Noto Sans JP + 主張文見出し + 図解必須」
+ 禁止事項: 暗背景, グラデ, 動き, 大角丸, リスト羅列, 英字ラベル
```

**For Copilot** (Notion 公開・Markdown 出力):
```
「白背景コンセプト + 日本語禁則処理 + 行間150% + 出典明示」
+ Notion 公開時: ブランドバーを冒頭に追記、色は薄色背景のみ
```

### Quick Reference — 生成時チェックリスト

```
☐ Background: FFFFFF? (no gradient, no dark)
☐ Text contrast: 4.5:1 + ? (WCAG AA)
☐ Hex format: # なし 6文字?
☐ Font: Noto Sans JP + fallback chain?
☐ Title: 主張文 (not category label)
☐ Layout: 3種類以上混在?
☐ Figures: 図解 3枚以上 (10+ slides)?
☐ Data: 出典明示?
☐ Shadow: opacity ≤ 0.08, max 2 per slide?
☐ No emojis, no gradient, no large shadows
```

---

## References

- **Parent Spec**: `.claude/refs/ppt-rules.md` (PPT generation constraints)
- **Organization**: CLAUDE.md → スキル選択ルール・認知負荷ルール
- **External Standard**: [DADS (Digital Agency Design System)](https://design.digital.go.jp/dads/)
- **Font Source**: [Google Fonts — Noto Sans JP](https://fonts.google.com/noto/specimen/Noto+Sans+JP)

---

**Version**: 2026-04-11  
**Last Updated**: 初版作成 (awesome-design-md-jp integration)
