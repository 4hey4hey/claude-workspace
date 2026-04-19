// ============================================================
// DMチーム FY26 OKR 説明資料（及川GM向け・1on1投影想定）
// 17枚構成 / corporateテーマ / 白背景＋ネイビー基調
// ソース: outputs/docs/issues/organization/2026-04-19_dm-okr-fy26-draft.md
// スキル方針: 情報密度「多め」（元コンテキスト保存）。必須/任意は設計テンプレ参照
// ============================================================

const PptxGenJS = require("pptxgenjs");
const { getTheme, getFontPreset, parts } = require("./lib");
const { SLIDE } = require("./lib/layout");

const theme = getTheme("corporate");
const font = getFontPreset("corporate");
const pres = new PptxGenJS();

const BC = "DMチーム FY26 OKR";
const OUTPUT = "outputs/pptx/2026-04-19_dm-okr-fy26-for-gm.pptx";

// KR名称（短名＋説明文）
const KR = {
  c1: { short: "挑戦KR1 入口品質", desc: "開発に入る前の前提整理・要求定義の曖昧さをなくし、仕様起因の手戻りをゼロにする" },
  c2: { short: "挑戦KR2 フロー効率", desc: "開発工程のムリ・ムダ・ムラをなくし、案件を停滞させずスムーズに顧客へ届ける" },
  c3: { short: "挑戦KR3 学習ループ", desc: "リリースして終わりにせず、お客様の反応を見て「次にやること／やめること」を決める" },
  f1: { short: "基盤KR1 健全性＋開発環境", desc: "健全性・サブKPI・開発環境を整え、チームが走り続けられる土台を通年で担保する" },
  f2: { short: "基盤KR2 能力の多面的強化", desc: "プロセス・人・基盤の3層を同時に強化し、中長期的にデリバリー組織そのものを強くする" },
  f3: { short: "基盤KR3 事業貢献PDCA", desc: "事業側との四半期相互検証で、配置メンバーの事業貢献に相互納得を形成し外部妥当性を担保する" },
};

// 共通パーツ付与関数
function addFrame(slide, breadcrumb, title) {
  slide.background = { color: "FFFFFF" };
  parts.addHeader(slide, pres, theme, { breadcrumb, font });
  parts.addBottomBar(slide, pres, theme);
  if (title) parts.addSlideTitle(slide, pres, theme, { title, font });
}

// KR個別スライド用: 2行タイトル（短名＋説明文）
function addKRTitle(slide, kr) {
  slide.background = { color: "FFFFFF" };
  // 1行目：短名（大きめ）
  slide.addText(kr.short, {
    x: 0.4, y: 0.42, w: 9.2, h: 0.42,
    fontSize: 18, bold: true, color: theme.DT, fontFace: font.jp,
    align: "left", valign: "middle", margin: 0,
  });
  // 2行目：説明文（小さめ）
  slide.addText(`─ ${kr.desc}`, {
    x: 0.4, y: 0.82, w: 9.2, h: 0.35,
    fontSize: 12, color: theme.ST, fontFace: font.jp,
    align: "left", valign: "middle", margin: 0,
  });
  // セパレータ
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 1.22, w: SLIDE.W, h: 0.01,
    fill: { color: theme.S }, line: { color: theme.S },
  });
}

// 「だから何？」サブタイトル
function addSoWhat(slide, text, y) {
  slide.addText(text, {
    x: 0.4, y: y || 1.2, w: 9.2, h: 0.3,
    fontSize: 12, italic: true, color: theme.ST, fontFace: font.jp,
    align: "left", valign: "middle", margin: 0,
  });
}

// ============================================================
// Slide 1: 表紙【必須】
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addCoverTitle(slide, pres, theme, {
    title: "DMチーム FY26 OKR",
    subtitle: "顧客価値を、正しく・速く・持続的に届けるデリバリーラインを確立する",
    date: "2026-04-19",
    author: "杉崎 TL（及川GM向け説明資料）",
    font,
  });
  parts.addBottomBar(slide, pres, theme);
}

// ============================================================
// Slide 2: これは何 / 3行サマリ【必須】
// ============================================================
{
  const slide = pres.addSlide();
  addFrame(slide, BC + "  >  本資料について",
    "杉崎TL＝チームOKR（一層統合）を、挑戦3＋基盤3の6本で構成する");
  addSoWhat(slide, "だから、構造自体へのご承認をいただきたい（別論点2件は次回以降の議題）");

  const cards = [
    { title: "① 一層統合モデル", body: "杉崎個人O＝チームO。SM/PO/DMの個人OはこのO由来で統一。ファイル一本化。（二層化は規模拡大時に再検討）" },
    { title: "② 挑戦3＋基盤3", body: "挑戦KR（入口品質／フロー効率／学習ループ）＋基盤KR（健全性／能力強化／事業貢献PDCA）の6本建て。" },
    { title: "③ 別論点2件", body: "Mission外のCorp兼務業務、Kraken PdM不在。本日は議題化まで。承認は次回以降。" },
  ];
  const cardY = 1.65, cardH = 2.6, gap = 0.2;
  const cardW = (9.2 - gap * 2) / 3;
  cards.forEach((c, i) => {
    parts.addCard(slide, pres, theme, {
      x: 0.4 + i * (cardW + gap), y: cardY, w: cardW, h: cardH,
      title: c.title, body: c.body, font,
    });
  });

  parts.addAlertBox(slide, pres, theme, {
    x: 0.4, y: 4.55, w: 9.2, h: 0.75, type: "info",
    text: "※ メンバー別OKR連鎖・Q1ロードマップは 2026-04-05 既報告（KR②計画・Q1スケジュール詳細）に記載。本資料ではOKR構造そのものに絞る。",
    font,
  });
}

