---
name: pptx-diagram
description: "体制図・フローチャート・組織図などのポンチ絵をPPTスライドに挿入するスキル。drawioスキルでXML生成→VSCodeプレビュー確認後、PNGに変換してPptxGenJSのaddImageで埋め込む。Trigger when: 「体制図を入れたい」「フローチャートを作って」「ポンチ絵を挿入したい」「draw.io XMLをスライドにしたい」「図解を入れたい」など。pptx-creatorと組み合わせて使う。"
---

# PPT 図解挿入スキル（ポンチ絵埋め込み）

## このスキルの役割

`drawio` スキルに draw.io XML の生成とファイル保存を委譲し、プレビュー確認後に PNG へ変換してPPTスライドに埋め込む。

```
入力: 図の内容説明 / 既存の .drawio ファイル
  ↓
【Step 1】drawio スキルを呼び出す
  → assets/diagrams/{name}.drawio を生成・保存
  → ファイルを開いてプレビュー
  ↓
【プレビューゲート】ユーザー確認 → OK待ち
  ↓  ← ユーザーが「OK」と言ったら次へ進む
【Step 2】PNG 変換: drawio CLI
  ↓
【Step 3】アスペクト比計算 → slide.addImage で埋め込み
```

**重要:** PNG 変換はユーザーの「OK」を受けてから実行する。

---

## セットアップ確認（初回のみ）

```bash
/Applications/draw.io.app/Contents/MacOS/draw.io --version
```

→ バージョンが表示されればOK。表示されない場合は draw.io デスクトップアプリをインストールする。

---

## Step 1: drawio スキルで XML を生成・保存する

`drawio` スキル（Skill ツール）を呼び出す。プロンプトに以下を明示する:

- 図の内容・要件
- 保存先: `assets/diagrams/{name}.drawio`（カレントディレクトリからの相対パス）
- エクスポート形式: 指定しない（`.drawio` ファイルのみ保存）

> **呼び出し例（Skill ツール）:**
> ```
> skill: "drawio"
> args: "以下の要件で draw.io XML を生成し assets/diagrams/{name}.drawio に保存してください。エクスポートは不要です。[図の要件]"
> ```

### draw.io XML の設計ガイドライン

drawio スキルへのプロンプトに含めること:

- `pageWidth` / `pageHeight` は図の概算サイズに合わせる（目安: 1000×450）
- ブランドカラー:
  - 主色（紺）: `fillColor=#004098;fontColor=#ffffff;strokeColor=#004098`
  - 薄青: `fillColor=#EEF3FA;fontColor=#1A1A2E;strokeColor=#004098`
  - グレー（通常ノード）: `fillColor=#f5f5f5;fontColor=#444466;strokeColor=#CADCFC`
  - アクセント（赤）: `fillColor=#DC2626;fontColor=#ffffff;strokeColor=#DC2626`
- **【絶対禁止】色付き背景に暗い色・黒系の文字を重ねる** — 色付き（中〜濃色）背景には必ず白文字（`fontColor=#ffffff`）を使う。薄色背景（`#EEF3FA`, `#f5f5f5` 等）のみダーク文字を許容する
- ノードスタイル: `rounded=1;whiteSpace=wrap;html=1;arcSize=8;`
- エッジスタイル: `edgeStyle=orthogonalEdgeStyle;strokeColor=#94A3B8;strokeWidth=1.5;`
- HTML ラベル: `&lt;b&gt;太字&lt;/b&gt;&lt;br&gt;サブテキスト`（`html=1` のとき）

---

## プレビューゲート（Step 1 完了後）

drawio スキルがファイルを開いたら、ユーザーに確認を求める:

> `assets/diagrams/{name}.drawio` を生成しました。draw.io（またはVS Code）で図を確認してください。
> 修正がある場合はファイルを直接編集・保存してください。
> 問題なければ「OK」と言ってください。PNG への変換を開始します。

⚠️ **「OK」が来るまで次のステップに進まない。**

---

## Step 2: PNG 変換 → アスペクト比計算

### PNG 変換

```bash
/Applications/draw.io.app/Contents/MacOS/draw.io \
  -x -f png -e -b 10 \
  -o assets/diagrams/{name}.drawio.png \
  assets/diagrams/{name}.drawio

# 実サイズ確認
sips -g pixelWidth -g pixelHeight assets/diagrams/{name}.drawio.png
```

フラグの意味:
- `-x`: エクスポートモード
- `-f png`: PNG 形式
- `-e`: 図の XML を PNG に埋め込む（draw.io で再編集可能）
- `-b 10`: 余白 10px
- `-o`: 出力ファイルパス

### PPTX 埋め込みサイズをアスペクト比から計算

```bash
node -e "
const [w, h] = [実際のpxW, 実際のpxH];
const ratio = w / h;
const maxH = 5.45 - 1.25;
const pH = Math.min(maxH, 9.6 / ratio);
const pW = pH * ratio;
const x  = (10 - pW) / 2;
console.log('x:', x.toFixed(3), 'w:', pW.toFixed(3), 'h:', pH.toFixed(3));
"
```

---

## Step 3: PPT スライドへの埋め込み

```javascript
// Step 2 で算出した値を使う（歪み防止のため必ずアスペクト比に合わせる）
const IMG_W = 算出値;            // 例: 9.13
const IMG_H = 算出値;            // 例: 4.20
const IMG_X = (10 - IMG_W) / 2; // 水平中央揃え

parts.addBottomBar(slide, pres, theme);
parts.addHeader(slide, pres, theme, { breadcrumb: 'セクション名', font });
parts.addSlideTitle(slide, pres, theme, { title: '主張文をここに書く', font });

slide.addImage({ path: 'assets/diagrams/{name}.drawio.png', x: IMG_X, y: 1.25, w: IMG_W, h: IMG_H });
```

### 座標ガイドライン

```
ヘッダー:       y = 0.08〜0.34
タイトル:       y = 0.42〜1.15
コンテンツ領域: y = 1.25 〜 y+h ≤ 5.45
ボトムバー:     y = 5.56
```

---

## Step 4: QA チェック

- [ ] PNG が `assets/diagrams/` に保存されているか（`{name}.drawio.png`）
- [ ] 白背景で出力されているか
- [ ] 図がタイトル・ボトムバーと重なっていないか（y+h ≤ 5.45）
- [ ] 文字が読める解像度か（プレビューで確認済みのはず）

---

## ファイル保存先

| ファイル種別   | 保存先                                 |
| -------------- | -------------------------------------- |
| draw.io XML    | `assets/diagrams/{name}.drawio`        |
| 変換後 PNG     | `assets/diagrams/{name}.drawio.png`    |
| 生成スクリプト | `scripts/create_{name}.js`             |
| PPTX           | `outputs/pptx/{name}.pptx`            |
