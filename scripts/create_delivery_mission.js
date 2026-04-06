// ============================================================
// デリバリーマネジメントチーム Mission 2026年4月改定
// ============================================================
'use strict';

const PptxGenJS = require('pptxgenjs');
const { getTheme, getFontPreset, calcLayout, parts } = require('./lib');

const pres = new PptxGenJS();
pres.title = 'デリバリーマネジメントチーム Mission 2026年4月改定';

const theme = getTheme('corporate');
const font = getFontPreset('corporate');

const CONTENT_Y = 1.35;
const CONTENT_H = 4.06; // 5.56 - 0.12 - 1.35 - 0.03
const CONTENT_X = 0.4;
const CONTENT_W = 9.2;

function newSlide(hasWhiteBg = true) {
  const s = pres.addSlide();
  if (hasWhiteBg) s.background = { color: 'FFFFFF' };
  return s;
}

function contentSlide(breadcrumb, title) {
  const s = newSlide();
  parts.addHeader(s, pres, theme, { breadcrumb, font });
  parts.addSlideTitle(s, pres, theme, { title, font });
  parts.addBottomBar(s, pres, theme);
  return s;
}

// ─────────────────────────────────────────────────────────────
// Slide 1: Cover
// ─────────────────────────────────────────────────────────────
{
  const s = newSlide();
  parts.addCoverTitle(s, pres, theme, {
    title: 'デリバリーマネジメントチーム\nMission',
    subtitle: '2026年4月改定',
    date: '2026.04.04',
    author: 'デリバリーマネジメントチーム',
    font,
  });
  parts.addBottomBar(s, pres, theme);
}

// ─────────────────────────────────────────────────────────────
// Slide 2: Missionの存在理由（2段構え図解）
// ─────────────────────────────────────────────────────────────
{
  const s = contentSlide(
    'Mission',
    '私たちが存在する理由は「開発投資のリターンを最大化すること」だ'
  );

  // 上段: 対経営ボックス
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: CONTENT_X, y: CONTENT_Y, w: CONTENT_W, h: 1.1,
    fill: { color: theme.P }, rectRadius: 0.03,
  });
  s.addText('Mission（対経営）', {
    x: CONTENT_X + 0.3, y: CONTENT_Y + 0.05, w: CONTENT_W - 0.6, h: 0.3,
    fontSize: 11, color: theme.S, fontFace: font.jp,
    align: 'left', valign: 'middle', margin: 0,
  });
  s.addText('開発投資のリターンを最大化する', {
    x: CONTENT_X + 0.3, y: CONTENT_Y + 0.35, w: CONTENT_W - 0.6, h: 0.6,
    fontSize: 26, bold: true, color: theme.WH, fontFace: font.jp,
    align: 'center', valign: 'middle', margin: 0,
  });

  // 接続矢印
  s.addText('▼ そのためのオペレーティングモデル', {
    x: CONTENT_X, y: CONTENT_Y + 1.18, w: CONTENT_W, h: 0.3,
    fontSize: 11, color: theme.ST, fontFace: font.jp,
    align: 'center', valign: 'middle', margin: 0,
  });

  // 下段: 4原則ボックス（横並び）
  const principles = [
    { label: '見極める', sub: '投資判断・価値の選択', color: theme.ACCENTS[0] },
    { label: '守る',     sub: '障害除去・健全性維持',  color: theme.ACCENTS[1] },
    { label: '速くする', sub: 'フロー効率の最大化',    color: theme.ACCENTS[2] },
    { label: '強くする', sub: '育成・プロセス改善',    color: theme.ACCENTS[3] },
  ];
  const boxW = (CONTENT_W - 0.15 * 3) / 4;
  const boxY = CONTENT_Y + 1.55;
  const boxH = 1.65;

  principles.forEach((p, i) => {
    const bx = CONTENT_X + i * (boxW + 0.15);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: bx, y: boxY, w: boxW, h: boxH,
      fill: { color: theme.CB }, rectRadius: 0.03,
      line: { color: p.color, width: 1.5 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: bx, y: boxY, w: boxW, h: 0.06,
      fill: { color: p.color }, line: { color: p.color },
    });
    s.addText(p.label, {
      x: bx + 0.08, y: boxY + 0.15, w: boxW - 0.16, h: 0.5,
      fontSize: 20, bold: true, color: p.color, fontFace: font.jp,
      align: 'center', valign: 'middle', margin: 0,
    });
    s.addText(p.sub, {
      x: bx + 0.08, y: boxY + 0.72, w: boxW - 0.16, h: 0.6,
      fontSize: 11, color: theme.ST, fontFace: font.jp,
      align: 'center', valign: 'top', margin: 0,
      lineSpacingMultiple: 1.4,
    });
  });

  // 行動原則ラベル
  s.addText('行動原則（対チーム）', {
    x: CONTENT_X, y: boxY + boxH + 0.08, w: CONTENT_W, h: 0.25,
    fontSize: 10, color: theme.ST, fontFace: font.jp,
    align: 'center', valign: 'middle', margin: 0,
  });
}

