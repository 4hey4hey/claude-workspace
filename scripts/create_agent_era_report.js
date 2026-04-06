const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.title = "AIエージェントの普及で、お客さまの行動はどう変わるか";

// フォント
const JA = 'Meiryo';
const EN = 'Arial';

// デザイントークン
const P  = '004098';
const A  = 'DC2626';
const S  = 'CADCFC';
const CB = 'EEF3FA';
const DT = '1A1A2E';
const ST = '444466';
const WH = 'FFFFFF';
const WARN = 'F59E0B';

const makeShadow = () => ({ type: 'outer', blur: 4, offset: 2, angle: 135, color: '000000', opacity: 0.08 });

// ─── 共通パーツ ───────────────────────────────────────────
function addBottomBar(slide) {
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.56, w: 8.0, h: 0.07, fill: { color: P }, line: { color: P } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 8.0, y: 5.56, w: 2.0, h: 0.07, fill: { color: A }, line: { color: A } });
}

function addHeader(slide, breadcrumb) {
  slide.addText(breadcrumb, { x: 0.4, y: 0.08, w: 9.2, h: 0.22, fontSize: 9, color: ST, fontFace: JA, align: 'left', valign: 'middle', margin: 0 });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0.34, w: 10, h: 0.01, fill: { color: S }, line: { color: S } });
}

function addSlideTitle(slide, title) {
  slide.addText(title, { x: 0.4, y: 0.42, w: 9.2, h: 0.65, fontSize: 22, bold: true, color: DT, fontFace: JA, align: 'left', valign: 'middle', margin: 0 });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 1.15, w: 10, h: 0.01, fill: { color: S }, line: { color: S } });
}

const BC = 'AIエージェント時代のお客さま行動変化';

// ═══ SLIDE 1: 表紙 ═══════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: WH };

  // 上部ブルーバンド
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 2.85, fill: { color: P }, line: { color: P } });

  // タイトル
  s.addText('AIエージェントの普及で', { x: 0.6, y: 0.35, w: 8.8, h: 0.85, fontSize: 38, bold: true, color: WH, fontFace: JA, align: 'left', valign: 'middle', margin: 0 });
  s.addText('お客さまの行動はどう変わるか', { x: 0.6, y: 1.15, w: 8.8, h: 0.7, fontSize: 28, color: S, fontFace: JA, align: 'left', valign: 'middle', margin: 0 });
  s.addText('myTOKYOGAS戦略・EA構想への示唆', { x: 0.6, y: 1.95, w: 8.8, h: 0.4, fontSize: 14, color: S, fontFace: JA, align: 'left', valign: 'middle', margin: 0 });

  // レッドアクセント
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 3.15, w: 3.0, h: 0.03, fill: { color: A }, line: { color: A } });

  // 3つのキーポイント
  const kp = [
    { icon: '01', title: '既に起きている変化', desc: '2025年後半〜主要AI企業が\nブラウザエージェントを一斉投入' },
    { icon: '02', title: '3段階の行動変化', desc: '聞く → 任せる → 委ねる\nお客さまの接点がアプリからAIへ移行' },
    { icon: '03', title: '東京ガスが取るべき手', desc: '固有データ×API化で\n「AIに選ばれる」ポジションを確保' },
  ];
  const kw = 2.7, kh = 1.55, ky = 3.45, kgap = 0.3;
  const kStartX = (10 - kw * 3 - kgap * 2) / 2;

  kp.forEach((k, i) => {
    const x = kStartX + i * (kw + kgap);
    s.addShape(pres.shapes.RECTANGLE, { x, y: ky, w: kw, h: kh, fill: { color: CB }, line: { color: S, pt: 0.5 } });
    s.addShape(pres.shapes.RECTANGLE, { x, y: ky, w: 0.06, h: kh, fill: { color: P }, line: { color: P } });
    s.addText(k.icon, { x: x + 0.18, y: ky + 0.1, w: 0.45, h: 0.35, fontSize: 18, bold: true, color: P, fontFace: EN, align: 'left', valign: 'middle', margin: 0 });
    s.addText(k.title, { x: x + 0.65, y: ky + 0.1, w: kw - 0.8, h: 0.35, fontSize: 12, bold: true, color: DT, fontFace: JA, align: 'left', valign: 'middle', margin: 0 });
    s.addText(k.desc, { x: x + 0.18, y: ky + 0.5, w: kw - 0.35, h: kh - 0.6, fontSize: 11, color: ST, fontFace: JA, align: 'left', valign: 'top', lineSpacingMultiple: 1.5 });
  });

  s.addText('2026年3月', { x: 0.6, y: 5.2, w: 3, h: 0.25, fontSize: 10, color: ST, fontFace: JA, align: 'left', margin: 0 });
  addBottomBar(s);
}

