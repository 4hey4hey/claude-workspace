const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.title = "内製開発組織 成熟度向上プログラム";

// フォント定数
const JA = 'Meiryo';
const EN = 'Arial';

// デザイントークン（SKILL.md デフォルト）
const P  = '004098';  // Primary
const A  = 'DC2626';  // Accent
const S  = 'CADCFC';  // Sub
const CB = 'EEF3FA';  // Card bg
const DT = '1A1A2E';  // Dark text
const ST = '444466';  // Sub text
const WH = 'FFFFFF';  // White

const makeShadow = () => ({ type: 'outer', blur: 4, offset: 2, angle: 135, color: '000000', opacity: 0.08 });

// ─── 共通パーツ ───────────────────────────────────────────

function addBottomBar(slide) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.56, w: 8.0, h: 0.07,
    fill: { color: P }, line: { color: P }
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 8.0, y: 5.56, w: 2.0, h: 0.07,
    fill: { color: A }, line: { color: A }
  });
}

function addHeader(slide, breadcrumb) {
  slide.addText(breadcrumb, {
    x: 0.4, y: 0.08, w: 9.2, h: 0.22,
    fontSize: 9, color: ST, fontFace: JA,
    align: 'left', valign: 'middle', margin: 0
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0.34, w: 10, h: 0.01,
    fill: { color: S }, line: { color: S }
  });
}

function addSlideTitle(slide, title) {
  slide.addText(title, {
    x: 0.4, y: 0.42, w: 9.2, h: 0.65,
    fontSize: 22, bold: true, color: DT, fontFace: JA,
    align: 'left', valign: 'middle', margin: 0
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 1.15, w: 10, h: 0.01,
    fill: { color: S }, line: { color: S }
  });
}

// ─── SLIDE 1: 表紙 ─────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: WH };

  // 上部ブルーバンド（図形）
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 2.75,
    fill: { color: P }, line: { color: P }
  });

  // タイトル（バンド上 → 白文字は図形上なのでOK）
  s.addText('内製開発組織', {
    x: 0.5, y: 0.22, w: 9, h: 0.88,
    fontSize: 40, bold: true, color: WH, fontFace: JA,
    align: 'left', valign: 'middle', margin: 0
  });
  s.addText('成熟度向上プログラム', {
    x: 0.5, y: 1.1, w: 9, h: 0.65,
    fontSize: 26, color: S, fontFace: JA,
    align: 'left', valign: 'middle', margin: 0
  });
  s.addText('デジタル開発部  |  2026年3月', {
    x: 0.5, y: 1.82, w: 9, h: 0.35,
    fontSize: 13, color: S, fontFace: JA,
    align: 'left', valign: 'middle', margin: 0
  });

  // レッドアクセントライン（白背景エリア）
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.0, w: 3.2, h: 0.03,
    fill: { color: A }, line: { color: A }
  });

  // サマリー（白背景上 → ダーク系テキスト）
  s.addText('開発チームの学習速度と事業成果を両立させるための\n体制・プロセス・指標の整備計画', {
    x: 0.5, y: 3.12, w: 9, h: 0.75,
    fontSize: 15, color: DT, fontFace: JA,
    align: 'left', valign: 'top'
  });

  // 3つの数値カード
  const stats = [
    { num: '3', unit: 'チーム', label: '対象スクラムチーム' },
    { num: '6', unit: 'ヶ月',   label: '想定実施期間' },
    { num: '5', unit: 'ステップ', label: '成熟度フェーズ' },
  ];
  const sw = 2.6, sh = 0.85, sy = 4.35, sgap = 0.35;
  const sStartX = (10 - sw * 3 - sgap * 2) / 2;

  stats.forEach((stat, i) => {
    const x = sStartX + i * (sw + sgap);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: sy, w: sw, h: sh,
      fill: { color: CB }, line: { color: S, pt: 0.5 }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: sy, w: 0.06, h: sh,
      fill: { color: P }, line: { color: P }
    });
    s.addText(stat.num, {
      x: x + 0.16, y: sy, w: 0.75, h: sh,
      fontSize: 32, bold: true, color: P, fontFace: EN,
      align: 'left', valign: 'middle', margin: 0
    });
    s.addText(stat.unit, {
      x: x + 0.85, y: sy + 0.38, w: 0.75, h: 0.32,
      fontSize: 11, color: ST, fontFace: JA,
      align: 'left', valign: 'middle', margin: 0
    });
    s.addText(stat.label, {
      x: x + 1.5, y: sy, w: sw - 1.6, h: sh,
      fontSize: 11, color: DT, fontFace: JA,
      align: 'left', valign: 'middle'
    });
  });

  addBottomBar(s);
}