// ─────────────────────────────────────────────────────────────
// Slide 3: 4原則カード
// ─────────────────────────────────────────────────────────────
{
  const s = contentSlide(
    'Mission > 行動原則',
    'そのための動き方は「見極め・守り・速くし・強くする」の4原則である'
  );

  const cards = [
    {
      label: '見極める',
      owner: '担い手：PO',
      meaning: '投資判断・価値の選択',
      body: '価値ベースの優先順位判断\nやらないことの決定\n受入条件定義・スコープ判断\nスプリントレビューでの価値検証',
      color: theme.ACCENTS[0],
    },
    {
      label: '守る',
      owner: '担い手：SM・ピープル',
      meaning: '障害除去・健全性維持',
      body: 'ブロッカー検知・即時除去\n1on1による状態把握\nメンタルヘルスケア\n負荷分散・稼働調整',
      color: theme.ACCENTS[1],
    },
    {
      label: '速くする',
      owner: '担い手：SM + PO',
      meaning: 'フロー効率の最大化',
      body: 'WIP最小化\nボトルネック解消\n仕様起因の手戻り削減\nリードタイム短縮',
      color: theme.ACCENTS[2],
    },
    {
      label: '強くする',
      owner: '担い手：SM・ピープル',
      meaning: '育成・プロセス改善',
      body: 'チーフ育成プログラム\nオンボーディング整備\nふりかえりの質向上\nプロセス標準化',
      color: theme.ACCENTS[3],
    },
  ];

  const cw = (CONTENT_W - 0.15 * 3) / 4;
  const ch = CONTENT_H - 0.1;

  cards.forEach((c, i) => {
    const cx = CONTENT_X + i * (cw + 0.15);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: CONTENT_Y, w: cw, h: ch,
      fill: { color: theme.CB }, rectRadius: 0.03,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: CONTENT_Y, w: cw, h: 0.06,
      fill: { color: c.color }, line: { color: c.color },
    });
    // アクセントバー左
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: CONTENT_Y + 0.06, w: 0.05, h: ch - 0.06,
      fill: { color: c.color }, line: { color: c.color },
    });
    s.addText(c.label, {
      x: cx + 0.1, y: CONTENT_Y + 0.1, w: cw - 0.18, h: 0.45,
      fontSize: 18, bold: true, color: c.color, fontFace: font.jp,
      align: 'left', valign: 'middle', margin: 0,
    });
    s.addText(c.owner, {
      x: cx + 0.1, y: CONTENT_Y + 0.58, w: cw - 0.18, h: 0.28,
      fontSize: 10, color: theme.ST, fontFace: font.jp,
      align: 'left', valign: 'middle', margin: 0,
    });
    // セパレータ
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx + 0.1, y: CONTENT_Y + 0.9, w: cw - 0.2, h: 0.01,
      fill: { color: theme.S }, line: { color: theme.S },
    });
    s.addText(c.meaning, {
      x: cx + 0.1, y: CONTENT_Y + 0.98, w: cw - 0.18, h: 0.35,
      fontSize: 12, bold: true, color: theme.DT, fontFace: font.jp,
      align: 'left', valign: 'middle', margin: 0,
    });
    s.addText(c.body, {
      x: cx + 0.1, y: CONTENT_Y + 1.38, w: cw - 0.18, h: ch - 1.48,
      fontSize: 11, color: theme.ST, fontFace: font.jp,
      align: 'left', valign: 'top', margin: 0,
      lineSpacingMultiple: 1.5,
    });
  });
}