// ============================================================
// Slide 3: 設計前提（5つの確定事項）【必須】 ← NEW
// ============================================================
{
  const slide = pres.addSlide();
  addFrame(slide, BC + "  >  設計前提",
    "壁打ちを通じて確定した5つの設計判断 ── OKR構造の根拠");
  addSoWhat(slide, "だから、OKR構造そのものへの合意が、本日の承認の前提となる");

  parts.addStyledTable(slide, pres, theme, {
    x: 0.4, y: 1.6, w: 9.2,
    headers: ["#", "論点", "選択", "意味"],
    rows: [
      ["0", "チームOKRと個人OKRの関係", "(β) 一層統合", "チームO＝杉崎個人O。SM/PO/DMのOはこのO由来で統一"],
      ["1", "Objective文言", "ハイブリッド案", "A案骨格＋「顧客価値」差し込み。5KRとの論理的写像を維持しつつ経営言語に寄せる"],
      ["2", "KR構成", "挑戦3＋基盤3（KR⑦独立）", "DPG KR⑦（事業貢献PDCA）は基盤KR3として独立。詳細KPIは後日3者で確定"],
      ["3", "織り込み構造", "モデルA（機能提供者）", "デリバリーはHow（プロセスの質）、ビジネス側がWhat（成果）に責任"],
      ["4", "個人OKRの流入", "2系統", "チームKR由来（全員）＋DPG KR由来（該当者のみ、PJ責任者／支援者）"],
    ],
    colW: [0.5, 2.8, 2.4, 3.5], rowH: 0.6, fontSize: 11, font,
  });

  parts.addAlertBox(slide, pres, theme, {
    x: 0.4, y: 4.95, w: 9.2, h: 0.4, type: "info",
    text: "見せ場の想定：及川GMとの1on1（口頭補足可能な前提）",
    font,
  });
}

// ============================================================
// Slide 4: Mission と Objective【必須】
// ============================================================
{
  const slide = pres.addSlide();
  addFrame(slide, BC + "  >  Mission と Objective",
    "作る力を、届く価値に変える ── 顧客価値を正しく・速く・持続的に届ける");
  addSoWhat(slide, "だから、Missionと6KRは「ムダ／ムリ／ムラ」×「3軸」で整合している");

  parts.addCard(slide, pres, theme, {
    x: 0.4, y: 1.65, w: 4.4, h: 1.5,
    title: "Mission",
    body: "作る力を、届く価値に変える。\n作る力が価値まで流れ切るように、流れを整える。ムダなく・ムリなく・ムラなく。",
    font,
  });
  parts.addCard(slide, pres, theme, {
    x: 5.0, y: 1.65, w: 4.6, h: 1.5,
    title: "Objective",
    body: "顧客価値を、正しく・速く・持続的に届けるデリバリーラインを確立する。",
    accentColor: theme.A, font,
  });

  parts.addStyledTable(slide, pres, theme, {
    x: 0.4, y: 3.35, w: 9.2,
    headers: ["3軸", "意味", "担うKR"],
    rows: [
      ["正しく", "何を作るかの判断・検証の質", "挑戦KR1（入口品質）＋挑戦KR3（学習ループ）"],
      ["速く", "着手からリリースまでのスピード", "挑戦KR2（フロー効率）"],
      ["持続的に", "走り続けられる土台", "基盤KR1（健全性）＋基盤KR2（能力強化）"],
    ],
    colW: [1.4, 3.6, 4.2], rowH: 0.45, font,
  });

  parts.addAlertBox(slide, pres, theme, {
    x: 0.4, y: 4.95, w: 9.2, h: 0.4, type: "warn",
    text: "※ 当チームは「事業成果が生まれる条件」を整備する側（How責任）。事業成果（会員数・送客等）の責任は各プロダクト責任者（片山TL／髙松TL／柏木TL／湯浅PdM等）。",
    font,
  });
}

