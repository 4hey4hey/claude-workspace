---
name: notion-publish
description: "notion/outbox/ の未送信ファイル（status: pending）をスキャンしてNotion課題DBに自動公開する。新規作成・既存更新の両対応。本文はMarkdown API経由で構造維持"
---

# Notion Publish — outbox の未送信を全て自動公開

notion/outbox/ の **`status: "pending"` ファイルを自動スキャン**して Notion に公開する。
新規ページ作成と既存ページ更新の両方に対応。本文は Markdown API 経由で見出し・テーブル等の構造を維持。

## いつ使うか

- 「outboxを公開して」「Notionに送って」と言われたとき
- ai-cos や issue の出力を Notion に自動反映したいとき

## 実行方法

```bash
npm run notion:publish
```

自動確認（CI等）:

```bash
npm run notion:publish -- --auto-confirm
```

## 実行フロー

1. `notion/outbox/*.md` をスキャン → `status: "pending"` を抽出
2. frontmatter 解析 → notion_properties / body を分離
3. 新規 or 更新を自動判定（`notion_page_id` / `update_page_id` の有無）
4. Notion API → ページ作成 or プロパティ更新
5. Markdown API → 本文を構造付きで書き込み
6. frontmatter を `status: "published"` に更新（YAML コメント保持）
7. 結果サマリを出力

## frontmatter フォーマット

```yaml
---
# Notion Export Metadata
database_id: "17a5a758b70a8016b828f74cadcabc94" # 必須
status: "pending"                                # 必須
created: "2026-03-30"
source: "outputs/docs/xxx.md"

# 既存ページ更新時（どちらかがあれば UPDATE モード）
update_page_id: "xxxx-xxxx"                     # optional
notion_page_id: "xxxx-xxxx"                     # optional（前回公開時に自動記録）

# Notion DB Properties
notion_properties:
  課題: "ページタイトル"                        # 必須 (title)
  Status: "Not started"                         # optional (status)
  重要度: "高"                                   # optional (select)
  緊急度: "中"                                   # optional (select)
  分類:                                          # optional (multi_select)
    - "プロダクト"
    - "基盤"
  スコープ: "PJ横断"                            # optional (select)
  対策: "ネクストアクション要約"                # optional (rich_text)
---
```

frontmatter 以降の本文が Notion ページ本文として Markdown API で書き込まれる。

## 動作モード

| 条件 | モード | 処理 |
| --- | --- | --- |
| `notion_page_id` も `update_page_id` もない | **[NEW]** | ページ新規作成 |
| `notion_page_id` or `update_page_id` がある | **[UPDATE]** | 既存ページのプロパティ＋本文を上書き |

## ステータス定義

| status | 意味 | 処理 |
| --- | --- | --- |
| `pending` | 未送信 | **処理対象** |
| `published` | 送信済み | スキップ（二重投稿防止） |
| `error` | 前回エラー | スキップ（手動で pending に戻す） |

## プロパティ値（Notion DB スキーマ）

| プロパティ | タイプ | 有効な値 |
| --- | --- | --- |
| **Status** | status | `Not started` / `Waiting` / `In progress` / `Done` |
| **重要度** | select | `最高` / `高` / `中` / `低` |
| **緊急度** | select | `最高` / `高` / `中` / `低` |
| **分類** | multi_select | `プロダクト` / `基盤` / `組織` / `プロセス` / `ガバナンス` |
| **スコープ** | select | `チーム` / `PJ横断` / `グループ` |
| **対策** | rich_text | 自由テキスト（2000文字超は自動分割） |

> **後方互換**: frontmatter で `領域` を使っている場合も `分類` として送信される。

## 成功時に記録される情報

```yaml
status: "published"
published_at: "2026-03-30T15:30:00.000Z"  # 自動記録
notion_page_id: "abc123..."               # 自動記録
notion_url: "https://www.notion.so/..."   # 自動記録
```

## エラー時の対応

| エラー | 原因 | 対処 |
| --- | --- | --- |
| `validation_error` | プロパティ値が DB 定義と不一致 | frontmatter の値を確認 |
| `object_not_found` | DB が Integration に共有されていない | Notion 側で Integration 共有確認 |
| `restricted_resource` | Integration 権限不足 | Capabilities を確認 |
| `Markdown API 4xx` | 本文のフォーマット問題 | Markdown 構文を確認 |
| Parse Error | frontmatter の YAML が不正 | YAML 形式を修正 |

失敗ファイルは `status: "error"` に更新してスキップ。次のファイル処理を続行。

## 注意

- `status: "published"` ファイルは **絶対に再処理しない**（二重投稿防止）
- 10件以上処理時は API レート制限を考慮（3秒間隔で自動wait）
- `notion/outbox/` ファイルは公開後も残す（追跡・監査用）
- `NOTION_API_TOKEN` が `.env` に設定されていることを確認
- frontmatter の YAML コメント（`# Notion Export Metadata` 等）は更新時に保持される
