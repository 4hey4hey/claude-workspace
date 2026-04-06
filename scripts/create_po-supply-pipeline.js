"use strict";
// ============================================================
// PO供給パイプライン設計 — GM承認事項②
// 設計テンプレ: outputs/docs/2026-04-05_po-supply-pipeline_設計テンプレ.md
// ============================================================

const PptxGenJS = require("pptxgenjs");
const { getTheme, parts, getFontPreset } = require("./lib");

const pres = new PptxGenJS();
pres.title = "PO供給パイプラインの設計";

const theme = getTheme("corporate");
const font = getFontPreset("corporate");

const CONTENT_Y = 1.28; // タイトルセパレータ直下
const CONTENT_H = 4.15; // y+h = 5.43 ≤ 5.45
const BREADCRUMB = "FY26 体制づくり > PO供給パイプライン";

// ─── ユーティリティ ─────────────────────────────────────────

function newSlide() {
  const s = pres.addSlide();
  s.background = { color: "FFFFFF" };
  return s;
}

function addBase(slide, breadcrumb, title) {
  parts.addBottomBar(slide, pres, theme);
  parts.addHeader(slide, pres, theme, { breadcrumb, font });
  parts.addSlideTitle(slide, pres, theme, { title, font });
}

// ─── 表紙 ───────────────────────────────────────────────────

{
  const slide = newSlide();
  parts.addBottomBar(slide, pres, theme);
  parts.addCoverTitle(slide, pres, theme, {
    title: "PO供給パイプラインの設計",
    subtitle: "FY26のPO体制整備方針 — GM承認事項②（PO配置）",
    date: "2026-04-05",
    author: "DPG デリバリーマネジメントチーム",
    font,
  });
}

// ─── No.1: 承認事項（結論先出し）────────────────────────────

{
  const slide = newSlide();
  addBase(slide, BREADCRUMB, "承認事項: PO配置方針の2点について判断を依頼する");

  // リード文
  slide.addText("本日、以下2点のご承認をお願いします。", {
    x: 0.4,
    y: CONTENT_Y,
    w: 9.2,
    h: 0.3,
    fontSize: 13,
    color: theme.ST,
    fontFace: font.jp,
    align: "left",
    valign: "middle",
    margin: 0,
  });

  // 承認カード①
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4,
    y: 1.68,
    w: 9.2,
    h: 1.3,
    fill: { color: theme.CB },
    rectRadius: 0.03,
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.4,
    y: 1.68,
    w: 0.07,
    h: 1.3,
    fill: { color: theme.ACCENTS[0] },
  });
  slide.addText("① 森さん（Discovery PO）の兼務継続", {
    x: 0.6,
    y: 1.76,
    w: 8.8,
    h: 0.35,
    fontSize: 16,
    bold: true,
    color: theme.ACCENTS[0],
    fontFace: font.jp,
    align: "left",
    valign: "middle",
    margin: 0,
  });
  slide.addText(
    "Discoveryチームは引き続き森さんが兼務PO。Ready定義導入・手戻り分類運用をDiscoveryで実践し、FY26中の専任PO立ち上げ準備を進める。",
    {
      x: 0.6,
      y: 2.16,
      w: 8.8,
      h: 0.7,
      fontSize: 12,
      color: theme.DT,
      fontFace: font.jp,
      align: "left",
      valign: "top",
      margin: 0,
      lineSpacingMultiple: 1.5,
    },
  );

  // 承認カード②
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4,
    y: 3.1,
    w: 9.2,
    h: 1.3,
    fill: { color: theme.CB },
    rectRadius: 0.03,
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.4,
    y: 3.1,
    w: 0.07,
    h: 1.3,
    fill: { color: theme.ACCENTS[2] },
  });
  slide.addText("② 室山さんを Guardians PO候補として正式にアサインする", {
    x: 0.6,
    y: 3.18,
    w: 8.8,
    h: 0.35,
    fontSize: 16,
    bold: true,
    color: theme.ACCENTS[2],
    fontFace: font.jp,
    align: "left",
    valign: "middle",
    margin: 0,
  });
  slide.addText(
    "Kraken業務を継続しながら、Q1よりGuardians PO基礎学習を開始。Q2でOJT、Q3〜Q4で実践範囲拡大。FY27にPO本格移行。",
    {
      x: 0.6,
      y: 3.58,
      w: 8.8,
      h: 0.7,
      fontSize: 12,
      color: theme.DT,
      fontFace: font.jp,
      align: "left",
      valign: "top",
      margin: 0,
      lineSpacingMultiple: 1.5,
    },
  );

  // 補足
  slide.addText("以降のスライドで、判断の根拠と育成計画の詳細を説明します。", {
    x: 0.4,
    y: 4.55,
    w: 9.2,
    h: 0.3,
    fontSize: 11,
    color: theme.ST,
    fontFace: font.jp,
    align: "right",
    valign: "middle",
    margin: 0,
    italic: true,
  });
}