// ═══ SLIDE 2: いま実際に起きていること ═══════════════════════
{
  const s = pres.addSlide();
  s.background = { color: WH };
  addHeader(s, BC);
  addSlideTitle(s, 'いま実際に起きていること');

  // デモ説明
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.3, w: 4.5, h: 2.6, fill: { color: CB }, line: { color: S, pt: 0.5 }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.3, w: 4.5, h: 0.05, fill: { color: P }, line: { color: P } });

  s.addText('2026年3月の実演', { x: 0.6, y: 1.45, w: 4.1, h: 0.35, fontSize: 14, bold: true, color: P, fontFace: JA, align: 'left', valign: 'middle', margin: 0 });
  s.addText('Claude in Chromeに「myTOKYOGASの料金と使用量を分析して」と一言指示', { x: 0.6, y: 1.85, w: 4.1, h: 0.45, fontSize: 11, color: DT, fontFace: JA, align: 'left', valign: 'top', lineSpacingMultiple: 1.5 });

  const steps = ['myTOKYOGASへのログイン', '料金・使用量データの読み取り', '傾向分析の実施', 'インフォグラフィックの自動生成'];
  steps.forEach((step, i) => {
    const sy = 2.45 + i * 0.33;
    s.addShape(pres.shapes.OVAL, { x: 0.7, y: sy + 0.04, w: 0.22, h: 0.22, fill: { color: P }, line: { color: P } });
    s.addText(String(i + 1), { x: 0.7, y: sy + 0.04, w: 0.22, h: 0.22, fontSize: 9, bold: true, color: WH, fontFace: EN, align: 'center', valign: 'middle', margin: 0 });
    s.addText(step, { x: 1.05, y: sy, w: 3.8, h: 0.3, fontSize: 11, color: DT, fontFace: JA, align: 'left', valign: 'middle', margin: 0 });
  });

  // 右側：結果ハイライト
  s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.3, w: 4.5, h: 1.15, fill: { color: 'FEF3C7' }, line: { color: WARN, pt: 0.8 } });
  s.addText('お客さまはmTGを一度も開いていない', { x: 5.3, y: 1.35, w: 4.1, h: 0.35, fontSize: 13, bold: true, color: '92400E', fontFace: JA, align: 'left', valign: 'middle', margin: 0 });
  s.addText('ログイン・画面確認・グラフの読み解き\nすべてAIが代理で行い、結果だけを渡した', { x: 5.3, y: 1.75, w: 4.1, h: 0.55, fontSize: 11, color: '78350F', fontFace: JA, align: 'left', valign: 'top', lineSpacingMultiple: 1.5 });

  // プレイヤー表
  s.addText('主要AIプレイヤーの動向（2026年3月時点）', { x: 5.1, y: 2.65, w: 4.5, h: 0.35, fontSize: 12, bold: true, color: DT, fontFace: JA, align: 'left', valign: 'middle', margin: 0 });

  const players = [
    ['Anthropic', 'Claude in Chrome', '2025年12月〜 全有料プラン'],
    ['OpenAI', 'ChatGPT Agent', '2025年7月〜'],
    ['Google', 'Gemini auto-browse', '2026年1月〜 プレビュー'],
    ['Microsoft', 'Copilot Tasks', '2026年2月〜 プレビュー'],
    ['Apple', 'Siri 次世代版', '2026年6月 WWDC発表予定'],
  ];

  const tRows = [
    [
      { text: '', options: { fill: { color: P }, color: WH, bold: true, fontSize: 9, fontFace: JA, align: 'left', margin: [3, 4, 3, 4] } },
      { text: 'サービス', options: { fill: { color: P }, color: WH, bold: true, fontSize: 9, fontFace: JA, align: 'left', margin: [3, 4, 3, 4] } },
      { text: '状況', options: { fill: { color: P }, color: WH, bold: true, fontSize: 9, fontFace: JA, align: 'left', margin: [3, 4, 3, 4] } },
    ],
    ...players.map(p => [
      { text: p[0], options: { fontSize: 9, fontFace: JA, color: DT, bold: true, align: 'left', margin: [3, 4, 3, 4], border: [null, null, { pt: 0.5, color: 'E8EAF0' }, null] } },
      { text: p[1], options: { fontSize: 9, fontFace: JA, color: ST, align: 'left', margin: [3, 4, 3, 4], border: [null, null, { pt: 0.5, color: 'E8EAF0' }, null] } },
      { text: p[2], options: { fontSize: 9, fontFace: JA, color: ST, align: 'left', margin: [3, 4, 3, 4], border: [null, null, { pt: 0.5, color: 'E8EAF0' }, null] } },
    ])
  ];
  s.addTable(tRows, { x: 5.1, y: 3.0, w: 4.5, colW: [0.95, 1.55, 2.0] });

  // フッターコメント
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 4.85, w: 9.2, h: 0.55, fill: { color: CB }, line: { color: S, pt: 0.5 } });
  s.addText('2026年後半〜2027年にはスマートフォンの標準機能としてAIエージェントが搭載される見通し。\n「一部の技術に詳しい人が使うもの」から「誰もが意識せず使うもの」への移行が始まっている。', {
    x: 0.6, y: 4.85, w: 8.8, h: 0.55, fontSize: 11, color: DT, fontFace: JA, align: 'left', valign: 'middle', lineSpacingMultiple: 1.5
  });

  addBottomBar(s);
}

