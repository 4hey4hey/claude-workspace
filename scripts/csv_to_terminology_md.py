"""Notion用語集CSV → terminology.md 変換スクリプト

Usage:
    python scripts/csv_to_terminology_md.py <input.csv> <output.md>

Notion DBのCSVエクスポートを、Claude Code / Notion AI用のMDテーブルに変換する。
"""

import csv
import sys
from collections import defaultdict


def convert(input_path, output_path):
    entries = []
    with open(input_path, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            term = row.get('用語', '').strip()
            if not term:
                continue
            entries.append({
                'term': term,
                'ai_keyword': row.get('AI キーワード', '').strip(),
                'reading': row.get('ヨミカタ', '').strip(),
                'alias': row.get('略語・別称', '').strip().replace('　', ''),
                'description': row.get('説明', '').strip().replace('\n', ' '),
                'updated': row.get('最終更新日時', '').strip(),
                'updated_by': row.get('最終更新者', '').strip(),
            })

    # AIキーワードからカテゴリ分類（簡易）
    # カテゴリが明示的にないので、キーワードベースでグルーピングはせず全件1テーブルにする
    entries.sort(key=lambda x: x['reading'] or x['term'])

    lines = [
        '# 用語集（組織共通コンテキスト）',
        '',
        '**正（マスター）：** Notion DB「グループ用語集」',
        '**同期方法：** Notion からCSVエクスポート → `scripts/csv_to_terminology_md.py` で変換',
        '**更新タイミング：** 用語が追加・変更された時（手動）',
        f'**用語数：** {len(entries)}語',
        '',
        '---',
        '',
        '| 用語 | 読み | 略語・別称 | 説明 |',
        '|------|------|-----------|------|',
    ]

    for e in entries:
        desc = e['description']
        if len(desc) > 200:
            desc = desc[:197] + '...'
        # テーブル内のパイプをエスケープ
        desc = desc.replace('|', '／')
        alias = e['alias'] if e['alias'] else '--'
        lines.append(f"| {e['term']} | {e['reading']} | {alias} | {desc} |")

    lines.append('')
    lines.append('---')
    lines.append('')
    lines.append(f'*{len(entries)}語 / Notion DBから自動変換*')

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))

    print(f'Converted: {len(entries)} terms → {output_path}')


def main():
    if len(sys.argv) < 3:
        print('Usage: python csv_to_terminology_md.py <input.csv> <output.md>')
        sys.exit(1)
    convert(sys.argv[1], sys.argv[2])


if __name__ == '__main__':
    main()