// ============================================================
// Slide 5: OKRツリー（O → 挑戦／基盤 → 6KR）【任意】 ← NEW
// ============================================================
{
  const slide = pres.addSlide();
  addFrame(slide, BC + "  >  OKRツリー",
    "Objectiveは挑戦3KR／基盤3KRに分解される ── 6KRは漏れなくObjectiveを支える");
  addSoWhat(slide, "だから、6KRは意図的な網羅設計であり、分散した寄せ集めではない");

  // ── レベル1: Objective（ルート） ──────────────
  const oY = 1.55, oH = 0.55, oX = 2.0, oW = 6.0;
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: oX, y: oY, w: oW, h: oH,
    fill: { color: theme.P }, rectRadius: 0.03,
  });
  slide.addText([
    { text: "O ", options: { fontSize: 10, color: theme.WH, fontFace: font.jp } },
    { text: "顧客価値を、正しく・速く・持続的に届けるデリバリーラインを確立する", options: { fontSize: 12, bold: true, color: theme.WH, fontFace: font.jp } },
  ], {
    x: oX, y: oY, w: oW, h: oH,
    align: "center", valign: "middle", margin: 0,
  });

  // 垂直コネクタ（Oの下 → 分岐点）
  const centerX = oX + oW / 2; // = 5.0
  const branchY = oY + oH + 0.1; // 2.2
  const splitY = branchY + 0.18; // 2.38
  slide.addShape(pres.shapes.RECTANGLE, {
    x: centerX - 0.01, y: oY + oH, w: 0.02, h: branchY - (oY + oH),
    fill: { color: theme.P }, line: { color: theme.P },
  });

  // 水平スプリット線
  const lX = 2.3, rX = 7.7; // 挑戦／基盤 ノードの中心
  slide.addShape(pres.shapes.RECTANGLE, {
    x: lX, y: branchY - 0.01, w: rX - lX, h: 0.02,
    fill: { color: theme.P }, line: { color: theme.P },
  });
  // 両端の垂直ドロップ
  slide.addShape(pres.shapes.RECTANGLE, {
    x: lX - 0.01, y: branchY, w: 0.02, h: 0.18,
    fill: { color: theme.P }, line: { color: theme.P },
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: rX - 0.01, y: branchY, w: 0.02, h: 0.18,
    fill: { color: theme.P }, line: { color: theme.P },
  });

  // ── レベル2: 挑戦 / 基盤 ──────────────────────
  const catY = splitY, catH = 0.4, catW = 3.4;
  const lcX = lX - catW / 2, rcX = rX - catW / 2;
  // 挑戦
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: lcX, y: catY, w: catW, h: catH,
    fill: { color: theme.P }, rectRadius: 0.03,
  });
  slide.addText("挑戦（速く届ける能力を磨く）", {
    x: lcX, y: catY, w: catW, h: catH,
    fontSize: 12, bold: true, color: theme.WH, fontFace: font.jp,
    align: "center", valign: "middle", margin: 0,
  });
  // 基盤
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: rcX, y: catY, w: catW, h: catH,
    fill: { color: theme.ST }, rectRadius: 0.03,
  });
  slide.addText("基盤（走り続ける土台を守る）", {
    x: rcX, y: catY, w: catW, h: catH,
    fontSize: 12, bold: true, color: theme.WH, fontFace: font.jp,
    align: "center", valign: "middle", margin: 0,
  });

  // ── レベル3: 6KR（各カテゴリ下に3つずつ縦スタック） ──
  const krY = catY + catH + 0.2; // 2.98
  const krH = 0.68, krGap = 0.08;

  const challengeKRs = [
    { num: "KR1", title: "入口品質", desc: KR.c1.desc, tag: "見極める／ムダ" },
    { num: "KR2", title: "フロー効率", desc: KR.c2.desc, tag: "速くする／ムダ" },
    { num: "KR3", title: "学習ループ", desc: KR.c3.desc, tag: "見極める／ムダ" },
  ];
  const foundationKRs = [
    { num: "KR1", title: "健全性＋開発環境", desc: KR.f1.desc, tag: "守る／ムリ" },
    { num: "KR2", title: "能力の多面的強化", desc: KR.f2.desc, tag: "強くする／ムラ" },
    { num: "KR3", title: "事業貢献PDCA", desc: KR.f3.desc, tag: "見極め×強く／外部妥当性" },
  ];

  function drawKRNode(k, x, y, w, h, borderColor) {
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w, h,
      fill: { color: theme.CB }, line: { color: borderColor, width: 1 },
      rectRadius: 0.03,
    });
    slide.addText([
      { text: `${k.num} ${k.title}`, options: { fontSize: 12, bold: true, color: theme.P, fontFace: font.jp } },
      { text: `\n${k.desc}`, options: { fontSize: 8, color: theme.DT, fontFace: font.jp } },
      { text: `\n（${k.tag}）`, options: { fontSize: 8, italic: true, color: theme.ST, fontFace: font.jp } },
    ], {
      x: x + 0.12, y, w: w - 0.24, h,
      align: "left", valign: "middle", margin: 0, lineSpacingMultiple: 1.2,
    });
  }

  // 挑戦KRコネクタ（カテゴリ下部→縦スパイン→各KRへ）
  const lSpineX = lcX + catW / 2; // 挑戦ノード中心 = 2.3
  const lKrX = lcX; // KRは挑戦と同じ左右位置に配置 → w=3.4
  // 縦スパイン：カテゴリ下(y=catY+catH) → 最後のKR中心
  const lastKrCenterY = krY + 2 * (krH + krGap) + krH / 2; // 最後のKR中心
  slide.addShape(pres.shapes.RECTANGLE, {
    x: lSpineX - 0.01, y: catY + catH, w: 0.02, h: lastKrCenterY - (catY + catH),
    fill: { color: theme.P }, line: { color: theme.P },
  });
  // 各KRへの水平枝（左側）
  challengeKRs.forEach((k, i) => {
    const y = krY + i * (krH + krGap);
    const centerY = y + krH / 2;
    // 水平コネクタ（スパイン→KR右端）
    slide.addShape(pres.shapes.RECTANGLE, {
      x: lSpineX, y: centerY - 0.01, w: (lKrX + catW) - lSpineX, h: 0.02,
      fill: { color: theme.P }, line: { color: theme.P },
    });
    drawKRNode(k, lKrX, y, catW, krH, theme.P);
  });

  // 基盤KRコネクタ
  const rSpineX = rcX + catW / 2; // 7.7
  const rKrX = rcX;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: rSpineX - 0.01, y: catY + catH, w: 0.02, h: lastKrCenterY - (catY + catH),
    fill: { color: theme.ST }, line: { color: theme.ST },
  });
  foundationKRs.forEach((k, i) => {
    const y = krY + i * (krH + krGap);
    const centerY = y + krH / 2;
    slide.addShape(pres.shapes.RECTANGLE, {
      x: rKrX, y: centerY - 0.01, w: rSpineX - rKrX, h: 0.02,
      fill: { color: theme.ST }, line: { color: theme.ST },
    });
    drawKRNode(k, rKrX, y, catW, krH, theme.ST);
  });
}

