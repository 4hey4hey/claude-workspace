"use strict";
// ============================================================
// PO体制の設計 — 中長期の体制づくりにおけるPO育成と配置の方針
// Theme: dads (デジタル庁デザインシステム準拠)
// Font: dads (Noto Sans JP)
// Output: outputs/pptx/2026-04-05_po-supply-pipeline.pptx
// ============================================================

const path = require("path");
const PptxGenJS = require("pptxgenjs");
const { getTheme, getPreset, parts, getFontPreset } = require("./lib");

const theme = getTheme("dads");
const font = getFontPreset("dads");
const pres = new PptxGenJS();
pres.title = "PO体制の設計 — 中長期の体制づくりにおけるPO育成と配置の方針";

const CONTENT_Y = 1.30;
const CONTENT_W = 9.2;
const CONTENT_X = 0.4;
const CONTENT_BOTTOM = 5.45;
const CONTENT_H = CONTENT_BOTTOM - CONTENT_Y;
const BREADCRUMB = "FY26 体制づくり ＞ PO供給パイプライン";

// ─── ユーティリティ ─────────────────────────────────────────

function newSlide() {
  const s = pres.addSlide();
  s.background = { color: "FFFFFF" };
  return s;
}

function addBase(slide, title) {
  parts.addBottomBar(slide, pres, theme);
  parts.addHeader(slide, pres, theme, { breadcrumb: BREADCRUMB, font });
  parts.addSlideTitle(slide, pres, theme, { title, font });
}

function addSoWhat(slide, text, yPos) {
  slide.addText(text, {
    x: CONTENT_X,
    y: yPos,
    w: CONTENT_W,
    h: 0.30,
    fontSize: 11,
    color: theme.ST,
    fontFace: font.jp,
    align: "left",
    valign: "middle",
    margin: 0,
    italic: true,
  });
}

// ─── Cover: 表紙 ────────────────────────────────────────────

{
  const slide = newSlide();
  parts.addBottomBar(slide, pres, theme);
  parts.addCoverTitle(slide, pres, theme, {
    title: "PO体制の設計\n— 中長期の体制づくりにおけるPO育成と配置の方針",
    date: "2026-04-05",
    author: "デリバリーマネジメントチーム",
    font,
  });
}

// ─── Slide 1: mTGは3〜5年かけてプラットフォームに進化させる ──

{
  const slide = newSlide();
  addBase(
    slide,
    "mTGは3〜5年かけてプラットフォームに進化させる。体制もそれに合わせて設計する"
  );

  const flowY = CONTENT_Y + 0.05;
  const flowH = 1.6;
  parts.addFlowHorizontal(slide, pres, theme, {
    x: CONTENT_X,
    y: flowY,
    w: CONTENT_W,
    h: flowH,
    steps: [
      { title: "14会員統合" },
      { title: "Kraken移行" },
      { title: "EA基盤接続" },
      { title: "MS化" },
    ],
    font,
  });

  addSoWhat(
    slide,
    "内製化体制のゴールは打席数を増やして成果を出し続けること",
    flowY + flowH + 0.15
  );
}

// ─── Slide 2: 打席数＝チーム数×スピード×ムダ打ちしない ──────

{
  const slide = newSlide();
  addBase(
    slide,
    "打席数＝チーム数×スピード×ムダ打ちしない。3要素すべてにPOが関わる"
  );

  const flowY = CONTENT_Y + 0.05;
  const flowH = 1.4;
  parts.addFlowHorizontal(slide, pres, theme, {
    x: CONTENT_X,
    y: flowY,
    w: CONTENT_W,
    h: flowH,
    steps: [
      { title: "チーム数", body: "並列で回せる施策の数" },
      { title: "スピード", body: "1施策のリードタイム" },
      { title: "ムダ打ちしない", body: "手戻り・やり直しの排除" },
    ],
    font,
  });

  // 補足テキスト: 3職種の役割
  slide.addText(
    [
      {
        text: "3つの役割が打席数に直結する:\n",
        options: {
          fontSize: 12,
          bold: true,
          color: theme.DT,
          fontFace: font.jp,
        },
      },
      {
        text: "エンジニア",
        options: {
          fontSize: 12,
          bold: true,
          color: theme.ACCENTS[0],
          fontFace: font.jp,
        },
      },
      {
        text: " → スピード（技術力・自動化）　",
        options: { fontSize: 12, color: theme.DT, fontFace: font.jp },
      },
      {
        text: "SM",
        options: {
          fontSize: 12,
          bold: true,
          color: theme.ACCENTS[1],
          fontFace: font.jp,
        },
      },
      {
        text: " → チーム数（自律チームの立ち上げ）　",
        options: { fontSize: 12, color: theme.DT, fontFace: font.jp },
      },
      {
        text: "PO",
        options: {
          fontSize: 12,
          bold: true,
          color: theme.ACCENTS[2],
          fontFace: font.jp,
        },
      },
      {
        text: " → ムダ打ちしない（スコープ判断・優先順位）",
        options: { fontSize: 12, color: theme.DT, fontFace: font.jp },
      },
    ],
    {
      x: CONTENT_X,
      y: flowY + flowH + 0.20,
      w: CONTENT_W,
      h: 0.80,
      valign: "top",
      margin: [4, 8, 4, 8],
      lineSpacingMultiple: 1.5,
    }
  );

  addSoWhat(
    slide,
    "POがチーム数・スピード・ムダ打ちしない全てに関わる",
    flowY + flowH + 1.10
  );
}

