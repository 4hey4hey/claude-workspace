const PptxGenJS = require('pptxgenjs');
const { getTheme, getPreset, parts, getFontSize, getFontPreset, calcLayout } = require('./lib');

const theme = getTheme('cool'); // テック・DXテーマ
const font = getFontPreset('corporate');
const pres = new PptxGenJS();
pres.title = 'AIエージェント時代の環境変化と東京ガスへの影響';

// ============================================================
// Slide 1: 表紙
// ============================================================
const s1 = pres.addSlide();
s1.background = { color: theme.WH };
parts.addCoverTitle(s1, pres, theme, {
  title: 'AIエージェント時代の環境変化\nと東京ガスへの影響',
  subtitle: '主要プレイヤー動向・顧客行動変化・構造的リスクと対応方針',
  date: '2026.03.30',
  author: 'デジタル推進部',
  font,
});

// 表紙下部に3つのキーポイントカード
const coverLayout = getPreset('cover');
const ckw = 2.7, ckgap = 0.25;
const ckStartX = (10 - ckw * 3 - ckgap * 2) / 2;
const ckY = coverLayout.topBand.h + 0.7;
const keypoints = [
  { num: 1, title: '全主要プレイヤーが\nエージェント投入済', color: theme.ACCENTS[0] },
  { num: 2, title: '顧客行動は3段階で\n不可逆に変わる', color: theme.ACCENTS[1] },
  { num: 3, title: 'API非対応は\n「選ばれない」リスク', color: theme.ACCENTS[2] },
];
keypoints.forEach((kp, i) => {
  const kx = ckStartX + i * (ckw + ckgap);
  parts.addCard(s1, pres, theme, {
    x: kx, y: ckY, w: ckw, h: 1.3,
    accentColor: kp.color,
    title: kp.title,
    font,
  });
  parts.addNumberBadge(s1, pres, theme, { x: kx + 0.08, y: ckY + 0.5, num: kp.num, color: kp.color });
});
parts.addBottomBar(s1, pres, theme);

// ============================================================
// Slide 2: 主要プレイヤー動向テーブル
// ============================================================
const s2 = pres.addSlide();
s2.background = { color: theme.WH };
parts.addBottomBar(s2, pres, theme);
parts.addHeader(s2, pres, theme, { breadcrumb: '環境変化 / AIブラウザエージェントの一斉投入', font });
parts.addSlideTitle(s2, pres, theme, { title: '2026年3月時点で全主要プレイヤーがブラウザエージェントを一般提供している', font });

const layout2 = getPreset('standard');
parts.addStyledTable(s2, pres, theme, {
  x: layout2.content.x,
  y: layout2.content.y + 0.1,
  w: layout2.content.w,
  headers: ['プレイヤー', 'サービス名', '現在のステータス'],
  rows: [
    ['Anthropic', 'Claude in Chrome', '全有料プランにベータ提供（2025年12月〜）'],
    ['OpenAI', 'ChatGPT Agent', 'Atlas（専用ブラウザ）公開（2025年10月〜）'],
    ['Google', 'Gemini auto-browse', '自律ブラウジングプレビュー公開（2026年1月〜）'],
    ['Microsoft', 'Copilot Tasks', 'クラウド型自律エージェント プレビュー（2026年2月〜）'],
    ['Apple', 'Siri 次世代版', 'WWDC26で発表予定（2026年6月）、iOS 27搭載見込み'],
  ],
  colW: [1.5, 2.2, 5.5],
  font,
});

// ============================================================
// Slide 3: 普及タイムライン
// ============================================================
const s3 = pres.addSlide();
s3.background = { color: theme.WH };
parts.addBottomBar(s3, pres, theme);
parts.addHeader(s3, pres, theme, { breadcrumb: '環境変化 / 普及タイムライン', font });
parts.addSlideTitle(s3, pres, theme, { title: '2026年後半からスマホOS標準搭載で「意識せず使う」層が急拡大する', font });

const layout3 = getPreset('standard');
parts.addTimeline(s3, pres, theme, {
  x: layout3.content.x,
  y: layout3.content.y + 0.3,
  w: layout3.content.w,
  h: layout3.content.h * 0.55,
  events: [
    { date: '2026 H1', title: '現在地', body: 'PC/ブラウザベース\n有料プランで利用可能\n技術関心層が利用中' },
    { date: '2026 H2', title: 'スマホ搭載開始', body: 'Apple Siri/Google Gemini\nOS標準搭載\n「意識せず使う」層が拡大' },
    { date: '2027', title: '一般層に浸透', body: '操作代行が日常化\n認証基盤の整備が鍵' },
    { date: '2028〜', title: 'エージェント経済', body: 'エージェント間取引\n自律購買が本格化\n（Gartner予測）' },
  ],
  font,
});