// ─── No.2: 4チームの現状（テーブル）────────────────────────

{
  const slide = newSlide();
  addBase(
    slide,
    BREADCRUMB,
    "4チームあるのに、今施策を打ち切れるのはNaikistの1チームだけ",
  );

  // だから何？バナー
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4,
    y: CONTENT_Y,
    w: 9.2,
    h: 0.38,
    fill: { color: theme.ERROR_BG },
    rectRadius: 0.02,
    line: { color: theme.ERROR_BD, width: 1 },
  });
  slide.addText(
    "→ 4チーム体制が名目上だけで、実質1ラインしか機能していない。これがPO不在の現実。",
    {
      x: 0.55,
      y: CONTENT_Y,
      w: 9.0,
      h: 0.38,
      fontSize: 12,
      color: theme.ERROR_TX,
      fontFace: font.jp,
      align: "left",
      valign: "middle",
      margin: 0,
      bold: true,
    },
  );

  parts.addStyledTable(slide, pres, theme, {
    x: 0.4,
    y: 1.78,
    w: 9.2,
    headers: ["チーム", "領域", "SM", "PO", "状態"],
    colW: [2.0, 1.4, 1.8, 2.0, 2.0],
    rowH: 0.64,
    fontSize: 12,
    font,
    rows: [
      [
        "Naikist",
        "Web",
        "堤さん（SM補佐）",
        "福田さん",
        "✅ 安定 — 基準チーム",
      ],
      [
        "Fluppuccino",
        "モバイル",
        "中道さん",
        "伊藤さん（候補）",
        "⚠ サイクルタイム未安定",
      ],
      ["Discovery", "新規", "長島さん", "森さん（兼務）", "⚠ CT未安定"],
      [
        "Guardians",
        "MS/基盤",
        "長島さん",
        "迫田さん（暫定）",
        "⚠ 不安定 — PO検討中",
      ],
    ],
  });

  slide.addText(
    "※ エンジニアはのれん分け方式で供給設計あり。SMも外部支援で整備中。POだけ供給の仕組みがない。",
    {
      x: 0.4,
      y: 5.1,
      w: 9.2,
      h: 0.28,
      fontSize: 10,
      color: theme.ST,
      fontFace: font.jp,
      align: "left",
      valign: "middle",
      margin: 0,
    },
  );
}

// ─── No.3: POがいないと何が起きるか ──────────────────────

{
  const slide = newSlide();
  addBase(
    slide,
    BREADCRUMB,
    "POがいない状態では、エンジニアを増やしても成果は出ない",
  );

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4,
    y: CONTENT_Y,
    w: 9.2,
    h: 0.38,
    fill: { color: theme.WARN_BG },
    rectRadius: 0.02,
    line: { color: theme.WARN_BD, width: 1 },
  });
  slide.addText(
    "→ 人を増やす前にPO機能を整備しないと、打席を増やすほど浪費が増える。",
    {
      x: 0.55,
      y: CONTENT_Y,
      w: 9.0,
      h: 0.38,
      fontSize: 12,
      color: theme.WARN_TX,
      fontFace: font.jp,
      align: "left",
      valign: "middle",
      margin: 0,
      bold: true,
    },
  );

  parts.addStyledTable(slide, pres, theme, {
    x: 0.4,
    y: 1.78,
    w: 9.2,
    headers: ["POがいない状態で起きること", "実際の結果"],
    colW: [4.8, 4.4],
    rowH: 0.58,
    fontSize: 12,
    font,
    rows: [
      [
        "大きい要件を分割せずにそのまま着手",
        "途中で「やっぱりこう」が発生し、手戻りで1〜3週間のロス",
      ],
      [
        "不確実なまま全部作ってからリリース",
        "リリース直前に想定外が見つかり、大幅な手戻り",
      ],
      [
        "「ついでにこれも」でスコープが膨張",
        "予定通りに終わらない＝遅く見える",
      ],
      [
        "前提が揃っていない案件にも打席を使う",
        "方向違いの実装を作ってしまうムダな開発",
      ],
      [
        "PO判断・ステークホルダー確認待ちが発生",
        "エンジニアは手が空いているのに進まない",
      ],
    ],
  });
}

// ─── No.4: Kraken事例（タイムライン）───────────────────────

