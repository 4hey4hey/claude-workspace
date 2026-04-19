// ============================================================
// KR②「高速プロダクト開発の型」初回報告 v4
// 大橋部長向け — 本編7枚 + Appendix4枚
// 構成: 目標→KPI→年間計画→Q1計画→Q1進捗→締め
// ============================================================

const PptxGenJS = require("pptxgenjs");
const { getTheme, getFontPreset, getPreset, calcLayout, parts } = require("./lib");

const theme = getTheme("dads");
const font = getFontPreset("dads");
const pres = new PptxGenJS();

const BREADCRUMB_OKR = "OKR 挑戦KR2";
const BREADCRUMB_FORMULA = "成果の方程式";
const BREADCRUMB_ROADMAP = "挑戦KR②  >  ロードマップ";
const BREADCRUMB_Q1 = "DPG OKR FY26  >  挑戦KR②  >  初回報告";
const BREADCRUMB_PROGRESS = "挑戦KR②  >  Q1進捗";
const OUTPUT = "outputs/pptx/2026-04-16_kr2-report-v4.pptx";

// ============================================================
// Slide 1: 表紙
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addCoverTitle(slide, pres, theme, {
    title: "挑戦KR２報告",
    date: "2026-04-21",
    font,
  });
  parts.addBottomBar(slide, pres, theme);
}

// ============================================================
// Slide 2: KR + 3アプローチ
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addHeader(slide, pres, theme, { breadcrumb: BREADCRUMB_OKR, font });
  parts.addBottomBar(slide, pres, theme);

  // 「挑戦 KR2」バッジ
  parts.addBadge(slide, pres, theme, {
    x: 0.4, y: 0.5, label: "挑戦 KR2", w: 1.4, h: 0.32,
    color: theme.P, font,
  });

  // KR文言
  slide.addText(
    "仮説・検証・学習が止まらず高速に巡るプロダクト開発の型を定常運用できている。\n小さく早く検証する考え方がメンバーに浸透し、不確実性に対してムダの少ない意思決定と実行ができている。",
    {
      x: 0.4, y: 0.95, w: 9.2, h: 0.85,
      fontSize: 15, bold: true, color: theme.DT, fontFace: font.jp,
      align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.6,
    }
  );

  // セパレータ
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 1.9, w: 9.2, h: 0.015,
    fill: { color: theme.ACCENTS[0] },
  });

  // 「KRを達成するためになにをやるのか？」
  slide.addText("KRを達成するためになにをやるのか？", {
    x: 0.4, y: 2.0, w: 9.2, h: 0.45,
    fontSize: 18, bold: true, color: theme.P, fontFace: font.jp,
    align: "left", valign: "middle", margin: 0,
  });

  slide.addText(
    "「プロダクト開発の型を回す」を3つの構造的課題に分解して取り組む。",
    {
      x: 0.4, y: 2.45, w: 9.2, h: 0.3,
      fontSize: 12, color: theme.ST, fontFace: font.jp,
      align: "left", valign: "middle", margin: 0,
    }
  );

  // 3アプローチカード
  const cardY = 2.9;
  const cardH = 2.3;
  const cardGap = 0.2;
  const cardW = (9.2 - cardGap * 2) / 3;

  const approaches = [
    {
      num: "①",
      title: "開発に入る前の入口品質を\nあげる",
      body: "実装に入る前の前提整理・\n要求定義の曖昧さをなくす",
    },
    {
      num: "②",
      title: "開発のフロー効率をあげる",
      body: "開発工程のムリ・ムダ・ムラをなくし、案件を停滞させずにスムーズに整える。",
    },
    {
      num: "③",
      title: "学習ループを回す",
      subtitle: "結果を次の判断に繋ぐ",
      body: "リリースして終わりにせず、お客様の反応を見て「次に何をやるか／やめるか」を決める。",
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

    // アプローチ番号
    slide.addText(`アプローチ ${a.num}`, {
      x: cx + 0.15, y: cardY + 0.15, w: cardW - 0.3, h: 0.28,
      fontSize: 11, bold: true, color: theme.ST, fontFace: font.jp,
      italic: true, align: "left", valign: "middle", margin: 0,
    });

    // タイトル
    slide.addText(a.title, {
      x: cx + 0.15, y: cardY + 0.45, w: cardW - 0.3, h: 0.65,
      fontSize: 16, bold: true, color: theme.DT, fontFace: font.jp,
      align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.3,
    });

    // サブタイトル（③のみ）
    if (a.subtitle) {
      slide.addText(a.subtitle, {
        x: cx + 0.15, y: cardY + 1.05, w: cardW - 0.3, h: 0.25,
        fontSize: 12, color: theme.ST, fontFace: font.jp,
        align: "left", valign: "middle", margin: 0,
      });
    }

    // セパレータ
    const sepY = a.subtitle ? cardY + 1.35 : cardY + 1.15;
    slide.addShape(pres.shapes.RECTANGLE, {
      x: cx + 0.15, y: sepY, w: cardW - 0.3, h: 0.008,
      fill: { color: theme.S },
    });

    // 本文
    slide.addText(a.body, {
      x: cx + 0.15, y: sepY + 0.1, w: cardW - 0.3, h: cardH - (sepY - cardY) - 0.25,
      fontSize: 12, color: theme.ST, fontFace: font.jp,
      align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.6,
    });
  });
}