// ============================================================
// Slide 6: 成果の方程式と先行指標ロジック【必須】
// ============================================================
{
  const slide = pres.addSlide();
  addFrame(slide, BC + "  >  成果の方程式",
    "試行回数 × 施策精度 ＝ 事業成果。チームは\"How\"側の先行指標で達成確度を高める");
  addSoWhat(slide, "だから、事業側（What）と役割分担が明確。サブKPIで早さ暴走を抑止");

  parts.addFlowHorizontal(slide, pres, theme, {
    x: 0.4, y: 1.6, w: 9.2, h: 0.9,
    steps: [
      { title: "試行回数", body: "打席数" },
      { title: "施策の精度", body: "仮説・検証の質" },
      { title: "＝ 事業成果", body: "会員・送客・熱狂顧客" },
    ],
    font,
  });

  parts.addStyledTable(slide, pres, theme, {
    x: 0.4, y: 2.7, w: 9.2,
    headers: ["指標の性質", "例", "用途"],
    rows: [
      ["アウトカム指標／遅行指標", "会員数・GP契約数・PJ達成度", "結果が出ないと計測できない"],
      ["ケイパビリティ指標／先行指標（DPG KR②）", "内製化組織の組織能力", "早期予測・原因分析・継続的改善"],
    ],
    colW: [3.2, 3.0, 3.0], rowH: 0.55, font,
  });

  parts.addAlertBox(slide, pres, theme, {
    x: 0.4, y: 4.45, w: 9.2, h: 0.85, type: "warn",
    text: "早さを追うことが目的ではない。サブKPI（変更失敗率15%以下／開発者満足度SPACE軸4.0以上）で健全性を担保する。「仮説・検証・学習が止まらず高速に巡るプロダクト開発のカタ」の定着が本筋。",
    font,
  });
}

// ============================================================
// Slide 7: 目標根拠 DORA High レベル【任意】 ← NEW
// ============================================================
{
  const slide = pres.addSlide();
  addFrame(slide, BC + "  >  目標根拠",
    "「平均1ヶ月以内」＝DORA High ── 世界最大の開発組織ベンチマークの水準");
  addSoWhat(slide, "だから、挑戦KR1／KR2／KR3の定量目標は恣意的設定ではなく、グローバル基準に基づく");

  // DORA 4段階
  parts.addStyledTable(slide, pres, theme, {
    x: 0.4, y: 1.6, w: 9.2,
    headers: ["レベル", "リードタイム", "代表組織／水準"],
    rows: [
      ["Elite", "1時間以内", "Amazon / Netflix / Google など"],
      ["High（← 目標）", "1日〜1ヶ月", "メガベンチャー・デジタル先進企業"],
      ["Medium", "1ヶ月〜6ヶ月", "一般的なIT企業"],
      ["Low", "6ヶ月以上", "レガシー運用企業"],
    ],
    colW: [2.2, 2.5, 4.5], rowH: 0.5, fontSize: 11, font,
  });

  parts.addCard(slide, pres, theme, {
    x: 0.4, y: 4.2, w: 9.2, h: 1.2,
    title: "なぜ Highレベル か",
    body: "DORA（Google傘下、10年研究、世界最大の開発組織ベンチマーク）の4段階のうち、メガベンチャー・デジタル先進企業相当のHighを目標に設定。FY28末到達を前提に、FY26はベースライン確定＋下降トレンドで進捗を測る。",
    font,
  });
}

// ============================================================
// Slide 8: DPG KR② 4アプローチ × チーム6KR 接続マトリクス【必須】
// ============================================================
{
  const slide = pres.addSlide();
  addFrame(slide, BC + "  >  DPG KR接続",
    "DPG KR②4アプローチ（計測／入口／フロー／学習）をチーム6KRが直接受ける");
  addSoWhat(slide, "だから、上位OKRとの紐付けが構造的に保証される（6KR中5本が◎直接接続）");

  parts.addAlertBox(slide, pres, theme, {
    x: 0.4, y: 1.6, w: 9.2, h: 0.55, type: "info",
    text: "6KR中 ◎直接接続 5本／○安全装置 1本（基盤KR1のみ、暴走防止として意図的配置）",
    font,
  });

  parts.addStyledTable(slide, pres, theme, {
    x: 0.4, y: 2.3, w: 9.2,
    headers: ["チームKR", "DPG KR接続", "接続強度"],
    rows: [
      ["挑戦KR1 入口品質", "DPG KR② アプローチ②（入口品質）", "◎ 直接受け"],
      ["挑戦KR2 フロー効率", "DPG KR② アプローチ③（フロー効率）", "◎ 直接受け"],
      ["挑戦KR3 学習ループ", "DPG KR② アプローチ④（学習ループ）", "◎ 直接受け"],
      ["基盤KR1 健全性＋開発環境", "DPG KR② サブKPI（変更失敗率／SPACE）", "○ 安全装置"],
      ["基盤KR2 能力強化", "DPG KR② アプローチ①（計測基盤）＋DPG KR⑥（コスト改善）", "◎ 直接受け／直接貢献"],
      ["基盤KR3 事業貢献PDCA", "DPG KR⑦（事業側との相互検証）", "◎ 直接受け"],
    ],
    colW: [2.6, 4.4, 2.2], rowH: 0.44, fontSize: 11, font,
  });
}

// ============================================================
// Slide 9: KR構造全体像【必須】
// ============================================================
{
  const slide = pres.addSlide();
  addFrame(slide, BC + "  >  KR構造全体像",
    "挑戦3KRで速く届ける能力を磨き、基盤3KRで走り続ける土台を守る");
  addSoWhat(slide, "だから、6KRは分散ではなく役割分担（攻め／守り）である");

  const colY = 1.6, colH = 3.75, colW = 4.5;

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: colY, w: colW, h: 0.45,
    fill: { color: theme.P }, rectRadius: 0.03,
  });
  slide.addText("【挑戦】速く届ける能力を磨く（ムダを減らす）", {
    x: 0.4, y: colY, w: colW, h: 0.45,
    fontSize: 13, bold: true, color: theme.WH, fontFace: font.jp,
    align: "center", valign: "middle", margin: 0,
  });
  const challengeItems = [
    { title: KR.c1.short, body: KR.c1.desc },
    { title: KR.c2.short, body: KR.c2.desc },
    { title: KR.c3.short, body: KR.c3.desc },
  ];
  challengeItems.forEach((c, i) => {
    parts.addCard(slide, pres, theme, {
      x: 0.4, y: colY + 0.6 + i * 1.08, w: colW, h: 0.98,
      title: c.title, body: c.body, font,
    });
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: colY, w: colW, h: 0.45,
    fill: { color: theme.ST }, rectRadius: 0.03,
  });
  slide.addText("【基盤】走り続ける土台を守る（ムリ・ムラを抑える）", {
    x: 5.1, y: colY, w: colW, h: 0.45,
    fontSize: 13, bold: true, color: theme.WH, fontFace: font.jp,
    align: "center", valign: "middle", margin: 0,
  });
  const foundationItems = [
    { title: KR.f1.short, body: KR.f1.desc },
    { title: KR.f2.short, body: KR.f2.desc },
    { title: KR.f3.short, body: KR.f3.desc },
  ];
  foundationItems.forEach((c, i) => {
    parts.addCard(slide, pres, theme, {
      x: 5.1, y: colY + 0.6 + i * 1.08, w: colW, h: 0.98,
      title: c.title, body: c.body, accentColor: theme.ST, font,
    });
  });
}