{
  const slide = newSlide();
  addBase(
    slide,
    BREADCRUMB,
    "Krakenで同じことが起きた。大きいまま着手し、15億円・5ヶ月の遅延になった",
  );

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4,
    y: CONTENT_Y,
    w: 9.2,
    h: 0.38,
    fill: { color: theme.ERROR_BG },
    rectRadius: 0.02,
    line: { color: theme.ERROR_BD, width: 1 },
  });
  slide.addText(
    "→ これはKrakenだけの話ではない。POなしで大型開発すれば、どこでも同じパターンが起きる。",
    {
      x: 0.55,
      y: CONTENT_Y,
      w: 9.0,
      h: 0.38,
      fontSize: 12,
      color: theme.ERROR_TX,
      fontFace: font.jp,
      align: "left",
      valign: "middle",
      margin: 0,
      bold: true,
    },
  );

  parts.addTimeline(slide, pres, theme, {
    x: 0.4,
    y: 1.78,
    w: 9.2,
    h: 3.2,
    font,
    events: [
      {
        date: "事象①",
        title: "大きいまま着手\n→仕様変更噴出",
        body: "新規受付機能でリリース直前にオペ確認。仕様変更・追加が噴出。「初期要件定義の決定の仕方に課題」（FY25 Q2ステコミ）",
      },
      {
        date: "事象②",
        title: "「やらない」を\n決められず膨張",
        body: "TG固有カスタマイズが多発。標準機能で小さくリリースし、必要なもののみ追加するPO判断が機能しなかった",
      },
      {
        date: "事象③",
        title: "5ヶ月遅延\n14.9億円の影響",
        body: "7月予定→12月完了（5ヶ月遅延）。設備6.1億円＋諸経費8.8億円。学習ループがなく同パターンが繰り返された",
      },
    ],
  });
}

// ─── No.5: POとは何か（Matrix2x2）──────────────────────────

{
  const slide = newSlide();
  addBase(
    slide,
    BREADCRUMB,
    "POとは「小さく分割・不確実性管理・やらない判断」で投資ROIを最大化する人",
  );

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4,
    y: CONTENT_Y,
    w: 9.2,
    h: 0.38,
    fill: { color: theme.INFO_BG },
    rectRadius: 0.02,
    line: { color: theme.INFO_BD, width: 1 },
  });
  slide.addText(
    "→ POの価値はコードを書くことではなく「投資の損失を防ぐこと」。求められるのは事業×エンジニアリングの接続力。",
    {
      x: 0.55,
      y: CONTENT_Y,
      w: 9.0,
      h: 0.38,
      fontSize: 12,
      color: theme.INFO_TX,
      fontFace: font.jp,
      align: "left",
      valign: "middle",
      margin: 0,
      bold: true,
    },
  );

  // ─── Manual 2×2 Matrix（Y軸横書き）─────────────────────────
  const CSX = 1.15; // グリッド開始X（Y軸ラベル列の右端）
  const CSY = 2.14; // グリッド開始Y（X軸ラベル行の下端）
  const CW4 = 4.1;  // カード幅
  const CH4 = 1.57; // カード高さ
  const CGAP = 0.15; // カード間ギャップ

  // X軸ラベル（横書き）
  slide.addText("← 管理系（自律的に行う）", {
    x: CSX,
    y: 1.78,
    w: CW4,
    h: CSY - 1.78,
    fontSize: 10,
    color: theme.ST,
    fontFace: font.jp,
    align: "center",
    valign: "middle",
    margin: 0,
  });
  slide.addText("協力系（他者と共に行う）→", {
    x: CSX + CW4 + CGAP,
    y: 1.78,
    w: CW4,
    h: CSY - 1.78,
    fontSize: 10,
    color: theme.ST,
    fontFace: font.jp,
    align: "center",
    valign: "middle",
    margin: 0,
  });

  // Y軸ラベル（横書き・回転なし）
  slide.addText("プロダクト\n軸", {
    x: 0.4,
    y: CSY,
    w: CSX - 0.4,
    h: CH4,
    fontSize: 10,
    color: theme.ST,
    fontFace: font.jp,
    align: "center",
    valign: "middle",
    margin: 0,
  });
  slide.addText("事業軸", {
    x: 0.4,
    y: CSY + CH4 + CGAP,
    w: CSX - 0.4,
    h: CH4,
    fontSize: 10,
    color: theme.ST,
    fontFace: font.jp,
    align: "center",
    valign: "middle",
    margin: 0,
  });

  // グリッド区切り線
  slide.addShape(pres.shapes.RECTANGLE, {
    x: CSX - 0.01,
    y: CSY,
    w: 0.01,
    h: 2 * CH4 + CGAP,
    fill: { color: theme.S },
    line: { color: theme.S },
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: CSX,
    y: CSY + CH4 + CGAP / 2 - 0.005,
    w: 2 * CW4 + CGAP,
    h: 0.01,
    fill: { color: theme.S },
    line: { color: theme.S },
  });

  // 4象限カード
  [
    { col: 0, row: 0, title: "バックログ管理", body: "PBI分割・優先順位づけ・受入条件の定義\n「1〜2週間で完了可能なサイズに切る」", accent: theme.ACCENTS[0] },
    { col: 1, row: 0, title: "チームとの協力", body: "方向性の共有・チームの自律支援\n「なぜこれを作るかを全員が分かる状態を作る」", accent: theme.ACCENTS[1] },
    { col: 0, row: 1, title: "経済性の管理", body: "ROI最大化・やらない判断\n「今ではない、と根拠付きで断れる人」", accent: theme.ACCENTS[2] },
    { col: 1, row: 1, title: "ステークホルダー協力", body: "情報取得・フィードバック活用\n「事業側の言語を開発チームに翻訳する」", accent: theme.ACCENTS[3] },
  ].forEach(({ col, row, title, body, accent }) => {
    const cx = CSX + col * (CW4 + CGAP);
    const cy = CSY + row * (CH4 + CGAP);
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: cy, w: CW4, h: CH4,
      fill: { color: theme.CB }, rectRadius: 0.03, line: { color: theme.S, width: 1 },
    });
    slide.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy + 0.12, w: 0.04, h: CH4 - 0.24,
      fill: { color: accent }, line: { color: accent },
    });
    slide.addText(title, {
      x: cx + 0.12, y: cy + 0.12, w: CW4 - 0.2, h: 0.32,
      fontSize: 12, bold: true, color: theme.P, fontFace: font.jp,
      align: "left", valign: "middle", margin: 0,
    });
    slide.addText(body, {
      x: cx + 0.12, y: cy + 0.48, w: CW4 - 0.2, h: CH4 - 0.62,
      fontSize: 10.5, color: theme.DT, fontFace: font.jp,
      align: "left", valign: "top", margin: 0,
    });
  });
}