// ═══ SLIDE 3: 定量データ ═════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: WH };
  addHeader(s, BC);
  addSlideTitle(s, '既に起きているトラフィック構造変化');

  // 左カラム：大数字カード群
  const metrics = [
    { num: '61%', unit: '減', label: 'AI Overview表示時の\nオーガニックCTR低下', src: 'Seer Interactive 2025' },
    { num: '69%', unit: '', label: 'ゼロクリック検索の割合\n（2024年56%→2025年69%）', src: 'Digital Bloom 2025' },
    { num: '38%', unit: '減', label: 'パブリッシャーへの\nGoogle経由トラフィック', src: 'Press Gazette 2025' },
    { num: '25%', unit: '減', label: '検索エンジン経由\nトラフィック予測（2026年末）', src: 'Gartner 2024' },
  ];

  metrics.forEach((m, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const mx = 0.4 + col * 2.35;
    const my = 1.3 + row * 1.95;
    const mw = 2.2, mh = 1.8;

    s.addShape(pres.shapes.RECTANGLE, { x: mx, y: my, w: mw, h: mh, fill: { color: WH }, line: { color: S, pt: 0.8 }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: mx, y: my, w: mw, h: 0.05, fill: { color: A }, line: { color: A } });
    s.addText(m.num, { x: mx + 0.12, y: my + 0.15, w: 1.3, h: 0.55, fontSize: 32, bold: true, color: A, fontFace: EN, align: 'left', valign: 'middle', margin: 0 });
    s.addText(m.unit, { x: mx + 1.4, y: my + 0.3, w: 0.5, h: 0.35, fontSize: 14, bold: true, color: A, fontFace: JA, align: 'left', valign: 'middle', margin: 0 });
    s.addText(m.label, { x: mx + 0.12, y: my + 0.75, w: mw - 0.24, h: 0.6, fontSize: 11, color: DT, fontFace: JA, align: 'left', valign: 'top', lineSpacingMultiple: 1.4 });
    s.addText(m.src, { x: mx + 0.12, y: my + mh - 0.35, w: mw - 0.24, h: 0.25, fontSize: 8, color: '94A3B8', fontFace: JA, align: 'left', valign: 'bottom', margin: 0 });
  });

  // 右カラム：Utilities特化
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.3, w: 4.4, h: 3.9, fill: { color: CB }, line: { color: P, pt: 1 }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.3, w: 4.4, h: 0.5, fill: { color: P }, line: { color: P } });
  s.addText('公益事業（Utilities）セクターの影響', { x: 5.4, y: 1.3, w: 4.0, h: 0.5, fontSize: 13, bold: true, color: WH, fontFace: JA, align: 'left', valign: 'middle', margin: 0 });

  s.addText('25.4%', { x: 5.4, y: 2.0, w: 2.0, h: 0.6, fontSize: 36, bold: true, color: P, fontFace: EN, align: 'left', valign: 'middle', margin: 0 });
  s.addText('AI Overview 表示率', { x: 7.3, y: 2.0, w: 2.1, h: 0.3, fontSize: 11, bold: true, color: DT, fontFace: JA, align: 'left', valign: 'middle', margin: 0 });
  s.addText('全業界中 最高水準', { x: 7.3, y: 2.3, w: 2.1, h: 0.3, fontSize: 11, color: A, fontFace: JA, align: 'left', valign: 'middle', margin: 0 });

  s.addShape(pres.shapes.RECTANGLE, { x: 5.5, y: 2.75, w: 3.8, h: 0.01, fill: { color: S }, line: { color: S } });

  s.addText('0.35%', { x: 5.4, y: 2.9, w: 2.0, h: 0.6, fontSize: 36, bold: true, color: P, fontFace: EN, align: 'left', valign: 'middle', margin: 0 });
  s.addText('AI経由の直接サイト流入', { x: 7.3, y: 2.9, w: 2.1, h: 0.3, fontSize: 11, bold: true, color: DT, fontFace: JA, align: 'left', valign: 'middle', margin: 0 });
  s.addText('全業界中 最低水準', { x: 7.3, y: 3.2, w: 2.1, h: 0.3, fontSize: 11, color: A, fontFace: JA, align: 'left', valign: 'middle', margin: 0 });

  s.addShape(pres.shapes.RECTANGLE, { x: 5.5, y: 3.65, w: 3.8, h: 0.01, fill: { color: S }, line: { color: S } });

  // 含意ボックス
  s.addShape(pres.shapes.RECTANGLE, { x: 5.5, y: 3.8, w: 3.8, h: 1.2, fill: { color: 'FEF3C7' }, line: { color: WARN, pt: 0.5 } });
  s.addText('お客さまはAIの回答で満足し、\nサイトには来ない。\n\n「よくある質問」「料金案内」等の\n情報提供型ページが最も影響を受ける', {
    x: 5.65, y: 3.85, w: 3.5, h: 1.1, fontSize: 10, color: '78350F', fontFace: JA, align: 'left', valign: 'top', lineSpacingMultiple: 1.4
  });

  addBottomBar(s);
}