// ============================================================
// 共通: 挑戦KR 4ブロック＋先行KPI レイアウト
// ============================================================
function addChallengeKRBody(slide, opts) {
  const { aim, issue, milestone, plan, kpi } = opts;
  const gx = [0.4, 5.0];
  const gy = [1.6, 3.3];
  const bw = 4.6;
  const bh = 1.6;

  parts.addCard(slide, pres, theme, {
    x: gx[0], y: gy[0], w: bw, h: bh,
    title: "狙い", body: aim, font,
  });
  parts.addCard(slide, pres, theme, {
    x: gx[1], y: gy[0], w: bw, h: bh,
    title: "問題認識", body: issue, accentColor: theme.ERROR_BD, font,
  });
  parts.addCard(slide, pres, theme, {
    x: gx[0], y: gy[1], w: bw, h: bh,
    title: "年度マイルストーン", body: milestone, accentColor: theme.A, font,
  });
  parts.addCard(slide, pres, theme, {
    x: gx[1], y: gy[1], w: bw, h: bh,
    title: "主要施策（FY26）", body: plan, font,
  });

  // 先行KPI（下段1行）
  parts.addAlertBox(slide, pres, theme, {
    x: 0.4, y: 5.0, w: 9.2, h: 0.4, type: "ok",
    text: `先行KPI（途中確認指標）：${kpi}`,
    font,
  });
}

// ============================================================
// Slide 10: 挑戦KR1 入口品質【必須】
// ============================================================
{
  const slide = pres.addSlide();
  parts.addHeader(slide, pres, theme, { breadcrumb: BC + "  >  挑戦KR1 入口品質", font });
  parts.addBottomBar(slide, pres, theme);
  addKRTitle(slide, KR.c1);
  addSoWhat(slide, "だから、人を増やすのではなく仕様・判断・スコープの制御を先に整える（FY28末 DORA High達成、FY26はベースライン確定）", 1.28);

  addChallengeKRBody(slide, {
    aim: "開発に入る「前」で時間を失うことを止め、\n開発中の手戻りと方向違いの実装を減らす。",
    issue: "Naikistのデプロイ頻度は1週間。遅さの本質は開発「前後」── 仕様確定遅延、PO判断待ち、並行PJ依存、スコープ膨張。エンジニア人数・技術力ではなく仕様制御の問題。",
    milestone: "FY26末：ベースライン確定＋手戻り削減の下降トレンド\nFY28末：要件定義→リリース 平均1ヶ月以内（DORA High）、バックログ常時Ready",
    plan: "・Ready定義を全チーム標準化展開\n・手戻り原因分析の運用開始（仕様／技術／外部）\n・工程・役割の明確化、優先対応基準の整備\n・外部講師レクチャーで継続支援",
    kpi: "Ready定義達成率（PBI全数のうち着手時点でReady）　／　手戻り発生時の原因分類実施率",
  });
}

// ============================================================
// Slide 11: 挑戦KR2 フロー効率【必須】
// ============================================================
{
  const slide = pres.addSlide();
  parts.addHeader(slide, pres, theme, { breadcrumb: BC + "  >  挑戦KR2 フロー効率", font });
  parts.addBottomBar(slide, pres, theme);
  addKRTitle(slide, KR.c2);
  addSoWhat(slide, "だから、未安定3チームの型を言語化し、計測で見える化する必要がある（FY28末サイクルタイム DORA High、FY26は全チーム計測稼働）", 1.28);

  addChallengeKRBody(slide, {
    aim: "着手からリリースまでの流れそのものを\n速く、予測可能にする。",
    issue: "4チーム中3チームのCT未安定（Fluppuccino／Discovery／Guardians）。PBI粒度、認識合わせ速度、見積精度、改善の回転で成熟度バラつき。リードタイム計測未整備でボトルネックが見えない。",
    milestone: "FY26末：全チームCT計測稼働、未安定3チームがNaikistレベル（1〜2週）に近づく\nFY28末：CT平均1ヶ月、見積精度90%以上、DORA High到達",
    plan: "・全チームでサイクルタイム計測導入（Notion／Github）\n・工程リードタイム可視化でボトルネック特定\n・Web/ネイティブをフィーチャーチームに統合\n・優先順位づけ基準の整備（意思決定速度）",
    kpi: "ボトルネック工程の滞留日数（ステージ別内訳）　／　スプリントゴール達成率（80%+目標）　／　PBI粒度分布（1スプリント完了可能サイズの適用率）",
  });
}

