---
name: notion-export
description: "壁打ち・分析結果をNotion課題DBに送るための outbox ファイルを作成する。プロパティ（重要度・緊急度・分類・スコープ・対策・Status）を付与し、notion-publish で公開する。"
---

# Notion Export — 壁打ち結果をNotionへ送る準備

Claude Codeでの壁打ち・分析結果を、Notion課題DBに送るためのファイルを `notion/outbox/` に作成する。

## いつ使うか

- 壁打ち（ai-cos, issue等）の結果を「Notionに送りたい」と言われたとき
- `outputs/docs/` にある既存ファイルをNotionに送りたいとき
- `/notion-export` と呼ばれたとき

## 対象Notion DB

**課題管理DB**: `17a5a758b70a8016b828f74cadcabc94`

### DB プロパティ

| プロパティ   | タイプ       | 必須 | 選択肢                                                     |
| ------------ | ------------ | ---- | ---------------------------------------------------------- |
| **課題**     | title        | Yes  | （自由テキスト）                                           |
| **Status**   | status       | No   | `Not started` / `Waiting` / `In progress` / `Done`         |
| **重要度**   | select       | No   | `最高` / `高` / `中` / `低`                                |
| **緊急度**   | select       | No   | `最高` / `高` / `中` / `低`                                |
| **分類**     | multi_select | No   | `プロダクト` / `基盤` / `組織` / `プロセス` / `ガバナンス` |
| **スコープ** | select       | No   | `チーム` / `PJ横断` / `グループ`                           |
| **対策**     | text         | No   | （自由テキスト）                                           |

## 手順

### Step 1: 壁打ち結果からプロパティを判断する

会話の文脈から以下を判断する。判断に迷う場合はユーザーに確認する。

- **課題**（タイトル）: 壁打ちテーマを簡潔に（50文字以内）
- **重要度**: 事業インパクトから判断
- **緊急度**: 時間的制約・デッドラインから判断
- **分類**: 課題が「何についてのものか」を選択（複数可）
- **スコープ**: 課題の「影響範囲」を選択（単一）
- **対策**: 壁打ちで出たネクストアクションを要約
- **Status**: 通常は `Not started`。既に着手済みの場合は `In progress`

### Step 2: outbox ファイルを作成する

以下のフォーマットで `notion/outbox/` に保存する。

**ファイル名**: `YYYY-MM-DD_{slug}.md`（slug は課題タイトルの英語要約）

```markdown
---
# Notion Export Metadata
database_id: "17a5a758b70a8016b828f74cadcabc94"
status: "pending" # pending → published（notion-publish が更新）
created: "YYYY-MM-DD"
source: "outputs/docs/xxx.md" # 元ファイルがあれば記載。なければ "conversation"

# Notion DB Properties
notion_properties:
  課題: "課題タイトル"
  Status: "Not started" # Not started / Waiting / In progress / Done
  重要度: "高" # 最高 / 高 / 中 / 低
  緊急度: "中" # 最高 / 高 / 中 / 低
  分類: # 複数選択可
    - "プロダクト"
    - "基盤"
  スコープ: "PJ横断" # チーム / PJ横断 / グループ
  対策: "ネクストアクションの要約テキスト"
---

# 課題タイトル

（壁打ち結果の本文。Markdownで記述。これがNotionページの本文になる。）

## 背景・経緯

...

## 論点

...

## 対策案

...
```

### Step 3: ユーザーに確認する

作成したファイルの内容を表示し、以下を確認する：

1. プロパティ（重要度・緊急度・分類・スコープ）は合っているか
2. 本文の内容・粒度は適切か
3. 送信してよいか

確認が取れたら `npm run notion:publish` で公開する。

## 壁打ちスキルとの連携

ai-cos や issue スキルの完了後に「Notionに送る？」と聞くパターン：

1. 壁打ち結果の `outputs/docs/` ファイルを読む
2. 内容からプロパティを自動判定する
3. outbox ファイルを生成する

### プロパティ自動判定の目安

**重要度の判断基準**:

- 最高: 事業KPIに直結、経営報告事項
- 高: 複数チーム・PJに影響
- 中: 単一チーム・PJ内で完結
- 低: 改善提案、知見共有レベル

**緊急度の判断基準**:

- 最高: 今週中に対応が必要
- 高: 2週間以内に判断・着手が必要
- 中: 今月中に検討すればよい
- 低: 次四半期以降でもよい

**分類の判断基準**（課題が何についてのものか。複数選択可）:

- プロダクト: 機能・UX・顧客価値・KPI（outputs/docs/issues/product/ に対応）
- 基盤: 技術基盤・認証・EA・アーキテクチャ（outputs/docs/issues/platform/ に対応）
- 組織: 体制・役割・チーム設計・採用（outputs/docs/issues/organization/ に対応）
- プロセス: スクラム・デリバリー・開発フロー（outputs/docs/issues/process/ に対応）
- ガバナンス: 意思決定構造・権限・コンプライアンス（outputs/docs/issues/governance/ に対応）

**スコープの判断基準**（課題の影響範囲。単一選択）:

- チーム: 自チーム内で完結する課題
- PJ横断: 複数PJ・チームに影響する課題
- グループ: DPGグループ全体に関わる課題

## 複数課題の一括エクスポート

壁打ちから複数の課題が出た場合は、課題ごとに個別の outbox ファイルを作成する。1ファイル = 1 Notionページ。
