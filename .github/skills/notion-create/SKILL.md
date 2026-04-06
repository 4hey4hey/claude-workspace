---
name: notion-create
description: "Notionに新しいページを作成し、Markdown内容を書き込む。親ページIDまたはデータベースIDを指定して新規ページを追加する。"
---

# Notion Create — ページを新規作成して内容を記入

> フォルダ構成は `CLAUDE.md` → `.claude/refs/directory-structure.md` を参照。

## いつ使うか

- 「Notionにページを作って」と言われたとき
- 「この内容をNotionに追加して」と言われたとき

## 手順

### Step 1: 親ページIDを確認する

ユーザーに親ページURL or データベースIDを確認。URLの末尾32文字の16進数がID。

### Step 2: ページを作成する

```bash
npm run ntn -- api v1/pages \
  -d '{"parent":{"page_id":"<parent-page-id>"},"properties":{"title":[{"text":{"content":"ページタイトル"}}]}}'
```

レスポンスから `id` を控える。

### Step 3: Markdownで内容を書き込む

```bash
npm run ntn -- api v1/pages/<new-page-id>/markdown \
  -X PATCH \
  -d '{"type":"replace_content","replace_content":{"new_str":"# 見出し\n\n本文テキスト"}}'
```

### Step 4: 作成結果を確認する

```bash
npm run ntn -- api v1/pages/<new-page-id>/markdown -X GET
```

### Step 5（任意）: ローカルにも同期する

```bash
npm run notion:sync -- "<new-page-id>"
```

## データベースにアイテムを追加する場合

```bash
# スキーマ確認（必須）
npm run ntn -- api v1/databases/<database-id> -X GET

# ページ追加
npm run ntn -- api v1/pages \
  -d '{"parent":{"database_id":"<database-id>"},"properties":{"Name":{"title":[{"text":{"content":"アイテム名"}}]}}}'
```

DB のプロパティ構造はDBごとに異なる。作成前に必ず `GET v1/databases/<id>` でスキーマを確認。

## エラー時

| エラー | 対処 |
|---|---|
| `object_not_found` | 親ページ/DBがIntegrationに共有されていない |
| `validation_error` | プロパティ構造が不正。DBスキーマを再確認 |
| `restricted_resource` | Integrationにupdate content権限がない |

## 注意

- JSON内のMarkdownでは `"` → `\"`、改行 → `\n` にエスケープ
- 作成したページは自動ではローカルに同期されない（必要なら Step 5）