// ─── SLIDE 2: アジェンダ ────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: WH };
  addHeader(s, '内製開発組織 成熟度向上プログラム');
  addSlideTitle(s, 'アジェンダ');

  const items = [
    { num: '01', title: '現状の課題',           desc: '開発チームが直面している3つの構造的な問題' },
    { num: '02', title: '成熟度モデルの概要',   desc: '5段階で組織の成長を可視化するフレームワーク' },
    { num: '03', title: '施策の優先順位と計画', desc: '短期・中期・長期の打ち手と期待効果' },
    { num: '04', title: '体制とロール設計',     desc: 'スクラムマスター・PO・EMの責任分界' },
    { num: '05', title: 'ネクストアクション',   desc: '来週から動き出すための具体的なステップ' },
  ];

  const N = items.length;
  const CTOP = 1.35, CBOT = 5.45, GAP = 0.08;
  const cardH = (CBOT - CTOP - GAP * (N - 1)) / N;
  const BADGE_H = 0.32;

  items.forEach((item, i) => {
    const cardY  = CTOP + i * (cardH + GAP);
    const badgeY = cardY + (cardH - BADGE_H) / 2;

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.4, y: cardY, w: 9.2, h: cardH,
      fill: { color: CB }, line: { color: S, pt: 0.5 }
    });
    s.addShape(pres.shapes.OVAL, {
      x: 0.6, y: badgeY, w: BADGE_H, h: BADGE_H,
      fill: { color: P }, line: { color: P }
    });
    s.addText(item.num, {
      x: 0.6, y: badgeY, w: BADGE_H, h: BADGE_H,
      fontSize: 10, bold: true, color: WH, fontFace: EN,
      align: 'center', valign: 'middle', margin: 0
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 1.1, y: cardY, w: 0.01, h: cardH,
      fill: { color: S }, line: { color: S }
    });
    s.addText(item.title, {
      x: 1.25, y: badgeY, w: 2.9, h: BADGE_H,
      fontSize: 13, bold: true, color: DT, fontFace: JA,
      align: 'left', valign: 'middle', margin: 0
    });
    s.addText(item.desc, {
      x: 4.3, y: cardY, w: 5.1, h: cardH,
      fontSize: 12, color: ST, fontFace: JA,
      align: 'left', valign: 'middle'
    });
  });

  addBottomBar(s);
}

// ─── SLIDE 3: 現状の課題 ────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: WH };
  addHeader(s, '現状の課題');
  addSlideTitle(s, '開発チームが直面している3つの構造的な問題');

  const problems = [
    {
      title: '優先順位の決定が\n属人的',
      body: '施策のGO/NOGOが「声の大きさ」で決まる。コスト・効果・リスクの根拠が整理されないまま意思決定される。',
      tag: '意思決定', tagColor: A
    },
    {
      title: '見積もりが\nコミットメントになる',
      body: '要件が固まっていない段階でのコスト試算が「約束」として扱われ、変更後の増加分が「違反」と見なされる。',
      tag: 'コスト管理', tagColor: '7B2D8B'
    },
    {
      title: '学習が組織に\n蓄積されない',
      body: '失敗・遅延の原因が「個人の問題」として処理される。ふりかえりが形式化し、プロセス改善につながっていない。',
      tag: '組織学習', tagColor: '065A82'
    },
  ];

  const cw = 2.9, ch = 3.55, cy = 1.5, cgap = 0.2;
  const cStartX = (10 - cw * 3 - cgap * 2) / 2;

  problems.forEach((p, i) => {
    const x = cStartX + i * (cw + cgap);

    s.addShape(pres.shapes.RECTANGLE, {
      x, y: cy, w: cw, h: ch,
      fill: { color: WH }, line: { color: S, pt: 1 },
      shadow: makeShadow()
    });
    // 上部アクセントバー
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: cy, w: cw, h: 0.07,
      fill: { color: p.tagColor }, line: { color: p.tagColor }
    });
    // タグバッジ
    s.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.15, y: cy + 0.16, w: 1.2, h: 0.28,
      fill: { color: p.tagColor }, line: { color: p.tagColor }
    });
    s.addText(p.tag, {
      x: x + 0.15, y: cy + 0.16, w: 1.2, h: 0.28,
      fontSize: 10, bold: true, color: WH, fontFace: JA,
      align: 'center', valign: 'middle', margin: 0
    });
    // 番号（薄く背景に）
    s.addText(String(i + 1), {
      x: x + cw - 0.6, y: cy + 0.1, w: 0.48, h: 0.48,
      fontSize: 30, bold: true, color: S, fontFace: EN,
      align: 'right', valign: 'middle', margin: 0
    });
    // タイトル
    s.addText(p.title, {
      x: x + 0.15, y: cy + 0.58, w: cw - 0.3, h: 0.72,
      fontSize: 14, bold: true, color: DT, fontFace: JA,
      align: 'left', valign: 'top'
    });
    // 本文
    s.addText(p.body, {
      x: x + 0.15, y: cy + 1.4, w: cw - 0.3, h: 2.0,
      fontSize: 12, color: ST, fontFace: JA,
      align: 'left', valign: 'top'
    });
  });

  addBottomBar(s);
}

