const PptxGenJS = require("pptxgenjs");
const { getTheme, getFontPreset, parts } = require("./lib");

const theme = getTheme("corporate");
const font = getFontPreset("corporate");
const pres = new PptxGenJS();
pres.title = "DMチーム位置づけ GM向け承認資料";

// ============================================================
// P1: DMチームの位置づけ（What）
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };

  parts.addBottomBar(slide, pres, theme);
  parts.addHeader(slide, pres, theme, {
    breadcrumb: "デリバリーマネジメントチーム FY26方針 ／ 位置づけ",
    font,
  });
  parts.addSlideTitle(slide, pres, theme, {
    title: "DMチームは、4プロダクトの事業成果を支える条件整備の責任組織として機能する",
    font,
  });

  // === 上段：4プロダクトカード ===
  const topY = 1.35;
  const cardH = 1.25;
  const cardGap = 0.15;
  const cardStartX = 0.4;
  const cardW = (9.2 - cardGap * 3) / 4;

  const products = [
    {
      name: "myTOKYOGAS",
      lead: "片山TL",
      body: "事業成果責任\n会員数・送客・熱狂顧客獲得",
    },
    {
      name: "Kraken（基幹）",
      lead: "髙松TL",
      body: "事業成果責任\n基幹刷新の価値提供",
    },
    {
      name: "Kraken連携PJ",
      lead: "柏木TL",
      body: "事業成果責任\n連携プロジェクトの価値提供",
    },
    {
      name: "EA",
      lead: "湯浅PdM",
      body: "事業成果責任\nEA構想の具現化",
    },
  ];

  products.forEach((p, i) => {
    const x = cardStartX + i * (cardW + cardGap);
    parts.addCard(slide, pres, theme, {
      x,
      y: topY,
      w: cardW,
      h: cardH,
      accentColor: theme.P,
      title: `${p.name}（${p.lead}）`,
      body: p.body,
      font,
    });
  });

  // === 中段：理由ブロック（なぜこの位置づけか） ===
  const reasonY = topY + cardH + 0.15;
  const reasonH = 1.35;

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4,
    y: reasonY,
    w: 9.2,
    h: reasonH,
    fill: { color: theme.SF },
    line: { color: theme.S, width: 0.75 },
    rectRadius: 0.03,
  });

  slide.addText("なぜこの位置づけか ─ 責任分界の論理", {
    x: 0.6,
    y: reasonY + 0.1,
    w: 8.8,
    h: 0.32,
    fontSize: 13,
    bold: true,
    color: theme.P,
    fontFace: font.jp,
    align: "left",
    valign: "middle",
    margin: 0,
  });

  slide.addText([
    {
      text: "各プロダクトの事業成果（会員数・送客・熱狂顧客など）は、顧客接点が個別である以上、現場に近いプロダクト責任者が判断の主権を持つのが最適である。\n",
      options: { fontSize: 11, color: theme.DT, fontFace: font.jp },
    },
    {
      text: "一方、デリバリーライン品質（入口品質・フロー効率・学習ループなど）は4プロダクトに共通する構造課題であり、個別最適ではなく横断で整備することで規模の経済が効く。\n",
      options: { fontSize: 11, color: theme.DT, fontFace: font.jp },
    },
    {
      text: "この分担により、プロダクト責任者は事業判断に専念でき、DMチームは横断のデリバリー品質向上に集中できる。結果として4プロダクト全体の投資効率が最大化する。",
      options: { fontSize: 11, color: theme.DT, fontFace: font.jp, bold: true },
    },
  ], {
    x: 0.6,
    y: reasonY + 0.42,
    w: 8.8,
    h: reasonH - 0.5,
    align: "left",
    valign: "top",
    margin: 0,
    lineSpacingMultiple: 1.45,
  });

  // === 下段：DMチーム共通基盤ボックス ===
  const dmY = reasonY + reasonH + 0.12;
  const dmH = 5.4 - dmY;

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4,
    y: dmY,
    w: 9.2,
    h: dmH,
    fill: { color: theme.INFO_BG },
    line: { color: theme.P, width: 1.5 },
    rectRadius: 0.03,
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.42,
    y: dmY,
    w: 9.16,
    h: 0.32,
    fill: { color: theme.P },
    line: { color: theme.P },
  });
  slide.addText("デリバリーマネジメントチーム ─ 4プロダクト共通基盤", {
    x: 0.6,
    y: dmY,
    w: 9.0,
    h: 0.32,
    fontSize: 11,
    bold: true,
    color: theme.WH,
    fontFace: font.jp,
    align: "left",
    valign: "middle",
    margin: 0,
  });

  slide.addText([
    {
      text: "条件整備責任：デリバリーライン品質　",
      options: { fontSize: 12, bold: true, color: theme.P, fontFace: font.jp },
    },
    {
      text: "入口品質 ／ フロー効率 ／ 学習ループ ／ チーム健全性 ／ チーフ育成",
      options: { fontSize: 11, color: theme.DT, fontFace: font.jp },
    },
  ], {
    x: 0.6,
    y: dmY + 0.38,
    w: 8.8,
    h: dmH - 0.42,
    align: "left",
    valign: "middle",
    margin: 0,
    lineSpacingMultiple: 1.4,
  });
}

