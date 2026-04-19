# Notion CLI Usage

## 目的

GitHub Copilot から Notion CLI を安定して使うためのワークスペース手順。

## 前提

- プロジェクト直下に `.env` を置く
- `.env` に `NOTION_API_TOKEN=...` を設定する
- Notion 側で対象ページやデータベースを Integration に共有する

このワークスペースでは `.env` の読込は `npm run ntn -- ...` 実行時に自動で行う。

## 基本コマンド

```bash
npm run ntn -- --help
npm run ntn -- api ls
npm run ntn -- api v1/users page_size==100
```

## よく使う例

```bash
# エンドポイント一覧
npm run ntn -- api ls

# 特定エンドポイントのヘルプ
npm run ntn -- api v1/pages --help

# データベースをクエリ
npm run ntn -- api v1/databases/<database_id>/query -X POST

# ファイル一覧
npm run ntn -- files list
```

## 既存の同期スクリプトとの使い分け

- Notion ページを Markdown 化して保存する: `npm run notion:sync -- <page-url-or-id>`
- Notion API を直接叩く、files を触る: `npm run ntn -- ...`

## Copilot への依頼例

```text
npm run ntn -- api ls を実行して
npm run ntn -- api v1/pages --help を見て
npm run ntn -- files list を実行して
```

## 今やること

1. `.env` の `NOTION_API_TOKEN=` に Integration token を入れる
2. Notion の対象ページまたはデータベースをその Integration に共有する
3. `npm run ntn -- api ls` で接続確認する