// ─── No.6: 4チームのPO現在地（ComparisonColumns）──────────

{
  const slide = newSlide();
  addBase(
    slide,
    BREADCRUMB,
    "4チームのPO現在地：POが機能しているのはNaikistだけ",
  );

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4,
    y: CONTENT_Y,
    w: 9.2,
    h: 0.38,
    fill: { color: theme.ERROR_BG },
    rectRadius: 0.02,
    line: { color: theme.ERROR_BD, width: 1 },
  });
  slide.addText(
    "→ NaikistとそれいがいのPO機能差が、体制上の最大リスク。差は技術力ではなくPO機能の有無。",
    {
      x: 0.55,
      y: CONTENT_Y,
      w: 9.0,
      h: 0.38,
      fontSize: 12,
      color: theme.ERROR_TX,
      fontFace: font.jp,
      align: "left",
      valign: "middle",
      margin: 0,
      bold: true,
    },
  );

  parts.addComparisonColumns(slide, pres, theme, {
    x: 0.4,
    y: 1.78,
    w: 9.2,
    h: 3.55,
    font,
    before: {
      title: "他3チーム（現状）",
      items: [
        "PO: 候補・兼務・暫定のいずれか",
        "PBIの粒度: 大きいまま着手することがある",
        "判断速度: 判断待ちでチームが止まる",
        "検証サイクル: 不確実なまま長期間走り続ける",
        "サイクルタイム: 未安定",
      ],
    },
    after: {
      title: "Naikist（基準チーム）",
      items: [
        "PO: 福田さん（機能している）",
        "PBIの粒度: 1〜2週間で完了可能なサイズに分割",
        "判断速度: 優先順位・スコープ判断が速い",
        "検証サイクル: スプリントごとに検証と学習が回る",
        "サイクルタイム: 1〜2週間で安定",
      ],
    },
  });
}

// ─── No.7: PO育成パイプライン（StepProcess）────────────────