// ═══ SLIDE 4: 3段階の行動変化 ════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: WH };
  addHeader(s, BC);
  addSlideTitle(s, 'お客さまの行動は3段階で変わる');

  const stages = [
    {
      num: '1', title: 'AIに聞く', subtitle: '情報検索の代理', time: '既に発生中', color: '2563EB',
      examples: '「先月のガス代いくら？」\n「東京ガスと〇〇ガスどっちが安い？」',
      impact: 'FAQ・料金案内ページのトラフィックが構造的に減少'
    },
    {
      num: '2', title: 'AIに操作を任せる', subtitle: '単純操作の代理', time: '2〜3年以内', color: '7C3AED',
      examples: '「引越し先のガスの開栓を予約して」\n「支払方法をカード変更して」',
      impact: '手続き系の画面遷移が減少。ファネル入口が細くなる'
    },
    {
      num: '3', title: 'AIに判断を委ねる', subtitle: '意思決定の代理', time: '5年以内（若年層）', color: 'DC2626',
      examples: '「エネルギーコストを最適化して」\n「給湯器の交換タイミングを判断して」',
      impact: '東京ガスが「選ぶ」側から「AIに選ばれる」側に'
    },
  ];

  const cw = 2.9, ch = 3.8, cy = 1.3, cgap = 0.2;
  const cStartX = (10 - cw * 3 - cgap * 2) / 2;

  stages.forEach((st, i) => {
    const x = cStartX + i * (cw + cgap);

    s.addShape(pres.shapes.RECTANGLE, { x, y: cy, w: cw, h: ch, fill: { color: WH }, line: { color: S, pt: 0.8 }, shadow: makeShadow() });
    // ヘッダー
    s.addShape(pres.shapes.RECTANGLE, { x, y: cy, w: cw, h: 0.85, fill: { color: st.color }, line: { color: st.color } });
    s.addText('第' + st.num + '段階', { x: x + 0.12, y: cy + 0.05, w: cw - 0.24, h: 0.3, fontSize: 10, color: WH, fontFace: JA, align: 'left', valign: 'middle', margin: 0 });
    s.addText(st.title, { x: x + 0.12, y: cy + 0.3, w: cw - 0.24, h: 0.3, fontSize: 16, bold: true, color: WH, fontFace: JA, align: 'left', valign: 'middle', margin: 0 });
    s.addText(st.subtitle, { x: x + 0.12, y: cy + 0.58, w: cw - 0.24, h: 0.22, fontSize: 10, color: S, fontFace: JA, align: 'left', valign: 'middle', margin: 0 });

    // 時間軸バッジ
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.12, y: cy + 1.0, w: cw - 0.24, h: 0.3, fill: { color: CB }, line: { color: S, pt: 0.5 } });
    s.addText(st.time, { x: x + 0.12, y: cy + 1.0, w: cw - 0.24, h: 0.3, fontSize: 10, bold: true, color: st.color, fontFace: JA, align: 'center', valign: 'middle', margin: 0 });

    // 具体例
    s.addText('お客さまの声', { x: x + 0.12, y: cy + 1.45, w: cw - 0.24, h: 0.22, fontSize: 9, bold: true, color: ST, fontFace: JA, align: 'left', valign: 'middle', margin: 0 });
    s.addText(st.examples, { x: x + 0.12, y: cy + 1.7, w: cw - 0.24, h: 0.85, fontSize: 10, color: DT, fontFace: JA, align: 'left', valign: 'top', lineSpacingMultiple: 1.5 });

    // mTGへの影響
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.12, y: cy + 2.7, w: cw - 0.24, h: 0.01, fill: { color: S }, line: { color: S } });
    s.addText('mTGへの影響', { x: x + 0.12, y: cy + 2.85, w: cw - 0.24, h: 0.22, fontSize: 9, bold: true, color: A, fontFace: JA, align: 'left', valign: 'middle', margin: 0 });
    s.addText(st.impact, { x: x + 0.12, y: cy + 3.1, w: cw - 0.24, h: 0.55, fontSize: 10, color: DT, fontFace: JA, align: 'left', valign: 'top', lineSpacingMultiple: 1.4 });
  });

  // 矢印
  stages.slice(0, -1).forEach((_, i) => {
    const ax = cStartX + (i + 1) * (cw + cgap) - cgap / 2 - 0.05;
    s.addText('\u25B6', { x: ax, y: cy + 0.3, w: cgap + 0.1, h: 0.35, fontSize: 14, color: ST, fontFace: EN, align: 'center', valign: 'middle', margin: 0 });
  });

  addBottomBar(s);
}

