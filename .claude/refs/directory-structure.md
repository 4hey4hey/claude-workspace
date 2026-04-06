# ディレクトリ構造

```text
~/Documents/Claude/
├── CLAUDE.md                        # ルート設定（ルート固定）
├── package.json / package-lock.json # npm設定（ルート固定）
├── skills-lock.json                 # 3rd partyスキルのロックファイル
├── node_modules/                    # npm依存（ルート固定）
├── .agents/                         # 3rd partyスキル（vercel-labs等）
├── .claude/                         # Claude Code設定（ルート固定）
│   ├── refs/                        # CLAUDE.md から @import される参照ドキュメント
│   ├── agents/                      # カスタムサブエージェント定義
│   └── hooks/                       # フックスクリプト
│
├── .github/                         # GitHub Copilot設定
│   ├── copilot-instructions.md      # Copilotメイン指示
│   ├── agents/                      # Copilotエージェント定義
│   │   └── notion-sync.md           #   Notion同期オペレーション用
│   └── skills/                      # Copilotスキル
│       ├── notion-cli/SKILL.md      #   Notion CLIスキル（汎用API操作）
│       ├── notion-sync/SKILL.md     #   Notion→ローカル同期
│       ├── notion-create/SKILL.md   #   Notionページ新規作成
│       ├── notion-update/SKILL.md   #   Notionページ更新（URL指定）
│       └── notion-publish/SKILL.md  #   outbox→Notion公開
│
├── skills/                          # Claude Codeスキル定義（SKILL.md）
│   ├── ai-cos/                      # AI参謀（構造化・翻訳・壁打ち・棚卸し）
│   ├── era/                         # AIエージェント時代の施策レビュー
│   ├── issue/                       # 壁打ち・多視点構造化
│   ├── review/                      # ドキュメントレビュー（issueショートカット）
│   ├── issue-to-stakeholder/        # 【非推奨: ai-cos を優先】
│   ├── team-pulse/                  # チームタスク配分・負荷管理・アサイン検討
│   ├── notion-export/               # 壁打ち結果→Notion outbox出力
│   ├── ppt/                         # PPT統合フロー（設計→生成）
│   ├── pptx-planner/                # PPT設計テンプレ作成
│   ├── pptx-creator/                # PPTX生成
│   ├── pptx-reader/                 # PPTX読み取り
│   └── pptx-diagram/               # draw.io→PNG→PPTXスライド埋め込み
│
├── notion/                          # Notion連携ディレクトリ
│   ├── shared/                      # 組織横断コンテキスト（Notion→ローカル同期）
│   ├── projects/                    # PJ別Notionページ（Notion→ローカル同期）
│   └── outbox/                      # CC→Notionハンドオフ（CC出力→Copilot公開）
│
├── scripts/                         # PPT生成スクリプト（JS）置き場
│
├── outputs/                         # 全生成物の出力先
│   ├── pptx/                        # PPT生成物
│   └── docs/                        # Markdown等テキスト出力
│       ├── issues/                  # 課題分析出力
│       │   ├── organization/        # 体制・役割・チーム設計
│       │   ├── product/             # プロダクト戦略・機能優先度
│       │   ├── platform/            # 基盤刷新・技術基盤
│       │   ├── governance/          # 意思決定構造・権限設計
│       │   └── process/             # 開発プロセス・スクラム運営
│       ├── stakeholder/             # ステークホルダー向け文書
│       ├── team-pulse/              # team-pulse出力（1on1準備シート等）
│       └── reviews/                 # レビュー出力
│           └── agent-era/           # AIエージェント時代レビュー
│
├── assets/                          # 入力素材・図表
│   ├── context/                     # 手動キュレーションの基礎コンテキスト
│   │   ├── decision-os.md           # 意思決定OS（判断軸・構造化プロトコル）
│   │   ├── domain-landscape.md      # 事業・プロダクト構造（全体俯瞰）
│   │   ├── org-structure.md         # 組織・チーム体制
│   │   ├── stakeholder-map.md       # ステークホルダー構造
│   │   ├── okr-methodology.md       # OKR方法論
│   │   ├── agent-era-landscape.md   # AIエージェント時代の全体像
│   │   ├── scrum/                   # スクラム運営の参照資料
│   │   ├── stakeholder-comments/    # ステークホルダー発言・コメント記録
│   │   ├── team-pulse/              # team-pulseスキル専用データ（動的）
│   │   │   ├── _members/            # メンバー別プロファイル（アサイン・1on1メモ等）
│   │   │   ├── _tasks/              # アクティブタスク一覧
│   │   │   │   └── active-tasks.md
│   │   │   └── _logs/               # 週次スナップショット
│   │   └── projects/                # プロジェクト別の深掘り情報（手動）
│   │       ├── kraken/_index.md     # Kraken連携/基幹刷新
│   │       ├── auth-platform/_index.md  # 認証基盤刷新（EA/CIAM/SSO）
│   │       ├── mtg/_index.md        # mTG（myTOKYOGAS）
│   │       ├── ea/_index.md         # EA構想
│   │       └── delivery-mgmt/_index.md  # デリバリーマネジメントチーム（杉崎チーム）
│   └── diagrams/                    # draw.io等のダイアグラム
│
├── .vscode/                         # VS Code設定（Copilot設定含む）
│   ├── settings.json                # Copilot MCP設定等
│   └── tasks.json                   # Notion同期タスク等
│
├── tasks/                           # タスク管理・学習記録
│   ├── todo.md                      # タスク計画・進捗管理
│   └── lessons.md                   # 修正から得た学びの記録
│
└── workspaces/                      # スキル評価・実験ワークスペース
    ├── goal-setting-coach/
    └── stakeholder-issue-writer/
```