// 下部に補足ボックス
parts.addAlertBox(s3, pres, theme, {
  x: layout3.content.x,
  y: layout3.content.y + layout3.content.h * 0.7,
  w: layout3.content.w,
  h: 0.65,
  type: 'warn',
  text: 'Gartner予測: 2028年までにB2B購買の90%がAIエージェントで仲介、15兆ドル超がAIエージェント経由で処理される。B2Cでも同構造の変化が起きる。',
  font,
});

// ============================================================
// Slide 4: 顧客行動変化の3段階モデル（縦フロー）
// ============================================================
const s4 = pres.addSlide();
s4.background = { color: theme.WH };
parts.addBottomBar(s4, pres, theme);
parts.addHeader(s4, pres, theme, { breadcrumb: '顧客行動変化 / 3段階モデル', font });
parts.addSlideTitle(s4, pres, theme, { title: 'お客さまの行動は「聞く→任せる→委ねる」の3段階で不可逆に変わる', font });

// サイドバーレイアウト: 左にフロー、右に影響
const layout4 = calcLayout({ columns: 1, hasSidebar: true, sidebarRatio: 0.42 });

parts.addFlowVertical(s4, pres, theme, {
  x: layout4.content.x,
  y: layout4.content.y,
  w: layout4.content.w,
  h: layout4.content.h,
  steps: [
    { title: '第1段階: AIに聞く', body: '情報検索の代理\n既に発生中' },
    { title: '第2段階: AIに任せる', body: '単純操作の代理\n2〜3年以内' },
    { title: '第3段階: AIに委ねる', body: '意思決定の代理\n5年以内（若年層）' },
  ],
  font,
});

// サイドバー側に影響カード
const sb = layout4.sidebar;
const impactH = (sb.h - 0.2) / 3;
const impacts = [
  { title: 'FAQ・料金ページへのアクセスが構造的に減少', color: theme.ACCENTS[0] },
  { title: 'ファネルの入口が細くなり手続き画面遷移が減少', color: theme.ACCENTS[1] },
  { title: '「選ぶ」から「AIに選ばれる」立場に逆転', color: theme.ACCENTS[2] },
];
impacts.forEach((imp, i) => {
  parts.addCard(s4, pres, theme, {
    x: sb.x, y: sb.y + i * (impactH + 0.1), w: sb.w, h: impactH,
    accentColor: imp.color,
    title: imp.title,
    font,
  });
});

// ============================================================
// Slide 5: 定量データ — KPIメトリクス
// ============================================================
const s5 = pres.addSlide();
s5.background = { color: theme.WH };
parts.addBottomBar(s5, pres, theme);
parts.addHeader(s5, pres, theme, { breadcrumb: '定量データ / 既に起きているトラフィック構造変化', font });
parts.addSlideTitle(s5, pres, theme, { title: 'AI Overview表示でオーガニックCTRが61%減少、公益事業は最も影響が大きい', font });

const layout5 = getPreset('fourColumn');
const kpis = [
  { number: '61', unit: '%減', label: 'AI Overview表示時の\nオーガニックCTR低下', source: 'Seer Interactive 2025', accentColor: theme.ACCENTS[0] },
  { number: '25.4', unit: '%', label: '公益事業の\nAI Overview表示率\n（全業界最高水準）', source: 'BrightEdge 2025', accentColor: theme.ACCENTS[1] },
  { number: '0.35', unit: '%', label: '公益事業の\nAI経由直接流入\n（全業界最低水準）', source: 'BrightEdge 2025', accentColor: theme.ACCENTS[2] },
  { number: '25', unit: '%減', label: '検索エンジン経由\nトラフィック減少予測', source: 'Gartner 2026年末', accentColor: theme.ACCENTS[3] },
];
layout5.columns.forEach((col, i) => {
  parts.addMetricCard(s5, pres, theme, {
    x: col.x, y: col.y, w: col.w, h: col.h,
    ...kpis[i],
    columns: 4,
    font,
  });
});

// ============================================================
// Slide 6: 東京ガスの構造的ポジション（2x2マトリクス）
// ============================================================
const s6 = pres.addSlide();
s6.background = { color: theme.WH };
parts.addBottomBar(s6, pres, theme);
parts.addHeader(s6, pres, theme, { breadcrumb: '東京ガスのポジション / 強みとリスク', font });
parts.addSlideTitle(s6, pres, theme, { title: '東京ガスは固有データを持つが、API化されていないことが最大のリスク', font });