// ============================================================
// Slide 3: 成果の方程式（+ 現状値）
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addHeader(slide, pres, theme, { breadcrumb: BREADCRUMB_FORMULA, font });
  parts.addSlideTitle(slide, pres, theme, {
    title: "KRを達成するための指標はなにか？",
    font,
  });
  parts.addBottomBar(slide, pres, theme);

  const lay = calcLayout({ columns: 1 });

  // 方程式: 試行回数 × 施策の精度 = 事業成果
  const formulaY = lay.content.y + 0.05;
  const terms = [
    { text: "試行回数", x: 0.8, w: 2.5 },
    { text: "×", x: 3.3, w: 0.5, isOp: true },
    { text: "施策の精度", x: 3.8, w: 2.8 },
    { text: "＝", x: 6.6, w: 0.5, isOp: true },
    { text: "事業成果", x: 7.1, w: 2.5 },
  ];
  terms.forEach((t) => {
    slide.addText(t.text, {
      x: t.x, y: formulaY, w: t.w, h: 0.55,
      fontSize: t.isOp ? 28 : 32, bold: true,
      color: t.isOp ? theme.ST : theme.DT,
      fontFace: font.jp, align: "center", valign: "middle", margin: 0,
    });
  });

  // 補足テキスト
  slide.addText(
    "事業成果をスピーディーに出し続けるために試行回数と施策精度向上をねらう",
    {
      x: 0.4, y: formulaY + 0.6, w: 9.2, h: 0.3,
      fontSize: 12, color: theme.ST, fontFace: font.jp,
      align: "center", valign: "middle", margin: 0,
    }
  );

  // KPI①
  const kpi1Y = formulaY + 1.1;
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: kpi1Y, w: 9.2, h: 1.2,
    fill: { color: theme.CB },
    rectRadius: 0.03,
  });
  slide.addText("KPI ①　試行回数", {
    x: 0.6, y: kpi1Y + 0.08, w: 4, h: 0.32,
    fontSize: 14, bold: true, color: theme.DT, fontFace: font.jp,
    align: "left", valign: "middle", margin: 0,
  });
  slide.addText(
    "顧客価値施策について、要件定義からリリースまでのリードタイムが平均1ヶ月以内",
    {
      x: 0.6, y: kpi1Y + 0.4, w: 8.8, h: 0.32,
      fontSize: 13, bold: true, color: theme.DT, fontFace: font.jp,
      align: "left", valign: "middle", margin: 0,
    }
  );
  slide.addText(
    "思いついてから届けるまでの時間が短い ＝ 試行回数が増える　　　　現状：2〜6ヶ月以上 → 目標：1ヶ月以内",
    {
      x: 0.6, y: kpi1Y + 0.75, w: 8.8, h: 0.32,
      fontSize: 11, color: theme.ST, fontFace: font.jp,
      align: "left", valign: "middle", margin: 0,
    }
  );

  // KPI②
  const kpi2Y = kpi1Y + 1.4;
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: kpi2Y, w: 9.2, h: 1.2,
    fill: { color: theme.CB },
    rectRadius: 0.03,
  });
  slide.addText("KPI ②　施策の精度", {
    x: 0.6, y: kpi2Y + 0.08, w: 4, h: 0.32,
    fontSize: 14, bold: true, color: theme.DT, fontFace: font.jp,
    align: "left", valign: "middle", margin: 0,
  });
  slide.addText(
    "リリース後の検証結果 → 次の施策への反映までのリードタイムが平均1ヶ月以内",
    {
      x: 0.6, y: kpi2Y + 0.4, w: 8.8, h: 0.32,
      fontSize: 13, bold: true, color: theme.DT, fontFace: font.jp,
      align: "left", valign: "middle", margin: 0,
    }
  );
  slide.addText(
    "リリースした効果を見て「次に何をやるか」を柔軟に変えられる ＝ 施策の精度が上がる　　　　現状：3ヶ月以上 or 未反映 → 目標：1ヶ月以内",
    {
      x: 0.6, y: kpi2Y + 0.75, w: 8.8, h: 0.32,
      fontSize: 11, color: theme.ST, fontFace: font.jp,
      align: "left", valign: "middle", margin: 0,
    }
  );
}