// ============================================================
// Slide 12: 挑戦KR3 学習ループ【必須】
// ============================================================
{
  const slide = pres.addSlide();
  parts.addHeader(slide, pres, theme, { breadcrumb: BC + "  >  挑戦KR3 学習ループ", font });
  parts.addBottomBar(slide, pres, theme);
  addKRTitle(slide, KR.c3);
  addSoWhat(slide, "だから、成果の方程式の\"精度側\"は、検証を次の投資判断に接続することで実現する（FY28末 検証→次施策反映 平均1ヶ月以内＝DORA High）", 1.28);

  addChallengeKRBody(slide, {
    aim: "作ったものが顧客価値につながったかを検証し、\n次の投資判断に反映するサイクルを定着させる。",
    issue: "「作る」までで終わり、検証が次サイクルに接続されない。Krakenのような依存関係が多い案件は前提が変わり手戻り化。打席数を増やすだけでは成果は出ない ── 何に打席を使うかの精度が低ければ打席を無駄にする。",
    milestone: "FY26末：スプリントレビューに価値検証アジェンダ定着、学習ログ蓄積＋PdM月次FB稼働\nFY28末：検証起因のバックログ変更50%以上、DORA High到達",
    plan: "・PBIフォーマットに「検証したい仮説／計測指標」を組込\n・開発環境にGoogleAnalytics導入、ドッグフーディング仕組化\n・スプリントレビューで価値検証アジェンダを毎回運用",
    kpi: "事前検証済みPBI件数　／　検証起因バックログ変更件数　／　ドッグフーディング実施回数",
  });
}

// ============================================================
// Slide 13: 基盤KR1 健全性＋開発環境 ／ 基盤KR3 事業貢献PDCA【必須】
// ============================================================
{
  const slide = pres.addSlide();
  addFrame(slide, BC + "  >  基盤KR1／基盤KR3",
    "健全性＋環境で持続性を担保し、事業貢献PDCAで外部妥当性を確認する");
  addSoWhat(slide, "だから、内向き（持続性）と外向き（事業側の信頼度）の両方を担保する");

  const col2W = (9.2 - 0.3) / 2;
  const colY = 1.65, colH = 3.65;

  const krs = [
    {
      kr: KR.f1,
      body:
        `─ ${KR.f1.desc}\n\n` +
        "FY26末（通年維持）：\n" +
        "・変更失敗率 15%以下\n" +
        "・開発者満足度 SPACE軸 4.0以上（月次）\n" +
        "・ITインフラ継続稼働＋ツール棚卸し定常化\n\n" +
        "主要施策：\n" +
        "・サブKPI計測基盤整備（変更失敗率自動集計／SPACE月次）\n" +
        "・月次1on1・健全性スコア・AVD/EDR運用\n\n" +
        "先行KPI：月次1on1実施率／月次サーベイ回答率",
    },
    {
      kr: KR.f3,
      body:
        `─ ${KR.f3.desc}\n\n` +
        "責任構造：\n" +
        "・3者共同責任（片山TL・檜垣TL・杉崎TL）\n" +
        "・FY26 Q1中に詳細KPI整合確定（DPG KR⑦直接受け）\n\n" +
        "主要施策：\n" +
        "・1Q・2Q・3Q末に事業側（toC各部）へアンケート／面談\n" +
        "・振り返りと次Qアクション策定\n" +
        "・配置メンバーの事業貢献状況を四半期で可視化\n\n" +
        "先行KPI：四半期振り返り実施率／アンケート・面談カバー率",
    },
  ];

  krs.forEach((k, i) => {
    const cx = 0.4 + i * (col2W + 0.3);
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: colY, w: col2W, h: 0.45,
      fill: { color: theme.P }, rectRadius: 0.03,
    });
    slide.addText(k.kr.short, {
      x: cx, y: colY, w: col2W, h: 0.45,
      fontSize: 13, bold: true, color: theme.WH, fontFace: font.jp,
      align: "center", valign: "middle", margin: 0,
    });
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: colY + 0.5, w: col2W, h: colH - 0.5,
      fill: { color: theme.CB }, rectRadius: 0.03,
    });
    slide.addText(k.body, {
      x: cx + 0.2, y: colY + 0.6, w: col2W - 0.4, h: colH - 0.7,
      fontSize: 10, color: theme.DT, fontFace: font.jp,
      align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.4,
    });
  });
}

// ============================================================
// Slide 14: 基盤KR2 能力の多面的強化【必須】
// ============================================================
{
  const slide = pres.addSlide();
  parts.addHeader(slide, pres, theme, { breadcrumb: BC + "  >  基盤KR2 能力の多面的強化", font });
  parts.addBottomBar(slide, pres, theme);
  addKRTitle(slide, KR.f2);
  addSoWhat(slide, "だから、FY27以降に息切れしない組織能力をFY26末に作る", 1.28);

  const layers = [
    { num: "①", title: "プロセス", body: "ふりかえり質向上／スクラム型化／Ready定義運用を全チーム適用。ベテラン暗黙知を言語化。" },
    { num: "②", title: "人", body: "デリバリーマネージャー採用完了＋次世代リーダー（SM／PO候補）育成。1on1・キャリア設計の専任化。" },
    { num: "③", title: "基盤", body: "計測基盤全チーム稼働（DPG KR②アプローチ①）／inet発注最適化で費用削減見立て（DPG KR⑥）／KARTE→Braze可否判断完了。" },
  ];
  const lY = 1.6, lH = 2.3;
  const lW = (9.2 - 0.2 * 2) / 3;
  layers.forEach((l, i) => {
    const lx = 0.4 + i * (lW + 0.2);
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: lx, y: lY, w: lW, h: lH,
      fill: { color: theme.CB }, line: { color: theme.P, width: 1.5 },
      rectRadius: 0.03,
    });
    slide.addShape(pres.shapes.RECTANGLE, {
      x: lx + 0.02, y: lY, w: lW - 0.04, h: 0.06,
      fill: { color: theme.P },
    });
    slide.addText(`${l.num}  ${l.title}`, {
      x: lx + 0.15, y: lY + 0.15, w: lW - 0.3, h: 0.4,
      fontSize: 16, bold: true, color: theme.P, fontFace: font.jp,
      align: "left", valign: "top", margin: 0,
    });
    slide.addText(l.body, {
      x: lx + 0.15, y: lY + 0.6, w: lW - 0.3, h: lH - 0.7,
      fontSize: 12, color: theme.DT, fontFace: font.jp,
      align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.5,
    });
  });

  parts.addAlertBox(slide, pres, theme, {
    x: 0.4, y: 4.1, w: 9.2, h: 1.2, type: "info",
    text: "FY26末達成目標：①プロセス標準化全チーム適用  ②計測基盤全チーム稼働  ③inet費用削減見立て完了  ④KARTE→Braze機能可否判断完了  ⑤DM採用完了",
    font,
  });
}