const layout6 = getPreset('standard');
parts.addMatrix2x2(s6, pres, theme, {
  x: layout6.content.x,
  y: layout6.content.y,
  w: layout6.content.w,
  h: layout6.content.h,
  xAxisLabel: 'API化の進捗 →',
  yAxisLabel: '← データの固有性',
  quadrants: [
    { title: '現在の東京ガス', body: '固有データは豊富だがAPI未整備\nエージェントからアクセス不能\n→ 早急にAPI基盤を構築すべき' },
    { title: '目指すべき姿', body: '固有データ × API整備\nエージェントが「選ぶ」理由を提供\n→ 構造的な競争優位' },
    { title: '一般的なWeb企業', body: '固有データなし・API未整備\nエージェント時代に淘汰リスク' },
    { title: '大手プラットフォーマー', body: 'APIは整備済だが\nエネルギー固有データなし\n→ 東京ガスと補完関係' },
  ],
  font,
});

// ============================================================
// Slide 7: 「毎日使いたくなるアプリ」戦略の前提崩壊（Before/After）
// ============================================================
const s7 = pres.addSlide();
s7.background = { color: theme.WH };
parts.addBottomBar(s7, pres, theme);
parts.addHeader(s7, pres, theme, { breadcrumb: '戦略の前提変化 / アプリ戦略の再考', font });
parts.addSlideTitle(s7, pres, theme, { title: '「毎日使いたくなるアプリ」戦略の4つの前提がエージェント時代に崩れる', font });

const layout7 = getPreset('comparison');
parts.addComparisonColumns(s7, pres, theme, {
  x: layout7.content.x,
  y: layout7.content.y,
  w: layout7.content.w,
  h: layout7.content.h,
  before: {
    title: '現在の前提',
    items: [
      'お客さまがアプリを開いて情報を見る',
      '機能追加でMAUが上がる',
      '画面上のCTAでクロスセル導線を踏ませる',
      'MAUが顧客接点の質を測る指標',
    ],
  },
  after: {
    title: 'エージェント時代の現実',
    items: [
      'AIに聞けば画面を見なくて済む',
      'ガス・電気に毎日確認の必然性がない',
      'エージェントはバナーやCTAを見ない',
      'エージェント経由の接点はMAU外',
    ],
  },
  font,
});

// ============================================================
// Slide 8: 効果が逓減する施策パターン（テーブル）
// ============================================================
const s8 = pres.addSlide();
s8.background = { color: theme.WH };
parts.addBottomBar(s8, pres, theme);
parts.addHeader(s8, pres, theme, { breadcrumb: '施策評価 / 効果逓減パターン', font });
parts.addSlideTitle(s8, pres, theme, { title: '以下の施策パターンはエージェント時代に構造的に投資対効果が悪化する', font });

const layout8 = getPreset('standard');
parts.addStyledTable(s8, pres, theme, {
  x: layout8.content.x,
  y: layout8.content.y + 0.05,
  w: layout8.content.w,
  headers: ['パターン', '代表例', '逓減の理由'],
  rows: [
    ['開かせるためのギミック', 'ポイント・ガチャ・スタンプラリー', '画面を開かせる意味がなくなる'],
    ['汎用コンテンツ', 'レシピ・暮らしコラム', 'AI検索に吸われる（CTR 61%減）'],
    ['未パーソナライズ情報', '天気連動の省エネTips', 'AIの方が個人最適化が上手い'],
    ['大規模経済圏との消耗戦', 'クーポン・ECモール連携', 'd/楽天/PayPayと還元率で競争不能'],
    ['強い代替がある領域', '家計簿、天気予報、防災', 'マネフォ・Yahoo!が圧倒的に強い'],
  ],
  colW: [2.2, 2.8, 4.2],
  font,
});

// ============================================================
// Slide 9: エージェント時代に耐える施策の要件（ステッププロセス）
// ============================================================
const s9 = pres.addSlide();
s9.background = { color: theme.WH };
parts.addBottomBar(s9, pres, theme);
parts.addHeader(s9, pres, theme, { breadcrumb: '施策評価 / エージェント耐性の要件', font });
parts.addSlideTitle(s9, pres, theme, { title: 'エージェント時代に耐える施策は3つの要件を満たす必要がある', font });

