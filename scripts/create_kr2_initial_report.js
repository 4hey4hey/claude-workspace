// ============================================================
// KR②「高速プロダクト開発の型」初回報告
// 大橋部長向け — 6枚・15分
// ============================================================

const PptxGenJS = require("pptxgenjs");
const { getTheme, getFontPreset, getPreset, calcLayout, parts } = require("./lib");

const theme = getTheme("dads");
const font = getFontPreset("dads");
const pres = new PptxGenJS();

const BREADCRUMB = "DPG OKR FY26  >  挑戦KR②  >  初回報告";
const OUTPUT = "outputs/pptx/2026-04-15_kr2-initial-report.pptx";

// ============================================================
// Slide 1: 表紙
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addCoverTitle(slide, pres, theme, {
    title: "挑戦KR②\n「高速プロダクト開発の型」\n初回報告",
    subtitle: "デリバリーマネジメントチーム",
    date: "2026年4月",
    author: "杉崎",
    font,
  });
  parts.addBottomBar(slide, pres, theme);
}

// ============================================================
// Slide 2: 目標 + 3アプローチ
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addHeader(slide, pres, theme, { breadcrumb: BREADCRUMB, font });
  parts.addSlideTitle(slide, pres, theme, {
    title: "仮説・検証・学習が高速に回るプロダクト開発の型を定常運用する",
    font,
  });
  parts.addBottomBar(slide, pres, theme);

  const lay = calcLayout({ columns: 1 });

  // KPIセクション
  const kpiY = lay.content.y;
  slide.addText("KPI", {
    x: 0.4, y: kpiY, w: 0.6, h: 0.28,
    fontSize: 11, bold: true, color: theme.WH, fontFace: font.jp,
    align: "center", valign: "middle",
  });
  parts.addBadge(slide, pres, theme, {
    x: 0.4, y: kpiY, label: "KPI", w: 0.6, h: 0.28, color: theme.ACCENTS[0], font,
  });

  const kpiItems = [
    { text: "1. ", options: { fontSize: 13, bold: true, color: theme.DT, fontFace: font.en } },
    { text: "メンバーが協働し1週間以内で機能を完成し、安定して継続的に本番リリースできている", options: { fontSize: 13, color: theme.DT, fontFace: font.jp } },
  ];
  const kpiItems2 = [
    { text: "2. ", options: { fontSize: 13, bold: true, color: theme.DT, fontFace: font.en } },
    { text: "検証結果が次の施策に反映され続けている", options: { fontSize: 13, color: theme.DT, fontFace: font.jp } },
  ];
  slide.addText(kpiItems, {
    x: 1.1, y: kpiY - 0.03, w: 8.2, h: 0.32,
    valign: "middle", margin: 0,
  });
  slide.addText(kpiItems2, {
    x: 1.1, y: kpiY + 0.28, w: 8.2, h: 0.32,
    valign: "middle", margin: 0,
  });

  // 補足テキスト
  slide.addText(
    "小さく早く検証する考え方がメンバーに浸透し、不確実性に対してムダの少ない意思決定と実行ができている状態を目指す",
    {
      x: 0.4, y: kpiY + 0.65, w: 9.2, h: 0.35,
      fontSize: 11, color: theme.ST, fontFace: font.jp,
      align: "left", valign: "middle", margin: 0,
    }
  );

  // 「達成のための3つのアプローチ」ラベル
  const approachLabelY = kpiY + 1.15;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: approachLabelY, w: 9.2, h: 0.01,
    fill: { color: theme.S },
  });
  slide.addText("達成のための3つのアプローチ", {
    x: 0.4, y: approachLabelY + 0.08, w: 9.2, h: 0.3,
    fontSize: 14, bold: true, color: theme.DT, fontFace: font.jp,
    align: "left", valign: "middle", margin: 0,
  });

  // 3カード
  const cardY = approachLabelY + 0.45;
  const cardH = lay.content.y + lay.content.h - cardY;
  const cardGap = 0.2;
  const cardW = (9.2 - cardGap * 2) / 3;

  const approaches = [
    {
      label: "入口品質",
      title: "入口品質をあげる",
      body: "実装に入る前の前提整理・要求定義の曖昧さをなくす",
      color: theme.ACCENTS[0],
    },
    {
      label: "フロー効率",
      title: "開発のフロー効率をあげる",
      body: "開発工程のムリ・ムダ・ムラをなくし、案件を停滞させずスムーズに整える",
      color: theme.ACCENTS[1],
    },
    {
      label: "学習ループ",
      title: "学習ループを回す",
      body: "リリースして終わりにせず、お客様の反応を見て「次に何をやるか／やめるか」を決める",
      color: theme.ACCENTS[2],
    },
  ];

  approaches.forEach((a, i) => {
    const cx = 0.4 + i * (cardW + cardGap);

    // カード背景
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: cardY, w: cardW, h: cardH,
      fill: { color: theme.CB },
      rectRadius: 0.03,
    });

    // アクセントバー
    slide.addShape(pres.shapes.RECTANGLE, {
      x: cx + 0.02, y: cardY, w: cardW - 0.04, h: 0.06,
      fill: { color: a.color },
    });

    // ラベルバッジ
    parts.addBadge(slide, pres, theme, {
      x: cx + 0.1, y: cardY + 0.15, label: a.label,
      w: 1.2, h: 0.26, color: a.color, font,
    });

    // タイトル
    slide.addText(a.title, {
      x: cx + 0.1, y: cardY + 0.5, w: cardW - 0.2, h: 0.4,
      fontSize: 14, bold: true, color: theme.DT, fontFace: font.jp,
      align: "left", valign: "top", margin: 0,
    });

    // 本文
    slide.addText(a.body, {
      x: cx + 0.1, y: cardY + 0.9, w: cardW - 0.2, h: cardH - 1.05,
      fontSize: 12, color: theme.ST, fontFace: font.jp,
      align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.5,
    });
  });
}

