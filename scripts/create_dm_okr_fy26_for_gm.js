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
// Slide 5: ロジックツリー（問いの形）── 大Q→6KR（全文表示）【任意】
// ============================================================
{
  const slide = pres.addSlide();
  addFrame(slide, BC + "  >  ロジックツリー（問いの形）",
    "Missionを1つの大きな問いに変換し、6つのKRへ展開する（PLAID方式）");
  addSoWhat(slide, "だから、6KRはMissionを漏れなく分解して導出された意図的な網羅設計である");

  // ── 根（大Q） ────────────────────────────────
  const rootX = 0.4, rootY = 1.55, rootW = 9.2, rootH = 0.6;
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: rootX, y: rootY, w: rootW, h: rootH,
    fill: { color: theme.P }, rectRadius: 0.03,
  });
  slide.addText([
    { text: "Q:  ", options: { fontSize: 10, bold: true, color: theme.WH, fontFace: font.jp } },
    { text: "作る力を価値に変えるために、デリバリーチームは何を実現すべきか？", options: { fontSize: 13, bold: true, color: theme.WH, fontFace: font.jp } },
    { text: "\n（＝顧客価値を、正しく・速く・持続的に届けるデリバリーラインを、どう確立するか？）", options: { fontSize: 9, italic: true, color: theme.WH, fontFace: font.jp } },
  ], {
    x: rootX + 0.2, y: rootY, w: rootW - 0.4, h: rootH,
    align: "left", valign: "middle", margin: 0, lineSpacingMultiple: 1.3,
  });

  // ── 6つの分解問い＋対応KR（問い→KR 横並び） ─
  const items = [
    { ...KR.c1, question: "開発ラインに流す仕事の質と判断スピードを高め、仕様起因の手戻りと無駄な開発をなくせるか？" },
    { ...KR.c2, question: "顧客に届くスピードをどう上げるか？" },
    { ...KR.c3, question: "届けた価値を検証し、学びを次のサイクルにどう反映し続けるか？" },
    { ...KR.f1, question: "チームが走り続けられる土台と開発環境をどう担保するか？" },
    { ...KR.f2, question: "デリバリー組織そのものを中長期にどう強くしていくか？" },
    { ...KR.f3, question: "事業側から見て、このデリバリー機能は本当に価値を生んでいるか？" },
  ];

  const trunkX = 0.8;
  const bH = 0.54, bGap = 0.02;
  const bStartCenter = 2.45;
  // 横レイアウト: [問い] → [KR]
  const qX = 1.1, qW = 4.1;
  const arrowX = qX + qW + 0.1; // 5.3
  const arrowW = 0.35;
  const krX = arrowX + arrowW; // 5.65
  const krW = 9.6 - krX;        // 3.95

  // 縦トランク（根下 → 最後の枝中心）
  const lastCenter = bStartCenter + (items.length - 1) * (bH + bGap);
  slide.addShape(pres.shapes.RECTANGLE, {
    x: trunkX - 0.01, y: rootY + rootH, w: 0.02, h: lastCenter - (rootY + rootH),
    fill: { color: theme.P }, line: { color: theme.P },
  });

  items.forEach((k, i) => {
    const centerY = bStartCenter + i * (bH + bGap);
    const y = centerY - bH / 2;

    // 横枝線（trunk → 問いボックス左端）
    slide.addShape(pres.shapes.RECTANGLE, {
      x: trunkX, y: centerY - 0.01, w: qX - trunkX, h: 0.02,
      fill: { color: theme.P }, line: { color: theme.P },
    });

    // 問いボックス（左）
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: qX, y, w: qW, h: bH,
      fill: { color: theme.SF }, line: { color: theme.ST, width: 0.75 },
      rectRadius: 0.02,
    });
    slide.addText([
      { text: `Q${i + 1}  `, options: { fontSize: 9, bold: true, color: theme.P, fontFace: font.jp } },
      { text: k.question, options: { fontSize: 9, color: theme.DT, fontFace: font.jp } },
    ], {
      x: qX + 0.12, y, w: qW - 0.24, h: bH,
      align: "left", valign: "middle", margin: 0, lineSpacingMultiple: 1.25,
    });

    // 矢印
    slide.addText("\u25B6", {
      x: arrowX, y: centerY - 0.14, w: arrowW, h: 0.28,
      fontSize: 14, color: theme.A, fontFace: "Arial",
      align: "center", valign: "middle", margin: 0,
    });

    // KRボックス（右）
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: krX, y, w: krW, h: bH,
      fill: { color: theme.CB }, line: { color: theme.P, width: 1 },
      rectRadius: 0.02,
    });
    slide.addText([
      { text: k.short, options: { fontSize: 11, bold: true, color: theme.P, fontFace: font.jp } },
      { text: `\n─ ${k.desc}`, options: { fontSize: 9, color: theme.DT, fontFace: font.jp } },
    ], {
      x: krX + 0.12, y, w: krW - 0.24, h: bH,
      align: "left", valign: "middle", margin: 0, lineSpacingMultiple: 1.25,
    });
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
// 共通: KR個別スライドのボディ（3カード＋先行KPIストリップ）
// ============================================================
function addKRBody(slide, opts) {
  const { aim, milestone, plan, kpi } = opts;
  const cardsY = 1.6;
  const cardH = 2.95;
  const cardGap = 0.2;
  const cardW = (9.2 - cardGap * 2) / 3;

  parts.addCard(slide, pres, theme, {
    x: 0.4, y: cardsY, w: cardW, h: cardH,
    title: "狙い", body: aim, font,
  });
  parts.addCard(slide, pres, theme, {
    x: 0.4 + cardW + cardGap, y: cardsY, w: cardW, h: cardH,
    title: "年度マイルストーン", body: milestone, accentColor: theme.A, font,
  });
  parts.addCard(slide, pres, theme, {
    x: 0.4 + (cardW + cardGap) * 2, y: cardsY, w: cardW, h: cardH,
    title: "主要施策（FY26）", body: plan, font,
  });

  // 先行KPIストリップ（下段）
  parts.addAlertBox(slide, pres, theme, {
    x: 0.4, y: cardsY + cardH + 0.15, w: 9.2, h: 0.55, type: "ok",
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

  addKRBody(slide, {
    aim: "開発に入る「前」で時間を失うことを止め、開発中の手戻りと方向違いの実装を減らす。人を増やすのではなく、仕様・判断・スコープの制御を先に整える。",
    milestone: "FY26末：\n・ベースライン数値を確定\n・手戻り削減の下降トレンドを示す\n・全チームでReady定義が標準化\n\nFY28末：\n・要件定義→リリース 平均1ヶ月以内（DORA High）\n・仕様起因の手戻りゼロ、バックログ常時Ready",
    plan: "・Ready定義を全チーム標準化展開\n・手戻り原因分析の運用開始\n　（仕様／技術／外部の3分類）\n・工程・役割の明確化、優先対応基準の整備\n・外部講師レクチャーで「小さく作り検証する」共通認識を継続支援",
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

  addKRBody(slide, {
    aim: "着手からリリースまでの流れそのものを速く、予測可能にする。未安定3チーム（Fluppuccino／Discovery／Guardians）の型を言語化し、計測で見える化する。",
    milestone: "FY26末：\n・全チームでサイクルタイム計測稼働\n・未安定3チームがNaikistレベル（1〜2週）に近づく\n\nFY28末：\n・サイクルタイム平均1ヶ月\n・1スプリント見積精度90%以上\n・DORA High レベル到達",
    plan: "・全チームでサイクルタイム計測導入\n　（Notion／Github計測ログ整備）\n・工程リードタイム可視化でボトルネック特定\n・Web／ネイティブアプリをフィーチャーチームに統合\n・優先順位づけ基準の整備（意思決定速度向上）",
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

  addKRBody(slide, {
    aim: "作ったものが顧客価値につながったかを検証し、次の投資判断に反映するサイクルを定着させる。リリースして終わりにせず「次にやること／やめること」を決める循環を作る。成果の方程式の\"精度側\"を担うKR。",
    milestone: "FY26末：\n・全PBIのうち仮説・計測指標記入率 60%以上\n　（Ready定義に組み込み）\n・検証→次施策反映リードタイムの\n　ベースライン計測確定\n・1Q末までに目標設定\n\nFY28末：\n・検証起因のバックログ変更 50%以上\n・DORA High 到達\n　（検証→次施策反映 平均1ヶ月以内）",
    plan: "・PBIフォーマットに「検証したい仮説／計測指標」を組込\n　仮説→結果→学び→次アクションのテンプレート化\n・Ready定義（挑戦KR1）に仮説記入を組み込み、\n　入口品質と学習ループを接続\n・開発環境にGoogleAnalytics導入、ドッグフーディング仕組化\n　ログ運用設計（Q1 5月）→検証ログ運用開始（Q1 6月）",
    kpi: "PBI仮説・計測指標記入率（全PBI分母の実施率ベース）　／　検証起因バックログ変更件数　／　ドッグフーディング実施回数",
  });
}

// ============================================================
// Slide 13: 基盤KR1 健全性＋開発環境【必須】
// ============================================================
{
  const slide = pres.addSlide();
  parts.addHeader(slide, pres, theme, { breadcrumb: BC + "  >  基盤KR1 健全性＋開発環境", font });
  parts.addBottomBar(slide, pres, theme);
  addKRTitle(slide, KR.f1);
  addSoWhat(slide, "だから、速さの暴走を防ぐ安全装置（DORAサブKPI）＋走り続ける環境を通年で担保する", 1.28);

  addKRBody(slide, {
    aim: "挑戦KR1〜3が\"速く届ける能力\"を追うのに対し、基盤KR1はその能力を支える土台を扱う。持続可能に走り続けられる健全性と、働き方を成立させる開発環境（ITインフラ・ツール・オンボーディング）が対象。速さを追うあまりレビュー省略・属人化・恒常残業に陥らないための安全装置も兼ねる。",
    milestone: "FY26末（通年維持）：\n・変更失敗率 15%以下\n　（リリースのうち障害・ロールバック・\n　　緊急修正に至った割合）\n・開発者満足度 SPACE軸 4.0以上\n　（5段階、月次サーベイで維持）\n・ITインフラ継続稼働\n・開発ツール棚卸しの定常化",
    plan: "・サブKPI計測基盤の整備\n　変更失敗率の自動集計／\n　開発者満足度SPACE軸の月次サーベイ運用\n・月次1on1（負荷・モチベーション・キャリア）\n・レトロ自己評価による健全性スコア記録\n・AVD／EDRの可用性維持\n・新規参画者オンボーディング\n　（Duke ID／権限／立ち上げ支援）の標準化",
    kpi: "月次1on1実施率（全メンバー／対象期間内）　／　月次サーベイ回答率",
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
  addSoWhat(slide, "だから、FY27以降に息切れしない組織能力を、プロセス・人・基盤の3層でFY26末に作る", 1.28);

  addKRBody(slide, {
    aim: "単年度の運用効率化ではなく、中長期的にデリバリー組織そのものを強くするKR。ベテランの暗黙知依存から抜け出し、FY27〜28にDORA Highレベル到達できる組織状態をFY26末時点で作る。",
    milestone: "FY26末：\n・プロセス標準化が全チーム適用\n・計測基盤が全チーム稼働\n　（DPG KR②アプローチ①達成）\n・inet費用削減見立て完了\n　（DPG KR⑥貢献）\n・KARTE→Braze機能可否判断完了\n・デリバリーマネージャー（DM）採用完了",
    plan: "・プロセス標準化の全チーム適用\n　（ふりかえり質向上・スクラム型化・Ready定義）\n・計測基盤の整備（Q1完了目標）\n　Notion→Github計測ログ→ベースライン計測\n・inet発注最適化で費用削減見立て（DPG KR⑥）\n・KARTE→Braze機能可否検証\n・DM採用完了（人面の専任担い手確立）",
    kpi: "プロセス標準化の適用チーム率　／　DM採用パイプライン進捗（候補者面談数・内定数）　／　計測ダッシュボード稼働チーム数　／　inet費用削減見立て（対26年度比%）　／　KARTE機能検証完了率",
  });
}

// ============================================================
// Slide 15: 基盤KR3 事業貢献PDCA【必須】
// ============================================================
{
  const slide = pres.addSlide();
  parts.addHeader(slide, pres, theme, { breadcrumb: BC + "  >  基盤KR3 事業貢献PDCA", font });
  parts.addBottomBar(slide, pres, theme);
  addKRTitle(slide, KR.f3);
  addSoWhat(slide, "だから、他5KRが内向きなのに対し、基盤KR3だけが事業側から見た信頼度（外部妥当性）を担保する", 1.28);

  addKRBody(slide, {
    aim: "挑戦KR1〜3と基盤KR1/2はすべて内向きKR（デリバリー機能の内側）。基盤KR3だけが事業側から見た信頼度を扱う唯一の外向きKR。デリバリーラインの成果が本当に事業価値になっているかを、事業側（toC各部）との四半期振り返りで相互検証する。※DPG KR⑦直接受け／3者共同責任（片山TL・檜垣TL・杉崎TL）",
    milestone: "FY26末：\n・配置メンバーの事業貢献について、\n　事業側（toC各部）との四半期振り返りで\n　相互納得が形成されている状態\n\nFY26 Q1中：\n・3者（片山TL・檜垣TL・杉崎TL）で\n　詳細KPI整合を確定",
    plan: "・1Q・2Q・3Q末に事業側（toC各部）へ\n　アンケート／面談を実施\n・振り返りと次Qアクションプランを策定\n・配置メンバーの事業貢献状況を\n　四半期ごとに見える化\n・3者共同運営の仕組みを設計\n・詳細KPIをQ1中に3者で確定",
    kpi: "四半期振り返り実施率（計画通り1Q・2Q・3Q末に実施できたか）　／　アンケート・面談カバー率（配置メンバー・事業側双方で対象者をカバーできたか）",
  });
}

// ============================================================
// Slide 16: KR間連動図【必須】
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
// Slide 17: 別論点①Mission外Corp兼務業務（議題化）【必須】
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
// Slide 18: 別論点②Kraken PdM不在 + 次の一手【必須】
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
