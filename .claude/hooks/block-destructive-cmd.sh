#!/bin/bash
# 破壊的コマンドを検知してブロックする
# PreToolUse (Bash) フック
#
# ブロック対象:
#   - rm -rf / rm -r (再帰的ファイル削除)
#   - git push --force / -f (リモート履歴の上書き)
#   - git reset --hard (作業中の変更を全て破棄)
#   - git clean -f (追跡外ファイルを永久削除)
#   - git checkout -- . / git restore . (全変更を破棄)
#   - curl|bash, wget|sh (外部スクリプトの直接実行)

CMD=$(jq -r '.tool_input.command // ""')

# --- ブロック: rm -rf / rm -r ---
if echo "$CMD" | grep -qE '\brm\b.*\s+-[a-zA-Z]*r'; then
  cat <<'EOF'
{
  "decision": "block",
  "reason": "\n★★★ 危険 ★★★ ファイルの再帰的削除（rm -r / rm -rf）を検知しました。\n\nこのコマンドは、フォルダの中身をまるごと消します。\n一度消すと元に戻せません。\n\n本当に必要な場合は、削除対象を具体的に指定してください。"
}
EOF
  exit 0
fi

# --- ブロック: git push --force / -f ---
if echo "$CMD" | grep -qE '\bgit\s+push\b.*(\s+--force\b|\s+-f\b)'; then
  cat <<'EOF'
{
  "decision": "block",
  "reason": "\n★★★ 危険 ★★★ 強制プッシュ（git push --force）を検知しました。\n\nこのコマンドは、リモートの履歴を上書きします。\n他の人の作業が消える可能性があります。\n\n本当に必要な場合は、ユーザーに確認してから実行してください。"
}
EOF
  exit 0
fi

# --- ブロック: git reset --hard ---
if echo "$CMD" | grep -qE '\bgit\s+reset\b.*\s+--hard\b'; then
  cat <<'EOF'
{
  "decision": "block",
  "reason": "\n★★★ 危険 ★★★ ハードリセット（git reset --hard）を検知しました。\n\nこのコマンドは、まだ保存していない変更を全て捨てます。\n一度実行すると元に戻せません。\n\n本当に必要な場合は、ユーザーに確認してから実行してください。"
}
EOF
  exit 0
fi

# --- ブロック: git clean -f ---
if echo "$CMD" | grep -qE '\bgit\s+clean\b.*\s+-[a-zA-Z]*f'; then
  cat <<'EOF'
{
  "decision": "block",
  "reason": "\n★★★ 危険 ★★★ git clean -f を検知しました。\n\nこのコマンドは、gitで管理していないファイルを全て削除します。\n新しく作ったファイルが消える可能性があります。\n\n本当に必要な場合は、ユーザーに確認してから実行してください。"
}
EOF
  exit 0
fi

# --- ブロック: git checkout -- . / git restore . (全変更破棄) ---
if echo "$CMD" | grep -qE '\bgit\s+(checkout\s+--\s+\.|restore\s+\.)'; then
  cat <<'EOF'
{
  "decision": "block",
  "reason": "\n★★★ 危険 ★★★ 全ファイルの変更破棄を検知しました。\n\nこのコマンドは、編集中のファイルを全て元に戻します。\n作業中の内容が全て失われます。\n\n本当に必要な場合は、ユーザーに確認してから実行してください。"
}
EOF
  exit 0
fi

# --- ブロック: curl|bash / wget|sh (リモートスクリプト直接実行) ---
if echo "$CMD" | grep -qE '(curl|wget)\s.*\|\s*(bash|sh|zsh)'; then
  cat <<'EOF'
{
  "decision": "block",
  "reason": "\n★★★ 危険 ★★★ 外部スクリプトの直接実行を検知しました。\n\nインターネットからダウンロードしたスクリプトを、中身を確認せずにそのまま実行しようとしています。\n悪意のあるコードが含まれている可能性があります。\n\n本当に必要な場合は、まずスクリプトの内容を確認してから実行してください。"
}
EOF
  exit 0
fi
