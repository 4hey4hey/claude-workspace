---
name: notion-cli
description: "Use the Notion CLI with GitHub Copilot in this workspace. Use when the user asks to call the Notion API, query a database, create or update a page, upload a file to Notion, inspect endpoint docs, or run the ntn command."
---

# Notion CLI

このワークスペースでは Notion CLI をローカル依存として使う。グローバルインストール前提ではない。

## Before You Run

- `NOTION_API_TOKEN` をプロジェクト直下の `.env` に設定する
- ページやデータベースは対象 Integration に共有しておく
- まず CLI のヘルプを確認してから実行する

## Command Rules

- 直接 `ntn` が通らない場合は `npm run ntn -- <subcommand>` を使う
- 構文を推測せず、最初に `npm run ntn -- --help` か `npm run ntn -- api --help` を実行する
- エンドポイント確認は `npm run ntn -- api ls` を優先する
- 詳細仕様確認は `npm run ntn -- api <path> --help`、必要なら `--docs` と `--spec` を使う

## Common Examples

```bash
npm run ntn -- --help
npm run ntn -- api ls
npm run ntn -- api v1/users page_size==100
npm run ntn -- api v1/databases/<database_id>/query --help
npm run ntn -- files list
```

## Authentication Notes

- `npm run ntn -- api ...` と `npm run ntn -- files ...` は `NOTION_API_TOKEN` を使う
- `npm run ntn -- ...` は `scripts/notion-cli.js` 経由で `.env` を自動読込する
- `.env` に `NOTION_API_TOKEN=...` を設定すれば追加の export は不要

## Workspace Conventions

- Markdown へのページ同期は既存の `npm run notion:sync -- <page-url-or-id>` を使う
- 汎用 API 操作やファイル操作は `npm run ntn -- ...` を使う
- 既存ファイルを更新する前に対象オブジェクト ID と権限を確認する