// ─── SLIDE 4: 成熟度モデル ──────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: WH };
  addHeader(s, '成熟度モデルの概要');
  addSlideTitle(s, '5段階で組織の成長を可視化する');

  const levels = [
    { lv: 'Lv1', name: '初期',     desc: '属人的・場当たり的な対応が中心',       color: 'C0392B' },
    { lv: 'Lv2', name: '管理',     desc: '基本的なプロセスが確立されている',      color: 'E67E22' },
    { lv: 'Lv3', name: '定義',     desc: '標準化・ドキュメント化・チーム共有化', color: 'D4AC0D' },
    { lv: 'Lv4', name: '定量管理', desc: '指標による計測と予測が可能',           color: '27AE60' },
    { lv: 'Lv5', name: '最適化',   desc: '継続的な改善サイクルが回っている',      color: P       },
  ];

  const barGap = 0.1;
  const startY = 1.42;
  const totalH = 5.42 - startY;
  const barH   = (totalH - barGap * (levels.length - 1)) / levels.length;
  // バー幅：レベルに応じてスケール（Lv1:40% 〜 Lv5:100%）
  const maxW   = 8.0;
  const minRatio = 0.38;

  levels.forEach((lv, i) => {
    const barY    = startY + i * (barH + barGap);
    const ratio   = minRatio + (1 - minRatio) * (i / (levels.length - 1));
    const barW    = maxW * ratio;
    const isTarget  = i === 3;
    const isCurrent = i === 1;

    // バー本体
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: barY, w: barW, h: barH,
      fill: { color: lv.color }, line: { color: lv.color }
    });
    // レベルバッジ
    s.addText(lv.lv, {
      x: 0.5, y: barY, w: 0.72, h: barH,
      fontSize: 11, bold: true, color: WH, fontFace: EN,
      align: 'center', valign: 'middle', margin: 0
    });
    // 名前
    s.addText(lv.name, {
      x: 1.28, y: barY, w: barW - 1.35, h: barH,
      fontSize: 13, bold: true, color: WH, fontFace: JA,
      align: 'left', valign: 'middle', margin: 0
    });
    // 説明（バー右外）
    s.addText(lv.desc, {
      x: 0.5 + barW + 0.18, y: barY, w: 9.0 - barW, h: barH,
      fontSize: 11, color: ST, fontFace: JA,
      align: 'left', valign: 'middle'
    });

    // 現在地マーカー
    if (isCurrent) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.5, y: barY - 0.04, w: 0.06, h: barH + 0.08,
        fill: { color: A }, line: { color: A }
      });
      s.addText('現在地', {
        x: 0.58, y: barY + barH + 0.02, w: 1.0, h: 0.22,
        fontSize: 9, bold: true, color: A, fontFace: JA, align: 'left'
      });
    }
    // 目標マーカー
    if (isTarget) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.5, y: barY - 0.04, w: 0.06, h: barH + 0.08,
        fill: { color: '27AE60' }, line: { color: '27AE60' }
      });
      s.addText('目標（6ヶ月後）', {
        x: 0.58, y: barY - 0.3, w: 2.0, h: 0.22,
        fontSize: 9, bold: true, color: '27AE60', fontFace: JA, align: 'left'
      });
    }
  });

  addBottomBar(s);
}