{
  const slide = newSlide();
  addBase(slide, BREADCRUMB, "福田さんを基準に、PO育成パイプラインを走らせる");

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4,
    y: CONTENT_Y,
    w: 9.2,
    h: 0.38,
    fill: { color: theme.INFO_BG },
    rectRadius: 0.02,
    line: { color: theme.INFO_BD, width: 1 },
  });
  slide.addText(
    "→ 外部採用ではなく社内育成優先。文化フィットと立ち上がり速度を両立する。",
    {
      x: 0.55,
      y: CONTENT_Y,
      w: 9.0,
      h: 0.38,
      fontSize: 12,
      color: theme.INFO_TX,
      fontFace: font.jp,
      align: "left",
      valign: "middle",
      margin: 0,
      bold: true,
    },
  );

  // 調達方針（StepProcess: 3段階）
  parts.addStepProcess(slide, pres, theme, {
    x: 0.4,
    y: 1.78,
    w: 9.2,
    h: 1.4,
    font,
    steps: [
      {
        title: "社内育成（最優先）",
        body: "既存メンバーからPO候補を選定。福田さんを基準に段階的に育成",
      },
      {
        title: "inet活用（中期）",
        body: "inet社員の中でビジネス寄り人材をPO候補として受け入れ",
      },
      {
        title: "外部採用（最終手段）",
        body: "PO経験者を採用。オンボーディングに3〜6ヶ月かかるリスクあり",
      },
    ],
  });

  // パイプライン全体像
  slide.addText("FY26 PO育成パイプライン", {
    x: 0.4,
    y: 3.38,
    w: 9.2,
    h: 0.3,
    fontSize: 13,
    bold: true,
    color: theme.P,
    fontFace: font.jp,
    align: "left",
    valign: "middle",
    margin: 0,
  });

  parts.addStyledTable(slide, pres, theme, {
    x: 0.4,
    y: 3.72,
    w: 9.2,
    headers: ["チーム", "現状", "PO候補", "FY26方針"],
    colW: [2.0, 2.0, 2.0, 3.2],
    rowH: 0.52,
    fontSize: 11,
    font,
    rows: [
      ["Naikist", "福田さん（安定）", "—", "基準チームとして型を確立・展開"],
      [
        "Fluppuccino",
        "伊藤さん（候補）",
        "伊藤さん",
        "Q2で独力判断範囲を明確化",
      ],
      [
        "Discovery",
        "森さん（兼務）",
        "森さん継続",
        "Ready定義・手戻り分類を実践",
      ],
      ["Guardians", "迫田さん（暫定）", "室山さん", "Q1基礎学習→Q2 OJT開始"],
    ],
  });
}

// ─── No.8: PO育成フェーズと卒業基準 ─────────────────────

{
  const slide = newSlide();
  addBase(slide, BREADCRUMB, "PO育成は3フェーズで進め、卒業基準を事前に定める");

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4,
    y: CONTENT_Y,
    w: 9.2,
    h: 0.38,
    fill: { color: theme.INFO_BG },
    rectRadius: 0.02,
    line: { color: theme.INFO_BD, width: 1 },
  });
  slide.addText(
    "→ 「いつ独り立ちか」を最初から決めることで、育成を属人化・感覚判断させない。",
    {
      x: 0.55,
      y: CONTENT_Y,
      w: 9.0,
      h: 0.38,
      fontSize: 12,
      color: theme.INFO_TX,
      fontFace: font.jp,
      align: "left",
      valign: "middle",
      margin: 0,
      bold: true,
    },
  );

  parts.addStyledTable(slide, pres, theme, {
    x: 0.4,
    y: 1.78,
    w: 9.2,
    headers: ["フェーズ", "期間目安", "内容", "移行判断"],
    colW: [1.8, 1.4, 4.5, 1.5],
    rowH: 0.56,
    fontSize: 11,
    font,
    rows: [
      [
        "Phase 1\n観察",
        "1〜2 sprint",
        "福田さんのPO業務に同席。リファインメント・スプリントレビューに参加。判断は福田さんが行う",
        "—",
      ],
      [
        "Phase 2\n実践",
        "3〜4 sprint",
        "担当領域のバックログを候補者が運用。福田さんがレビュー・フィードバック。福田さんの負荷が下がる",
        "福田さんの評価",
      ],
      [
        "Phase 3\n独り立ち",
        "5 sprint〜",
        "チームのPOとして自律運用。福田さんとは定期壁打ちを継続",
        "卒業基準を満たすこと",
      ],
    ],
  });

  slide.addText("卒業基準（4軸）", {
    x: 0.4,
    y: 3.7,
    w: 9.2,
    h: 0.28,
    fontSize: 12,
    bold: true,
    color: theme.P,
    fontFace: font.jp,
    align: "left",
    valign: "middle",
    margin: 0,
  });

  parts.addStyledTable(slide, pres, theme, {
    x: 0.4,
    y: 4.0,
    w: 9.2,
    headers: ["基準", "具体的な計測"],
    colW: [2.8, 6.4],
    rowH: 0.32,
    fontSize: 11,
    font,
    rows: [
      [
        "バックログを自力で回せる",
        "リファインメントを2スプリント連続で自走できた",
      ],
      [
        "優先順位判断に根拠がある",
        "「なぜこの順番か」を事業価値・ROIで説明できる",
      ],
      [
        "チームから信頼されている",
        "チームが仕様の質問をPOに直接聞きに来る状態",
      ],
      [
        "スコープ判断ができる",
        "「やらない」判断を根拠付きでSHに説明した実績がある",
      ],
    ],
  });
}

// ─── No.9: 室山さんの3つの根拠 ──────────────────────────