// ============================================================
// Slide 3: FY26の方針（横フロー）
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addHeader(slide, pres, theme, { breadcrumb: BREADCRUMB, font });
  parts.addSlideTitle(slide, pres, theme, {
    title: "Q1で計測基盤・体制を整え課題分析し、Q2以降で改善サイクルを回す",
    font,
  });
  parts.addBottomBar(slide, pres, theme);

  const lay = calcLayout({ columns: 1 });

  // サブテキスト
  slide.addText(
    "FY26は「計測と構造整備」の年。感覚ではなくデータに基づいて改善を回す土台を作る。",
    {
      x: 0.4, y: lay.content.y, w: 9.2, h: 0.35,
      fontSize: 13, color: theme.ST, fontFace: font.jp,
      align: "left", valign: "middle", margin: 0,
    }
  );

  // 横フロー
  const flowY = lay.content.y + 0.5;
  const flowH = lay.content.h - 0.5;

  parts.addFlowHorizontal(slide, pres, theme, {
    x: 0.4, y: flowY, w: 9.2, h: flowH,
    steps: [
      {
        title: "Q1（4-6月）",
        body: "計測基盤の構築\n体制・前提の整備\n課題分析",
      },
      {
        title: "Q2（7-9月）",
        body: "チームごとの\n指標設定\n改善サイクル始動",
      },
      {
        title: "Q3（10-12月）",
        body: "改善施策の\n効果検証",
      },
      {
        title: "Q4（1-3月）",
        body: "定着\nFY27への橋渡し",
      },
    ],
    font,
  });

  // Q1を強調するボックス（点線枠）
  // Q1の位置に「今ここ」バッジ
  parts.addBadge(slide, pres, theme, {
    x: 0.4, y: flowY - 0.35, label: "現在地", w: 0.9, h: 0.26,
    color: theme.ACCENTS[0], font,
  });
}

// ============================================================
// Slide 4: Q1の計画
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addHeader(slide, pres, theme, { breadcrumb: BREADCRUMB, font });
  parts.addSlideTitle(slide, pres, theme, {
    title: "Q1末にリードタイムのベースラインと2Q目標をセットする",
    font,
  });
  parts.addBottomBar(slide, pres, theme);

  const lay = calcLayout({ columns: 1 });

  // KPIアラートボックス
  parts.addAlertBox(slide, pres, theme, {
    x: 0.4, y: lay.content.y, w: 9.2, h: 0.5,
    type: "info",
    text: "Q1 KPI:  リードタイムを計測できており、2Qの目標が設定できている",
    font,
  });

  // テーブル: アプローチ × Q1でやること
  const tblY = lay.content.y + 0.7;
  parts.addStyledTable(slide, pres, theme, {
    x: 0.4, y: tblY, w: 9.2,
    headers: ["軸", "Q1でやること"],
    rows: [
      ["共通基盤（可視化）", "バリューチェーン全体の工程別リードタイムを可視化する"],
      ["入口品質", "PdM・ビジネスメンバー含め「小さく作る」考え方を外部講師と浸透させる"],
      ["フロー効率", "技術領域別チームからフィーチャーチームへシフトする"],
      ["学習ループ", "リリース後の結果を記録・計測する仕組みを整備する"],
    ],
    colW: [2.2, 7.0],
    rowH: 0.5,
    fontSize: 12,
    font,
  });

  // 補足
  slide.addText(
    "計測と認識合わせを同時に進める。数字だけ取っても改善につながらないため、共通言語を揃えることもQ1の成果物。",
    {
      x: 0.4, y: tblY + 2.7, w: 9.2, h: 0.4,
      fontSize: 11, color: theme.ST, fontFace: font.jp,
      align: "left", valign: "middle", margin: 0,
    }
  );
}

