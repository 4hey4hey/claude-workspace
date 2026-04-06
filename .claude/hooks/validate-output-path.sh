#!/bin/bash
# PostToolUse hook: Write/Edit 後に出力先ディレクトリを検証する
# 期待: 生成物は outputs/ 配下、スクリプトは scripts/ 配下に置かれること

# stdin から JSON を読み取る
INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('tool_name',''))" 2>/dev/null)
FILE_PATH=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); inp=d.get('tool_input',{}); print(inp.get('file_path',''))" 2>/dev/null)

# Write/Edit 以外は無視
if [[ "$TOOL_NAME" != "Write" && "$TOOL_NAME" != "Edit" ]]; then
  exit 0
fi

# ファイルパスが空なら無視
if [[ -z "$FILE_PATH" ]]; then
  exit 0
fi

BASE_DIR="/Users/sugisaki/Documents/Claude"
REL_PATH="${FILE_PATH#$BASE_DIR/}"

# プロジェクト外のファイルは無視
if [[ "$REL_PATH" == "$FILE_PATH" ]]; then
  exit 0
fi

# 設定ファイル・スキル定義・タスク管理・アセット・CLAUDE.md は除外
if [[ "$REL_PATH" == CLAUDE.md ]] || \
   [[ "$REL_PATH" == .claude/* ]] || \
   [[ "$REL_PATH" == skills/* ]] || \
   [[ "$REL_PATH" == tasks/* ]] || \
   [[ "$REL_PATH" == assets/* ]] || \
   [[ "$REL_PATH" == workspaces/* ]] || \
   [[ "$REL_PATH" == package*.json ]] || \
   [[ "$REL_PATH" == docs/* ]]; then
  exit 0
fi

# PPTX生成スクリプトは scripts/ に置くべき
if [[ "$REL_PATH" == *.js ]] && [[ "$REL_PATH" != scripts/* ]]; then
  echo "⚠️  スクリプト ($REL_PATH) は scripts/ に配置してください" >&2
  exit 0
fi

# 生成物は outputs/ に置くべき
if [[ "$REL_PATH" == *.pptx ]] || [[ "$REL_PATH" == *.md ]]; then
  if [[ "$REL_PATH" != outputs/* ]]; then
    echo "⚠️  生成物 ($REL_PATH) は outputs/ に配置してください" >&2
  fi
fi

exit 0