// ============================================================
// P2: 貢献の見せ方（How）
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };

  parts.addBottomBar(slide, pres, theme);
  parts.addHeader(slide, pres, theme, {
    breadcrumb: "FY26方針 ／ 貢献の構造",
    font,
  });
  parts.addSlideTitle(slide, pres, theme, {
    title: "DMの5KRは因果を通じてmyTOKYOGASの事業成果に接続する",
    font,
  });

  // === 因果チェーンテーブル ===
  parts.addStyledTable(slide, pres, theme, {
    x: 0.4,
    y: 1.35,
    w: 9.2,
    colW: [1.9, 2.0, 3.0, 2.3],
    headers: ["DMのKR", "中間効果", "myTOKYOGASへの効き方", "接続するmTG側KR"],
    rows: [
      [
        "挑戦KR1\n入口品質",
        "仕様起因手戻りの削減",
        "リリース本数の余力拡大、POの判断リードタイム短縮",
        "会員数・熱狂顧客KR",
      ],
      [
        "挑戦KR2\nフロー効率",
        "サイクルタイム短縮",
        "事業仮説の検証サイクル加速、予測精度の向上",
        "仮説検証速度",
      ],
      [
        "挑戦KR3\n学習ループ",
        "投資判断の質向上",
        "mTG事業側（片山TL）月次FBで検証→次投資判断へ",
        "★事業側外部検証の窓",
      ],
      [
        "基盤KR1\nチーム健全性",
        "持続可能性の維持",
        "長期投資ロードマップの完走、燃え尽きリスクの低減",
        "ロードマップ完走率",
      ],
      [
        "基盤KR2\nチーフ育成",
        "スケール可能性の確保",
        "PO／SM供給ラインの拡張、来年度以降の組織拡大基盤",
        "組織成長速度",
      ],
    ],
    fontSize: 10,
    rowH: 0.62,
    font,
  });

  // === 脚注 ===
  slide.addText(
    "※ 受発注関係を避ける運用原則（Why同席／NO権限／先回り投資／共同学習／価値判断関与）は、プロダクト責任者との握りで別途宣言する。",
    {
      x: 0.4,
      y: 5.05,
      w: 9.2,
      h: 0.3,
      fontSize: 9,
      color: theme.ST,
      fontFace: font.jp,
      align: "left",
      valign: "middle",
      italic: true,
      margin: 0,
    },
  );
}

// ============================================================
// P3: 承認依頼＋進め方（So What）
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };

  parts.addBottomBar(slide, pres, theme);
  parts.addHeader(slide, pres, theme, {
    breadcrumb: "FY26方針 ／ 承認依頼",
    font,
  });
  parts.addSlideTitle(slide, pres, theme, {
    title: "この位置づけで進めることを承認いただき、Q1末までにKR数値をセットする",
    font,
  });

  // === 承認依頼ブロック ===
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4,
    y: 1.35,
    w: 9.2,
    h: 1.0,
    fill: { color: theme.INFO_BG },
    line: { color: theme.P, width: 1.5 },
    rectRadius: 0.03,
  });
  slide.addText([
    {
      text: "承認依頼\n",
      options: { fontSize: 13, bold: true, color: theme.P, fontFace: font.jp },
    },
    {
      text: "(1) DMチームの位置づけ：条件整備の責任組織として機能させる\n",
      options: { fontSize: 12, color: theme.DT, fontFace: font.jp },
    },
    {
      text: "(2) 貢献の見せ方：因果チェーンで各プロダクトKRに接続する構造で運用する",
      options: { fontSize: 12, color: theme.DT, fontFace: font.jp },
    },
  ], {
    x: 0.6,
    y: 1.45,
    w: 8.8,
    h: 0.85,
    align: "left",
    valign: "top",
    margin: 0,
    lineSpacingMultiple: 1.5,
  });

  // === タイムライン ===
  slide.addText("承認後のロードマップ", {
    x: 0.4,
    y: 2.5,
    w: 9.2,
    h: 0.3,
    fontSize: 12,
    bold: true,
    color: theme.P,
    fontFace: font.jp,
    align: "left",
    valign: "middle",
    margin: 0,
  });

  parts.addTimeline(slide, pres, theme, {
    x: 0.4,
    y: 2.85,
    w: 9.2,
    h: 1.15,
    events: [
      {
        date: "4月末",
        title: "プロダクト責任者4名握り",
        body: "片山／髙松／柏木／湯浅",
      },
      {
        date: "5月",
        title: "方針確定・チーム共有",
        body: "DMチーム内へ展開",
      },
      {
        date: "Q1末",
        title: "KR1/2 数値目標セット",
        body: "計測基盤＋目標値確定",
      },
      {
        date: "FY26後半",
        title: "KR進捗レビュー開始",
        body: "四半期レビューに組込",
      },
    ],
    font,
  });

  // === 想定Q&A ===
  parts.addStyledTable(slide, pres, theme, {
    x: 0.4,
    y: 4.15,
    w: 9.2,
    colW: [4.0, 5.2],
    headers: ["想定される問い", "先回り回答"],
    rows: [
      [
        "プロダクト責任者は合意済みか",
        "承認後、4月末までに4名と個別に握りを完了させる",
      ],
      [
        "事業成果が見えない組織にならないか",
        "KR3（学習ループ）で事業側月次FBを仕組み化し、外部検証の窓とする",
      ],
    ],
    fontSize: 10,
    rowH: 0.42,
    font,
  });
}

// ============================================================
// 保存
// ============================================================
pres.writeFile({
  fileName: "outputs/pptx/2026-04-19_dm-positioning-gm.pptx",
}).then((fileName) => {
  console.log(`Saved: ${fileName}`);
});