{
  const slide = newSlide();
  addBase(slide, BREADCRUMB, "室山さんをGuardians PO候補にする3つの根拠");

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4,
    y: CONTENT_Y,
    w: 9.2,
    h: 0.38,
    fill: { color: theme.INFO_BG },
    rectRadius: 0.02,
    line: { color: theme.INFO_BD, width: 1 },
  });
  slide.addText(
    "→ 業務知識・実証済みスキル・ネットワーク——3つが揃った今がタイミング。本人もプロダクト側へのシフトを志向している。",
    {
      x: 0.55,
      y: CONTENT_Y,
      w: 9.0,
      h: 0.38,
      fontSize: 12,
      color: theme.INFO_TX,
      fontFace: font.jp,
      align: "left",
      valign: "middle",
      margin: 0,
      bold: true,
    },
  );

  parts.addStyledTable(slide, pres, theme, {
    x: 0.4,
    y: 1.78,
    w: 9.2,
    headers: ["適性", "根拠", "育成の要否"],
    colW: [2.0, 4.8, 2.4],
    rowH: 0.72,
    fontSize: 12,
    font,
    rows: [
      [
        "業務知識",
        "Krakenプロジェクトを1年担当。GuardiansのメインワークがKraken関連であり、業務知識をそのまま活かせる",
        "即戦力",
      ],
      [
        "PO的スキルの実証",
        "Kraken要件整理・ディレクション・経営報告・ステークホルダー調整 = POが日常的にやる業務と同質",
        "PBL管理の形式知をPhase 1で習得",
      ],
      [
        "ネットワーク",
        "エネルギー事業とのパイプがある。事業側との接続役として機能する",
        "即戦力",
      ],
    ],
  });

  // PO4象限での現在地
  slide.addText("PO 4象限での室山さん現在地", {
    x: 0.4,
    y: 4.12,
    w: 9.2,
    h: 0.28,
    fontSize: 12,
    bold: true,
    color: theme.P,
    fontFace: font.jp,
    align: "left",
    valign: "middle",
    margin: 0,
  });

  parts.addStyledTable(slide, pres, theme, {
    x: 0.4,
    y: 4.43,
    w: 9.2,
    headers: ["POの役割", "現状", "Phase 1〜2での習得"],
    colW: [2.4, 3.8, 3.0],
    rowH: 0.32,
    fontSize: 10,
    font,
    rows: [
      [
        "バックログ管理",
        "Kraken要件整理で類似業務あり。PBL管理の形式知はこれから",
        "Phase 1で福田さんから学ぶ",
      ],
      [
        "経済性の管理",
        "経営報告担当でROIの文脈あり",
        "「プロダクト単位のROI判断」への転換",
      ],
      [
        "ステークホルダー協力",
        "エネ事とのパイプ。調整は現業務の強み",
        "即戦力（習得不要）",
      ],
    ],
  });
}

// ─── No.10: 室山さんの段階移行（タイムライン）──────────────

{
  const slide = newSlide();
  addBase(
    slide,
    BREADCRUMB,
    "室山さんはKraken業務を移行しながら段階的にPO化する（FY27本格移行）",
  );

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4,
    y: CONTENT_Y,
    w: 9.2,
    h: 0.38,
    fill: { color: theme.INFO_BG },
    rectRadius: 0.02,
    line: { color: theme.INFO_BD, width: 1 },
  });
  slide.addText(
    "→ Q1〜Q4でKraken業務を引き継ぎながら、FY27のPO本格移行に備える。急がず段階的に。",
    {
      x: 0.55,
      y: CONTENT_Y,
      w: 9.0,
      h: 0.38,
      fontSize: 12,
      color: theme.INFO_TX,
      fontFace: font.jp,
      align: "left",
      valign: "middle",
      margin: 0,
      bold: true,
    },
  );

  parts.addTimeline(slide, pres, theme, {
    x: 0.4,
    y: 1.78,
    w: 9.2,
    h: 3.3,
    font,
    events: [
      {
        date: "Q1（4〜6月）",
        title: "Kraken継続\n+ PO基礎学習",
        body: "Guardians PO Phase 1開始。Kraken業務の移管可能な部分を洗い出す",
      },
      {
        date: "Q2（7〜9月）",
        title: "Guardians PO\nOJT開始",
        body: "Kraken継続しつつPO業務の一部を実践（Phase 2）。岩渕さんへのKraken引き継ぎ準備",
      },
      {
        date: "Q3〜Q4",
        title: "PO実践\n範囲拡大",
        body: "引き継ぎ本格化。FY27移行準備。育成計画の中間レビューをQ3に実施",
      },
      {
        date: "FY27〜",
        title: "Guardians PO\n本格移行",
        body: "独り立ち基準を確認のうえPO正式移行。Kraken業務は岩渕さんへ完全移管",
      },
    ],
  });
}

