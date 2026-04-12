---
name: pptx-creator
description: "Use this skill whenever the user wants to CREATE, GENERATE, or OUTPUT a new PowerPoint (.pptx) file. Trigger when the user provides content, ideas, an outline, or bullet points and wants it turned into a presentation deck, or when they say things like 「スライドにして」「パワポ作って」「プレゼン資料にまとめて」「デッキを作りたい」「この内容をパワポで出力して」「会議用のスライドを作って」「提案書をパワポで」. Also trigger if the user is clearly building a presentation even without the word 'PowerPoint'. If the user wants slides as output — use this skill."
---

# PowerPoint 作成スキル

## コンセプト：「作らせるな、埋めさせろ」

AIにスライドを「作って」と丸投げすると、きれいだけど使えないものが出る。
テンプレには「見た目テンプレ」と「設計テンプレ」の2種類がある。
見た目（色・フォント・配置）だけ渡しても、ストーリーが通らない資料になる。

**このスキルの役割は「設計テンプレ」をユーザーと一緒に作り、見た目テンプレに「埋める」こと。**

- 「作って」→ NG。AIが構成を勝手に決め、主張が散漫になる
- 「この構成で埋めて」→ OK。人間が決めた主張をAIが具体化・データ挿入する

> AIの真価は作業の時短だけじゃなく、ノウハウを言葉にすることを強制してくれること。
> 顧客のことを考える時間まで、AIに預けてしまわない。

---

## ステップ0: デザインシステムを読み込む

生成前に必ず `scripts/lib/` の共有モジュールを確認する。

```bash
ls scripts/lib/
```

`scripts/lib/` が存在する場合、生成スクリプトでは必ずこれをインポートして使う。
存在しない場合は、SKILL.md 内のデザイン仕様に従い直接コードに記述する。

---

## ステップ1: 設計テンプレを作る（見た目より先に中身を決める）

### 設計テンプレの有無を確認する（最初に必ず確認）

- **`pptx-planner` で設計済みの場合 → Step 1 をスキップして Step 2（テーマ選択）へ**
  - 設計テンプレ（MD）の内容を確認・了解する
  - 主張文・だから何？・ボディ要素をそのままコードに反映する
  - ユーザーの承認なしに構成・タイトル・メッセージ方向性を変更しない
  - **「図解方式」カラムの処理:**
    - `diagram:*` → 生成済み PNG が `assets/diagrams/` にあるはず。`parts.addDiagramImage` で埋め込む。PNG が見つからない場合はユーザーに確認する
    - `parts:{関数名}` → 指定された parts.js 関数を使用する
    - `—` → テーブル・箇条書き等の通常パーツで対応する
- **設計テンプレなしの場合 → 通常通り Step 1-1〜1-4 を実施する**

---

**ファイル生成の前に、必ず「設計テンプレ」を完成させる。**
設計テンプレ = 各ページで何を主張するか × どんな順番で読ませるか × 読んだ人に何を判断してもらうか。

### Step 1-1: ゴールを1行で決める

ユーザーに「この資料で、誰に、何を判断してもらいたいか」を確認する。
ゴールが明確でない場合は AskUserQuestion で必ず聞く。

> 例：「ある企業の意思決定者に、Phase1の実施を合意してもらう」

### Step 1-2: 各ページの主張だけ先に並べる

中身はまだ書かない。主張（=スライドタイトル）だけ並べて、上から順に読んでストーリーが通るか確認する。

```
P1：御社の課題は〇〇である
P2：その課題の原因は△△にある
P3：解決策として□□を提案する
P4：Phase1のスコープと体制
P5：スケジュールとお見積り
```

**ストーリーチェック**: タイトルだけを上から順に読んで、話が通じるか確認する。
通らなければ順番や中身をユーザーと一緒に入れ替える。

### Step 1-3: 各ページに「だから何？」を書き足す

データを載せるだけじゃなく、「だからどうすべきか」の結論を1行足す。

| NG（データだけ） | OK（だから何？付き） |
| --- | --- |
| 市場規模は3000億円 | 市場規模3000億円。今参入しないと2年後には競合に取られる |
| 現行システムは老朽化 | 現行システムは2027年EOL。移行しなければ業務停止リスク |
| 顧客満足度が低下 | 満足度が前年比15%低下。解約率上昇の先行指標である |

**「だから何？」は人間の仕事。** AIが提案することはできるが、最終判断はユーザーに委ねる。

### Step 1-4: ボディ要素を設計する

主張が固まったら、各ページに入れるべき要素（データ、グラフ、比較表、図解など）を提案する。
ユーザーが参照データ（議事録、分析資料、数値データ等）を持っている場合はここで受け取る。

### 主張文（assertion）の原則 — 最重要ルール