const layout9 = getPreset('standard');
parts.addStepProcess(s9, pres, theme, {
  x: layout9.content.x,
  y: layout9.content.y,
  w: layout9.content.w,
  h: layout9.content.h * 0.45,
  steps: [
    { title: '固有データが中核', body: '他社が真似できないデータ\n（エネルギー消費・機器稼働・\n点検情報）が中核にあること' },
    { title: 'チャネル・KPI非依存', body: 'アプリ画面に閉じず\nAPI経由でエージェントにも\n提供できる設計であること' },
    { title: '競争のモートを構築', body: 'エージェントが比較購買する\n世界で「東京ガスが選ばれる」\n理由を作ること' },
  ],
  font,
});

// 下部に補助指標の提言カード
const cardY = layout9.content.y + layout9.content.h * 0.52;
const cardH = layout9.content.h * 0.45;
const cw9 = (layout9.content.w - 0.4) / 3;
const supplementKPIs = [
  { title: 'データ提供同意率', body: 'お客さまがAIエージェント等へのデータ提供に同意した割合', color: theme.ACCENTS[0] },
  { title: '既存顧客売上維持率\n（NRR）', body: 'エージェント経由のSW・アップセルも含めた収益指標', color: theme.ACCENTS[1] },
  { title: 'チャネル問わず転換率', body: '画面ファネルが細くなっても全体効果を見失わない指標', color: theme.ACCENTS[2] },
];
supplementKPIs.forEach((kpi, i) => {
  parts.addCard(s9, pres, theme, {
    x: layout9.content.x + i * (cw9 + 0.2),
    y: cardY,
    w: cw9,
    h: cardH,
    accentColor: kpi.color,
    title: kpi.title,
    body: kpi.body,
    font,
  });
});

// ============================================================
// Slide 10: まとめ — ネクストアクション
// ============================================================
const s10 = pres.addSlide();
s10.background = { color: theme.WH };

// 上部バンド
const sumLayout = getPreset('summary');
s10.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: sumLayout.topBand.h,
  fill: { color: theme.P },
});
s10.addText('ネクストアクション', {
  x: 0.6, y: 0.2, w: 8.8, h: 0.5,
  fontSize: 24, bold: true, color: theme.TP, fontFace: font.jp,
  align: 'left', valign: 'middle',
});
s10.addText('エージェント時代に「選ばれる」東京ガスを実現するために', {
  x: 0.6, y: 0.75, w: 8.8, h: 0.4,
  fontSize: 14, color: theme.S, fontFace: font.jp,
  align: 'left', valign: 'middle',
});

// レッドアクセントライン
s10.addShape(pres.shapes.RECTANGLE, {
  x: 0.6, y: sumLayout.topBand.h + 0.12, w: 1.2, h: 0.04,
  fill: { color: theme.A },
});

// 3つのアクションカード
const actions = [
  { num: 1, title: 'API基盤の構築', body: '固有データ（エネルギー消費・機器稼働）をAPI経由で提供可能にする。まずmTGのデータ参照APIから着手', color: theme.ACCENTS[0] },
  { num: 2, title: 'KPI体系の見直し', body: 'MAU/DAUに加え、データ提供同意率・NRR・チャネル問わず転換率を補助指標として導入', color: theme.ACCENTS[1] },
  { num: 3, title: '認証基盤のスコープ拡張', body: 'Auth0刷新の中で、エージェントへの権限委任を将来追加できるスコープ設計を検討事項に含める', color: theme.ACCENTS[2] },
];

const acW = 2.85, acGap = 0.22;
const acStartX = (10 - acW * 3 - acGap * 2) / 2;
const acY = sumLayout.topBand.h + 0.35;

actions.forEach((act, i) => {
  const ax = acStartX + i * (acW + acGap);
  parts.addNumberBadge(s10, pres, theme, { x: ax + acW / 2 - 0.16, y: acY, num: act.num, color: act.color });
  parts.addCard(s10, pres, theme, {
    x: ax, y: acY + 0.4, w: acW, h: 2.1,
    accentColor: act.color,
    title: act.title,
    body: act.body,
    font,
  });
});

// 下部アラートボックス
parts.addAlertBox(s10, pres, theme, {
  x: 0.4, y: 4.8, w: 9.2, h: 0.55,
  type: 'warn',
  text: '重要: API基盤は新規投資ではなく、現在進行中のKraken連携・認証基盤刷新の設計思想に「エージェント対応」を組み込むことで追加コストを最小化できる',
  font,
});

parts.addBottomBar(s10, pres, theme);

// ============================================================
// 出力
// ============================================================
pres.writeFile({ fileName: 'outputs/pptx/agent_era_landscape.pptx' })
  .then(() => console.log('Generated: outputs/pptx/agent_era_landscape.pptx (10 slides)'))
  .catch(err => console.error('Error:', err));