// ─── No.11: mTGの型づくりが先行投資（FlowVertical）──────────

{
  const slide = newSlide();
  addBase(
    slide,
    BREADCRUMB,
    "mTGでのPO型づくりは、新規領域展開の速度を決める先行投資",
  );

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4,
    y: CONTENT_Y,
    w: 9.2,
    h: 0.38,
    fill: { color: theme.INFO_BG },
    rectRadius: 0.02,
    line: { color: theme.INFO_BD, width: 1 },
  });
  slide.addText(
    "→ 今PO育成の型を作らないと、新規領域展開のたびに「PO不在問題」をゼロから解くことになる。",
    {
      x: 0.55,
      y: CONTENT_Y,
      w: 9.0,
      h: 0.38,
      fontSize: 12,
      color: theme.INFO_TX,
      fontFace: font.jp,
      align: "left",
      valign: "middle",
      margin: 0,
      bold: true,
    },
  );

  parts.addFlowVertical(slide, pres, theme, {
    x: 1.0,
    y: 1.78,
    w: 8.0,
    h: 3.55,
    font,
    steps: [
      {
        title: "現在: mTGでPO育成の型を確立",
        body: "福田さんを基準に伊藤さん・室山さんを育成。「PO育成の型」を組織知として整備する",
      },
      {
        title: "1〜2年後: 新規領域に種を送り込む",
        body: "mTGで育ったPOを、別事業領域の内製化立ち上げ時に展開。SM（のれん分け）と同じ原理",
      },
      {
        title: "3〜5年後: 複数領域で自律的にPOが育つ循環構造",
        body: "POが育ちながらPOを育てる循環。エンジニアの暖簾分けと同じモデルがPOでも回り始める",
      },
    ],
  });
}

// ─── No.12: 承認前に整備が必要な3点 ──────────────────────

{
  const slide = newSlide();
  addBase(slide, BREADCRUMB, "承認前に整備が必要な3点");

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4,
    y: CONTENT_Y,
    w: 9.2,
    h: 0.38,
    fill: { color: theme.WARN_BG },
    rectRadius: 0.02,
    line: { color: theme.WARN_BD, width: 1 },
  });
  slide.addText(
    "→ 承認後すぐ動けるよう、以下3点をQ1中に確定させる。担当者は明記済み。",
    {
      x: 0.55,
      y: CONTENT_Y,
      w: 9.0,
      h: 0.38,
      fontSize: 12,
      color: theme.WARN_TX,
      fontFace: font.jp,
      align: "left",
      valign: "middle",
      margin: 0,
      bold: true,
    },
  );

  const items = [
    {
      num: 1,
      title: "室山さんのKraken業務 段階移行計画",
      body: "Kraken業務のうち移管可能な部分を洗い出し、岩渕さんへの引き継ぎスケジュールを確定する",
      who: "杉崎 + 室山さん",
      when: "Q1中",
    },
    {
      num: 2,
      title: "福田さんとの事前合意",
      body: "室山さんの考課担当は福田さん。GMに持っていく前に福田さんと握っておく。「聞いてない」案件にしない",
      who: "杉崎",
      when: "4月中",
    },
    {
      num: 3,
      title: "計測基盤の立ち上げ（全チーム）",
      body: "Q1中に全チームのサイクルタイム計測を導入。ベースラインを確定しないとPO機能の効果を測れない",
      who: "杉崎 + 各SM",
      when: "Q1末",
    },
  ];

  items.forEach((item, i) => {
    const cardY = 1.78 + i * 1.15;
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.4,
      y: cardY,
      w: 9.2,
      h: 1.0,
      fill: { color: theme.CB },
      rectRadius: 0.03,
    });
    parts.addNumberBadge(slide, pres, theme, {
      x: 0.55,
      y: cardY + 0.34,
      num: item.num,
      size: 0.3,
      color: theme.ACCENTS[i % theme.ACCENTS.length],
    });
    slide.addText(item.title, {
      x: 1.0,
      y: cardY + 0.08,
      w: 6.6,
      h: 0.3,
      fontSize: 13,
      bold: true,
      color: theme.DT,
      fontFace: font.jp,
      align: "left",
      valign: "middle",
      margin: 0,
    });
    slide.addText(item.body, {
      x: 1.0,
      y: cardY + 0.4,
      w: 6.6,
      h: 0.5,
      fontSize: 11,
      color: theme.DT,
      fontFace: font.jp,
      align: "left",
      valign: "top",
      margin: 0,
      lineSpacingMultiple: 1.4,
    });
    slide.addText(`担当: ${item.who}　　期限: ${item.when}`, {
      x: 7.7,
      y: cardY + 0.35,
      w: 1.7,
      h: 0.3,
      fontSize: 10,
      color: theme.ST,
      fontFace: font.jp,
      align: "right",
      valign: "middle",
      margin: 0,
    });
  });
}