// ═══ SLIDE 5: この変化が意味すること ═════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: WH };
  addHeader(s, BC);
  addSlideTitle(s, 'この変化が意味すること');

  const implications = [
    {
      title: '「アプリを開いてもらう」が\n前提ではなくなる',
      body: '第1段階が進むだけで、mTGの「情報閲覧」目的のアクセスは減少する。料金を確認するためにアプリを開く手間より、AIに一言聞く方が速い。',
      accent: '2563EB'
    },
    {
      title: '「毎日使いたくなるアプリ」\nの前提が変わる',
      body: 'ガス・電気は毎日確認する必然性がない。「毎日使いたくなる機能」を追加してMAUを増やす戦略は、エージェント時代にはさらに成立しにくくなる。',
      accent: '7C3AED'
    },
    {
      title: '「東京ガスのデータ」の\n価値が相対的に上がる',
      body: 'エネルギー消費・機器稼働・点検情報はGoogleもAmazonも持っていない。東京ガスは「AIにとって最も価値のあるデータソース」になれるポジションにいる。',
      accent: '059669'
    },
  ];

  const iw = 2.9, ih = 3.2, iy = 1.35, igap = 0.2;
  const iStartX = (10 - iw * 3 - igap * 2) / 2;

  implications.forEach((imp, i) => {
    const x = iStartX + i * (iw + igap);

    s.addShape(pres.shapes.RECTANGLE, { x, y: iy, w: iw, h: ih, fill: { color: WH }, line: { color: S, pt: 0.8 }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y: iy, w: iw, h: 0.06, fill: { color: imp.accent }, line: { color: imp.accent } });

    // 番号
    s.addShape(pres.shapes.OVAL, { x: x + 0.15, y: iy + 0.2, w: 0.42, h: 0.42, fill: { color: imp.accent }, line: { color: imp.accent } });
    s.addText(String(i + 1), { x: x + 0.15, y: iy + 0.2, w: 0.42, h: 0.42, fontSize: 16, bold: true, color: WH, fontFace: EN, align: 'center', valign: 'middle', margin: 0 });

    s.addText(imp.title, { x: x + 0.15, y: iy + 0.72, w: iw - 0.3, h: 0.65, fontSize: 13, bold: true, color: DT, fontFace: JA, align: 'left', valign: 'top', lineSpacingMultiple: 1.4 });
    s.addText(imp.body, { x: x + 0.15, y: iy + 1.45, w: iw - 0.3, h: 1.6, fontSize: 11, color: ST, fontFace: JA, align: 'left', valign: 'top', lineSpacingMultiple: 1.5 });
  });

  // ボトムメッセージ
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 4.75, w: 9.2, h: 0.6, fill: { color: 'FEF3C7' }, line: { color: WARN, pt: 0.8 } });
  s.addText('重要なのは「画面を開かせること」ではなく、「どの経路で来ても東京ガスが最も価値のある情報と体験を提供できる状態」を作ること', {
    x: 0.6, y: 4.75, w: 8.8, h: 0.6, fontSize: 12, bold: true, color: '92400E', fontFace: JA, align: 'center', valign: 'middle'
  });

  addBottomBar(s);
}