// ============================================================
// Slide 4: ロードマップ（横フロー）
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addHeader(slide, pres, theme, { breadcrumb: BREADCRUMB_ROADMAP, font });
  parts.addSlideTitle(slide, pres, theme, {
    title: "Q1で計測基盤・体制を整え課題を分析し、Q2以降で改善を回す",
    font,
  });
  parts.addBottomBar(slide, pres, theme);

  const lay = calcLayout({ columns: 1 });

  parts.addFlowHorizontal(slide, pres, theme, {
    x: 0.4, y: lay.content.y + 0.3, w: 9.2, h: lay.content.h - 0.3,
    steps: [
      {
        title: "Q1（4-6月）",
        body: "計測基盤・体制・\n共通基準の整備\n課題分析\n\n今どこで時間がかかって\nいるかを測れる状態を作り",
      },
      {
        title: "Q2（7-9月）",
        body: "チームごとの指標設定\n改善サイクル始動\n\nデータに基づく\n改善を開始",
      },
      {
        title: "Q3-Q4（10月-）",
        body: "効果検証・定着\n\n改善の成果を測り、\n型として定着させる",
      },
    ],
    font,
  });
}

// ============================================================
// Slide 5: Q1ガントチャート
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addHeader(slide, pres, theme, { breadcrumb: BREADCRUMB_Q1, font });
  parts.addSlideTitle(slide, pres, theme, {
    title: "Q1（4-6月）の施策スケジュール",
    font,
  });
  parts.addBottomBar(slide, pres, theme);

  // --- ガントチャート ---
  const gX = 0.4, gY = 1.3, gW = 9.2;
  const labelW = 1.8;
  const chartX = gX + labelW;
  const chartW = gW - labelW;
  const headerH = 0.32;
  const months = ["4月", "5月", "6月"];
  const totalUnits = 6; // 半月単位
  const unitW = chartW / totalUnits;

  // ヘッダー（月ラベル）
  slide.addShape(pres.shapes.RECTANGLE, {
    x: gX, y: gY, w: labelW, h: headerH,
    fill: { color: theme.P },
  });
  slide.addText("施策", {
    x: gX, y: gY, w: labelW, h: headerH,
    fontSize: 11, bold: true, color: theme.WH, fontFace: font.jp,
    align: "center", valign: "middle", margin: 0,
  });
  months.forEach((m, i) => {
    const mx = chartX + i * 2 * unitW;
    slide.addShape(pres.shapes.RECTANGLE, {
      x: mx, y: gY, w: unitW * 2, h: headerH,
      fill: { color: theme.P },
    });
    slide.addText(m, {
      x: mx, y: gY, w: unitW * 2, h: headerH,
      fontSize: 11, bold: true, color: theme.WH, fontFace: font.jp,
      align: "center", valign: "middle", margin: 0,
    });
    if (i > 0) {
      slide.addShape(pres.shapes.RECTANGLE, {
        x: mx, y: gY, w: 0.005, h: headerH,
        fill: { color: theme.WH },
      });
    }
  });

  // カテゴリ・タスク定義 — 色はネイビー統一（区別はラベル・番号で行う）
  const categories = [
    {
      label: "計測基盤", color: theme.P,
      tasks: [
        { name: "Notion計測ログ整備", start: 0.5, end: 2.5 },
        { name: "Github計測ログ開発（Naikist）", start: 1.5, end: 4 },
        { name: "Github計測ログ開発（その他チーム）", start: 4, end: 6 },
        { name: "ベースライン計測・分析", start: 4.5, end: 6 },
      ],
    },
    {
      label: "入口品質", color: theme.P,
      tasks: [
        { name: "外部講師レクチャー・課題解決", start: 0.5, end: 2.5 },
        { name: "継続支援・定着", start: 2.5, end: 6 },
        { name: "Ready基準の整備", start: 2.5, end: 4.5 },
      ],
    },
    {
      label: "フロー効率", color: theme.P,
      tasks: [
        { name: "不具合基準整備", start: 0.5, end: 2.5 },
        { name: "Web・ネイティブアプリチーム統合", start: 2.5, end: 6 },
      ],
    },
    {
      label: "学習ループ", color: theme.P,
      tasks: [
        { name: "ログ運用設計（クリックイベント）", start: 1, end: 3.5 },
        { name: "検証ログ運用開始", start: 3.5, end: 6 },
      ],
    },
  ];

  let rowY = gY + headerH + 0.06;
  const rowH = 0.26;
  const taskGap = 0.03;
  const catGap = 0.06;

  categories.forEach((cat) => {
    const taskCount = cat.tasks.length;
    const catH = taskCount * rowH + (taskCount - 1) * taskGap + 0.12;

    // カテゴリラベル
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: gX, y: rowY, w: labelW - 0.04, h: catH,
      fill: { color: cat.color }, rectRadius: 0.02,
    });
    slide.addText(cat.label, {
      x: gX, y: rowY, w: labelW - 0.04, h: catH,
      fontSize: 11, bold: true, color: theme.WH, fontFace: font.jp,
      align: "center", valign: "middle", margin: 0,
    });

    // チャート背景
    slide.addShape(pres.shapes.RECTANGLE, {
      x: chartX, y: rowY, w: chartW, h: catH,
      fill: { color: theme.CB },
    });

    // グリッド線
    months.forEach((_, i) => {
      if (i > 0) {
        slide.addShape(pres.shapes.RECTANGLE, {
          x: chartX + i * 2 * unitW, y: rowY, w: 0.005, h: catH,
          fill: { color: theme.S },
        });
      }
    });

    // タスクバー
    cat.tasks.forEach((task, ti) => {
      const barY = rowY + 0.06 + ti * (rowH + taskGap);
      const barX = chartX + task.start * unitW;
      const barW = (task.end - task.start) * unitW;

      slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: barX + 0.02, y: barY, w: barW - 0.04, h: rowH,
        fill: { color: cat.color }, rectRadius: 0.02,
      });
      slide.addText(task.name, {
        x: barX + 0.06, y: barY, w: barW - 0.1, h: rowH,
        fontSize: 9, color: theme.WH, fontFace: font.jp,
        align: "left", valign: "middle", margin: 0,
      });
    });

    rowY += catH + catGap;
  });

  // 「今」マーカー
  const nowX = chartX + 0.8 * unitW;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: nowX, y: gY + headerH, w: 0.012, h: rowY - (gY + headerH),
    fill: { color: theme.ACCENTS[3] },
  });
}