// ============================================================
// Slide 5: 今動かしていること（4カード）
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addHeader(slide, pres, theme, { breadcrumb: BREADCRUMB, font });
  parts.addSlideTitle(slide, pres, theme, {
    title: "4つの軸すべてで取り組みを開始している",
    font,
  });
  parts.addBottomBar(slide, pres, theme);

  const lay = calcLayout({ columns: 2, rows: 2 });
  const cells = lay.cells;

  const items = [
    {
      badge: "共通基盤",
      title: "リードタイムの可視化",
      body: "アイデアからリリースまで、工程別のリードタイムを可視化する仕組みに取り組んでいる。どこで時間がかかっているかを把握する起点。",
      color: theme.P,
    },
    {
      badge: "入口品質",
      title: "「小さく作る」考え方の浸透",
      body: "外部講師を交えて、PdM・ビジネス推進のメンバーも含めたレクチャーを実施。継続支援も受けている。仕様を決める側も含めて前提を揃える。",
      color: theme.ACCENTS[0],
    },
    {
      badge: "フロー効率",
      title: "フィーチャーチームへのシフト",
      body: "技術領域別のチーム構成から、1チームで機能を完成できるフィーチャーチームへのシフトを進めている。チーム間の調整待ちをなくす。",
      color: theme.ACCENTS[1],
    },
    {
      badge: "学習ループ",
      title: "検証ログの仕組みづくり",
      body: "リリース後の結果を記録・計測する仕組みを整備中。出して終わりではなく、次の判断に使えるようにする。",
      color: theme.ACCENTS[2],
    },
  ];

  items.forEach((item, i) => {
    const c = cells[i];

    // カード背景
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: c.x, y: c.y, w: c.w, h: c.h,
      fill: { color: theme.CB },
      rectRadius: 0.03,
    });

    // アクセントバー
    slide.addShape(pres.shapes.RECTANGLE, {
      x: c.x + 0.02, y: c.y, w: c.w - 0.04, h: 0.06,
      fill: { color: item.color },
    });

    // バッジ
    parts.addBadge(slide, pres, theme, {
      x: c.x + 0.1, y: c.y + 0.15,
      label: item.badge, w: 1.1, h: 0.26, color: item.color, font,
    });

    // タイトル
    slide.addText(item.title, {
      x: c.x + 0.1, y: c.y + 0.48, w: c.w - 0.2, h: 0.35,
      fontSize: 14, bold: true, color: theme.DT, fontFace: font.jp,
      align: "left", valign: "top", margin: 0,
    });

    // 本文
    slide.addText(item.body, {
      x: c.x + 0.1, y: c.y + 0.82, w: c.w - 0.2, h: c.h - 0.95,
      fontSize: 11, color: theme.ST, fontFace: font.jp,
      align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.5,
    });
  });
}

// ============================================================
// Slide 6: Q1末に報告すること
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addHeader(slide, pres, theme, { breadcrumb: BREADCRUMB, font });
  parts.addSlideTitle(slide, pres, theme, {
    title: "6月末にベースライン数値と2Q目標を持って再報告する",
    font,
  });
  parts.addBottomBar(slide, pres, theme);

  const lay = calcLayout({ columns: 1 });

  // メインメッセージ
  slide.addText(
    "今回は「方針とやっていること」の報告。\n次回は「データでこう見えたので、こうします」という報告。",
    {
      x: 0.4, y: lay.content.y, w: 9.2, h: 0.6,
      fontSize: 14, color: theme.DT, fontFace: font.jp,
      align: "left", valign: "middle", margin: 0,
      lineSpacingMultiple: 1.6,
    }
  );

  // 3つの報告内容
  const listY = lay.content.y + 0.8;
  const listItems = [
    {
      num: 1,
      title: "各チームのリードタイムのベースライン（現状値）",
      body: "どの工程にどれだけ時間がかかっているかを数値で示す",
    },
    {
      num: 2,
      title: "2Q以降の具体的な改善目標",
      body: "ベースラインに対して、どの指標をどこまで改善するかを設定する",
    },
    {
      num: 3,
      title: "チームごとの4Q末到達イメージ",
      body: "年度末にどういう状態になっているかの見通しを示す",
    },
  ];

  const itemH = 0.75;
  const itemGap = 0.12;

  listItems.forEach((item, i) => {
    const iy = listY + i * (itemH + itemGap);

    // カード背景
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.4, y: iy, w: 9.2, h: itemH,
      fill: { color: theme.CB },
      rectRadius: 0.03,
    });

    // 番号バッジ
    parts.addNumberBadge(slide, pres, theme, {
      x: 0.6, y: iy + (itemH - 0.32) / 2,
      num: item.num, size: 0.32, color: theme.ACCENTS[0],
    });

    // タイトル
    slide.addText(item.title, {
      x: 1.1, y: iy + 0.08, w: 8.3, h: 0.32,
      fontSize: 14, bold: true, color: theme.DT, fontFace: font.jp,
      align: "left", valign: "middle", margin: 0,
    });

    // 本文
    slide.addText(item.body, {
      x: 1.1, y: iy + 0.4, w: 8.3, h: 0.28,
      fontSize: 12, color: theme.ST, fontFace: font.jp,
      align: "left", valign: "middle", margin: 0,
    });
  });
}

// ============================================================
// 出力
// ============================================================
pres.writeFile({ fileName: OUTPUT }).then(() => {
  console.log(`Created: ${OUTPUT}`);
});