// ═══ SLIDE 6: 調査機関の予測 ═════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: WH };
  addHeader(s, BC);
  addSlideTitle(s, '調査機関の予測');

  // Gartner大型カード
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.3, w: 5.8, h: 2.5, fill: { color: CB }, line: { color: P, pt: 1 }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.3, w: 5.8, h: 0.45, fill: { color: P }, line: { color: P } });
  s.addText('Gartner IT Symposium 2025（2025年10月発表）', { x: 0.6, y: 1.3, w: 5.4, h: 0.45, fontSize: 12, bold: true, color: WH, fontFace: JA, align: 'left', valign: 'middle', margin: 0 });

  s.addText('90%', { x: 0.6, y: 1.9, w: 1.5, h: 0.6, fontSize: 40, bold: true, color: A, fontFace: EN, align: 'left', valign: 'middle', margin: 0 });
  s.addText('B2B購買がAIエージェント経由に（2028年まで）', { x: 2.1, y: 1.9, w: 3.9, h: 0.3, fontSize: 12, bold: true, color: DT, fontFace: JA, align: 'left', valign: 'middle', margin: 0 });
  s.addText('15兆ドル超がエージェント交換を通じて処理される', { x: 2.1, y: 2.2, w: 3.9, h: 0.3, fontSize: 11, color: ST, fontFace: JA, align: 'left', valign: 'middle', margin: 0 });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 2.65, w: 5.4, h: 0.01, fill: { color: S }, line: { color: S } });

  const gPoints = [
    'データフィード経済：検証可能な運用データが通貨になる',
    'API-first・ヘッドレスが競争の堀を確立する',
    'UIしか持たないサービスはエージェントに「選ばれない」',
  ];
  gPoints.forEach((gp, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 2.78 + i * 0.32, w: 0.15, h: 0.15, fill: { color: P }, line: { color: P } });
    s.addText(gp, { x: 0.95, y: 2.73 + i * 0.32, w: 5.1, h: 0.28, fontSize: 10, color: DT, fontFace: JA, align: 'left', valign: 'middle', margin: 0 });
  });

  // 右カラム：その他の予測
  const others = [
    { org: 'Gartner', date: '2025年3月', pred: 'カスタマーサービスの80%がAIエージェントで自律解決（2029年）' },
    { org: 'Gartner', date: '2025年8月', pred: 'エンタープライズアプリの40%にAIエージェント搭載（2026年末）' },
    { org: 'Cisco', date: '2026年', pred: 'カスタマーサポートの56%にAgentic AIが関与（2026年半ば）' },
    { org: 'McKinsey', date: '', pred: 'AIエージェントが年間2.6〜4.4兆ドルの経済価値を創出' },
  ];

  others.forEach((o, i) => {
    const oy = 1.3 + i * 0.65;
    s.addShape(pres.shapes.RECTANGLE, { x: 6.4, y: oy, w: 3.2, h: 0.55, fill: { color: WH }, line: { color: S, pt: 0.5 } });
    s.addShape(pres.shapes.RECTANGLE, { x: 6.4, y: oy, w: 0.05, h: 0.55, fill: { color: P }, line: { color: P } });
    s.addText(o.org + (o.date ? ' ' + o.date : ''), { x: 6.55, y: oy + 0.02, w: 2.95, h: 0.2, fontSize: 8, bold: true, color: P, fontFace: JA, align: 'left', valign: 'middle', margin: 0 });
    s.addText(o.pred, { x: 6.55, y: oy + 0.2, w: 2.95, h: 0.32, fontSize: 9, color: ST, fontFace: JA, align: 'left', valign: 'top', lineSpacingMultiple: 1.3 });
  });

  // 下段：東京ガスへの含意
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 4.05, w: 9.2, h: 1.3, fill: { color: CB }, line: { color: P, pt: 0.8 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 4.05, w: 0.06, h: 1.3, fill: { color: A }, line: { color: A } });
  s.addText('東京ガスへの含意', { x: 0.65, y: 4.1, w: 3.0, h: 0.3, fontSize: 12, bold: true, color: A, fontFace: JA, align: 'left', valign: 'middle', margin: 0 });
  s.addText('B2B予測だが、B2Cでも同じ構造変化が起きる。AIエージェントが「お客さまの代理人」としてエネルギー会社を\n比較・選択する世界では、以下が「選ばれる」ための前提条件になる。', {
    x: 0.65, y: 4.4, w: 8.7, h: 0.4, fontSize: 10, color: DT, fontFace: JA, align: 'left', valign: 'top', lineSpacingMultiple: 1.4
  });
  s.addText('① 東京ガスのデータがAPI経由でエージェントに提供できること\n② 提供データの信頼性・検証可能性が担保されていること', {
    x: 0.65, y: 4.85, w: 8.7, h: 0.45, fontSize: 11, bold: true, color: P, fontFace: JA, align: 'left', valign: 'top', lineSpacingMultiple: 1.5
  });

  addBottomBar(s);
}