// ============================================================
// Slide 6: Q1進捗 — 4軸統合（1枚に）
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addHeader(slide, pres, theme, { breadcrumb: BREADCRUMB_PROGRESS, font });
  parts.addSlideTitle(slide, pres, theme, {
    title: "4つの取り組みすべてで動き始めている",
    font,
  });
  parts.addBottomBar(slide, pres, theme);

  const lay = calcLayout({ columns: 1 });

  const items = [
    {
      num: "①", label: "計測基盤",
      body: "要求が生まれてからリリースするまで、工程別のリードタイムを可視化する仕組みをNotion・Githubにて実装中",
      color: theme.P,
    },
    {
      num: "②", label: "入口品質",
      body: "外部講師を交え、PdM・ビジネス推進メンバーも含めたレクチャーを実施済み。継続支援予定。「小さく作り検証する」開発プロセスのグループ共通認識を持ち、プロセス接続時の認識齟齬を減らす",
      color: theme.P,
    },
    {
      num: "③", label: "フロー効率",
      body: "技術領域別チーム（Web・ネイティブアプリ）から機能横断した「フィーチャーチーム」へシフト準備中。不具合・インシデント発生時の優先順位づけ基準も整備し、意思決定スピードを向上させる",
      color: theme.P,
    },
    {
      num: "④", label: "学習ループ",
      body: "リリース後の結果を記録・計測する仕組みを整備中。リリース後、迅速に効果検証し、次のサイクルの判断に使えるようにする",
      color: theme.P,
    },
  ];

  const startY = lay.content.y;
  const itemH = 0.85;
  const gap = 0.08;

  items.forEach((item, i) => {
    const iy = startY + i * (itemH + gap);

    // カード背景
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.4, y: iy, w: 9.2, h: itemH,
      fill: { color: theme.CB }, rectRadius: 0.03,
    });

    // アクセントバー（左側）
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.4, y: iy, w: 0.06, h: itemH,
      fill: { color: item.color },
    });

    // 番号 + ラベル
    slide.addText(`${item.num} ${item.label}`, {
      x: 0.6, y: iy + 0.06, w: 2, h: 0.3,
      fontSize: 14, bold: true, color: item.color, fontFace: font.jp,
      align: "left", valign: "middle", margin: 0,
    });

    // 本文
    slide.addText(item.body, {
      x: 0.6, y: iy + 0.36, w: 8.8, h: itemH - 0.42,
      fontSize: 12, color: theme.DT, fontFace: font.jp,
      align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.5,
    });
  });
}

