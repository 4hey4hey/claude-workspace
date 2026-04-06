---
name: notion-update
description: "NotionページのURLを指定して内容を更新する。全置換、部分更新（search-and-replace）、追記に対応。"
---

# Notion Update — 既存ページの内容を更新

NotionページのURLまたはIDを指定し、Markdownで内容を書き込む・更新する。

## いつ使うか

- 「このNotionページを更新して」とURL付きで言われたとき
- 「Notionの○○ページにこの内容を追記して」と言われたとき
- ローカルで編集した内容をNotionに反映したいとき

## 前提条件

- `.env` に `NOTION_API_TOKEN` が設定済みであること
- 対象ページがIntegrationに共有されていること
- Integrationに **update content** 権限があること

## ページIDの抽出

NotionのURLからIDを抽出する：

```
https://www.notion.so/Page-Title-abc123def456789abc123def456789ab
                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                  この32文字がページID
```

ハイフン付きUUID形式の場合はハイフンを除去する。

## 3つの更新パターン

### パターン A: 全置換（replace_content）— 推奨

ページの全内容を新しいMarkdownで置き換える。最もシンプルで確実。

```bash
npm run ntn -- api v1/pages/<page-id>/markdown \
  -X PATCH \
  -d '{"type":"replace_content","replace_content":{"new_str":"# 新しいタイトル\n\n新しい内容をここに書く。\n\n## セクション1\n\n- 項目A\n- 項目B\n\n## セクション2\n\nテキスト本文。"}}'
```

**使い所**: ページ内容を丸ごと書き直すとき、初回の内容設定時

### パターン B: 部分更新（update_content）— 推奨

既存テキストを検索して置換する。複数箇所を一度に更新可能（最大100件）。

```bash
npm run ntn -- api v1/pages/<page-id>/markdown \
  -X PATCH \
  -d '{"type":"update_content","update_content":{"content_updates":[{"old_str":"変更前のテキスト","new_str":"変更後のテキスト"}]}}'
```

複数箇所を同時更新：

```bash
npm run ntn -- api v1/pages/<page-id>/markdown \
  -X PATCH \
  -d '{"type":"update_content","update_content":{"content_updates":[{"old_str":"古いテキスト1","new_str":"新しいテキスト1"},{"old_str":"古いテキスト2","new_str":"新しいテキスト2"}]}}'
```

同一テキストが複数箇所にある場合は `replace_all_matches: true` を付ける：

```bash
{"old_str":"対象テキスト","new_str":"置換テキスト","replace_all_matches":true}
```

**使い所**: 既存ページの一部だけ修正するとき

### パターン C: 追記（update_content応用）

末尾に追記する場合は、ページ最後の既存テキストを検索し、それに新しい内容を追加した文字列で置換する。

```bash
# まず現在の内容を確認
npm run ntn -- api v1/pages/<page-id>/markdown -X GET

# 最後のセクションを特定し、追記内容を含めて置換
npm run ntn -- api v1/pages/<page-id>/markdown \
  -X PATCH \
  -d '{"type":"update_content","update_content":{"content_updates":[{"old_str":"既存の最後のテキスト","new_str":"既存の最後のテキスト\n\n## 追記セクション\n\n追記内容"}]}}'
```

**使い所**: 既存ページの末尾に情報を追加するとき

## 推奨ワークフロー

### 1. 更新前に現在の内容を確認する

```bash
npm run ntn -- api v1/pages/<page-id>/markdown -X GET
```

レスポンスの `markdown` フィールドに現在の内容が返る。`truncated: true` の場合は内容が切り詰められている。

### 2. 更新を実行する

パターン A/B/C のいずれかを選択して実行。

### 3. 更新結果を確認する

レスポンスに更新後のMarkdown内容が返る。意図通りか確認する。

### 4. ローカルにも反映する（任意）

```bash
npm run notion:sync -- "<page-id>"
```

## エラー時

| エラー | 原因 | 対処 |
|---|---|---|
| `validation_error`: old_str not found | `old_str` がページ内容と完全一致しない | GET で現在の内容を確認し、正確な文字列を指定 |
| `validation_error`: multiple matches | `old_str` が複数箇所にマッチ | `replace_all_matches: true` を付けるか、より具体的な文字列を指定 |
| `validation_error`: would delete child pages | 子ページ/子DBを含む範囲を置換しようとした | `allow_deleting_content: true` を付ける（慎重に） |
| `object_not_found` | ページが存在しないかIntegrationに共有されていない | URLとIntegration共有を確認 |
| `restricted_resource` | update content権限がない | Notion Integration設定でCapabilitiesを確認 |

## 注意

- **更新前に必ず GET で現在の内容を確認する**。特に `update_content` は `old_str` の完全一致が必要
- JSON内のMarkdownでは `"` → `\"`、改行 → `\n` にエスケープすること
- 子ページや子データベースを含む範囲の操作は慎重に行う
- 大量の更新は複数回に分けて実行する（`content_updates` は最大100件/リクエスト）