// ============================================================
// Slide 15: KR間連動図【必須】
// ============================================================
{
  const slide = pres.addSlide();
  addFrame(slide, BC + "  >  KR間連動",
    "挑戦3KRが循環し、基盤3KRが支える ── 6KRで成果の方程式を回す");
  addSoWhat(slide, "だから、6KRは一体で動く設計。どれか1本だけ追っても成果は出ない");

  const ky = 1.7, kh = 0.85, kw = 2.5, kgap = 0.65;
  const kxs = [0.75, 0.75 + kw + kgap, 0.75 + (kw + kgap) * 2];
  const ktitles = [
    { t: "挑戦KR1", s: "入口品質" },
    { t: "挑戦KR2", s: "フロー効率" },
    { t: "挑戦KR3", s: "学習ループ" },
  ];
  ktitles.forEach((k, i) => {
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: kxs[i], y: ky, w: kw, h: kh,
      fill: { color: theme.CB }, line: { color: theme.P, width: 1.5 },
      rectRadius: 0.03,
    });
    slide.addText([
      { text: k.t + "\n", options: { fontSize: 13, bold: true, color: theme.P, fontFace: font.jp } },
      { text: k.s, options: { fontSize: 12, color: theme.DT, fontFace: font.jp } },
    ], {
      x: kxs[i], y: ky, w: kw, h: kh,
      align: "center", valign: "middle", margin: 0,
    });
    if (i < 2) {
      slide.addText("\u25B6", {
        x: kxs[i] + kw + 0.05, y: ky + kh * 0.3, w: kgap - 0.1, h: kh * 0.4,
        fontSize: 20, color: theme.A, fontFace: "Arial",
        align: "center", valign: "middle", margin: 0,
      });
    }
  });

  slide.addText("\u25C0 学びが仮説精度を高める（KR3 → KR1）", {
    x: 0.75, y: ky + kh + 0.1, w: (kw + kgap) * 3 - kgap, h: 0.3,
    fontSize: 11, italic: true, color: theme.A, fontFace: font.jp,
    align: "center", valign: "middle", margin: 0,
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 3.15, w: 9.2, h: 0.012,
    fill: { color: theme.S }, line: { color: theme.S },
  });
  slide.addText("── 挑戦3KR すべての前提・支え（基盤3KR）──", {
    x: 0.4, y: 3.2, w: 9.2, h: 0.3,
    fontSize: 11, bold: true, color: theme.ST, fontFace: font.jp,
    align: "center", valign: "middle", margin: 0,
  });

  const fy = 3.55, fbh = 0.5, fgap = 0.12;
  const foundations = [
    { t: KR.f1.short, s: "前提条件＋安全装置（守る／ムリ）" },
    { t: KR.f2.short, s: "中長期持続性（強くする／ムラ）" },
    { t: KR.f3.short, s: "外部妥当性チェック（見極め×強く）" },
  ];
  foundations.forEach((f, i) => {
    const fy2 = fy + i * (fbh + fgap);
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.4, y: fy2, w: 9.2, h: fbh,
      fill: { color: theme.SF }, line: { color: theme.ST, width: 1 },
      rectRadius: 0.03,
    });
    slide.addText([
      { text: f.t, options: { fontSize: 12, bold: true, color: theme.P, fontFace: font.jp } },
      { text: "  —  ", options: { fontSize: 11, color: theme.ST, fontFace: font.jp } },
      { text: f.s, options: { fontSize: 11, color: theme.DT, fontFace: font.jp } },
    ], {
      x: 0.55, y: fy2, w: 8.9, h: fbh,
      align: "left", valign: "middle", margin: 0,
    });
  });
}

// ============================================================
// Slide 16: 別論点①Mission外Corp兼務業務（議題化）【必須】
// ============================================================
{
  const slide = pres.addSlide();
  addFrame(slide, BC + "  >  別論点①",
    "財務・労務・資産・セキュリティはMission射程外 ── 中長期の組織分離を議題化したい");
  addSoWhat(slide, "だから、今回はOKRに載せず、別論点として認識共有をしたい");

  // 対比表
  parts.addStyledTable(slide, pres, theme, {
    x: 0.4, y: 1.6, w: 9.2,
    headers: ["業務領域", "具体業務", "本来の機能", "現状担い手"],
    rows: [
      ["財務・経理", "予算策定・支出・購買・人件費", "財務・経理機能", "林・望月＋杉崎"],
      ["労務", "勤怠管理（OPST・MSOL・出向）", "労務機能", "林・望月"],
      ["資産管理", "固定資産管理（端末棚卸・台帳）", "資産管理機能", "林・望月"],
      ["ツール運用（経理寄り）", "ライセンス月次棚卸", "経理機能に近い", "望月"],
      ["セキュリティ・コンプラ", "情報セキュリティ・IC対応", "セキュリティ専任部署", "岩渕＋杉崎"],
    ],
    colW: [2.1, 3.2, 2.0, 1.9], rowH: 0.36, fontSize: 10, font,
  });

  // 線引き基準（左）と留意点（右）
  const bY = 3.65;
  parts.addCard(slide, pres, theme, {
    x: 0.4, y: bY, w: 4.5, h: 1.35,
    title: "線引き基準",
    body:
      "・包含：デリバリー能力・開発生産性に直結（コーポレートエンジ・BPR・開発ツール管理）\n" +
      "・除外：Mission射程外 → OKR非搭載・評価軸外\n" +
      "・林・望月はチームOKR対象外。杉崎の監督責任のみ発生",
    font,
  });
  parts.addCard(slide, pres, theme, {
    x: 5.1, y: bY, w: 4.5, h: 1.35,
    title: "留意点",
    body:
      "・「チームOKR対象外」と書くのは心理的に重い判断。\n  本人への伝え方・評価軸（別ルート人事評価）は別途設計\n" +
      "・セキュリティ・コンプラは専任部署との責任分界点が曖昧。GMとの対話で明示化したい",
    accentColor: theme.WARN_BD, font,
  });

  parts.addAlertBox(slide, pres, theme, {
    x: 0.4, y: 5.1, w: 9.2, h: 0.35, type: "warn",
    text: "提起：中長期的な組織分離・移管を相談したい（今回は議題化まで）",
    font,
  });
}