// ─────────────────────────────────────────────────────────────
// Slide 4: 3つの柱（投資効果・スループット・サステナビリティ）
// ─────────────────────────────────────────────────────────────
{
  const s = contentSlide(
    'Mission > 3つの柱',
    '4原則は独立ではなく、3つの柱として一体で機能する'
  );

  const pillars = [
    {
      title: '投資効果',
      subtitle: '正しいものに投資する',
      principle: '見極める',
      owner: 'PO機能',
      body: '何に投資し、何をやらないか\n価値ベースの優先順位判断\nやらないことの決定',
      color: theme.ACCENTS[0],
    },
    {
      title: 'スループット',
      subtitle: '速く届ける',
      principle: '速くする',
      owner: 'SM + PO',
      body: 'フロー効率を最大化する\nWIP最小化・ボトルネック解消\nリードタイム短縮',
      color: theme.ACCENTS[2],
    },
    {
      title: 'サステナビリティ',
      subtitle: '走り続けられる',
      principle: '守る・強くする',
      owner: 'SM・ピープル',
      body: '健全性の維持と成長\n1on1・負荷分散・育成\nチーフ育成・ふりかえり',
      color: theme.ACCENTS[1],
    },
  ];

  const cw = (CONTENT_W - 0.2 * 2) / 3;
  const ch = 3.0;

  pillars.forEach((p, i) => {
    const cx = CONTENT_X + i * (cw + 0.2);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: CONTENT_Y, w: cw, h: ch,
      fill: { color: p.color }, rectRadius: 0.03,
    });
    s.addText(p.title, {
      x: cx + 0.1, y: CONTENT_Y + 0.12, w: cw - 0.2, h: 0.55,
      fontSize: 20, bold: true, color: theme.WH, fontFace: font.jp,
      align: 'center', valign: 'middle', margin: 0,
    });
    s.addText(p.subtitle, {
      x: cx + 0.1, y: CONTENT_Y + 0.68, w: cw - 0.2, h: 0.3,
      fontSize: 12, color: theme.WH, fontFace: font.jp,
      align: 'center', valign: 'middle', margin: 0,
    });
    // セパレータ
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx + 0.15, y: CONTENT_Y + 1.05, w: cw - 0.3, h: 0.02,
      fill: { color: 'FFFFFF' }, line: { color: 'FFFFFF' },
    });
    // 白カード（内容エリア）
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx + 0.1, y: CONTENT_Y + 1.15, w: cw - 0.2, h: ch - 1.25,
      fill: { color: theme.CB }, rectRadius: 0.02,
    });
    s.addText(`${p.principle}`, {
      x: cx + 0.18, y: CONTENT_Y + 1.2, w: cw - 0.36, h: 0.32,
      fontSize: 13, bold: true, color: p.color, fontFace: font.jp,
      align: 'center', valign: 'middle', margin: 0,
    });
    s.addText(`担い手：${p.owner}`, {
      x: cx + 0.18, y: CONTENT_Y + 1.52, w: cw - 0.36, h: 0.25,
      fontSize: 10, color: theme.ST, fontFace: font.jp,
      align: 'center', valign: 'middle', margin: 0,
    });
    s.addText(p.body, {
      x: cx + 0.18, y: CONTENT_Y + 1.82, w: cw - 0.36, h: ch - 2.0,
      fontSize: 11, color: theme.DT, fontFace: font.jp,
      align: 'left', valign: 'top', margin: 0,
      lineSpacingMultiple: 1.5,
    });
  });

  // 下部メッセージ
  parts.addAlertBox(s, pres, theme, {
    x: CONTENT_X, y: CONTENT_Y + 3.1, w: CONTENT_W, h: 0.42,
    type: 'warn',
    text: 'どれか1つが崩れると投資対効果は最大化できない。投資効果・スループット・サステナビリティの3つをバランスよく維持することがMissionの根幹。',
    font,
  });
}