// ============================================================
// Slide 7: Q1末に再報告する
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addHeader(slide, pres, theme, { breadcrumb: BREADCRUMB_Q1, font });
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
      x: 0.4, y: lay.content.y, w: 9.2, h: 0.65,
      fontSize: 15, color: theme.DT, fontFace: font.jp,
      align: "left", valign: "middle", margin: 0,
      lineSpacingMultiple: 1.7,
    }
  );

  // 2つの報告内容
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
  ];

  const listY = lay.content.y + 0.9;
  const itemH = 0.85;
  const itemGap = 0.15;

  listItems.forEach((item, i) => {
    const iy = listY + i * (itemH + itemGap);

    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.4, y: iy, w: 9.2, h: itemH,
      fill: { color: theme.CB }, rectRadius: 0.03,
    });
    parts.addNumberBadge(slide, pres, theme, {
      x: 0.65, y: iy + (itemH - 0.34) / 2,
      num: item.num, size: 0.34, color: theme.ACCENTS[0],
    });
    slide.addText(item.title, {
      x: 1.15, y: iy + 0.12, w: 8.2, h: 0.35,
      fontSize: 15, bold: true, color: theme.DT, fontFace: font.jp,
      align: "left", valign: "middle", margin: 0,
    });
    slide.addText(item.body, {
      x: 1.15, y: iy + 0.48, w: 8.2, h: 0.3,
      fontSize: 12, color: theme.ST, fontFace: font.jp,
      align: "left", valign: "middle", margin: 0,
    });
  });
}

// ============================================================
// Appendix: セクション区切り
// ============================================================
{
  const BLUE_BG = "264AF4";
  const slide = pres.addSlide();
  slide.background = { color: BLUE_BG };
  parts.addCoverTitle(slide, pres, theme, {
    title: "Appendix",
    font,
  });
  // 全面カラースライドなのでボトムバー・ヘッダー省略
  // テキストを白に上書き
  // addCoverTitle が青バンドを置くが、背景が同色なので視覚的に溶け込む
}

