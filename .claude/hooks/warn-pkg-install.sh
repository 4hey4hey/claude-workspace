#!/bin/bash
# パッケージインストールコマンドを検知してサプライチェーン攻撃リスクを警告する
# PreToolUse (Bash) フック

CMD=$(jq -r '.tool_input.command // ""')

if echo "$CMD" | grep -qE '(npm (install|i|add|ci)|yarn (install|add)|pnpm (install|add|i)|bun (install|add|i)|pip install|pip3 install)'; then
  cat <<'WARN'
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "additionalContext": "\n\n★★★ 危険 ★★★ パッケージインストールを検知しました。\nサプライチェーン攻撃リスクに注意してください。\n\n確認事項:\n1. インストールするパッケージ名にtypoがないか（typosquatting対策）\n2. バージョンを固定しているか（lockfile活用）\n3. 不要な依存を追加していないか\n4. postinstallスクリプトが安全か（--ignore-scripts の検討）\n\n参考: axios サプライチェーン攻撃 (2026-03-31)\nhttps://zenn.dev/gunta/articles/0152eadf05d173\n"
  }
}
WARN
fi
