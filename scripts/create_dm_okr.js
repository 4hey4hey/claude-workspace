const PptxGenJS = require("pptxgenjs");
const {
  getTheme,
  parts,
  getFontPreset,
  getPreset,
  calcLayout,
} = require("./lib");

const theme = getTheme("corporate");
const font = getFontPreset("corporate");

const pres = new PptxGenJS();
pres.title = "DMチーム Mission & OKR";

// ============================================================
// 表紙
// ============================================================
const s0 = pres.addSlide();
s0.background = { color: "FFFFFF" };
parts.addBottomBar(s0, pres, theme);
parts.addCoverTitle(s0, pres, theme, {
  title: "DMチーム\nMission & OKR",
  subtitle: "デリバリーマネジメントチーム 方針共有",
  date: "2026-04-04",
  author: "杉崎",
  font,
});

// ============================================================
// Slide 1: Mission
// ============================================================
const s1 = pres.addSlide();
s1.background = { color: "FFFFFF" };
parts.addBottomBar(s1, pres, theme);
parts.addHeader(s1, pres, theme, { breadcrumb: "Mission", font });
parts.addSlideTitle(s1, pres, theme, {
  title: "私たちの存在意義：同じ予算で施策をもっと速く・多く回せるようにすること",
  font,
});

// Mission引用ボックス
parts.addAlertBox(s1, pres, theme, {
  x: 0.4,
  y: 1.35,
  w: 9.2,
  h: 0.7,
  type: "info",
  text: "バリューチェーンの流れを最適化し、ムダなくムリなく顧客に価値が届く状態を作る。",
  font,
});

// 経営にとっての意味
s1.addText(
  [
    {
      text: "経営にとっての意味",
      options: {
        fontSize: 16,
        bold: true,
        color: theme.P,
        fontFace: font.jp,
      },
    },
    {
      text: "\n\n「同じ予算体制で、施策をもっと速く・多く回せるようにする」こと。\n\n単に速く作るだけではなく、「正しいものを、速く、持続的に届ける」状態を作ることがこのチームのMissionです。",
      options: {
        fontSize: 14,
        color: theme.DT,
        fontFace: font.jp,
      },
    },
  ],
  {
    x: 0.4,
    y: 2.3,
    w: 9.2,
    h: 2.8,
    valign: "top",
    margin: 0,
    lineSpacingMultiple: 1.6,
  }
);

// ============================================================
// Slide 2: Mission構造ツリー (diagram)
// ============================================================
const s2 = pres.addSlide();
s2.background = { color: "FFFFFF" };
parts.addBottomBar(s2, pres, theme);
parts.addHeader(s2, pres, theme, { breadcrumb: "Mission > 構造", font });
parts.addSlideTitle(s2, pres, theme, {
  title: 'Missionは「投資対効果・スループット・サステナビリティ」の3本柱で構成される',
  font,
});
parts.addDiagramImage(s2, pres, theme, {
  path: "assets/diagrams/dm-okr-mission-tree.drawio.png",
  x: 0.4,
  y: 1.35,
  w: 9.2,
  h: 3.109,
  font,
});

// ============================================================
// Slide 3: 行動原則テーブル
// ============================================================
const s3 = pres.addSlide();
s3.background = { color: "FFFFFF" };
parts.addBottomBar(s3, pres, theme);
parts.addHeader(s3, pres, theme, { breadcrumb: "Mission > 行動原則", font });
parts.addSlideTitle(s3, pres, theme, {
  title: '4つの行動原則「見極める・速くする・強くする・守る」が日々の判断基準になる',
  font,
});

parts.addStyledTable(s3, pres, theme, {
  x: 0.4,
  y: 1.35,
  w: 9.2,
  headers: ["原則", "担い手", "意味", "具体的な場面"],
  colW: [1.3, 1.1, 2.2, 4.6],
  rowH: 0.85,
  fontSize: 11,
  rows: [
    [
      "見極める",
      "PO",
      "投資判断・価値の選択",
      "優先順位判断、やらないことの決定、受入条件定義、スコープ判断",
    ],
    [
      "速くする",
      "SM + PO",
      "フロー効率の最大化",
      "ボトルネック解消、PBIの小分割、仕様起因の手戻り削減",
    ],
    [
      "強くする",
      "SM + PO",
      "チーム育成・プロセス改善",
      "チームの育成、オンボーディング、ふりかえりの質向上",
    ],
    [
      "守る",
      "SM",
      "障害除去・健全性維持",
      "ブロッカー検知・除去、1on1、メンタルケア、負荷分散",
    ],
  ],
  font,
});

// ============================================================
// Slide 4: Objective
// ============================================================
const s4 = pres.addSlide();
s4.background = { color: "FFFFFF" };
parts.addBottomBar(s4, pres, theme);
parts.addHeader(s4, pres, theme, { breadcrumb: "OKR > Objective", font });
parts.addSlideTitle(s4, pres, theme, {
  title: "Objective：投資が最短・最確実に顧客価値へ変換されるデリバリーラインを確立する",
  font,
});