// ============================================================
// Appendix A-1: DORA根拠
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addHeader(slide, pres, theme, { breadcrumb: "成果の方程式  >  目標根拠", font });
  parts.addSlideTitle(slide, pres, theme, {
    title: "なぜ「1ヶ月以内」が目標なのか",
    font,
  });
  parts.addBottomBar(slide, pres, theme);

  const lay = calcLayout({ columns: 1 });

  slide.addText(
    '開発組織能力の世界標準指標 "DORA" の High レベルに相当する。',
    {
      x: 0.4, y: lay.content.y, w: 9.2, h: 0.35,
      fontSize: 13, bold: true, color: theme.DT, fontFace: font.jp,
      align: "left", valign: "middle", margin: 0,
    }
  );

  parts.addStyledTable(slide, pres, theme, {
    x: 0.4, y: lay.content.y + 0.5, w: 9.2,
    headers: ["レベル", "Lead Time", "該当する組織"],
    rows: [
      ["Elite", "1日未満", "Amazon, Netflix, Google"],
      ["★ High（目標）", "1日〜1ヶ月", "メガベンチャー、デジタル先進企業"],
      ["Medium", "1か月〜半年", "標準的な大企業"],
      ["Low", "半年以上", "レガシー組織"],
    ],
    colW: [2.2, 2.5, 4.5],
    rowH: 0.4,
    fontSize: 12,
    font,
  });

  // DORA説明
  const descY = lay.content.y + 2.7;
  parts.addCard(slide, pres, theme, {
    x: 0.4, y: descY, w: 9.2, h: 1.5,
    title: "DORAとは",
    body: "Google傘下の研究チームが10年以上継続している、世界最大の開発組織ベンチマーク調査。Amazon・Google・Microsoftから伝統的大企業まで、累計3万人以上の開発者を調査。\n\nDORA調査により「開発スピードと事業成果は連動する」ことが統計的に証明されている。Eliteレベル組織はLowレベル組織と比べて収益成長が2倍以上というデータも出ている。",
    font,
  });
}

// ============================================================
// Appendix A-2: サブKPI
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addHeader(slide, pres, theme, { breadcrumb: BREADCRUMB_FORMULA, font });
  parts.addBottomBar(slide, pres, theme);

  const lay = calcLayout({ columns: 1, hasTitle: false });

  // 警告ボックス
  parts.addAlertBox(slide, pres, theme, {
    x: 0.4, y: 0.5, w: 9.2, h: 1.2,
    type: "warn",
    text: "リードタイム単独では評価しない\n\n早さだけを指標化し目的化してしまうと、レビューやテストの省略・属人化で品質が低下したり、恒常的残業など、持続可能性を損なうことが起きやすい。あくまで「健全な開発フロー上での短縮」が前提。そのため下記サブKPIを内部で健全性を継続的にモニタリングする。",
    font,
  });

  slide.addText(
    "あくまでチーム改善を促進するための指標として取り扱い、早さを追うことを目的化しない。",
    {
      x: 0.4, y: 1.8, w: 9.2, h: 0.35,
      fontSize: 12, bold: true, color: theme.ACCENTS[3], fontFace: font.jp,
      align: "left", valign: "middle", margin: 0,
    }
  );

  // 2カード
  const cardY = 2.3;
  const cardW = 4.4;
  const cardH = 1.8;

  // サブKPI 変更失敗率
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: cardY, w: cardW, h: cardH,
    fill: { color: "E8F1FE" }, rectRadius: 0.03,
  });
  slide.addText("サブKPI　変更失敗率", {
    x: 0.6, y: cardY + 0.1, w: cardW - 0.4, h: 0.35,
    fontSize: 14, bold: true, color: theme.DT, fontFace: font.jp,
    align: "left", valign: "middle", margin: 0,
  });
  slide.addText(
    "リリースのうち障害・ロールバック・緊急修正に至った割合",
    {
      x: 0.6, y: cardY + 0.55, w: cardW - 0.4, h: 0.35,
      fontSize: 12, color: theme.DT, fontFace: font.jp,
      align: "left", valign: "middle", margin: 0,
    }
  );
  slide.addText("目安：15%以下 ＝ 速さと品質の両立", {
    x: 0.6, y: cardY + 1.0, w: cardW - 0.4, h: 0.35,
    fontSize: 13, bold: true, color: theme.DT, fontFace: font.jp,
    align: "left", valign: "middle", margin: 0,
  });

  // サブKPI 開発者満足度
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.2, y: cardY, w: cardW, h: cardH,
    fill: { color: "FBF5E0" }, rectRadius: 0.03,
  });
  slide.addText("サブKPI　開発者満足度", {
    x: 5.4, y: cardY + 0.1, w: cardW - 0.4, h: 0.35,
    fontSize: 14, bold: true, color: theme.DT, fontFace: font.jp,
    align: "left", valign: "middle", margin: 0,
  });
  slide.addText(
    "1か月ごとにサーベイで計測（SPACE軸）",
    {
      x: 5.4, y: cardY + 0.55, w: cardW - 0.4, h: 0.35,
      fontSize: 12, color: theme.DT, fontFace: font.jp,
      align: "left", valign: "middle", margin: 0,
    }
  );
  slide.addText("目安：5段階で平均4.0以上を維持 ＝ ムリなく持続可能に回せているか", {
    x: 5.4, y: cardY + 1.0, w: cardW - 0.4, h: 0.5,
    fontSize: 13, bold: true, color: theme.DT, fontFace: font.jp,
    align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.4,
  });
}