// ─── Slide 3: 4チームあるが施策を打ち切れるのはNaikistだけ ────

{
  const slide = newSlide();
  addBase(
    slide,
    "4チームあるが施策を打ち切れるのはNaikistだけ。POだけ供給の仕組みがない"
  );

  parts.addStyledTable(slide, pres, theme, {
    x: CONTENT_X,
    y: CONTENT_Y + 0.05,
    w: CONTENT_W,
    headers: ["チーム", "SM", "PO", "チーム安定度"],
    rows: [
      ["Naikist", "堤さん（SM補佐）", "福田さん", "CT安定 ✅"],
      ["Fluppuccino", "中道さん", "伊藤さん（PO候補）", "CT未安定"],
      ["Discovery", "長島さん", "森さん（兼務）", "CT未安定"],
      ["Guardians", "不在", "迫田さん暫定→室山さん", "開発リソース削減"],
    ],
    colW: [1.8, 2.2, 2.6, 2.6],
    font,
  });

  addSoWhat(
    slide,
    "エンジニア・SMは供給設計あり。POが最大のボトルネック",
    CONTENT_Y + 2.20
  );
}

// ─── Slide 4: PO不在だと投資がムダになる ──────────────────────

{
  const slide = newSlide();
  addBase(
    slide,
    "PO不在だと投資がムダになる。人を増やしても構造は変わらない"
  );

  parts.addStyledTable(slide, pres, theme, {
    x: CONTENT_X,
    y: CONTENT_Y + 0.05,
    w: CONTENT_W,
    headers: ["アンチパターン", "結果"],
    rows: [
      ["大きい要件をそのまま着手", "手戻り1〜3週"],
      ["不確実なまま全部作る", "リリース直前に手戻り"],
      ["スコープ膨張", "予定通り終わらない"],
      ["前提未整理で着手", "ムダな開発"],
      ["PO判断待ち", "進まない"],
    ],
    colW: [5.0, 4.2],
    font,
  });

  addSoWhat(
    slide,
    "小さく分割し検証しながら進める判断者＝POが必要",
    CONTENT_Y + 2.80
  );
}

// ─── Slide 5: Krakenで実際に起きた ────────────────────────────

{
  const slide = newSlide();
  addBase(
    slide,
    "Krakenで実際に起きた：5ヶ月遅延・カスタマイズ肥大・影響額14.9億円"
  );

  const layout = getPreset("twoByTwo");
  const cells = layout.cells;

  const cardData = [
    {
      title: "大きいまま着手",
      body: "仕様変更が噴出し、見積もりが破綻した",
    },
    {
      title: "やらない判断が不在",
      body: "カスタマイズが多発し、開発規模が際限なく膨張した",
    },
    {
      title: "検証なしで進行",
      body: "リスクが顕在化し、5ヶ月の遅延が発生した",
    },
    {
      title: "学習ループなし",
      body: "計画引き直しを繰り返し、影響額14.9億円に到達した",
    },
  ];

  cells.forEach((cell, i) => {
    parts.addCard(slide, pres, theme, {
      x: cell.x,
      y: cell.y,
      w: cell.w,
      h: cell.h,
      accentColor: theme.ACCENTS[i % theme.ACCENTS.length],
      title: cardData[i].title,
      body: cardData[i].body,
      font,
    });
  });

  // 14.9億円を強調するアラートボックス
  addSoWhat(
    slide,
    "エンジニアの技術力ではなく判断の構造が弱かった",
    CONTENT_BOTTOM - 0.35
  );
}

// ─── Slide 6: PO候補には5条件が必要 ──────────────────────────

{
  const slide = newSlide();
  addBase(
    slide,
    "PO候補にはドメイン知識・SH調整・判断経験・信頼・段取り力の5条件が必要"
  );

  parts.addStyledTable(slide, pres, theme, {
    x: CONTENT_X,
    y: CONTENT_Y + 0.05,
    w: CONTENT_W,
    headers: ["#", "条件", "Krakenで欠けていたもの"],
    rows: [
      ["1", "業務ドメイン知識", "ギャップ見積もれず"],
      ["2", "SH調整経験", "カスタマイズ止まらず"],
      ["3", "判断の経験", "計画引き直し"],
      ["4", "エンジニアとの信頼", "リスク検証なし"],
      ["5", "段取り力", "体制混乱"],
    ],
    colW: [0.6, 3.3, 5.3],
    font,
  });

  addSoWhat(
    slide,
    "Krakenで欠けていたものから逆算した条件",
    CONTENT_Y + 2.80
  );
}

// ─── Slide 7: 調達は内部登用を最優先 ─────────────────────────