// 3つのキーワードカード
const lay4 = calcLayout({ columns: 3 });
const keywords = [
  {
    title: "正しく",
    body: "正しいものに正しい順番で投資する\n（入口品質）",
    color: theme.ACCENTS[0],
  },
  {
    title: "速く",
    body: "着手からリリースまでの時間を短縮する\n（フロー効率）",
    color: theme.ACCENTS[1],
  },
  {
    title: "持続的に",
    body: "チームが走り続けられる状態を守り、育てる\n（サステナビリティ）",
    color: theme.ACCENTS[2],
  },
];
keywords.forEach((kw, i) => {
  const c = lay4.cells[i];
  parts.addCard(s4, pres, theme, {
    x: c.x,
    y: c.y,
    w: c.w,
    h: c.h,
    title: kw.title,
    body: kw.body,
    accentColor: kw.color,
    font,
  });
});

// ============================================================
// Slide 5: 5つのKR
// ============================================================
const s5 = pres.addSlide();
s5.background = { color: "FFFFFF" };
parts.addBottomBar(s5, pres, theme);
parts.addHeader(s5, pres, theme, { breadcrumb: "OKR > Key Results", font });
parts.addSlideTitle(s5, pres, theme, {
  title: "5つのKRで成果を測る：挑戦3つ＋基盤2つ",
  font,
});

parts.addStyledTable(s5, pres, theme, {
  x: 0.4,
  y: 1.35,
  w: 9.2,
  headers: ["KR", "区分", "何を目指すか"],
  colW: [1.8, 1.0, 6.4],
  rowH: 0.72,
  fontSize: 12,
  rows: [
    [
      "KR1 入口品質",
      "挑戦",
      "開発ラインに流す仕事の質を上げ、仕様起因の手戻りをなくす",
    ],
    [
      "KR2 フロー効率",
      "挑戦",
      "着手からリリースまでの時間を短縮する",
    ],
    [
      "KR3 学習ループ",
      "挑戦",
      "届けた結果から学び、次の投資判断に活かすサイクルを作る",
    ],
    [
      "基盤KR1 健全性",
      "基盤",
      "チームが持続可能なペースで走れる状態を守る",
    ],
    [
      "基盤KR2 育成",
      "基盤",
      "次世代リーダーを育てる",
    ],
  ],
  font,
});

// ============================================================
// Slide 6: KR循環フロー (diagram)
// ============================================================
const s6 = pres.addSlide();
s6.background = { color: "FFFFFF" };
parts.addBottomBar(s6, pres, theme);
parts.addHeader(s6, pres, theme, { breadcrumb: "OKR > KR連動構造", font });
parts.addSlideTitle(s6, pres, theme, {
  title: "3つの挑戦KRは入口品質→フロー効率→学習ループの循環で改善し合う",
  font,
});
parts.addDiagramImage(s6, pres, theme, {
  path: "assets/diagrams/dm-okr-kr-cycle.drawio.png",
  x: 1.117,
  y: 1.25,
  w: 7.766,
  h: 4.2,
  font,
});

// ============================================================
// Slide 7: PO・SM共通の実践
// ============================================================
const s7 = pres.addSlide();
s7.background = { color: "FFFFFF" };
parts.addBottomBar(s7, pres, theme);
parts.addHeader(s7, pres, theme, {
  breadcrumb: "OKR > 共通原則",
  font,
});
parts.addSlideTitle(s7, pres, theme, {
  title: "PO・SM共通の実践：価値を小さく分割し、仮説検証のスピードを上げる",
  font,
});

parts.addStyledTable(s7, pres, theme, {
  x: 0.4,
  y: 1.35,
  w: 9.2,
  headers: ["実践", "やること", "効くKR"],
  colW: [2.2, 5.4, 1.6],
  rowH: 0.85,
  fontSize: 12,
  rows: [
    [
      "価値の垂直スライス",
      "技術レイヤーではなく、ユーザー価値の単位で分割する",
      "KR2・KR3",
    ],
    [
      "比較可能な単位で出す",
      "A案/B案を同時に出して定量比較できるサイズにする",
      "KR3→KR1",
    ],
    [
      "仮説を明示してから着手",
      "PBIに「検証したい仮説」を1行書いてスプリントに入れる",
      "KR3・KR1",
    ],
    [
      "「やらない」を先に決める",
      "分割時に今回やらないことを明示的にリストアップする",
      "KR1・KR2",
    ],
  ],
  font,
});

// ============================================================
// Slide 8: ロジックツリー (diagram)
// ============================================================
const s8 = pres.addSlide();
s8.background = { color: "FFFFFF" };
parts.addBottomBar(s8, pres, theme);
parts.addHeader(s8, pres, theme, {
  breadcrumb: "OKR > 全体像",
  font,
});
parts.addSlideTitle(s8, pres, theme, {
  title: "Mission→OKR：すべては「開発投資のリターン最大化」から一貫して導出されている",
  font,
});
parts.addDiagramImage(s8, pres, theme, {
  path: "assets/diagrams/dm-okr-logic-tree.drawio.png",
  x: 0.4,
  y: 1.35,
  w: 9.2,
  h: 3.598,
  font,
});

// ============================================================
// 出力
// ============================================================
pres.writeFile({ fileName: "outputs/pptx/dm-okr-for-team.pptx" });