// ─────────────────────────────────────────────────────────────
// Slide 5: 所管領域
// ─────────────────────────────────────────────────────────────
{
  const s = contentSlide(
    'Mission > 所管領域',
    '所管は3領域に限定する。それ以外に手を出さないことが集中を生む'
  );

  // 所管（主管）エリア
  s.addText('所管（主管）', {
    x: CONTENT_X, y: CONTENT_Y + 0.02, w: 5.5, h: 0.28,
    fontSize: 11, bold: true, color: theme.P, fontFace: font.jp,
    align: 'left', valign: 'middle', margin: 0,
  });

  const managed = [
    { name: 'ピープルマネジメント', principle: '守る・強くする', body: '1on1・育成支援・オンボーディング\n関係性の早期検知・チーフ育成' },
    { name: 'プロジェクトマネジメント', principle: '守る・速くする', body: 'スクラム運営・リスク可視化\n進行管理・スプリント計画・障害除去' },
    { name: 'PO機能', principle: '見極める・速くする', body: 'バックログ管理・優先順位決定\n受入条件定義・スコープ判断・価値検証' },
  ];

  managed.forEach((m, i) => {
    const my = CONTENT_Y + 0.35 + i * 1.0;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: CONTENT_X, y: my, w: 5.5, h: 0.88,
      fill: { color: theme.CB }, rectRadius: 0.03,
      line: { color: theme.P, width: 0.5 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: CONTENT_X, y: my, w: 0.05, h: 0.88,
      fill: { color: theme.P }, line: { color: theme.P },
    });
    s.addText(m.name, {
      x: CONTENT_X + 0.15, y: my + 0.05, w: 3.5, h: 0.3,
      fontSize: 13, bold: true, color: theme.DT, fontFace: font.jp,
      align: 'left', valign: 'middle', margin: 0,
    });
    parts.addBadge(s, pres, theme, {
      x: CONTENT_X + 3.75, y: my + 0.08, label: m.principle,
      color: theme.P, w: 1.65, h: 0.24, font,
    });
    s.addText(m.body, {
      x: CONTENT_X + 0.15, y: my + 0.42, w: 5.2, h: 0.4,
      fontSize: 10, color: theme.ST, fontFace: font.jp,
      align: 'left', valign: 'top', margin: 0,
      lineSpacingMultiple: 1.3,
    });
  });

  // 所管外エリア
  s.addText('所管外', {
    x: 6.1, y: CONTENT_Y + 0.02, w: 3.5, h: 0.28,
    fontSize: 11, bold: true, color: theme.ST, fontFace: font.jp,
    align: 'left', valign: 'middle', margin: 0,
  });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.1, y: CONTENT_Y + 0.35, w: 3.5, h: 3.0,
    fill: { color: theme.SF }, rectRadius: 0.03,
    line: { color: theme.S, width: 0.5 },
  });

  const unmanaged = [
    { name: 'プロダクトマネジメント', owner: 'PdMチーム', body: 'What/Whyの決定・仮説検証\nロードマップ' },
    { name: 'テクノロジーマネジメント', owner: '中島さん＋各チームリーダー', body: '技術意思決定・アーキテクチャ\nDevOps' },
    { name: 'コーポレート', owner: '分離済み', body: '経理・契約管理\nコーポレートエンジニアリング' },
  ];

  unmanaged.forEach((u, i) => {
    const uy = CONTENT_Y + 0.45 + i * 0.95;
    s.addText(u.name, {
      x: 6.2, y: uy, w: 3.3, h: 0.3,
      fontSize: 12, bold: true, color: theme.ST, fontFace: font.jp,
      align: 'left', valign: 'middle', margin: 0,
    });
    s.addText(`担い手：${u.owner}`, {
      x: 6.2, y: uy + 0.3, w: 3.3, h: 0.22,
      fontSize: 10, color: theme.ST, fontFace: font.jp,
      align: 'left', valign: 'middle', margin: 0,
    });
    s.addText(u.body, {
      x: 6.2, y: uy + 0.52, w: 3.3, h: 0.3,
      fontSize: 10, color: theme.ST, fontFace: font.jp,
      align: 'left', valign: 'top', margin: 0,
      lineSpacingMultiple: 1.3,
    });
    if (i < 2) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: 6.2, y: uy + 0.88, w: 3.2, h: 0.01,
        fill: { color: theme.S }, line: { color: theme.S },
      });
    }
  });
}