**全コンテンツスライドのタイトルは、そのスライドで言いたいことを1行で言い切る主張文にする。**
カテゴリラベル（「概要」「背景」「まとめ」）ではなく、結論・主張・発見を書く。

| BAD（カテゴリラベル） | GOOD（主張文） |
| --- | --- |
| トラフィック構造変化 | AI Overviewにより公益事業のWeb流入が構造的に消失している |
| 3段階の行動変化 | お客さまの行動は3段階で不可逆に変わる |
| 提案内容 | 認証基盤の統合により年間1.2億円のコスト削減が可能 |
| 現状分析 | 現行システムは2027年のEOLまでに移行が必須 |

### 典型的な構成パターン（日本のビジネス文書）

- 表紙 → 背景・課題 → 現状分析 → 提案内容 → 効果・メリット → ネクストアクション
- 表紙 → アジェンダ → 各議題 → まとめ・決定事項
- 表紙 → サマリー → 詳細 → 付録

### 図解計画

10枚以上のデッキでは、構成段階で**図解スライドを最低3枚**計画する。
使える図解パターン: フロー、Before/After比較、2x2マトリクス、ピラミッド、タイムライン、ステッププロセス

### ステップ間の確認ルール

**各Stepごとにユーザーの確認を取ってから次に進む。**
ユーザーが「全部任せて」と言った場合でも、Step 1-2（主張の並び）は必ず確認を取る。
タイトルと「だから何？」のメッセージ方向性は、ユーザーの承認なしに変えない。

## --- GATE: Step 1 完了時のユーザー確認必須 ---
> **自動進行禁止**: Step 1-2（主張の並び）提示後、ここで出力を停止すること。ステップ2（テーマ選択）に進んではならない。
> **必須アクション**: `AskUserQuestion` ツールを使い、スライド構成・主張文・「だから何？」への承認を得ること。
> ユーザーが「全部任せて」と言った場合でも、このゲートは省略しない。

---

## ステップ2: テーマ・フォントを選択する

プレゼンの文脈に合わせてカラーテーマとフォントを選ぶ。

### カラーテーマ

`scripts/lib/themes.js` が存在する場合:

```javascript
const { getTheme } = require("./lib");
const theme = getTheme("corporate"); // テーマ名を選択
```

| テーマ名     | 用途イメージ                                                   |
| ------------ | -------------------------------------------------------------- |
| corporate    | 正式な提案・取締役会・公式資料（デフォルト）                   |
| modern       | スタートアップ・新規事業・DX提案                               |
| earth        | ESG・サステナビリティ・環境                                    |
| cool         | テック・IT・データ分析                                         |
| warm         | 社内報告・ワークショップ・チームMTG                            |
| mono         | ミニマル・データ重視・付録                                     |
| **dads**     | **デジタル庁デザインシステム準拠・行政・公共・ガバナンス資料** |
| dads-neutral | デジタル庁デザインシステム・グレーベース（技術資料・付録）     |

#### DADS テーマについて