## ファイル配置ルール

### 出力系

- **スクリプト**（`create_*.js` 等）→ `scripts/` に置く
- **PPTX生成物** → `outputs/pptx/YYYY-MM-DD_topic-name.pptx`（日付プレフィックス + kebab-case）
- **課題分析**（/issue スキルの出力）→ `outputs/docs/issues/{カテゴリ}/YYYY-MM-DD_トピック.md`
  - カテゴリ: `organization`（体制・役割）/ `product`（プロダクト戦略）/ `platform`（技術基盤）/ `governance`（意思決定・権限）/ `process`（開発プロセス）
- **ステークホルダー向け文書**（/issue-to-stakeholder の出力）→ `outputs/docs/stakeholder/YYYY-MM-DD_トピック.md`
- **レビュー出力** → `outputs/docs/reviews/YYYY-MM-DD_トピック.md`
- **AIエージェント時代レビュー** → `outputs/docs/reviews/agent-era/YYYY-MM-DD_施策名.md`
- **team-pulse出力**（1on1準備シート等）→ `outputs/docs/team-pulse/YYYY-MM-DD_{名前 or トピック}.md`
- **その他テキスト生成物** → `outputs/docs/` に置く
- **スクリプト内の出力パス**は `outputs/pptx/ファイル名.pptx` に統一する

### コンテキスト系（2系統）

- **Notion同期コンテキスト** → `notion/` に配置（Copilot + Notion CLIが管理）
  - 組織横断（用語集、OKR、組織構造等）→ `notion/shared/`
  - PJ別ページ → `notion/projects/{pj}/`
  - **`notion/` 内のファイルは手動編集しない**（次回同期で上書きされる）
- **手動キュレーション** → `assets/context/` に配置
  - team-pulseデータ（メンバー・タスク）→ `assets/context/team-pulse/` 配下で管理
  - プロジェクト別 context → `assets/context/projects/{pj}/` に置く
    - 元ファイル（PPTX/PDF等）→ `assets/context/projects/{pj}/originals/` にコピー
    - PPTX → MD 変換: `source .venv/bin/activate && python3 scripts/pptx_to_md.py <入力.pptx> <出力.md>`
    - 配置後は該当プロジェクトの `_index.md` にリンクと変換元パスを追記する
  - 図表・素材 → `assets/diagrams/` に置く

### ツール設定系

- **Claude Codeスキル** → `skills/{name}/SKILL.md`
- **Claude Codeサブエージェント** → `.claude/agents/{name}.md`
- **Copilotスキル** → `.github/skills/{name}/SKILL.md`
- **Copilotエージェント** → `.github/agents/{name}.md`
- **Copilot指示** → `.github/copilot-instructions.md`

### その他

- **スキル評価・実験** → `workspaces/スキル名/` に置く
- **タスク管理** → `tasks/todo.md`（計画・進捗）/ `tasks/lessons.md`（学びの記録）

### ファイルステータス管理

- `outputs/docs/` のファイルは暗黙に「active」状態（frontmatter 不要）
- ai-cos の棚卸しモードで統合されたファイルには以下の frontmatter が付与される:
  ```yaml
  ---
  status: "superseded"
  superseded_by: "outputs/docs/path/to/consolidated.md"
  superseded_at: "YYYY-MM-DD"
  ---
  ```
- superseded ファイルは削除しない（Notion outbox の source 参照・他ファイルからのリンク保護）
- ai-cos は superseded ファイルを過去報告参照・棚卸しスキャンでスキップする
- 物理削除が必要な場合は手動判断で行う
