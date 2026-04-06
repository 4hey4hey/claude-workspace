# メタエージェント Phase 0 実行レポート

## 概要

AutoAgentの「Meta/Task分離」原則に基づき、スキルの自己最適化基盤（Phase 0）を構築した。

---

## 1. lessons.md 棚卸し結果

### 蓄積パターンの分析（4件）

| # | Lesson | 失敗タイプ | 影響スキル | SKILL.md変換 | 現状 |
|---|--------|-----------|-----------|:---:|---|
| 1 | npm install 事前許可 | 行動規範違反 | 全スキル | N/A | CLAUDE.mdに反映済み |
| 2 | 表紙の紺色背景問題 | プロンプト曖昧性 | pptx-creator, ppt | 反映済 | 検証ステップ不足 |
| 3 | 認知負荷「次の一手」必須化 | 出力品質基準の欠如 | ai-cos + 全スキル | 反映済 | 横展開が不完全 |
| 4 | outputs ファイル蓄積 | 運用設計の欠如 | ai-cos | 反映済 | 自動トリガー基準なし |

### 発見

- **4件すべてが手動で反映済み** → 手動ループは機能している
- **ギャップ3つ**:
  1. 改善が再発を防いでいるかの**検証メカニズムがない**
  2. スキル間の**横展開が属人的**（ai-cosの改善がteam-pulse/eraに伝播しない）
  3. 失敗の**パターン分類**がされていない（同じタイプの失敗が別スキルで再発する構造）

---

## 2. 作成した成果物

### Skill Optimizer エージェント

`.claude/agents/skill-optimizer.md`

AutoAgentの設計原則を適用したメタエージェント:

- **Meta/Task分離**: スキル実行と改善を分離
- **トレース駆動**: lessons.mdの失敗パターンを5タイプに分類し、根本原因を分析
- **過学習防止**: 「この改善は特定タスクが消えても有効か？」の自己問いを必須化
- **横展開（cross-pollinate）**: 1つのスキルの改善を他スキルに自動提案
- **Model Empathy**: Claude自身が「どう解釈するか」を想像してプロンプトを書く原則

### Eval基準（4スキル分）

| スキル | ファイル | 評価軸 |
|---|---|---|
| ai-cos | `skills/ai-cos/eval.md` | 次の一手の具体性 / 構造化の深さ / GM可読性 |
| team-pulse | `skills/team-pulse/eval.md` | ファクト精度 / トレードオフ明示性 / 判断非代替性 |
| pptx-creator | `skills/pptx-creator/eval.md` | 設計テンプレ整合性 / 禁止パターン違反ゼロ / レイアウト多様性 |
| issue | `skills/issue/eval.md` | 多視点網羅性 / クロスカット統合度 / 抽出の深さ |
| era | `skills/era/eval.md` | 5軸評価の根拠充実度 / 改善提案の具体性 |

---

## 3. ファイル配置

```
.claude/agents/
  ├── skill-optimizer.md     ← NEW（メタエージェント定義）
  ├── context-researcher.md  （既存）
  └── stakeholder-reviewer.md（既存）

skills/
  ├── ai-cos/
  │   ├── SKILL.md      （既存）
  │   └── eval.md        ← NEW
  ├── team-pulse/
  │   ├── SKILL.md      （既存）
  │   └── eval.md        ← NEW
  ├── pptx-creator/
  │   ├── SKILL.md      （既存）
  │   └── eval.md        ← NEW
  ├── issue/
  │   ├── SKILL.md      （既存）
  │   └── eval.md        ← NEW
  └── era/
      ├── SKILL.md      （既存）
      └── eval.md        ← NEW
```

---

## 4. 運用フロー（Phase 0完成後の姿）

```
ユーザーがスキルを使う
  ↓
修正フィードバックが発生
  ↓
lessons.md に記録（既存の手動ループ）
  ↓  ← ここからが新しい
Skill Optimizer を起動（トリガー: lessons）
  ↓
1. 失敗パターンを5タイプに分類
2. SKILL.md の改善提案を生成
3. 横展開候補を特定
4. 過学習チェックを通過した提案のみ採用
  ↓
ユーザーが承認 → SKILL.md に反映
  ↓
eval.md の基準でスコアリング（次回実行時に検証）
```

---

## 次の一手

1. **Skill Optimizerの初回試行: 次にスキル実行後にフィードバックが発生したら、`skill-optimizer` エージェントを起動して改善提案を生成する**（洋平＋Claude／次のフィードバック発生時）
2. eval基準の実地検証: ai-cosの直近出力をeval.mdの基準でスコアリングし、閾値が適切かを確認する（Claude／今週中）
3. 横展開の初回実行: ai-cosの「次の一手」ルールをteam-pulse/era/issueに横展開する差分を作成する（Claude／Skill Optimizer承認後）
