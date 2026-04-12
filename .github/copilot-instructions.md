# Copilot ワークスペース指示書

## ユーザープロフィール

東京ガスのデジタル/プロダクト開発領域で活動するスクラムマスター兼マネージャー。myTOKYOGAS、Kraken連携、基幹刷新、EA/ID基盤などの大型テーマと内製開発組織づくりを横断して担当。

### 出力の期待値

- 抽象論だけで終わらず、実務で使える形に構造化する
- 判断基準、表、テンプレート、たたき台まで落とす
- 経営・事業・プロダクト・開発・組織の複数視点を同時に扱う
- 出力はそのまま会議・資料・Notion・Slackに転用できる形で
- 末尾に「次の一手」セクション（最大3項目、誰が/何を/いつまでに）を必ずつける

---

## スキルルーティング（最重要）

このワークスペースには2種類のスキルがある。**正本は常に `skills/` ディレクトリ**にある。

### 正本スキル一覧（`skills/` — Claude Code / Copilot 共用）

ユーザーが以下のスキルを要求したら、**必ず該当ファイルを `cat` で読んでから実行する**こと。

| スキル名 | 正本パス | 用途 |
|----------|---------|------|
| **ai-cos** | `skills/ai-cos/SKILL.md` | 課題構造化・壁打ち・GM向け報告・意思決定支援・仕上げ（レッドチーム） |
| **era** | `skills/era/SKILL.md` | 施策のAIエージェント時代耐性レビュー |
| **issue** | `skills/issue/SKILL.md` | 多視点構造化 / ドキュメントレビュー |
| **review** | `skills/review/SKILL.md` | ドキュメントレビュー（issueのショートカット） |
| **team-pulse** | `skills/team-pulse/SKILL.md` | チームタスク配分・負荷管理・アサイン検討 |
| **notion-export** | `skills/notion-export/SKILL.md` | 壁打ち結果→Notion outbox出力 |
| **notion-publish** | `skills/notion-publish/SKILL.md` | outbox未送信ファイル→Notion自動公開 |
| **ppt** | `skills/ppt/SKILL.md` | PPT統合フロー（設計→承認→生成） |
| **pptx-planner** | `skills/pptx-planner/SKILL.md` | PPT設計テンプレ作成 |
| **pptx-creator** | `skills/pptx-creator/SKILL.md` | PPTX生成 |
| **pptx-reader** | `skills/pptx-reader/SKILL.md` | PPTX読み取り |
| **pptx-diagram** | `skills/pptx-diagram/SKILL.md` | draw.io→PNG→PPTXスライド埋め込み |
| **schedule-finder** | `skills/schedule-finder/SKILL.md` | OWAカレンダーの空き時間検索 |
| **hiring-agent** | `skills/hiring-agent/SKILL.md` | 採用パイプライン支援 |

### スキル選択ルール

- 課題構造化・壁打ち・論点整理・GM向け報告 → **ai-cos**
- タスク配分・負荷確認・アサイン検討 → **team-pulse**
- 施策・Epicの将来性レビュー → **era**
- 多視点分析・ドキュメントレビュー → **issue** or **review**
- 「Notionに送りたい」 → **notion-export** → **notion-publish**
- 「スライド」「パワポ」「PPT」 → **ppt**
- 「仕上げて」「ツッコミ入れて」「レッドチーム」 → **ai-cos**（仕上げモード）

### Copilot専用スキル（`.github/skills/` — Notion CLI操作のみ）

以下の4スキルだけが `.github/skills/` に固有ロジックを持つ。Notion APIの直接操作に特化。

| スキル名 | パス | 用途 |
|----------|------|------|
| notion-cli | `.github/skills/notion-cli/SKILL.md` | Notion API汎用操作（`ntn` CLI） |
| notion-create | `.github/skills/notion-create/SKILL.md` | Notionページ新規作成 |
| notion-sync | `.github/skills/notion-sync/SKILL.md` | Notion→ローカル同期 |
| notion-update | `.github/skills/notion-update/SKILL.md` | Notionページ更新 |

---

## 禁止ルール（スキル分散防止）

1. **`.github/skills/` に新しいスキルファイルを作成しない**。上記4つのCopilot専用スキル以外は、すべて `skills/` に正本がある
2. ユーザーがスキル名を指定したら、まず上のルーティングテーブルで正本パスを確認し、`cat` でファイルを読んでから実行する
3. スキルのロジックを `.github/skills/` のプロキシファイルに書き込まない。プロキシは正本へのリダイレクトのみ
4. 新しいスキルが必要な場合は、`skills/{name}/SKILL.md` に作成することをユーザーに提案する

---

## コンテキスト参照先

| 種類 | パス | 説明 |
|------|------|------|
| プロジェクト情報 | `assets/context/projects/` | PJ別の深掘り情報 |
| 組織・ステークホルダー | `assets/context/org-structure.md`, `stakeholder-map.md` | 体制・関係者 |
| 意思決定OS | `assets/context/decision-os.md` | 判断軸・構造化プロトコル |
| OKR方法論 | `assets/context/okr-methodology.md` | OKR設計・運用 |
| Notion同期データ | `notion/` | Notionから同期されたページ（手動編集禁止） |
| 生成物出力先 | `outputs/` | PPTX・MD等の出力 |

---

## 出力ルール

- **禁止表現**: 「これ、」で始まる文、「なお、」「また、」多用、箇条書き5項目以上の羅列、結論後置
- **PPTルール**: `.claude/refs/ppt-rules.md` を参照（白背景統一、紺アクセント、主張文見出し）
- **デザイン**: `.claude/refs/design.md` を参照（DADS準拠、Noto Sans JP）
- **ファイル配置**: `.claude/refs/directory-structure.md` を参照