{
  const slide = newSlide();
  addBase(
    slide,
    "調達は内部登用を最優先。外部採用はスピードを上げたい場合に併用"
  );

  parts.addStyledTable(slide, pres, theme, {
    x: CONTENT_X,
    y: CONTENT_Y + 0.05,
    w: CONTENT_W,
    headers: ["方針", "いつ選ぶか", "強み"],
    rows: [
      ["内部登用", "最優先", "業務知識・信頼あり"],
      ["外部採用", "内部にいない場合", "即戦力だがドメイン知識ゼロ"],
      ["ジュニア育成", "中長期", "2年かけて育てる"],
      ["inet", "難しい枠", "異動リスク"],
    ],
    colW: [2.0, 3.0, 4.2],
    font,
  });

  addSoWhat(
    slide,
    "業務知識と信頼が既にある人が最も立ち上がりが速い",
    CONTENT_Y + 2.30
  );
}

// ─── Slide 8: PO配置方針 ────────────────────────────────────

{
  const slide = newSlide();
  addBase(
    slide,
    "PO配置方針：Naikist基準チーム、Fluppuccino・Discovery・Guardiansに段階配置"
  );

  parts.addStyledTable(slide, pres, theme, {
    x: CONTENT_X,
    y: CONTENT_Y + 0.05,
    w: CONTENT_W,
    headers: ["チーム", "現状", "方針"],
    rows: [
      ["Naikist", "福田さん", "基準チーム"],
      ["Fluppuccino", "伊藤さんPO候補", "段階的に権限拡大"],
      ["Discovery", "森さん兼務", "Ready定義導入"],
      ["Guardians", "迫田さん暫定→室山さん", "PO候補化検討"],
    ],
    colW: [2.0, 3.5, 3.7],
    font,
  });

  addSoWhat(
    slide,
    "4チーム全てにPO機能を安定化させる",
    CONTENT_Y + 2.30
  );
}

// ─── Slide 9: ジュニアは施策を1本任せる業務アサインで2年かけてPOに育てる ──

{
  const slide = newSlide();
  addBase(
    slide,
    "ジュニアは施策を1本任せる業務アサインで2年かけてPOに育てる"
  );

  parts.addStepProcess(slide, pres, theme, {
    x: CONTENT_X,
    y: CONTENT_Y + 0.05,
    w: CONTENT_W,
    h: 2.8,
    steps: [
      {
        title: "1年目:\n施策を1本回す",
        body: "POがメンターとして伴走し判断の型をフィードバック",
      },
      {
        title: "2年目前半:\nペアPO",
        body: "育成フレームに乗り段階的にPO化",
      },
      {
        title: "2年目後半:\n独り立ち",
        body: "チームのPOとして自律的に判断",
      },
    ],
    font,
  });

  addSoWhat(
    slide,
    "育成と打席数の拡大が両立する",
    CONTENT_Y + 3.00
  );
}

// ─── Slide 10: PO育成は既存POペア×Odd-e支援の2本柱 ─────────

{
  const slide = newSlide();
  addBase(
    slide,
    "PO育成は既存POペア×Odd-e支援の2本柱。既存PO自身も底上げされる"
  );

  parts.addComparisonColumns(slide, pres, theme, {
    x: CONTENT_X,
    y: CONTENT_Y + 0.05,
    w: CONTENT_W,
    h: 2.8,
    before: {
      title: "既存POとのペア",
      items: [
        "判断の型を体験する",
        "段階的に権限を拡大する",
        "PO負荷が下がる",
      ],
    },
    after: {
      title: "Odd-e支援",
      items: [
        "判断の質にフィードバック",
        "候補者との1on1",
        "既存POも底上げされる",
      ],
    },
    font,
  });

  addSoWhat(
    slide,
    "SM育成と同じ構造をPOにも作る",
    CONTENT_Y + 3.00
  );
}

// ─── Slide 11: 室山さんはKraken業務知識・SH調整・Guardiansとの協働が揃い最も適任 ──

{
  const slide = newSlide();
  addBase(
    slide,
    "室山さんはKraken業務知識・SH調整・Guardiansとの協働が揃い最も適任"
  );

  parts.addStyledTable(slide, pres, theme, {
    x: CONTENT_X,
    y: CONTENT_Y + 0.05,
    w: CONTENT_W,
    headers: ["適性", "根拠"],
    rows: [
      ["業務知識", "Kraken1年の実績"],
      ["PO的スキル", "要件整理・ディレクション・SH調整・前職PM"],
      ["ネットワーク", "エネ事とのパイプ"],
      ["エンジニア関係", "Guardiansと協働済み"],
    ],
    colW: [2.5, 6.7],
    font,
  });

  addSoWhat(
    slide,
    "本人もプロダクト開発側へのシフトを志向",
    CONTENT_Y + 2.30
  );
}

// ─── ファイル出力 ────────────────────────────────────────────

const outputPath = path.join(
  __dirname,
  "../outputs/pptx/2026-04-05_po-supply-pipeline.pptx"
);
pres.writeFile({ fileName: outputPath }).then(() => {
  console.log(`Created: ${outputPath}`);
});