// ─────────────────────────────────────────────────────────────
// Slide 6: PdMとの境界
// ─────────────────────────────────────────────────────────────
{
  const s = contentSlide(
    'Mission > PdMとの境界',
    'PdMは「何を作るか」を決め、私たちは「どう届けるか」を決める'
  );

  const colW = (CONTENT_W - 0.3) / 2;

  // PdMチーム列ヘッダー
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: CONTENT_X, y: CONTENT_Y, w: colW, h: 0.4,
    fill: { color: theme.SF }, rectRadius: 0.02,
  });
  s.addText('PdMチーム', {
    x: CONTENT_X, y: CONTENT_Y, w: colW, h: 0.4,
    fontSize: 14, bold: true, color: theme.ST, fontFace: font.jp,
    align: 'center', valign: 'middle', margin: 0,
  });

  // デリバリー列ヘッダー
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: CONTENT_X + colW + 0.3, y: CONTENT_Y, w: colW, h: 0.4,
    fill: { color: theme.P }, rectRadius: 0.02,
  });
  s.addText('デリバリーマネジメントチーム', {
    x: CONTENT_X + colW + 0.3, y: CONTENT_Y, w: colW, h: 0.4,
    fontSize: 14, bold: true, color: theme.WH, fontFace: font.jp,
    align: 'center', valign: 'middle', margin: 0,
  });

  // 中央の「vs」
  s.addText('vs', {
    x: CONTENT_X + colW, y: CONTENT_Y, w: 0.3, h: 0.4,
    fontSize: 12, color: theme.ST, fontFace: font.en,
    align: 'center', valign: 'middle', margin: 0,
  });

  const rows = [
    { label: '問い', pdm: 'What / Why\n何を作るか・なぜ作るか', dm: 'How / When\nどの順番で・いつまでに届けるか' },
    { label: '責任', pdm: 'プロダクト戦略・仮説立案\n顧客検証', dm: 'バックログ実行・スプリント運営\nチーム稼働' },
    { label: '接続点', pdm: 'ロードマップと優先方針を\nインプット', dm: 'POがそれを開発チームの\n動きに翻訳' },
    { label: '判断権限', pdm: '「何を作るか」の最終判断', dm: '「どの順番で・どこまで作るか」\nの最終判断' },
  ];

  const rowH = (CONTENT_H - 0.4 - 0.1) / rows.length;

  rows.forEach((r, i) => {
    const ry = CONTENT_Y + 0.5 + i * rowH;
    const isLast = i === rows.length - 1;

    // ラベル（中央）
    s.addText(r.label, {
      x: CONTENT_X + colW, y: ry, w: 0.3, h: rowH,
      fontSize: 9, bold: true, color: theme.ST, fontFace: font.jp,
      align: 'center', valign: 'middle', margin: 0, rotate: 0,
    });

    // PdM列
    s.addShape(pres.shapes.RECTANGLE, {
      x: CONTENT_X, y: ry, w: colW, h: rowH,
      fill: { color: i % 2 === 0 ? theme.SF : theme.WH },
      line: { color: theme.S, width: 0.3 },
    });
    s.addText(r.label, {
      x: CONTENT_X + 0.1, y: ry + 0.05, w: 0.8, h: rowH * 0.35,
      fontSize: 9, bold: true, color: theme.ST, fontFace: font.jp,
      align: 'left', valign: 'middle', margin: 0,
    });
    s.addText(r.pdm, {
      x: CONTENT_X + 0.1, y: ry + rowH * 0.35, w: colW - 0.2, h: rowH * 0.6,
      fontSize: 12, color: theme.DT, fontFace: font.jp,
      align: 'left', valign: 'middle', margin: 0,
      lineSpacingMultiple: 1.4,
    });

    // デリバリー列
    const dx = CONTENT_X + colW + 0.3;
    s.addShape(pres.shapes.RECTANGLE, {
      x: dx, y: ry, w: colW, h: rowH,
      fill: { color: i % 2 === 0 ? theme.CB : theme.WH },
      line: { color: theme.S, width: 0.3 },
    });
    s.addText(r.label, {
      x: dx + 0.1, y: ry + 0.05, w: 0.8, h: rowH * 0.35,
      fontSize: 9, bold: true, color: theme.P, fontFace: font.jp,
      align: 'left', valign: 'middle', margin: 0,
    });
    s.addText(r.dm, {
      x: dx + 0.1, y: ry + rowH * 0.35, w: colW - 0.2, h: rowH * 0.6,
      fontSize: 12, bold: true, color: theme.P, fontFace: font.jp,
      align: 'left', valign: 'middle', margin: 0,
      lineSpacingMultiple: 1.4,
    });
  });
}

