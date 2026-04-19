// ============================================================
// FY2025 Value体現者アンケート 3スライドサマリー
// ============================================================

const PptxGenJS = require("pptxgenjs");
const { getTheme, getFontPreset, parts } = require("./lib");

const theme = getTheme("corporate");
const font = getFontPreset("corporate");

const pres = new PptxGenJS();
pres.title = "FY2025 Value体現者アンケート サマリー（3スライド版）";

const TODAY = "2026-04-18";
const DECK_TITLE = "FY2025 Value体現者アンケート 結果サマリー";
const BRAND = "デジタル/プロダクト開発";

function setupSlide(breadcrumb, title) {
  const s = pres.addSlide();
  s.background = { color: "FFFFFF" };
  parts.addBottomBar(s, pres, theme);
  parts.addHeader(s, pres, theme, { breadcrumb, font });
  parts.addSlideTitle(s, pres, theme, { title, font });
  return s;
}

// ─── S0: 表紙 ───────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: "FFFFFF" };
  parts.addBottomBar(s, pres, theme);
  parts.addCoverTitle(s, pres, theme, {
    title: DECK_TITLE,
    subtitle: "28名・82コメントから読み解く、FY2025のValue体現パターン",
    date: TODAY,
    author: BRAND,
    font,
  });
}

// ─── S1: Value別の体現者一覧 ─────────────────
{
  const s = setupSlide(
    `${BRAND}  /  Value別体現者一覧`,
    "3つのValueそれぞれに複数の体現者が推薦され、組織全体にValueが根付いている"
  );

  parts.addStyledTable(s, pres, theme, {
    x: 0.4,
    y: 1.3,
    w: 9.2,
    headers: ["Value", "推薦された体現者", "件数"],
    rows: [
      [
        "お客さま起点",
        "福田美桜、磯野祐輝、長友理桜、西田恵美、水野、富田千智、迫田、高野、本村渉、岩渕健一、柏木隆矢、金元明里",
        "12名・28件",
      ],
      [
        "圧倒的当事者意識",
        "福田美桜、西田恵美、相川、中道礼香、富田千智、迫田、高野、岩渕健一、柏木隆矢、金元明里、神藤、高松直也、室山、富田岳陽、森奈央、水野太、湯浅、井上孝介",
        "18名・26件",
      ],
      [
        "感謝と尊敬",
        "福田美桜、西田恵美、中道礼香、水野、迫田、高野、高松直也、井堀翔志、森、中島、北沢、杉山裕介、荒井",
        "13名・28件",
      ],
    ],
    colW: [1.8, 6.0, 1.4],
    rowH: 1.05,
    fontSize: 10,
    font,
  });

  parts.addAlertBox(s, pres, theme, {
    x: 0.4,
    y: 4.95,
    w: 9.2,
    h: 0.55,
    type: "info",
    text: "3 Value が同水準で言及されたのは、単一の突出した強みではなく、組織文化として根付いている兆候",
    font,
  });
}

// ─── S2: 印象的なコメント ─────────────────
{
  const s = setupSlide(
    `${BRAND}  /  コメントハイライト`,
    "推薦コメントからは「顧客起点の推進」「感謝を言葉にする文化」が特に強く現れた"
  );

  const cardY = 1.35;
  const cardH = 1.15;
  const gap = 0.2;

  const comments = [
    {
      title: "感謝と尊敬 — 福田美桜さんへ",
      body:
        "「全ての関係者に対して、誰がどのように貢献してくださっているのかをきちんと言葉にできる視野の広さを尊敬しています」",
    },
    {
      title: "お客さま起点 — 磯野祐輝さんへ",
      body:
        "「常にお客さまのサポートセンターの声や行動データと向き合い、課題発見と解決に取り組んでいた」",
    },
    {
      title: "圧倒的当事者意識 — 中道礼香さんへ",
      body:
        "「PO・Engの両方の視野から見えているものをキャッチアップし、お客様にとって必要な開発は何かを導いてくださった」",
    },
  ];

  comments.forEach((c, i) => {
    parts.addCard(s, pres, theme, {
      x: 0.4,
      y: cardY + i * (cardH + gap),
      w: 9.2,
      h: cardH,
      accentColor: theme.P,
      title: c.title,
      body: c.body,
      font,
    });
  });

  parts.addAlertBox(s, pres, theme, {
    x: 0.4,
    y: 5.0,
    w: 9.2,
    h: 0.5,
    type: "ok",
    text: "来期も「言語化して伝える」「顧客の声から始める」を続けることで、体現者の輪はさらに広がる",
    font,
  });
}

// ─── 出力 ───────────────────────────────────────
pres
  .writeFile({ fileName: "outputs/pptx/2026-04-18_value-embodier-3slide.pptx" })
  .then((file) => console.log(`Created: ${file}`));
