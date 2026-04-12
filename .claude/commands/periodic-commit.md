# Claude Workspace 毎日自動 commit/push

## セットアップ手順

このファイルを開くと、毎日 19:00 に Claude フォルダが自動的に GitHub に commit/push されます。

### 自動実行ジョブ（毎日 19:00）

```bash
git -C /Users/sugisaki/Documents/Claude add .
git -C /Users/sugisaki/Documents/Claude commit -m "chore: daily auto-commit [$(date '+%Y-%m-%d %H:%M')]"
git -C /Users/sugisaki/Documents/Claude push origin main
```

---

## 初期化（セッション開始時に 1回実行）

Claude Code のスケジューラー（CronCreate）に以下を登録してください：

```javascript
CronCreate({
  cron: "0 19 * * *",
  prompt: "Claude フォルダを毎日 GitHub に自動 commit/push してください。コマンド: cd /Users/sugisaki/Documents/Claude && git add . && git commit -m \"chore: daily auto-commit [$(date '+%Y-%m-%d %H:%M')]\" || true && git push origin main",
  recurring: true
})
```

登録後、毎日 19:00 に自動実行されます。

---

## マニュアル実行（テスト用）

即座に commit/push したい場合：

```bash
cd /Users/sugisaki/Documents/Claude
git add .
git commit -m "chore: daily auto-commit [$(date '+%Y-%m-%d %H:%M')]" || echo "No changes to commit"
git push origin main
```

---

## 確認方法

### ローカルで履歴確認
```bash
git log --oneline | head -10
```

### GitHub Web UI で確認
https://github.com/4hey4hey/claude-workspace/commits/main

日付付きの「daily auto-commit」が毎日増えていることを確認してください。

---

## トラブルシューティング

### push が失敗する場合

1. **リモート URL の確認**
   ```bash
   git config --get remote.origin.url
   ```
   `https://4hey4hey:ghp_***@github.com/4hey4hey/claude-workspace.git` になっていること。

2. **GitHub Token の確認**
   - PAT（Personal Access Token）の有効期限確認: https://github.com/settings/tokens
   - 70日以上前のトークンは更新が必要

3. **コミット対象の確認**
   ```bash
   git status
   ```
   変更がない場合は commit されません。

---

## 注意点

- **セッション依存**: CronCreate はセッション起動中のみ有効です。新しいセッション開始時は必ず登録してください
- **トークン有効期限**: GitHub PAT は 90 日での自動更新が推奨されます
- **デイリーコミット**:毎日 19:00 に実行されるため、GitHub の commit 履歴が増加します