// ═══ SLIDE 7: 効果が逓減していくもの ════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: WH };
  addHeader(s, BC);
  addSlideTitle(s, '今後、効果が逓減していくもの');

  const items = [
    { name: 'ポイント・ガチャ\nスタンプラリー', reason: '「開かせるためのギミック」であり、\nお客さまの生活を良くしていない', icon: '\u2716', color: A },
    { name: 'レシピ・\n暮らしコラム', reason: '東京ガスでなくても読める汎用コンテンツ。\nAI検索に吸われる典型', icon: '\u2716', color: A },
    { name: '天気連動の\n省エネTips', reason: '一般的すぎる。AIの方が\nパーソナライズされた提案を返せる', icon: '\u2716', color: A },
    { name: '家計簿・\n支出管理', reason: 'マネーフォワード・Zaimが既にある。\n東京ガスのデータで差別化できない', icon: '\u2716', color: A },
    { name: 'クーポン・\nECモール連携', reason: 'dポイント・楽天・PayPayと\n還元率の消耗戦になる', icon: '\u2716', color: A },
    { name: 'コミュニティ・\n掲示板', reason: 'ガス会社アプリでコミュニティが\n成立する世界線はほぼない', icon: '\u2716', color: A },
  ];

  const cols = 3, rows = 2;
  const cardW = 2.85, cardH = 1.75, gap = 0.2;
  const startX = (10 - cardW * cols - gap * (cols - 1)) / 2;
  const startY = 1.35;

  items.forEach((item, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = startX + col * (cardW + gap);
    const y = startY + row * (cardH + gap);

    s.addShape(pres.shapes.RECTANGLE, { x, y, w: cardW, h: cardH, fill: { color: 'FEF2F2' }, line: { color: 'FECACA', pt: 0.8 } });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: cardW, h: 0.04, fill: { color: A }, line: { color: A } });
    s.addText(item.name, { x: x + 0.12, y: y + 0.12, w: cardW - 0.24, h: 0.52, fontSize: 12, bold: true, color: DT, fontFace: JA, align: 'left', valign: 'top', lineSpacingMultiple: 1.3 });
    s.addText(item.reason, { x: x + 0.12, y: y + 0.7, w: cardW - 0.24, h: 0.9, fontSize: 10, color: ST, fontFace: JA, align: 'left', valign: 'top', lineSpacingMultiple: 1.4 });
  });

  // 判断基準
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 5.05, w: 9.2, h: 0.4, fill: { color: CB }, line: { color: P, pt: 0.8 } });
  s.addText('共通する判断基準：「東京ガスの固有データがなければ成立しないか？」 — Noなら、AIか他サービスに代替される', {
    x: 0.6, y: 5.05, w: 8.8, h: 0.4, fontSize: 11, bold: true, color: P, fontFace: JA, align: 'center', valign: 'middle'
  });

  addBottomBar(s);
}

// ═══ SLIDE 8: 検討中施策の検証 ═══════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: WH };
  addHeader(s, BC);
  addSlideTitle(s, '検討中の「日常利用」施策をエージェント時代の視点で検証');

  const evals = [
    {
      title: '外出先からの\n室温管理',
      demand: '需要度: 最も高い',
      verdict: 'B',
      verdictColor: WARN,
      pros: '東京ガスのガス機器データ（稼働状態・点検履歴）と連携できれば固有価値あり',
      cons: 'メーカーアプリが既に提供。Apple Home / Google Homeへの統合も進行中。差別化なければ埋没',
    },
    {
      title: '節電ゲーミ\nフィケーション',
      demand: '需要度: 子持ち家庭に好評',
      verdict: 'C',
      verdictColor: 'F97316',
      pros: '使用量データを使えば固有価値はある',
      cons: 'ゲーム品質でSEGA等と競争が必要。子どもの成長に伴う飽きの問題。ゲーム自体は東京ガスでなくてもできる',
    },
    {
      title: '家事の\n見える化・管理',
      demand: '需要度: 社会課題として重要',
      verdict: 'D',
      verdictColor: A,
      pros: 'ユーザーニーズは確認済み',
      cons: '東京ガスの固有データとの接点がゼロ。TimeTree・Yieto等の専業アプリが既にある。ガス会社への期待と不一致',
    },
  ];

  const ew = 2.9, eh = 3.55, ey = 1.35, egap = 0.2;
  const eStartX = (10 - ew * 3 - egap * 2) / 2;

  evals.forEach((ev, i) => {
    const x = eStartX + i * (ew + egap);

    s.addShape(pres.shapes.RECTANGLE, { x, y: ey, w: ew, h: eh, fill: { color: WH }, line: { color: S, pt: 0.8 }, shadow: makeShadow() });

    // ヘッダー
    s.addText(ev.title, { x: x + 0.12, y: ey + 0.1, w: ew - 0.7, h: 0.55, fontSize: 13, bold: true, color: DT, fontFace: JA, align: 'left', valign: 'top', lineSpacingMultiple: 1.3 });

    // 判定バッジ
    s.addShape(pres.shapes.RECTANGLE, { x: x + ew - 0.55, y: ey + 0.12, w: 0.42, h: 0.42, fill: { color: ev.verdictColor }, line: { color: ev.verdictColor } });
    s.addText(ev.verdict, { x: x + ew - 0.55, y: ey + 0.12, w: 0.42, h: 0.42, fontSize: 18, bold: true, color: WH, fontFace: EN, align: 'center', valign: 'middle', margin: 0 });

    // 需要度
    s.addText(ev.demand, { x: x + 0.12, y: ey + 0.68, w: ew - 0.24, h: 0.25, fontSize: 9, color: ST, fontFace: JA, align: 'left', valign: 'middle', margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.12, y: ey + 1.0, w: ew - 0.24, h: 0.01, fill: { color: S }, line: { color: S } });

    // 良い点
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.12, y: ey + 1.15, w: ew - 0.24, h: 0.22, fill: { color: 'ECFDF5' }, line: { color: 'ECFDF5' } });
    s.addText('\u25CB 固有価値', { x: x + 0.12, y: ey + 1.15, w: ew - 0.24, h: 0.22, fontSize: 9, bold: true, color: '059669', fontFace: JA, align: 'left', valign: 'middle', margin: [0, 0, 0, 4] });
    s.addText(ev.pros, { x: x + 0.12, y: ey + 1.4, w: ew - 0.24, h: 0.65, fontSize: 10, color: DT, fontFace: JA, align: 'left', valign: 'top', lineSpacingMultiple: 1.4 });

    // リスク
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.12, y: ey + 2.15, w: ew - 0.24, h: 0.22, fill: { color: 'FEF2F2' }, line: { color: 'FEF2F2' } });
    s.addText('\u2716 リスク', { x: x + 0.12, y: ey + 2.15, w: ew - 0.24, h: 0.22, fontSize: 9, bold: true, color: A, fontFace: JA, align: 'left', valign: 'middle', margin: [0, 0, 0, 4] });
    s.addText(ev.cons, { x: x + 0.12, y: ey + 2.4, w: ew - 0.24, h: 1.0, fontSize: 10, color: DT, fontFace: JA, align: 'left', valign: 'top', lineSpacingMultiple: 1.4 });
  });

  addBottomBar(s);
}

