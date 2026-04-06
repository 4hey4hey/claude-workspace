---
name: pptx-reader
description: "Use this skill whenever the user wants to READ, UNDERSTAND, or ANALYZE the CONTENTS of an existing PowerPoint (.pptx) file. Trigger when the user shares or mentions a .pptx file and wants to know what's in it, get a summary, grasp the key messages, understand the structure, extract specific information, or prepare to discuss or comment on a presentation. Also trigger for Japanese phrases like 「このスライドを読んで」「パワポの内容を教えて」「プレゼンの概要まとめて」「このデッキ何が書いてある？」「資料を把握したい」. If a .pptx file path is mentioned and the user wants to understand it — use this skill."
---

# PowerPoint 読み込み・内容把握スキル

ユーザーが .pptx ファイルの内容を理解したいとき、このスキルを使う。
目標は「このファイルに何が書いてあるか」をすばやく把握できる形で提示すること。

---

## ステップ1: テキスト抽出

```bash
python -m markitdown <ファイルパス>
```

`markitdown` が未インストールなら先にインストール:
```bash
pip install "markitdown[pptx]"
```

---

## ステップ2: ビジュアル概観（必要に応じて）

スライドのレイアウト・図解を把握したい場合:

```bash
python scripts/thumbnail.py <ファイルパス>
```

スクリプトパスは `../pptx/scripts/thumbnail.py` にある。
生成されたサムネイル画像を読んで、テキストだけでは伝わらないレイアウトや図の情報を補完する。

---

## ステップ3: 構造化して提示する

抽出したテキストをもとに、以下の形式で日本語サマリーを提示する。

### 出力フォーマット

```
## 資料概要
**タイトル**: （ファイルまたは表紙スライドのタイトル）
**スライド数**: N枚
**推定目的**: （この資料が何のために作られているか、1〜2文で）

---

## スライド構成

| # | タイトル | 内容の要点 |
|---|---------|-----------|
| 1 | xxx     | yyy       |
| 2 | xxx     | yyy       |
...

---

## 主要メッセージ

（資料全体を通じて伝えようとしている核心を3〜5点で箇条書き）

---

## 補足・気になる点

（図・グラフの存在、参照先、データの種類、特記事項など）
```

---

## ステップ4（任意）: Context への取り込み

ユーザーが「contextに入れたい」「プロジェクト資料として保存したい」と指示した場合、以下の手順で取り込む。

### MD変換

```bash
source .venv/bin/activate && python3 scripts/pptx_to_md.py <入力.pptx> <出力先.md>
```

### 配置先の判定

| 資料の内容 | 配置先 |
|---|---|
| Kraken連携/基幹刷新に関する資料 | `assets/context/projects/kraken/` |
| 認証基盤/EA/CIAM/SSOに関する資料 | `assets/context/projects/auth-platform/` |
| mTG（myTOKYOGAS）に関する資料 | `assets/context/projects/mtg/` |
| EA構想に関する資料 | `assets/context/projects/ea/` |
| 上記に該当しない場合 | ユーザーに配置先を確認する |

### 取り込み手順

1. 元ファイルを `assets/context/projects/{pj}/originals/` にコピー
2. `scripts/pptx_to_md.py` で MD に変換し、プロジェクトフォルダに配置（ファイル名は内容を表す英語のケバブケース）
3. 該当プロジェクトの `_index.md` の「このフォルダの内容」セクションにリンクを追記
4. 変換元の PPTX ファイル名を `_index.md` に記録（更新時の再変換用）

### 例

```bash
# 1. 元ファイルをコピー
cp outputs/pptx/kraken_arch.pptx assets/context/projects/kraken/originals/

# 2. MD変換
python3 scripts/pptx_to_md.py assets/context/projects/kraken/originals/kraken_arch.pptx assets/context/projects/kraken/architecture.md
```

`_index.md` への追記:
```markdown
- [architecture.md](architecture.md) — システム構成・連携方式（変換元: originals/kraken_arch.pptx）
```

---

## 注意事項

- テキストだけで判断できない場合（図・グラフが重要そうな場合）はサムネイルも確認する
- スライド数が多い（20枚超）場合は、セクション単位でまとめてよい
- ユーザーが特定のスライドや情報を探しているなら、そこに絞って答える
- Context に取り込む場合は、変換元の PPTX パスを必ず `_index.md` に記録する