// ============================================================
// Appendix A-3: KPI①詳細（理想 vs 現状）
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addHeader(slide, pres, theme, { breadcrumb: "成果の方程式  >  KPI ① 試行回数", font });
  parts.addBottomBar(slide, pres, theme);

  // タイトル
  slide.addText("KPI ①　試行回数を増やす", {
    x: 0.4, y: 0.42, w: 9.2, h: 0.4,
    fontSize: 18, bold: true, color: theme.ACCENTS[0], fontFace: font.jp,
    align: "left", valign: "middle", margin: 0,
  });
  slide.addText(
    "顧客価値施策について「要件定義から リリース」までのリードタイムが平均1ヶ月以内",
    {
      x: 0.4, y: 0.85, w: 9.2, h: 0.4,
      fontSize: 15, bold: true, color: theme.DT, fontFace: font.jp,
      align: "left", valign: "middle", margin: 0,
    }
  );

  // セパレータ
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 1.35, w: 9.2, h: 0.01,
    fill: { color: theme.S },
  });

  parts.addComparisonColumns(slide, pres, theme, {
    x: 0.4, y: 1.55, w: 9.2, h: 3.7,
    before: {
      title: "現状",
      items: [
        "要件定義→ リリース  2ヶ月〜6か月以上",
        "",
        "試したい施策が、お客様に届くまでに時間が3ヶ月以上かかる。Krakenなどの大型案件に引きずられ、効果が高い施策を見つけるための試行回数が限られている",
      ],
    },
    after: {
      title: "理想状態",
      items: [
        "要件定義→ リリース  平均 1ヶ月以内",
        "",
        "試したい施策を、平均1ヶ月以内にお客様に届けて反応を見れる。試行回数が多いので、当たる施策を早く見つけられる。",
      ],
    },
    font,
  });
}

// ============================================================
// Appendix A-4: KPI②詳細（理想 vs 現状）
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addHeader(slide, pres, theme, { breadcrumb: "成果の方程式  >  KPI ② 施策の精度", font });
  parts.addBottomBar(slide, pres, theme);

  slide.addText("KPI ②　施策の精度を上げる", {
    x: 0.4, y: 0.42, w: 9.2, h: 0.4,
    fontSize: 18, bold: true, color: theme.ACCENTS[0], fontFace: font.jp,
    align: "left", valign: "middle", margin: 0,
  });
  slide.addText(
    "「リリース後の検証から次の施策への反映」までのリードタイムが平均1ヶ月以内",
    {
      x: 0.4, y: 0.85, w: 9.2, h: 0.4,
      fontSize: 15, bold: true, color: theme.DT, fontFace: font.jp,
      align: "left", valign: "middle", margin: 0,
    }
  );

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 1.35, w: 9.2, h: 0.01,
    fill: { color: theme.S },
  });

  parts.addComparisonColumns(slide, pres, theme, {
    x: 0.4, y: 1.55, w: 9.2, h: 3.7,
    before: {
      title: "現状",
      items: [
        "検証 → 次の施策へ反映  3ヶ月以上 or 未反映",
        "",
        "開発要件が大きいまま着手すると、小さく検証する余地がない。効果が出るかわからないまま時間がかかってしまい、結果として施策の精度が上がらない悪循環となっている。",
      ],
    },
    after: {
      title: "理想状態",
      items: [
        "検証 → 次の開発へ反映  平均 1ヶ月以内",
        "",
        "検証結果をもとに、効かない施策を早く止め、効く施策に人手を集中できる。同じリソースでも成果に繋がる仕事の比率が上がる。",
      ],
    },
    font,
  });
}

// ============================================================
// 出力
// ============================================================
pres.writeFile({ fileName: OUTPUT }).then(() => {
  console.log(`Created: ${OUTPUT}`);
});