// ─────────────────────────────────────────────────────────────
// Slide 7: 判断基準（大きな強調フレーム）
// ─────────────────────────────────────────────────────────────
{
  const s = contentSlide(
    'Mission > 判断基準',
    '判断に迷ったら「4原則のどれか？」と問う。どれでもなければ私たちの仕事ではない'
  );

  // 大きな判断フレーム
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: CONTENT_X, y: CONTENT_Y, w: CONTENT_W, h: 1.6,
    fill: { color: theme.P }, rectRadius: 0.04,
  });
  s.addText('「今やろうとしていることは、流れを', {
    x: CONTENT_X + 0.3, y: CONTENT_Y + 0.1, w: CONTENT_W - 0.6, h: 0.4,
    fontSize: 16, color: theme.S, fontFace: font.jp,
    align: 'center', valign: 'middle', margin: 0,
  });
  s.addText('見極める  /  守る  /  速くする  /  強くする', {
    x: CONTENT_X + 0.3, y: CONTENT_Y + 0.48, w: CONTENT_W - 0.6, h: 0.5,
    fontSize: 22, bold: true, color: theme.WH, fontFace: font.jp,
    align: 'center', valign: 'middle', margin: 0,
  });
  s.addText('ことか？」  ——どれにも当てはまらないなら、デリバリーチームの仕事ではない。', {
    x: CONTENT_X + 0.3, y: CONTENT_Y + 1.0, w: CONTENT_W - 0.6, h: 0.45,
    fontSize: 14, color: theme.S, fontFace: font.jp,
    align: 'center', valign: 'middle', margin: 0,
  });

  // 判断例カード
  const examples = [
    { principle: '見極める', ok: 'バックログを価値で並び替える', color: theme.ACCENTS[0] },
    { principle: '守る',     ok: '1on1でメンバーの状態を確認する', color: theme.ACCENTS[1] },
    { principle: '速くする', ok: 'WIPを減らしてボトルネックを解消する', color: theme.ACCENTS[2] },
    { principle: '強くする', ok: 'ふりかえりのファシリテーションを改善する', color: theme.ACCENTS[3] },
  ];

  const ecw = (CONTENT_W - 0.15 * 3) / 4;
  const ecy = CONTENT_Y + 1.75;
  const ech = CONTENT_H - 1.75 - 0.05;

  examples.forEach((e, i) => {
    const ecx = CONTENT_X + i * (ecw + 0.15);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: ecx, y: ecy, w: ecw, h: ech,
      fill: { color: theme.CB }, rectRadius: 0.03,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: ecx, y: ecy, w: ecw, h: 0.05,
      fill: { color: e.color }, line: { color: e.color },
    });
    s.addText(e.principle, {
      x: ecx + 0.08, y: ecy + 0.1, w: ecw - 0.16, h: 0.32,
      fontSize: 13, bold: true, color: e.color, fontFace: font.jp,
      align: 'left', valign: 'middle', margin: 0,
    });
    s.addText(`例：${e.ok}`, {
      x: ecx + 0.08, y: ecy + 0.45, w: ecw - 0.16, h: ech - 0.55,
      fontSize: 11, color: theme.DT, fontFace: font.jp,
      align: 'left', valign: 'top', margin: 0,
      lineSpacingMultiple: 1.4,
    });
  });
}