// ─── No.13: ネクストアクション ──────────────────────────────

{
  const slide = newSlide();
  addBase(
    slide,
    BREADCRUMB,
    "ネクストアクション: 本日の承認2点とQ1中の確定事項",
  );

  // 承認依頼（強調ボックス）
  slide.addText("本日、ご承認をお願いする2点", {
    x: 0.4,
    y: CONTENT_Y,
    w: 5.5,
    h: 0.3,
    fontSize: 13,
    bold: true,
    color: theme.P,
    fontFace: font.jp,
    align: "left",
    valign: "middle",
    margin: 0,
  });

  const approvals = [
    "① 森さん（Discovery PO）の兼務継続",
    "② 室山さんをGuardians PO候補として正式にアサイン",
  ];
  approvals.forEach((text, i) => {
    const ay = CONTENT_Y + 0.38 + i * 0.62;
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.4,
      y: ay,
      w: 5.5,
      h: 0.52,
      fill: { color: theme.CB },
      line: { color: theme.P, width: 1.5 },
      rectRadius: 0.03,
    });
    slide.addText(text, {
      x: 0.55,
      y: ay,
      w: 5.2,
      h: 0.52,
      fontSize: 14,
      bold: true,
      color: theme.P,
      fontFace: font.jp,
      align: "left",
      valign: "middle",
      margin: 0,
    });
  });

  // Q1中の確定事項
  slide.addText("Q1中に確定する事項", {
    x: 6.1,
    y: CONTENT_Y,
    w: 3.5,
    h: 0.3,
    fontSize: 13,
    bold: true,
    color: theme.P,
    fontFace: font.jp,
    align: "left",
    valign: "middle",
    margin: 0,
  });

  const q1items = [
    { text: "室山さんKraken業務 移行計画", who: "杉崎 + 室山" },
    { text: "福田さんとの事前合意", who: "杉崎" },
    { text: "全チームCT計測 立ち上げ", who: "杉崎 + SM" },
  ];
  q1items.forEach((item, i) => {
    const qy = CONTENT_Y + 0.38 + i * 0.62;
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 6.1,
      y: qy,
      w: 3.5,
      h: 0.52,
      fill: { color: theme.SF },
      rectRadius: 0.02,
    });
    slide.addText(item.text, {
      x: 6.25,
      y: qy + 0.02,
      w: 2.8,
      h: 0.3,
      fontSize: 12,
      color: theme.DT,
      fontFace: font.jp,
      align: "left",
      valign: "middle",
      margin: 0,
    });
    slide.addText(item.who, {
      x: 6.25,
      y: qy + 0.28,
      w: 2.8,
      h: 0.2,
      fontSize: 10,
      color: theme.ST,
      fontFace: font.jp,
      align: "left",
      valign: "middle",
      margin: 0,
    });
  });

  // セパレータ
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 6.0,
    y: CONTENT_Y,
    w: 0.01,
    h: 1.7,
    fill: { color: theme.S },
  });

  // 中長期の展望
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4,
    y: 3.52,
    w: 9.2,
    h: 1.8,
    fill: { color: theme.CB },
    rectRadius: 0.03,
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.4,
    y: 3.52,
    w: 9.2,
    h: 0.36,
    fill: { color: theme.P },
    rectRadius: 0.0,
  });
  slide.addText("中長期の方向性", {
    x: 0.55,
    y: 3.52,
    w: 9.0,
    h: 0.36,
    fontSize: 12,
    bold: true,
    color: theme.WH,
    fontFace: font.jp,
    align: "left",
    valign: "middle",
    margin: 0,
  });
  slide.addText(
    "mTGでPO育成の型を確立（FY26）→ 新規領域展開時にmTGで育ったPOを種として送り込む（FY27〜）→ 複数領域で自律的にPOが育つ循環構造へ（FY28〜）\n\n今日の承認が、この循環の起点になります。",
    {
      x: 0.55,
      y: 3.93,
      w: 9.0,
      h: 1.3,
      fontSize: 13,
      color: theme.DT,
      fontFace: font.jp,
      align: "left",
      valign: "top",
      margin: 0,
      lineSpacingMultiple: 1.5,
    },
  );
}

// ─── 出力 ────────────────────────────────────────────────────

pres
  .writeFile({ fileName: "outputs/pptx/2026-04-05_po-supply-pipeline.pptx" })
  .then(() => console.log("✓ outputs/pptx/2026-04-05_po-supply-pipeline.pptx"))
  .catch((err) => console.error("ERROR:", err));
