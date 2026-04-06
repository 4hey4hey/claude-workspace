// ============================================================
// AI時代に淘汰されるプロダクト開発関係者
// ============================================================
"use strict";

const PptxGenJS = require("pptxgenjs");
const { getTheme, getFontPreset, parts } = require("./lib");

const pres = new PptxGenJS();
pres.title = "AI時代に淘汰されるプロダクト開発関係者";

const theme = getTheme("corporate");
const font = getFontPreset("corporate");

const CY = 1.35;
const CX = 0.4;
const CW = 9.2;

function newSlide() {
  const s = pres.addSlide();
  s.background = { color: "FFFFFF" };
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
// Slide 0: Cover
// ─────────────────────────────────────────────────────────────
{
  const s = newSlide();
  parts.addCoverTitle(s, pres, theme, {
    title: "AI時代に淘汰される\nプロダクト開発関係者",
    subtitle: "マネジメント向け — 人材ポートフォリオ再考の提言",
    date: "2026.04.04",
    author: "デジタルプラットフォームＧ",
    font,
  });
  parts.addBottomBar(s, pres, theme);
}

// ─────────────────────────────────────────────────────────────
// Slide 1: Timeline — AIコーディングツールの進化
// ─────────────────────────────────────────────────────────────
{
  const s = contentSlide(
    "AI時代の変化",
    "AIコーディングツールは「補助」から「代替」フェーズに入った",
  );

  parts.addTimeline(s, pres, theme, {
    x: CX,
    y: CY,
    w: CW,
    h: 3.6,
    font,
    events: [
      {
        date: "2022",
        title: "GitHub Copilot",
        body: "コード補完\n（補助フェーズ）",
      },
      { date: "2024", title: "Cursor", body: "AI統合IDE\n（協調フェーズ）" },
      {
        date: "2025",
        title: "Claude Code\nDevin",
        body: "AI自律コーディング\n（代替フェーズ）",
      },
      { date: "2026", title: "自律開発Agent", body: "設計〜テスト\n一気通貫" },
    ],
  });

  // だから何？
  parts.addAlertBox(s, pres, theme, {
    x: CX,
    y: 5.05,
    w: CW,
    h: 0.35,
    text: "「AIは使えない」という認識を今すぐ更新すべき — 補助ではなく代替が始まっている",
    type: "warn",
    font,
  });
}

// ─────────────────────────────────────────────────────────────
// Slide 2: Matrix 2x2 — 判断力 × 実装力
// ─────────────────────────────────────────────────────────────
{
  const s = contentSlide(
    "AI時代の変化",
    "淘汰されるのは「手を動かす人」ではなく「判断しない人」である",
  );

  parts.addMatrix2x2(s, pres, theme, {
    x: CX,
    y: CY,
    w: CW,
    h: 3.6,
    font,
    xAxisLabel: "実装力",
    yAxisLabel: "判断力",
    quadrants: [
      {
        title: "不可替人材",
        body: "判断力◎ × 実装力◎\nPdM, アーキテクト\nAIを武器にする人",
      },
      {
        title: "価値シフト必要",
        body: "判断力◎ × 実装力△\n旧来型マネージャー\n→判断に集中で活路",
      },
      {
        title: "AI代替リスク高",
        body: "判断力△ × 実装力◎\n指示待ちコーダー\n→AIに置き換わる",
      },
      {
        title: "淘汰対象",
        body: "判断力△ × 実装力△\n定型作業の中継者\n→存在理由が消失",
      },
    ],
  });

  s.addText("出典: 各社AI製品のベンチマーク・SWE-bench等の業界知見から作成", {
    x: CX,
    y: 5.15,
    w: CW,
    h: 0.2,
    fontSize: 8,
    color: theme.ST,
    fontFace: font.jp,
    italic: true,
    margin: 0,
  });
}

// ─────────────────────────────────────────────────────────────
// Slide 3: ComparisonColumns — 縮小 vs 拡大する役割
// ─────────────────────────────────────────────────────────────
{
  const s = contentSlide(
    "AI時代の変化",
    "5つの役割が構造的に縮小し、3つの役割が拡大する",
  );

  parts.addComparisonColumns(s, pres, theme, {
    x: CX,
    y: CY,
    w: CW,
    h: 3.8,
    font,
    before: {
      title: "構造的に縮小する役割",
      items: [
        "定型コーダー（AIが同等品質で代替）",
        "手動テスター（自動生成テストに移行）",
        "設定・構築管理者（IaCの自動化）",
        "翻訳的PM（伝言機能はAIで十分）",
        "定型レビュアー（静的解析+AIレビュー）",
      ],
    },
    after: {
      title: "拡大・高度化する役割",
      items: [
        "PdM / PO（What/Whyの意思決定者）",
        "アーキテクト（全体設計・技術判断）",
        "SRE / Platform Eng（信頼性・基盤）",
      ],
    },
  });

  s.addText("採用・育成の重点を「縮小側 → 拡大側」にシフトする", {
    x: CX,
    y: 5.2,
    w: CW,
    h: 0.2,
    fontSize: 10,
    bold: true,
    color: theme.A,
    fontFace: font.jp,
    align: "center",
    margin: 0,
  });
}

// ─────────────────────────────────────────────────────────────
// Slide 4: Pyramid — 不可替の条件
// ─────────────────────────────────────────────────────────────
{
  const s = contentSlide(
    "AI時代の変化",
    "「What/Whyを決められる人」だけが不可替になる",
  );

  parts.addPyramid(s, pres, theme, {
    x: CX + 0.8,
    y: CY,
    w: CW - 1.6,
    h: 3.5,
    font,
    levels: [
      { title: "事業判断（What / Why）", body: "人間が独占 — AIは代替不可" },
      { title: "設計判断（How）", body: "AI協調 — 人間がレビュー・最終判断" },
      { title: "実装（Do）", body: "AI主導 — 人間は例外処理のみ" },
      { title: "AI自動化領域", body: "テスト・ビルド・デプロイ・監視" },
    ],
  });

  s.addText("組織の評価基準を「アウトプット量 → 意思決定の質」に変える", {
    x: CX,
    y: 5.15,
    w: CW,
    h: 0.2,
    fontSize: 10,
    bold: true,
    color: theme.A,
    fontFace: font.jp,
    align: "center",
    margin: 0,
  });
}

// ─────────────────────────────────────────────────────────────
// Slide 5: 3 Cards — DPG固有の構造的リスク
// ─────────────────────────────────────────────────────────────
{
  const s = contentSlide(
    "当組織への示唆",
    "当組織（DPG）にも3つの構造的リスクがある",
  );

  const gap = 0.25;
  const cardW = (CW - gap * 2) / 3;

  const risks = [
    {
      title: "リスク①",
      body: "PO機能の属人化",
      detail:
        "PO判断が特定個人に集中。AIが実装を代替するほどPO負荷が増大し、ボトルネック化する",
    },
    {
      title: "リスク②",
      body: "SM/コーチの役割再定義",
      detail:
        "AIがファシリテーション・可視化を代替すると、SM固有の価値が「組織学習の設計」に移行する",
    },
    {
      title: "リスク③",
      body: "SWEチームのスキル転換",
      detail:
        "実装スキル中心の評価体系のまま放置すると、AI時代に必要な設計・判断スキルへの転換が遅れる",
    },
  ];

  risks.forEach((r, i) => {
    const x = CX + i * (cardW + gap);
    parts.addCard(s, pres, theme, {
      x,
      y: CY,
      w: cardW,
      h: 3.6,
      font,
      title: r.title,
      body: "",
    });

    // リスク名（大きめ）
    s.addText(r.body, {
      x: x + 0.15,
      y: CY + 0.55,
      w: cardW - 0.3,
      h: 0.5,
      fontSize: 14,
      bold: true,
      color: theme.A,
      fontFace: font.jp,
      align: "center",
      valign: "middle",
      margin: 0,
    });

    // 詳細説明
    s.addText(r.detail, {
      x: x + 0.15,
      y: CY + 1.2,
      w: cardW - 0.3,
      h: 2.2,
      fontSize: 10,
      color: theme.DT,
      fontFace: font.jp,
      align: "left",
      valign: "top",
      margin: 0,
      lineSpacingMultiple: 1.4,
    });
  });

  s.addText("半年以内にリスク対応の優先順位を決める", {
    x: CX,
    y: 5.15,
    w: CW,
    h: 0.2,
    fontSize: 10,
    bold: true,
    color: theme.A,
    fontFace: font.jp,
    align: "center",
    margin: 0,
  });
}

// ─────────────────────────────────────────────────────────────
// Slide 6: StepProcess — ネクストアクション
// ─────────────────────────────────────────────────────────────
{
  const s = contentSlide(
    "ネクストアクション",
    "人材ポートフォリオの棚卸しと再配置を開始する",
  );

  parts.addStepProcess(s, pres, theme, {
    x: CX,
    y: CY,
    w: CW,
    h: 2.2,
    font,
    steps: [
      {
        title: "人材棚卸し",
        body: "現メンバーの\nスキル×判断力を\nマッピング",
      },
      {
        title: "スキルマップ",
        body: "AI時代に必要な\nスキルセットを\n定義・共有",
      },
      {
        title: "再配置計画",
        body: "縮小領域→拡大領域\nへのローテーション\n計画を策定",
      },
    ],
  });

  parts.addStyledTable(s, pres, theme, {
    x: CX,
    y: 3.75,
    w: CW,
    headers: ["アクション", "担当", "期限"],
    colW: [5.5, 1.8, 1.9],
    fontSize: 9,
    rowH: 0.35,
    rows: [
      ["人材棚卸し（スキル×判断力マッピング）", "杉﨑", "2026年5月末"],
      ["AI時代スキルマップの定義・共有", "杉﨑 + 中島", "2026年6月末"],
      ["再配置計画の策定・GM承認", "杉﨑 + 髙松", "2026年8月末"],
    ],
    font,
  });
}

// ─────────────────────────────────────────────────────────────
// 出力
// ─────────────────────────────────────────────────────────────
pres
  .writeFile({ fileName: "outputs/pptx/ai-era-obsolescence.pptx" })
  .then(() => console.log("OK: outputs/pptx/ai-era-obsolescence.pptx"))
  .catch((e) => {
    console.error("ERROR:", e.message);
    process.exit(1);
  });