// ─────────────────────────────────────────────────────────────
// Slide 8: 成果指標
// ─────────────────────────────────────────────────────────────
{
  const s = contentSlide(
    'Mission > 成果指標',
    'Missionへの貢献は4視点の指標で継続的に測定する'
  );

  s.addText('まず★★★（必須）から始める。Missionの根幹に直結する指標。', {
    x: CONTENT_X, y: CONTENT_Y, w: CONTENT_W, h: 0.28,
    fontSize: 11, color: theme.ST, fontFace: font.jp,
    align: 'left', valign: 'middle', margin: 0,
  });

  parts.addStyledTable(s, pres, theme, {
    x: CONTENT_X, y: CONTENT_Y + 0.35, w: CONTENT_W,
    headers: ['視点', '行動原則', '指標（★★★）', '測定方法', '頻度'],
    colW: [1.4, 1.3, 2.5, 3.0, 1.0],
    rows: [
      ['デリバリー', '速くする', 'サイクルタイム', 'PBI着手→本番リリースまでの日数（中央値）', 'スプリント'],
      ['デリバリー', '速くする', 'スプリントゴール達成率', 'ゴール達成スプリント数 / 全スプリント数', 'スプリント'],
      ['バリュー', '見極める', 'バックログ健全性', 'Ready状態のPBI比率・受入条件の明確化率', 'スプリント'],
      ['品質', '速くする＋守る', '手戻り率', '手戻りチケット数 / 完了チケット数', 'スプリント'],
      ['サステナビリティ', '守る＋強くする', 'チーム健全性', 'レトロでのチーム自己評価・離職率', '月次'],
    ],
    font,
  });

  parts.addAlertBox(s, pres, theme, {
    x: CONTENT_X, y: CONTENT_Y + 3.3, w: CONTENT_W, h: 0.38,
    type: 'info',
    text: '注意：ベロシティ（ストーリーポイント）は成果指標に含めない。チーム間比較や生産性評価に使うと計測の歪みを生む。代わりにサイクルタイムとスプリントゴール達成率で「速さ」を測定する。',
    font,
  });
}

// ─────────────────────────────────────────────────────────────
// Slide 9: ネクストアクション
// ─────────────────────────────────────────────────────────────
{
  const s = contentSlide(
    'Mission',
    'ネクストアクション：今日からこのMissionで動く'
  );

  parts.addFlowVertical(s, pres, theme, {
    x: CONTENT_X, y: CONTENT_Y, w: CONTENT_W, h: CONTENT_H - 0.1,
    steps: [
      {
        title: '判断基準を日常に取り込む',
        body: '「今やろうとしていることは4原則のどれか？」を毎日の仕事の入口で問う。どれにも当てはまらないアクションは一旦止める。',
      },
      {
        title: '★★★指標の計測を開始する',
        body: 'チーム立ち上げ初日からサイクルタイム・スプリントゴール達成率・バックログ健全性・手戻り率・チーム健全性の5指標を計測し始める。',
      },
      {
        title: 'チームメンバーとMissionを対話する',
        body: '1on1・レトロでMissionと行動原則を使った対話を始める。「今週の自分の仕事は見極める/守る/速くする/強くするのどれだったか？」を問い合う。',
      },
    ],
    font,
  });
}

// ─────────────────────────────────────────────────────────────
// Output
// ─────────────────────────────────────────────────────────────
pres.writeFile({ fileName: 'outputs/pptx/delivery_mission.pptx' })
  .then(() => console.log('Done: outputs/pptx/delivery_mission.pptx'))
  .catch(e => console.error('Error:', e));