// ─── SLIDE 5: 施策計画 ──────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: WH };
  addHeader(s, '施策の優先順位と計画');
  addSlideTitle(s, '短期・中期・長期の打ち手');

  const phases = [
    {
      phase: '短期（1-2ヶ月）', color: A,
      items: ['スプリントふりかえりの構造化', '施策投資判断ボードの導入', 'チームトポロジーの現状整理']
    },
    {
      phase: '中期（3-4ヶ月）', color: '7B2D8B',
      items: ['成熟度アセスメントの実施', 'PO・SM・EMロールの明文化', 'リードタイム計測の開始']
    },
    {
      phase: '長期（5-6ヶ月）', color: P,
      items: ['ROIレビューの仕組み化', '内製人材育成プログラム設計', 'EA・基盤刷新との連携整備']
    },
  ];

  const cw = 2.9, ch = 3.5, cy = 1.42, pgap = 0.2;
  const pStartX = (10 - cw * 3 - pgap * 2) / 2;

  phases.forEach((ph, i) => {
    const x = pStartX + i * (cw + pgap);

    s.addShape(pres.shapes.RECTANGLE, {
      x, y: cy, w: cw, h: ch,
      fill: { color: CB }, line: { color: S, pt: 0.5 },
      shadow: makeShadow()
    });
    // ヘッダー
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: cy, w: cw, h: 0.5,
      fill: { color: ph.color }, line: { color: ph.color }
    });
    s.addText(ph.phase, {
      x: x + 0.1, y: cy, w: cw - 0.2, h: 0.5,
      fontSize: 13, bold: true, color: WH, fontFace: JA,
      align: 'center', valign: 'middle', margin: 0
    });

    // アイテム
    const itemH = (ch - 0.6 - 0.15) / ph.items.length;
    ph.items.forEach((item, j) => {
      const iy = cy + 0.62 + j * itemH;
      s.addShape(pres.shapes.RECTANGLE, {
        x: x + 0.15, y: iy + 0.06, w: cw - 0.3, h: itemH - 0.12,
        fill: { color: WH }, line: { color: S, pt: 0.3 }
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: x + 0.15, y: iy + 0.06, w: 0.05, h: itemH - 0.12,
        fill: { color: ph.color }, line: { color: ph.color }
      });
      s.addText(item, {
        x: x + 0.28, y: iy + 0.06, w: cw - 0.45, h: itemH - 0.12,
        fontSize: 12, color: DT, fontFace: JA,
        align: 'left', valign: 'middle'
      });
    });
  });

  addBottomBar(s);
}

// ─── SLIDE 6: まとめ ────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: WH };

  // 上部ブルーバンド（図形）
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.8,
    fill: { color: P }, line: { color: P }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 1.78, w: 10, h: 0.04,
    fill: { color: A }, line: { color: A }
  });

  // タイトル（バンド上 → 白文字はOK）
  s.addText('まとめ', {
    x: 0.5, y: 0.1, w: 9, h: 0.75,
    fontSize: 30, bold: true, color: WH, fontFace: JA,
    align: 'left', margin: 0
  });
  s.addText('次の6ヶ月で、開発チームの学習速度と事業成果を両立させる', {
    x: 0.5, y: 0.9, w: 9, h: 0.6,
    fontSize: 14, color: S, fontFace: JA,
    align: 'left', margin: 0
  });

  // 3つのキーメッセージ
  const msgs = [
    {
      num: '01', color: A,
      title: '意思決定の根拠を可視化する',
      body: '施策投資判断ボードでコスト・リスク・効果を構造化。声の大きさではなくデータで動く組織をつくる。'
    },
    {
      num: '02', color: '7B2D8B',
      title: '不確実性を責任ではなく\n情報にする',
      body: '「わからない」を正直に言える仕組みをつくる。エンジニアのコミットメントを守り、精度の高い計画を実現する。'
    },
    {
      num: '03', color: P,
      title: '学習を組織に蓄積する',
      body: '成熟度モデルと定量指標で改善を継続的に計測。個人の経験値を組織のナレッジに変換する仕組みをつくる。'
    },
  ];

  msgs.forEach((msg, i) => {
    const x = 0.4 + i * 3.1;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 2.05, w: 2.9, h: 2.85,
      fill: { color: CB }, line: { color: S, pt: 0.5 },
      shadow: makeShadow()
    });
    s.addShape(pres.shapes.OVAL, {
      x: x + 0.15, y: 2.15, w: 0.55, h: 0.55,
      fill: { color: msg.color }, line: { color: msg.color }
    });
    s.addText(msg.num, {
      x: x + 0.15, y: 2.15, w: 0.55, h: 0.55,
      fontSize: 13, bold: true, color: WH, fontFace: EN,
      align: 'center', valign: 'middle', margin: 0
    });
    s.addText(msg.title, {
      x: x + 0.12, y: 2.8, w: 2.65, h: 0.62,
      fontSize: 12, bold: true, color: msg.color, fontFace: JA,
      align: 'left'
    });
    s.addText(msg.body, {
      x: x + 0.12, y: 3.48, w: 2.65, h: 1.3,
      fontSize: 11, color: DT, fontFace: JA,
      align: 'left', valign: 'top'
    });
  });

  // フッターCTA（白背景上 → ダーク系テキスト）
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 5.1, w: 9.2, h: 0.38,
    fill: { color: 'FFF9C4' }, line: { color: 'F9A825', pt: 0.8 }
  });
  s.addText('ネクストアクション：来週のスプリントレビューで施策投資判断ボードのトライアル開始', {
    x: 0.55, y: 5.1, w: 9.0, h: 0.38,
    fontSize: 12, bold: true, color: '7B5900', fontFace: JA,
    align: 'center', valign: 'middle'
  });

  addBottomBar(s);
}

// ─── 出力 ────────────────────────────────────────────────────
pres.writeFile({ fileName: 'outputs/pptx/sample_presentation.pptx' }).then(() => {
  console.log('Done: outputs/pptx/sample_presentation.pptx');
});
