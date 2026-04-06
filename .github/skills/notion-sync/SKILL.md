---
name: notion-sync
description: "Notionページをローカル（notion/）に同期する。既存の同期済みファイルの再同期、または新しいページの初回同期に使う。"
---

# Notion Sync — ページをローカルに同期

> フォルダ構成・配置ルールは `CLAUDE.md` → `.claude/refs/directory-structure.md` を参照。

## いつ使うか

- 「Notionを同期して」「notion/ を最新にして」と言われたとき
- 「このページをローカルに取ってきて」と言われたとき

## 手順

### パターン A: 特定ページを同期する

```bash
npm run notion:sync -- "https://www.notion.so/page-title-abc123def456"
npm run notion:sync -- "abc123def456789abc123def456789ab"
```

出力先: `notion/shared/{sanitized-title}.md`（自動決定）

### パターン B: 既存ファイルを再同期する

1. ユーザーに同期したいページのURLを確認
2. `npm run notion:sync -- <url>` を実行
3. 既存ファイルが同名であれば上書き

### パターン C: 全ファイル一括再同期

未実装。ユーザーに個別のURLを確認し、1つずつ実行する。

## 同期先ルール

| コンテンツ種類 | 配置先 |
|---|---|
| 組織横断（用語集、OKR、組織構造等） | `notion/shared/` |
| プロジェクト別ページ | `notion/projects/{pj-name}/` |

PJ別ページは現在スクリプトが `notion/shared/` 固定のため、同期後にファイルを移動する。

## エラー時

1. `NOTION_API_TOKEN is not set` → `.env` を確認
2. `Page not found` → ページがIntegrationに共有されているか確認
3. `Could not find module` → `npm install` を実行