// ============================================================
// Slide 17: 別論点②Kraken PdM不在 + 次の一手【必須】
// ============================================================
{
  const slide = pres.addSlide();
  addFrame(slide, BC + "  >  別論点②／次の一手",
    "Krakenのみ PdM空欄 ── 議題化しつつ、本日は「OKR構造のご承認」をゴールに");
  addSoWhat(slide, "だから、本日いただきたいのは「OKR構造の承認」の1点。別論点は次回へ");

  // DPG担当マッピング比較表（左）
  parts.addStyledTable(slide, pres, theme, {
    x: 0.4, y: 1.6, w: 5.5,
    headers: ["KR", "責任者", "PdM列"],
    rows: [
      ["①ディスカバリー", "片山TL／髙松TL", "湯浅"],
      ["③-1 Kraken", "福田PO", "（空欄）←ここ"],
      ["③-2 MA", "吉田TL", "高松・湯浅"],
      ["③-3 ID基盤", "吉田TL", "高松・湯浅"],
      ["④会員数", "柏木TL", "高松"],
      ["⑤GP送客", "湯浅PdM／高松TL", "加藤・長友"],
    ],
    colW: [2.0, 2.0, 1.5], rowH: 0.32, fontSize: 10, font,
  });

  // 3リスク（右）
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.1, y: 1.6, w: 3.5, h: 1.8,
    fill: { color: theme.ERROR_BG }, line: { color: theme.ERROR_BD, width: 1 },
    rectRadius: 0.03,
  });
  slide.addText("リスク3点", {
    x: 6.25, y: 1.7, w: 3.2, h: 0.3,
    fontSize: 12, bold: true, color: theme.ERROR_TX, fontFace: font.jp,
    align: "left", valign: "middle", margin: 0,
  });
  slide.addText(
    "① 福田POの無限スコープ化（事業仮説言語化まで巻取り）\n" +
    "② Kraken成果評価の曖昧化（事業にどう効いた？が説明不能）\n" +
    "③ 挑戦KR3（学習ループ）の歪み（仮説の所有者不在）",
    {
      x: 6.25, y: 2.0, w: 3.2, h: 1.3,
      fontSize: 10, color: theme.DT, fontFace: font.jp,
      align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.4,
    });

  // 提起想定（右下）
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.1, y: 3.5, w: 3.5, h: 1.3,
    fill: { color: theme.CB }, line: { color: theme.P, width: 1 },
    rectRadius: 0.03,
  });
  slide.addText("GMへの提起想定", {
    x: 6.25, y: 3.6, w: 3.2, h: 0.3,
    fontSize: 11, bold: true, color: theme.P, fontFace: font.jp,
    align: "left", valign: "middle", margin: 0,
  });
  slide.addText(
    "・PdM側（片山TL／湯浅PdM等）とアサイン協議を進めたい\n" +
    "・DPG KR⑦（基盤KR3）の3者共同責任枠組みで議題化可能\n" +
    "・アサイン決定までは福田の責任を「デリバリー側PO責任」に境界明示",
    {
      x: 6.25, y: 3.9, w: 3.2, h: 0.85,
      fontSize: 9, color: theme.DT, fontFace: font.jp,
      align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.4,
    });

  // 福田POスコープ境界図（左下）
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 3.5, w: 5.5, h: 1.3,
    fill: { color: theme.SF }, line: { color: theme.ST, width: 1 },
    rectRadius: 0.03,
  });
  slide.addText("福田POの責任境界（アサイン決定まで）", {
    x: 0.55, y: 3.6, w: 5.2, h: 0.3,
    fontSize: 11, bold: true, color: theme.ST, fontFace: font.jp,
    align: "left", valign: "middle", margin: 0,
  });
  slide.addText([
    { text: "含む（デリバリー側PO責任）：", options: { fontSize: 9, bold: true, color: theme.P, fontFace: font.jp } },
    { text: "要件管理・開発進捗管理・接続完了／本番リリースまでの実行責任\n", options: { fontSize: 9, color: theme.DT, fontFace: font.jp } },
    { text: "含まない（PdM責任＝別アサイン待ち）：", options: { fontSize: 9, bold: true, color: theme.ERROR_TX, fontFace: font.jp } },
    { text: "事業仮説言語化・ROI寄与設計・顧客価値仮説構築", options: { fontSize: 9, color: theme.DT, fontFace: font.jp } },
  ], {
    x: 0.55, y: 3.9, w: 5.2, h: 0.85,
    align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.5,
  });

  // 本日のゴール（承認、強調）
  parts.addAlertBox(slide, pres, theme, {
    x: 0.4, y: 4.95, w: 9.2, h: 0.4, type: "ok",
    text: "本日のゴール：OKR構造（挑戦3＋基盤3／一層統合）のご承認",
    font,
  });
}

// ============================================================
// 書き出し
// ============================================================
pres.writeFile({ fileName: OUTPUT }).then(() => {
  console.log(`✓ PPTX生成完了: ${OUTPUT}`);
});