// ═══ SLIDE 9: 示唆（まとめ） ═════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: WH };

  // 上部ブルーバンド
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.6, fill: { color: P }, line: { color: P } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 1.58, w: 10, h: 0.04, fill: { color: A }, line: { color: A } });

  s.addText('示唆：mTG戦略・EA構想への提言', { x: 0.5, y: 0.15, w: 9, h: 0.65, fontSize: 26, bold: true, color: WH, fontFace: JA, align: 'left', valign: 'middle', margin: 0 });
  s.addText('エージェント時代に「選ばれる」ポジションをどう作るか', { x: 0.5, y: 0.85, w: 9, h: 0.45, fontSize: 14, color: S, fontFace: JA, align: 'left', valign: 'middle', margin: 0 });

  const proposals = [
    {
      num: '01', color: '2563EB',
      title: '日常機能PoCの選定基準',
      body: '「東京ガスのデータがないと成立しない機能」を優先する。お客さまがアプリを開かなくてもエージェント経由で価値を届けられる機能を選ぶ。'
    },
    {
      num: '02', color: '7C3AED',
      title: '認証基盤の設計考慮',
      body: 'OAuthへの移行はエージェント対応の土台になる。基本計画の中で、エージェントへの権限委任を将来追加できるスコープ設計を検討事項に含める。追加コストはほぼゼロ。'
    },
    {
      num: '03', color: '059669',
      title: 'KPIの補助指標',
      body: 'MAUに加え、「データ提供同意率」「既存顧客売上維持率（NRR）」を補助指標として追加検討する。エージェント経由のお客さまを含めた接点の質を測るため。'
    },
  ];

  proposals.forEach((pr, i) => {
    const x = 0.4 + i * 3.15;
    const pw = 2.95, ph = 2.8, py = 1.85;
    s.addShape(pres.shapes.RECTANGLE, { x, y: py, w: pw, h: ph, fill: { color: CB }, line: { color: S, pt: 0.5 }, shadow: makeShadow() });

    s.addShape(pres.shapes.OVAL, { x: x + 0.15, y: py + 0.15, w: 0.5, h: 0.5, fill: { color: pr.color }, line: { color: pr.color } });
    s.addText(pr.num, { x: x + 0.15, y: py + 0.15, w: 0.5, h: 0.5, fontSize: 15, bold: true, color: WH, fontFace: EN, align: 'center', valign: 'middle', margin: 0 });

    s.addText(pr.title, { x: x + 0.12, y: py + 0.78, w: pw - 0.24, h: 0.35, fontSize: 13, bold: true, color: pr.color, fontFace: JA, align: 'left', valign: 'middle', margin: 0 });
    s.addText(pr.body, { x: x + 0.12, y: py + 1.2, w: pw - 0.24, h: 1.45, fontSize: 11, color: DT, fontFace: JA, align: 'left', valign: 'top', lineSpacingMultiple: 1.5 });
  });

  // ボトムCTA
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 4.9, w: 9.2, h: 0.5, fill: { color: 'FEF3C7' }, line: { color: WARN, pt: 0.8 } });
  s.addText('詳細は補足資料を参照。短期的に「今の施策」を否定するものではなく、中長期の設計判断に組み込むべき視点。', {
    x: 0.6, y: 4.9, w: 8.8, h: 0.5, fontSize: 11, bold: true, color: '92400E', fontFace: JA, align: 'center', valign: 'middle'
  });

  addBottomBar(s);
}

// ─── 出力 ────────────────────────────────────────────────────
pres.writeFile({ fileName: 'outputs/pptx/agent_era_customer_behavior.pptx' }).then(() => {
  console.log('Done: outputs/pptx/agent_era_customer_behavior.pptx');
});