`dads` / `dads-neutral` テーマは[デジタル庁デザインシステム（DADS）](https://design.digital.go.jp/dads/)の `@digital-go-jp/design-tokens` カラーパレットに準拠している。

**カラー対応表（dads テーマ）:**

| トークン   | DADS カラー   | HEX      | 用途                       |
| ---------- | ------------- | -------- | -------------------------- |
| P          | Blue.1000     | `00118F` | プライマリ（見出し・強調） |
| A          | Orange.600    | `FB5B01` | アクセント                 |
| S          | SolidGray.200 | `CCCCCC` | セパレータ・罫線           |
| CB         | SolidGray.50  | `F2F2F2` | カード背景                 |
| DT         | SolidGray.900 | `1A1A1A` | ダークテキスト             |
| ST         | SolidGray.600 | `666666` | サブテキスト               |
| ACCENTS[0] | Blue.700      | `264AF4` | 段階表示1                  |
| ACCENTS[1] | Purple.700    | `6F23D0` | 段階表示2                  |
| ACCENTS[2] | Green.700     | `1D8B56` | 段階表示3                  |
| ACCENTS[3] | Orange.700    | `E25100` | 段階表示4                  |

**セマンティックカラー（DADS公式定義準拠）:**

| 種別   | 背景               | 枠線                | テキスト            | DADS トークン                       |
| ------ | ------------------ | ------------------- | ------------------- | ----------------------------------- |
| 成功   | Green.50 `E6F5EC`  | Green.600 `259D63`  | Green.800 `197A4B`  | Success.1 / Success.2               |
| エラー | Red.50 `FDEEEE`    | Red.800 `EC0000`    | Red.900 `CE0000`    | Error.1 / Error.2                   |
| 警告   | Yellow.50 `FBF5E0` | Yellow.700 `B78F00` | Yellow.900 `927200` | Warning.Yellow.1 / Warning.Yellow.2 |
| 情報   | Blue.50 `E8F1FE`   | Blue.1000 `00118F`  | Blue.1000 `00118F`  | —                                   |

#### DADSテーマ — 全面カラースライドパターン

セクション区切り・表紙・まとめには Blue.700（`264AF4`）全面背景を使う。

```javascript
const BLUE_BG = "264AF4"; // Blue.700 — 全面背景用

// セクション区切りスライド
slide.background = { color: BLUE_BG };
slide.addText(title, {
  x: 1.0, y: 1.8, w: 8.0, h: 0.9,
  fontSize: 28, bold: true, color: "FFFFFF", fontFace: font.jp,
  align: "center", valign: "middle",
});
// フッターはページ番号のみ（白抜き）
slide.addText(String(pageNum), {
  x: 9.0, y: 5.25, w: 0.7, h: 0.3,
  fontSize: 11, color: "FFFFFF", fontFace: font.en,
  align: "right", valign: "middle",
});
```

**全面カラースライドのテキスト色ルール:**
- すべてのテキストを `"FFFFFF"`（白）にする
- ボトムバー・ヘッダーは省略（全面背景と干渉するため）
- コンテンツスライドの白背景での白テキストは禁止（[ppt-rules.md 参照](../../.claude/refs/ppt-rules.md)）

**DADSテーマ選択時のルール:**

- フォントプリセットは `dads` を使う（Noto Sans JP）
- 本文フォントサイズは16px（12pt）以上、14px（10.5pt）未満は原則不許可
- 行間は本文150%以上（`lineSpacingMultiple: 1.5` 以上）
- SolidGray.420（`949494`）が白背景に対するコントラスト比3:1の境界線。これより薄いグレーをテキストに使わない
- SolidGray.536（`767676`）が4.5:1の境界線。本文テキストはこれ以上の濃さを確保する

### フォントプリセット

```javascript
const { getFontPreset } = require("./lib");
const font = getFontPreset("corporate");
```

| プリセット | 日本語           | 英数字           | 用途                               |
| ---------- | ---------------- | ---------------- | ---------------------------------- |
| corporate  | Meiryo           | Arial            | ビジネス全般（デフォルト）         |
| modern     | Yu Gothic        | Segoe UI         | モダンな印象                       |
| premium    | Yu Mincho        | Garamond         | 経営・コンサル                     |
| clean      | BIZ UDPGothic    | Calibri          | ユニバーサルデザイン               |
| **dads**   | **Noto Sans JP** | **Noto Sans JP** | **デジタル庁デザインシステム準拠** |

### フォントサイズ（動的）

カラム数に応じて自動決定する。手動でサイズを決めない。

```javascript
const { getFontSize } = require("./lib");
const size = getFontSize("cardTitle", 3); // 3カラムの場合 → 12pt
```

### `scripts/lib/` が存在しない場合のフォールバック

以下を直接スクリプト内に定義する:

```javascript
const JA = "Meiryo";
const EN = "Arial";
const P  = "004098"; // プライマリ（ネイビー）— 見出し・バッジ・ボトムバー左
const A  = "DC2626"; // アクセント（レッド）— ボトムバー右・アクセントライン
const S  = "CADCFC"; // セパレータ（ライトブルー）
const CB = "EEF3FA"; // カード背景
const DT = "1A1A2E"; // ダークテキスト（本文）
const ST = "444466"; // サブテキスト
const WH = "FFFFFF"; // 白
const WarnBG = "FFF5F5"; // 警告カード背景（レッド系）

// マルチアクセント（4カテゴリのカードに使うコールトーン）
const MULTI_ACCENTS = ["004098", "065A82", "1C7293", "36454F"];
```

#### DADSテーマが必要な場合のフォールバック

```javascript
const JA = "Noto Sans JP";
const EN = "Noto Sans JP";
const P = "00118F"; // Blue.1000 プライマリ
const A = "FB5B01"; // Orange.600 アクセント
const S = "CCCCCC"; // SolidGray.200 セパレータ
const CB = "F2F2F2"; // SolidGray.50 カード背景
const DT = "1A1A1A"; // SolidGray.900 ダークテキスト
const ST = "666666"; // SolidGray.600 サブテキスト
const WH = "FFFFFF"; // White
```

---

## ステップ3: PptxGenJS で設計テンプレに「埋める」

**ここからがAIの仕事。** ステップ1で合意した設計テンプレ（主張 + だから何？ + ボディ要素）を、見た目テンプレに忠実に挿入する。

守るべき原則:
- **タイトル（主張文）と「だから何？」は変えない** — ユーザーが承認した方向性を勝手に変更しない
- **データは参照元から正確に引く** — 数値の丸めや解釈変更は確認を取る
- **構成順序を変えない** — ステップ1で合意した並び順を維持する

### セットアップ

pptxgenjs は `~/Documents/Claude/node_modules` にインストール済み。
スクリプトは `scripts/create_<name>.js` に書き、`outputs/pptx/` に出力する。

```bash
node scripts/create_<name>.js
```

### スクリプトテンプレート

```javascript
const PptxGenJS = require("pptxgenjs");

// --- デザインシステム読み込み ---
// scripts/lib/ が存在する場合:
const {
  getTheme,
  getPreset,
  parts,
  getFontSize,
  getFontPreset,
} = require("./lib");
const theme = getTheme("corporate");
const font = getFontPreset("corporate");

// --- プレゼンテーション初期化 ---
const pres = new PptxGenJS();
pres.title = "タイトル";

// --- スライド生成 ---
// レイアウトプリセットを使う（手動x/y計算は原則禁止）
const layout = getPreset("threeColumn");

// パーツ関数でスライド要素を追加
const slide = pres.addSlide();
parts.addBottomBar(slide, pres, theme);
parts.addHeader(slide, pres, theme, "セクション名");
parts.addSlideTitle(slide, pres, theme, "主張文をここに書く");

// --- diagram スライドの場合（図解方式が diagram:* のとき） ---
// 事前に pptx-diagram で生成した PNG を埋め込む
// ※ アスペクト比は PNG 実サイズから計算すること（歪み防止）
slide.addImage({
  path: "assets/diagrams/{name}.png",
  x: 算出値,  // (10 - IMG_W) / 2 で水平中央
  y: 1.25,
  w: 算出値,  // PNG比率から計算
  h: 算出値,  // PNG比率から計算（y+h ≤ 5.45）
});

// --- 出力 ---
pres.writeFile({ fileName: "outputs/pptx/<name>.pptx" });
```

### 技術的な注意（必ず守ること）

- **`slide.background` は全スライド必ず `{ color: 'FFFFFF' }` のみ** — 表紙・まとめスライドも例外なし。`slide.background = { color: theme.P }` は絶対に書かない。表紙の色はバンド形状（`addShape`）で表現する
- **【絶対禁止】色付き背景に暗い色・黒系の文字を重ねる** — 青背景に黒文字、紺背景に濃紺文字など可読性が低い組み合わせは使わない。色付き（中〜濃色）背景には必ず白文字を使う。薄色背景（`theme.CB`, `theme.SF` 等）のみダークテキストを許容する
- **hex カラーに `#` をつけない** → ファイル破損の原因
- **shadow の色に8文字hex（透明度込み）を使わない** → `opacity` プロパティを使う
- **bullet には `bullet: true` を使う**（`"•"` などのユニコード文字は使わない）
- **`option` オブジェクトを複数の `addShape` 呼び出しで使い回さない** → PptxGenJS がオブジェクトを破壊的に変換する
- **テーブルのセルオプションは各セルに直接書く**（共有オブジェクトにしない）
- **lineSpacingMultiple は addText のオプションに直接渡す**（paragraph 配列内では効かない場合がある）

---

## デザインシステム（`scripts/lib/` がない場合のフォールバック仕様）

### カラーシステム

| 用途                                          | カラー名       | hex      | 変数名 |
| --------------------------------------------- | -------------- | -------- | ------ |
| プライマリ（見出し・バッジ・ボトムバー左・テーブルヘッダー） | ネイビーブルー | `004098` | `P`    |
| アクセント（ボトムバー右端20%・アクセントライン・警告） | レッド         | `DC2626` | `A`    |
| セパレータ（区切り線・縦仕切り）              | ライトブルー   | `CADCFC` | `S`    |
| カード背景                                    | アイスブルー   | `EEF3FA` | `CB`   |
| 本文テキスト                                  | ダークネイビー | `1A1A2E` | `DT`   |
| サブテキスト                                  | スレートグレー | `444466` | `ST`   |
| 警告カード背景                                | ライトレッド   | `FFF5F5` | `WarnBG` |
| 背景                                          | ホワイト       | `FFFFFF` | `WH`   |

**マルチアクセント（4カテゴリのカードに使うコールトーン）**

| 用途       | hex      | 補足              |
| ---------- | -------- | ----------------- |
| カテゴリ1  | `004098` | P に同じ（ネイビー）   |
| カテゴリ2  | `065A82` | ダークティール     |
| カテゴリ3  | `1C7293` | ミドルティール     |
| カテゴリ4  | `36454F` | スレートブルー     |

### DADS カラーリファレンス（DADSテーマ選択時）

DADSテーマを使う場合、[デジタル庁デザインシステム](https://design.digital.go.jp/dads/)のカラーパレットに従う。
全HEX値は `@digital-go-jp/design-tokens` から取得。主要な色を以下に記載する。

#### プリミティブカラー（各色相13階調: 50〜1200）

| 色相      | 50       | 200      | 400      | 600      | 700      | 800      | 1000     | 1200     |
| --------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| Blue      | `E8F1FE` | `C5D7FB` | `7096F8` | `3460FB` | `264AF4` | `0031D8` | `00118F` | `000060` |
| LightBlue | `F0F9FF` | `C0E4FF` | `57B8FF` | `008BF2` | `0877D7` | `0066BE` | `00428C` | `00234B` |
| Green     | `E6F5EC` | `9BD4B5` | `51B883` | `259D63` | `1D8B56` | `197A4B` | `0C472A` | `032213` |
| Orange    | `FFEEE2` | `FFC199` | `FF8D44` | `FB5B01` | `E25100` | `C74700` | `8B3200` | `541E00` |
| Red       | `FDEEEE` | `FFBBBB` | `FF7171` | `FE3939` | `FA0000` | `EC0000` | `A90000` | `620000` |
| Purple    | `F1EAFA` | `DDC2FF` | `BB87FF` | `8843E1` | `6F23D0` | `5C10BE` | `41048E` | `21004B` |
| Yellow    | `FBF5E0` | `FFE380` | `FFC700` | `D2A400` | `B78F00` | `A58000` | `806300` | `604B00` |

#### ニュートラル（SolidGray）

| トークン      | HEX      | メモ                                      |
| ------------- | -------- | ----------------------------------------- |
| SolidGray.50  | `F2F2F2` | カード背景・サーフェス                    |
| SolidGray.100 | `E6E6E6` | テーブル罫線                              |
| SolidGray.200 | `CCCCCC` | セパレータ                                |
| SolidGray.420 | `949494` | 白背景に対して3:1（非テキスト最低ライン） |
| SolidGray.536 | `767676` | 白背景に対して4.5:1（テキスト最低ライン） |
| SolidGray.600 | `666666` | サブテキスト                              |
| SolidGray.700 | `4D4D4D` | 標準テキスト                              |
| SolidGray.800 | `333333` | 強調テキスト                              |
| SolidGray.900 | `1A1A1A` | 最高コントラストテキスト                  |

#### セマンティックカラー

| 種別             | レベル1             | レベル2             | DADS トークン         |
| ---------------- | ------------------- | ------------------- | --------------------- |
| Success          | Green.600 `259D63`  | Green.800 `197A4B`  | Success.1 / Success.2 |
| Error            | Red.800 `EC0000`    | Red.900 `CE0000`    | Error.1 / Error.2     |
| Warning (Yellow) | Yellow.700 `B78F00` | Yellow.900 `927200` | Warning.Yellow.1 / .2 |
| Warning (Orange) | Orange.600 `FB5B01` | Orange.800 `C74700` | Warning.Orange.1 / .2 |

### 追加のアクセント色（corporate テーマ — マルチカテゴリカード用）

4カテゴリのカード・グループに使うコールトーン（`MULTI_ACCENTS` 配列）:

| インデックス | hex      | トーン             |
| ------------ | -------- | ------------------ |
| [0]          | `004098` | ネイビーブルー（P に同じ） |
| [1]          | `065A82` | ダークティール     |
| [2]          | `1C7293` | ミドルティール     |
| [3]          | `36454F` | スレートブルー     |

### DADS タイポグラフィ仕様（DADSテーマ選択時）

DADSではフォントサイズをCSS px単位で定義。PowerPointのpt換算は `px * 0.75`。

| DADS トークン | CSS px | pt換算 | 用途（スライド上のマッピング） |
| ------------- | ------ | ------ | ------------------------------ |
| Dsp-48B-140   | 48     | 36     | 表紙タイトル                   |
| Std-32B-150   | 32     | 24     | スライドタイトル（主張文）     |
| Std-22B-150   | 22     | 16.5   | セクション見出し（H3）         |
| Std-20N-150   | 20     | 15     | 本文（標準）                   |
| Std-18N-160   | 18     | 13.5   | 本文（コンパクト）             |
| Std-16N-170   | 16     | 12     | カード内テキスト・キャプション |
| Dns-14N-130   | 14     | 10.5   | テーブルセル・注釈（最小許容） |
| Oln-16B-100   | 16     | 12     | バッジ・ラベル                 |

**フォントウェイト**: Normal（400）= 通常テキスト、Bold（700）= 見出し・強調

**行間（line-height）ルール:**

- 本文: 150%以上（`lineSpacingMultiple: 1.5`）— DADS規定の最低ライン
- 見出し: 140%〜150%（`lineSpacingMultiple: 1.4〜1.5`）
- カード内密度優先: 130%（`lineSpacingMultiple: 1.3`）
- ボタン・バッジ: 100%

**アクセシビリティ要件:**

- テキストのコントラスト比: 背景に対して4.5:1以上（WCAG AA）
- 非テキスト要素（枠線・アイコン）: 背景に対して3:1以上
- フォントサイズ14px（10.5pt）未満は原則不許可

### スライド共通仕様

- **背景**: 白（`FFFFFF`）、全スライド統一（表紙・まとめ含む）
- **フォント**: Meiryo（日本語）/ Arial（英数字・数値）
- **本文フォントサイズ**: 10〜12pt（コンパクト）/ 13〜15pt（標準）
- **見出しフォントサイズ**: H1: 36〜44pt（表紙） / H2: 22pt（スライドタイトル） / H3: 12〜14pt（セクション見出し）
- **見出し色**: `P`（004098）— スライドタイトル・パンくず・カードタイトル
- **太字テキスト色**: `P`（004098）または各アクセント色
- **行間**: `lineSpacingMultiple: 1.4〜1.5`
- **余白**: 全方向最低0.4インチ

### ボトムボーダー（全スライド必須）

```javascript
function addBottomBar(slide) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0,
    y: 5.56,
    w: 8.0,
    h: 0.07,
    fill: { color: P },
    line: { color: P },
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 8.0,
    y: 5.56,
    w: 2.0,
    h: 0.07,
    fill: { color: A },
    line: { color: A },
  });
}
```

### ヘッダー（コンテンツスライド用）

```javascript
function addHeader(slide, breadcrumb) {
  slide.addText(breadcrumb, {
    x: 0.4,
    y: 0.08,
    w: 9.2,
    h: 0.22,
    fontSize: 9,
    color: P,      // P色（004098）— cowork_guide 準拠
    fontFace: JA,
    align: "left",
    valign: "middle",
    margin: 0,
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0,
    y: 0.34,
    w: 10,
    h: 0.01,
    fill: { color: S },
    line: { color: S },
  });
}

function addSlideTitle(slide, title) {
  slide.addText(title, {
    x: 0.4,
    y: 0.42,
    w: 9.2,
    h: 0.65,
    fontSize: 22,
    bold: true,
    color: P,      // P色（004098）— cowork_guide 準拠
    fontFace: JA,
    align: "left",
    valign: "middle",
    margin: 0,
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0,
    y: 1.15,
    w: 10,
    h: 0.01,
    fill: { color: S },
    line: { color: S },
  });
}
```

### レイアウトパターン

#### 表紙パターン

ヘッダーなし。タイトルを縦積みで中央-左寄せに配置。

```javascript
// サブタイトル（小）: y=1.2, 16pt, ST
// メインタイトル（大）: y=1.7, 48pt, bold, P
// キャプション（中）: y=2.65, 32pt, ST
// レッドアクセントライン: y=3.4, h=0.015, fill=A
// アジェンダ一行: y=3.5, 13pt, ST
// 日付: y=4.8, 11pt, ST, Arial
```

#### アジェンダパターン（番号バッジ行リスト）

各項目を EEF3FA の横長行で表示。番号バッジ（P色丸）+ タイトル + 説明 + 縦仕切り線。

```javascript
// 行カード: x=0.4, y=開始Y, w=9.2, h=0.66, fill=CB
// バッジ(円): x=0.55, y=行中央, w=h=0.32, fill=P
// 番号テキスト: 11pt, bold, FFFFFF, Arial
// 縦仕切り: x=5.0, w=0.02, h=0.36, fill=S（左右2列の場合）
// タイトル: x=1.05, 14pt, bold, P
// 説明: x=1.05, y+0.32, 11pt, ST
```

#### 特徴カード（左縦バー型）— 2×2 or シングル

EEF3FA 背景カードの左端に細い縦アクセントバーを配置。マルチアクセントで色違い4種。

```javascript
// カード全体: fill=CB(EEF3FA), w=4.5, h=1.4
// 左縦バー: w=0.05, h=カード全高, fill=MULTI_ACCENTS[i]
// タイトル: x=カードx+0.18, 13pt, bold, color=アクセント色
// 本文: 11pt, DT
// ドット箇条書き: x+0.18, 小正方形(w=h=0.08), fill=アクセント色

// 2×2 グリッドの座標例:
// 左カード x=0.4, 右カード x=5.08
// 上段 y=1.35, 下段 y=3.13, gap=0.18(行間)
```

#### ヘッダーバー型カード（上部帯）— 2×2

カード上部に帯（h=0.38）を配置し、白文字タイトル。マルチアクセント4色。

```javascript
// カード全体: fill=CB(EEF3FA), w=4.5, h=1.6
// 上部帯: same w, h=0.38, fill=MULTI_ACCENTS[i]
// タイトル: 帯内, 13pt, bold, WH
// 本文: 帯下, 11pt, DT
```

#### ステップフロー（完全幅行 + 番号バッジ）

1〜N のステップを完全幅の行カードで縦並び。

```javascript
// 行カード: x=0.4, w=9.2, h=0.68, fill=CB
// バッジ(丸): x=0.6, y=行中央, w=h=0.32, fill=P
// バッジ番号: 11pt, bold, WH, Arial
// 縦仕切り: x=1.1, w=0.01, h=0.68, fill=S
// ステップタイトル: x=1.25, 13pt, bold, P
// 説明: x=1.25, y+0.30, 11pt, DT

// 行の y 計算: y[i] = startY + i * (rowH + gap)
// startY=1.32, rowH=0.68, gap=0.1
```

#### 比較テーブルパターン（3列）

```javascript
// ヘッダー行: fill=P, 白文字, 12pt, bold
// 奇数データ行: fill=CB(EEF3FA)
// 偶数データ行: fill=FFFFFF
// 全行: h=0.543, 各列幅を合計=9.2になるよう設定
// 補足テキスト: y=5.12, 10pt, ST（最終行が押し出す場合）
```

#### 左右分割パターン（手順 + 警告/補足）

左側: ステップ番号リスト（P色バッジ）
右側: 警告カード（WarnBG背景 + A色ヘッダー帯）

```javascript
// 左ステップ: x=0.4, w 約4.5
// 右警告カード全体: x=5.1, w=4.5, h=3.2, fill=WarnBG(FFF5F5)
// 右ヘッダー帯: h=0.38, fill=A(DC2626)
// 右タイトル: 12pt, bold, WH
// 右ドット: 小正方形(0.1x0.1), fill=A
// 右本文: 11pt, DT
```

#### まとめ行テーブルパターン（Summary Row）

ラベルセル（P色背景・白文字）+ コンテンツセル（CB背景・DT文字）の2セット横並び。

```javascript
// 見出し: y=0.5, 28pt, bold, P（パンくず・タイトル区切りなし）
// アクセントライン: y=1.1, h=0.015, w=3.5, fill=A
// 各行:
//   ラベルセル: x=0.5, w=1.5, h=0.72, fill=P — 11pt, bold, WH
//   コンテンツセル: x=2.1, w=7.4, h=0.72, fill=CB — 12pt, DT
// 行 y: 1.25 → 2.15 → 3.05 → 3.95（gap=0.1）
```

#### 警告/強調ボックスパターン

| 種別 | 背景 | ヘッダー帯 | テキスト | 用途 |
|------|------|-----------|---------|------|
| 警告（赤系） | `FFF5F5` | `DC2626` | `1A1A2E` / `DC2626` | セキュリティ・制限事項 |
| 情報（青系） | `EEF3FA` | `004098` | `004098` / `1A1A2E` | 推奨事項・ポイント |

> 黄色系の警告ボックスは使わない（A色=DC2626 を基準に統一）

#### 補足テキスト（スライド下部）

```javascript
// 比較テーブル等で内容が y=5.1 付近まで来る場合に使用
slide.addText("補足説明テキスト", {
  x: 0.4, y: 5.12, w: 9.2, h: 0.25,
  fontSize: 10, color: ST, fontFace: JA,
  align: "left", valign: "middle",
});
// ボトムバーは y=5.56。コンテンツ安全上限は y+h ≤ 5.45
```

### 避けるべきパターン

→ 詳細は `.claude/refs/ppt-rules.md` の禁止パターン一覧を参照。

主なもの:

- ダーク背景 + ネオン色（Webデザイン由来の AI 臭）
- 英語カテゴリラベルの見出し
- 絵文字
- アイコン+カードだけで図解なし
- 全スライド同じレイアウト
- 「Thank you」スライド（ネクストアクション/まとめで終わる）
- テキストだけのスライド

---

## ステップ4: QA（設計テンプレ整合 + テキスト確認 + 構造検証 + 主張文チェック）

### 設計テンプレ整合チェック（最重要）

ステップ1で合意した設計テンプレと生成結果を突き合わせ、以下を確認:

- [ ] 各スライドの主張文（タイトル）が設計テンプレ通りか
- [ ] 「だから何？」のメッセージ方向性が変わっていないか
- [ ] スライドの並び順が設計テンプレ通りか
- [ ] ボディ要素（データ・グラフ・比較表）が計画通り入っているか
- [ ] ゴール（誰に何を判断してもらうか）に対してストーリーが通るか

**1つでもズレていたら修正してから次に進む。**

### テキスト確認

```bash
python3 -m markitdown outputs/pptx/<file>.pptx
```

内容の抜け・誤字・順序を確認する。

### 主張文チェック（新規）

markitdown の出力から各スライドタイトルを抽出し、以下を確認:

- タイトルが動詞を含む主張文であること（カテゴリラベルでないこと）
- サムネイル順にタイトルだけ読んでストーリーが通じること

### 構造検証（オーバーフロー + 重なり検出）

```python
from pptx import Presentation

prs = Presentation("outputs/pptx/<file>.pptx")
SLIDE_H = prs.slide_height.inches  # 5.625
SLIDE_W = prs.slide_width.inches   # 10.0

overflows = []
real_overlaps = []

for slide_num, slide in enumerate(prs.slides, 1):
    shapes = []
    for s in slide.shapes:
        try:
            l = s.left.inches if s.left else 0
            t = s.top.inches if s.top else 0
            w = s.width.inches if s.width else 0
            h = s.height.inches if s.height else 0
            shapes.append({'name': s.name, 'x1': l, 'y1': t, 'x2': l+w, 'y2': t+h})
            # オーバーフロー
            if t + h > SLIDE_H + 0.01 or l + w > SLIDE_W + 0.01:
                overflows.append(f"Slide {slide_num}: {s.name} bottom={t+h:.3f} right={l+w:.3f}")
        except:
            pass

    # 重なり検出（面積 > 0.1 sq in のみ = 意図的でない重なり）
    for i in range(len(shapes)):
        for j in range(i+1, len(shapes)):
            a, b = shapes[i], shapes[j]
            ox = min(a['x2'], b['x2']) - max(a['x1'], b['x1'])
            oy = min(a['y2'], b['y2']) - max(a['y1'], b['y1'])
            if ox > 0.01 and oy > 0.01 and ox * oy > 0.1:
                # カード上のテキスト（Shape+Text の組み合わせ）は意図的なので除外
                # 順序に依存しない双方向マッチ
                names = {a['name'][:5], b['name'][:5]}
                is_card_text = ('Shape' in names and 'TextB' in a['name'][:5] + b['name'][:5]) or \
                               any(n.startswith('Shape') for n in names) and any(n.startswith('Text') for n in names)
                if not is_card_text:
                    real_overlaps.append(
                        f"Slide {slide_num}: '{a['name']}' vs '{b['name']}' "
                        f"({ox:.2f}\" x {oy:.2f}\" = {ox*oy:.3f} sq in)"
                    )

print(f"=== Overflow ({len(overflows)} issues) ===")
for o in overflows: print(f"  {o}")
print(f"\n=== Real overlaps ({len(real_overlaps)} issues) ===")
for o in real_overlaps: print(f"  {o}")
```

**検出ルール:**
- **オーバーフロー**: 座標がスライド境界（W:10, H:5.625）を超えるもの
- **実際の重なり**: 面積0.1 sq in超かつ Shape+Text ペア以外（カード上テキストは正常パターン）
- Shape+Text の0.04" 厚アクセントライン、バッジ円など小面積はノイズとして無視

**コンテンツの安全Y座標（統一）:**
- ボトムバーは y = 5.56
- コンテンツの最大 y+h は **5.45 以下**（ボトムバーとの余白0.11インチ確保）
- フッター・補足テキスト（最下行要素）も y+h ≤ 5.45 に収める
- QAスクリプトのオーバーフロー検出閾値（SLIDE_H + 0.01 = 5.635）とは別に、5.45 を設計上限として守る

### 図解チェック（新規）

10枚以上のデッキの場合、図解（フロー、比較、マトリクス等）が3枚以上含まれていることを確認する。

### テキストoverflowチェック（目視・自動検出不可）

python-pptxスクリプトはシェイプの座標・サイズのみを読むため、テキストの「見た目のはみ出し」は検出できない。以下を目視で確認する。

- [ ] スライドタイトル（主張文）が2行以上に折り返していないか
- [ ] カード内テキストの文字量がカード高さに収まっているか（特に3カラム以上）
- [ ] テーブル行数が増えて y+h が 5.45 を超えていないか
- [ ] 補足テキスト（最下段）が ボトムバー（y=5.56）と重なっていないか

問題があれば修正 → 再検証を行う。

---

## 出力

- 生成スクリプト: `scripts/create_<name>.js`
- 出力ファイル: `outputs/pptx/<name>.pptx`
- 完成後、スライド数・構成の概要をユーザーに報告する
- **設計テンプレ（ゴール + 各ページ主張 + だから何？）を最終確認として再掲する**
