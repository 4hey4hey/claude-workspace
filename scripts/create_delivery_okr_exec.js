/**
 * デリバリーチーム OKR — 及川GM・経営向け説明デッキ
 * テーマ: dads（デジタル庁デザインシステム準拠）
 * 出力: outputs/pptx/delivery_okr_exec.pptx
 */

const path = require("path");
const PptxGenJS = require("pptxgenjs");
const {
  getTheme,
  parts,
  getFontPreset,
} = require("./lib");

const theme = getTheme("dads");
const font = getFontPreset("dads");
const pres = new PptxGenJS();
pres.title = "デリバリーチーム OKR 説明（及川GM・経営向け）";

const DIAG_DIR = path.join(__dirname, "../assets/diagrams");
const HIER_IMG = path.join(DIAG_DIR, "okr-hierarchy.png");
const CYCLE_IMG = path.join(DIAG_DIR, "okr-cycle.png");

// ============================================================
// 表紙
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addCoverTitle(slide, pres, theme, {
    title: "デリバリーチーム OKR\n説明・納得感共有",
    subtitle: "同じ開発投資で施策を速く・多く回すための挑戦目標",
    date: "2026-04-04",
    author: "デリバリーマネジメントチーム",
    font,
  });
  parts.addBottomBar(slide, pres, theme);
}

// ============================================================
// S1: 結論（30秒で伝えること）
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addBottomBar(slide, pres, theme);
  parts.addHeader(slide, pres, theme, { breadcrumb: "結論", font });
  parts.addSlideTitle(slide, pres, theme, {
    title:
      "このOKRの目的は、同じ開発投資で回せる施策の数とスピードを上げることです",
    font,
  });

  // 結論ボックス
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4,
    y: 1.3,
    w: 9.2,
    h: 0.85,
    fill: { color: theme.P },
    line: { color: theme.P, width: 1 },
    rectRadius: 0.03,
  });
  slide.addText(
    "FY26中に施策のリードタイムを20%短縮し、手戻りによる無駄な工数を30%削減します。\n結果として、会員施策・熱狂顧客獲得・GP送客のすべてが「より多く、より速く」回るようになります。",
    {
      x: 0.55,
      y: 1.3,
      w: 8.9,
      h: 0.85,
      fontSize: 13,
      color: "FFFFFF",
      fontFace: font.jp,
      align: "left",
      valign: "middle",
      margin: [0, 4, 0, 4],
      lineSpacingMultiple: 1.5,
    },
  );

  // 3点サマリー
  const points = [
    {
      icon: "①",
      title: "入口を直す（KR1）",
      body: "仕様の曖昧さ・判断待ちを排除し\n手戻りコストをゼロへ",
      color: theme.ACCENTS[0],
    },
    {
      icon: "②",
      title: "流れを速くする（KR2）",
      body: "着手→リリースのサイクルタイムを\nFY26で20%、FY28末で50%短縮",
      color: theme.ACCENTS[1],
    },
    {
      icon: "③",
      title: "学んで次に活かす（KR3）",
      body: "検証結果をPdMに返し\n施策の仮説精度を上げ続ける",
      color: theme.ACCENTS[2],
    },
  ];

  const boxW = 2.85;
  const boxH = 1.7;
  const startX = 0.4;
  const boxY = 2.35;
  const gapX = 0.275;

  points.forEach((p, i) => {
    const bx = startX + i * (boxW + gapX);

    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: bx,
      y: boxY,
      w: boxW,
      h: boxH,
      fill: { color: theme.CB },
      line: { color: p.color, width: 2 },
      rectRadius: 0.03,
    });
    slide.addText(p.icon + " " + p.title, {
      x: bx + 0.12,
      y: boxY + 0.1,
      w: boxW - 0.24,
      h: 0.42,
      fontSize: 13,
      bold: true,
      color: p.color,
      fontFace: font.jp,
      align: "center",
      valign: "middle",
      margin: 0,
    });
    slide.addText(p.body, {
      x: bx + 0.12,
      y: boxY + 0.55,
      w: boxW - 0.24,
      h: 1.05,
      fontSize: 11,
      color: theme.DT,
      fontFace: font.jp,
      align: "center",
      valign: "middle",
      margin: 0,
      lineSpacingMultiple: 1.5,
    });
  });

  // 前提
  slide.addText(
    "基盤KR（健全性維持・次期リーダー育成）は上記3KRの前提条件として並走",
    {
      x: 0.4,
      y: 4.2,
      w: 9.2,
      h: 0.3,
      fontSize: 10,
      color: theme.ST,
      fontFace: font.jp,
      align: "center",
      valign: "middle",
      margin: 0,
    },
  );
}

// ============================================================
// S2: グループOKRとの紐づけ全体像（階層図）
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addBottomBar(slide, pres, theme);
  parts.addHeader(slide, pres, theme, {
    breadcrumb: "グループOKRとの紐づけ",
    font,
  });
  parts.addSlideTitle(slide, pres, theme, {
    title: "デリバリーチームはDPG挑戦KR②「高速プロダクト開発の型」を直接担う",
    font,
  });

  // 894x364 → ratio=2.456 → w=9.2, h=3.746
  slide.addImage({
    path: HIER_IMG,
    x: 0.4,
    y: 1.25,
    w: 9.2,
    h: 3.75,
  });
}

// ============================================================
// S3: 事業成果への直接効果（As-Is/To-Be）
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addBottomBar(slide, pres, theme);
  parts.addHeader(slide, pres, theme, {
    breadcrumb: "事業成果への効果",
    font,
  });
  parts.addSlideTitle(slide, pres, theme, {
    title: "施策リリース頻度が上がり、同じリソースで打てる手が増える",
    font,
  });

  parts.addStyledTable(slide, pres, theme, {
    x: 0.4,
    y: 1.28,
    w: 9.2,
    headers: ["現状（As-Is）", "FY26末の姿（To-Be）", "事業成果への効果"],
    colW: [3.0, 3.3, 2.9],
    fontSize: 9.5,
    rowH: 0.66,
    rows: [
      [
        "仕様が曖昧なまま着手\n→ 手戻りで2-3週間のロス",
        "手戻り30%削減。Ready定義が\n標準化され、着手した仕事が一発で通る",
        "同じ人数で回せる\n施策数が増える",
      ],
      [
        "施策のリードタイムが長く\n四半期で出せる施策が限られる",
        "サイクルタイム20%短縮。\n着手→リリースが速くなる",
        "施策のリリース\n頻度が上がる",
      ],
      [
        "「言った通りに出てくるか」\nが読めない",
        "スプリントゴール達成率80%以上。\n予測可能な開発ラインに",
        "ビジネス側が施策計画を\n信頼して先の手を打てる",
      ],
      [
        "作ったが効果が測れず\n「なんとなく次の施策」に",
        "スプリントレビューで毎回効果検証し\nPdMへフィードバック",
        "効かない施策を早期に止め\n効く施策に集中できる",
      ],
    ],
    font,
  });
}

// ============================================================
// S4: KR間の循環構造（ループ図）
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addBottomBar(slide, pres, theme);
  parts.addHeader(slide, pres, theme, {
    breadcrumb: "KR間の因果構造",
    font,
  });
  parts.addSlideTitle(slide, pres, theme, {
    title: "入口→フロー→学習の循環が回るほど、投資判断の精度が向上し続ける",
    font,
  });

  // 944x363 → ratio=2.601 → w=9.2, h=3.537
  slide.addImage({
    path: CYCLE_IMG,
    x: 0.4,
    y: 1.25,
    w: 9.2,
    h: 3.54,
  });
}

// ============================================================
// S5: 挑戦KR1・KR2がグループKRにどう効くか
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addBottomBar(slide, pres, theme);
  parts.addHeader(slide, pres, theme, {
    breadcrumb: "各KRの事業貢献 / KR1・KR2",
    font,
  });
  parts.addSlideTitle(slide, pres, theme, {
    title: "入口品質とフロー効率の改善が「1週間以内リリース」の前提条件を作る",
    font,
  });

  // KR1
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4,
    y: 1.28,
    w: 9.2,
    h: 0.3,
    fill: { color: theme.ACCENTS[0] },
    line: { color: theme.ACCENTS[0], width: 0 },
    rectRadius: 0.03,
  });
  slide.addText("挑戦KR1: 入口品質 — 仕様起因手戻り→ゼロへ", {
    x: 0.55,
    y: 1.28,
    w: 9.0,
    h: 0.3,
    fontSize: 12,
    bold: true,
    color: "FFFFFF",
    fontFace: font.jp,
    align: "left",
    valign: "middle",
    margin: 0,
  });

  parts.addStyledTable(slide, pres, theme, {
    x: 0.4,
    y: 1.6,
    w: 9.2,
    headers: ["デリバリーチームの取組", "DPG KR②への効果"],
    colW: [3.8, 5.4],
    fontSize: 9.5,
    rowH: 0.3,
    rows: [
      [
        "バックログ健全性（Ready比率）80%以上",
        "曖昧な仕様での着手手戻りを根絶。「1週間以内リリース」の前提条件",
      ],
      [
        "仕様起因手戻り率30%削減（FY26）",
        "手戻りが減れば同じリソースでより多くの施策を回せる。投資効率の直接改善",
      ],
      [
        "PO意思決定リードタイムの短縮",
        "判断待ちの渋滞を解消し、施策の滞留時間を削減",
      ],
    ],
    font,
  });

  // KR2
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4,
    y: 2.55,
    w: 9.2,
    h: 0.3,
    fill: { color: theme.ACCENTS[1] },
    line: { color: theme.ACCENTS[1], width: 0 },
    rectRadius: 0.03,
  });
  slide.addText("挑戦KR2: フロー効率 — サイクルタイム50%短縮（FY28末）", {
    x: 0.55,
    y: 2.55,
    w: 9.0,
    h: 0.3,
    fontSize: 12,
    bold: true,
    color: "FFFFFF",
    fontFace: font.jp,
    align: "left",
    valign: "middle",
    margin: 0,
  });

  parts.addStyledTable(slide, pres, theme, {
    x: 0.4,
    y: 2.87,
    w: 9.2,
    headers: ["デリバリーチームの取組", "DPG KR②への効果"],
    colW: [3.8, 5.4],
    fontSize: 9.5,
    rowH: 0.3,
    rows: [
      [
        "サイクルタイム計測+20%短縮（FY26）",
        "「1週間以内リリース」を数字で追える状態に。現状の実力値を可視化",
      ],
      [
        "スプリントゴール達成率80%以上",
        "「言った通りに出てくる」信頼性の確保。ビジネス側評価（KR⑦）に直結",
      ],
      [
        "WIP制限の導入",
        "マルチタスクによる全体遅延を防止。1つの施策を最速で完了させる",
      ],
    ],
    font,
  });

  parts.addAlertBox(slide, pres, theme, {
    x: 0.4,
    y: 4.17,
    w: 9.2,
    h: 0.42,
    type: "info",
    text: "「開発が遅いのはエンジニアの手が足りないからではなく、仕様の曖昧さと判断待ちでフローが詰まっているから」",
    font,
  });
}

// ============================================================
// S6: 挑戦KR3・基盤KRがグループKRにどう効くか
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addBottomBar(slide, pres, theme);
  parts.addHeader(slide, pres, theme, {
    breadcrumb: "各KRの事業貢献 / KR3・基盤KR",
    font,
  });
  parts.addSlideTitle(slide, pres, theme, {
    title: "学習ループがKR①（熱狂顧客）の仮説精度を高め、基盤KRが拡大を支える",
    font,
  });

  // KR3
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4,
    y: 1.28,
    w: 9.2,
    h: 0.3,
    fill: { color: theme.ACCENTS[2] },
    line: { color: theme.ACCENTS[2], width: 0 },
    rectRadius: 0.03,
  });
  slide.addText("挑戦KR3: 学習ループ — 検証→次の投資判断精度↑", {
    x: 0.55,
    y: 1.28,
    w: 9.0,
    h: 0.3,
    fontSize: 12,
    bold: true,
    color: "FFFFFF",
    fontFace: font.jp,
    align: "left",
    valign: "middle",
    margin: 0,
  });

  parts.addStyledTable(slide, pres, theme, {
    x: 0.4,
    y: 1.6,
    w: 9.2,
    headers: ["デリバリーチームの取組", "DPG KR②・KR①への効果"],
    colW: [3.8, 5.4],
    fontSize: 9.5,
    rowH: 0.3,
    rows: [
      [
        "スプリントレビューに価値検証アジェンダを導入",
        "KR②「検証結果が次の施策に反映」を構造的に実現する仕組み",
      ],
      [
        "学習ログ運用+PdMへの月次フィードバック",
        "KR①担当PdMに「効いた/効かなかった」を返し、仮説検証精度を向上",
      ],
    ],
    font,
  });

  // 基盤KR
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4,
    y: 2.4,
    w: 9.2,
    h: 0.3,
    fill: { color: "767676" },
    line: { color: "767676", width: 0 },
    rectRadius: 0.03,
  });
  slide.addText(
    "基盤KR: チーム健全性維持 ＋ 次期リーダー育成 — 全KRの前提条件",
    {
      x: 0.55,
      y: 2.4,
      w: 9.0,
      h: 0.3,
      fontSize: 12,
      bold: true,
      color: "FFFFFF",
      fontFace: font.jp,
      align: "left",
      valign: "middle",
      margin: 0,
    },
  );

  parts.addStyledTable(slide, pres, theme, {
    x: 0.4,
    y: 2.72,
    w: 9.2,
    headers: ["デリバリーチームの取組", "DPG全体への効果"],
    colW: [3.8, 5.4],
    fontSize: 9.5,
    rowH: 0.3,
    rows: [
      [
        "チーム健全性を「良好」以上で維持",
        "持続的に成果を出し続けるための土台。人が壊れたら全KRが止まる",
      ],
      [
        "チーフ育成計画マイルストーン100%達成",
        "内製化の拡大=チームを増やす力の確保。リーダーなしではスケールできない",
      ],
    ],
    font,
  });

  parts.addAlertBox(slide, pres, theme, {
    x: 0.4,
    y: 3.4,
    w: 9.2,
    h: 0.52,
    type: "info",
    text: "速く作って、速く学んで、速く軌道修正できる仕組みがKR①（熱狂顧客獲得）の成功確率を高めます。PdMチームとデリバリーチームの両輪が揃ってはじめてmTGの目標が達成可能になります。",
    font,
  });

  // DPG KR全体との間接貢献サマリー
  slide.addText("デリバリーチームとDPG他KRの接続", {
    x: 0.4,
    y: 4.0,
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
    y: 4.3,
    w: 9.2,
    headers: ["DPG KR", "デリバリーチームの関わり"],
    colW: [2.2, 7.0],
    fontSize: 9,
    rowH: 0.25,
    rows: [
      [
        "KR⑥ コスト削減",
        "手戻り削減=無駄な開発コスト削減。フロー改善=同じリソースでより多くのアウトプット",
      ],
      [
        "KR⑦ ビジネス側評価",
        "「言った通りに、言った時期に出てくる」信頼性の向上が評価に直結",
      ],
    ],
    font,
  });
}

// ============================================================
// S7: FY26マイルストーン（及川GMが上に説明できるフレーム）
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addBottomBar(slide, pres, theme);
  parts.addHeader(slide, pres, theme, {
    breadcrumb: "FY26 マイルストーン",
    font,
  });
  parts.addSlideTitle(slide, pres, theme, {
    title: "FY26は仕組みを作る年——Qごとに成果を確認しながら改善サイクルを回す",
    font,
  });

  parts.addStyledTable(slide, pres, theme, {
    x: 0.4,
    y: 1.28,
    w: 9.2,
    headers: ["時期", "デリバリーチームの到達点", "DPG KR②との対応"],
    colW: [1.1, 5.3, 2.8],
    fontSize: 9.5,
    rowH: 0.68,
    rows: [
      [
        "1Q末",
        "サイクルタイム・手戻り率の計測開始\nReady定義を全チーム標準化\nスプリントレビューに価値検証アジェンダ導入",
        "KR②1Q「リードタイム計測可能、\n2Q目標設定完了」に対応",
      ],
      [
        "2Q末",
        "ベースライン確立。改善施策の効果測定開始\nWIP制限運用開始。学習ログ蓄積開始",
        "KR②2Q「共通基準の整備完了」に対応",
      ],
      [
        "3Q末",
        "サイクルタイム10-15%短縮実現\n手戻り率15%削減\nPdMへの月次FBが定着",
        "3-4Qは独自マイルストーン",
      ],
      [
        "FY26末",
        "サイクルタイム20%短縮\n手戻り率30%削減\nゴール達成率80%以上\nチーフ育成マイルストーン100%達成",
        "FY27の「35%短縮」「50%削減」への\n基盤確立",
      ],
    ],
    font,
  });
}

// ============================================================
// S8: 想定Q&A（経営視点TOP3）
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addBottomBar(slide, pres, theme);
  parts.addHeader(slide, pres, theme, {
    breadcrumb: "想定Q&A",
    font,
  });
  parts.addSlideTitle(slide, pres, theme, {
    title: "経営が気にするQ&Aをあらかじめ準備する",
    font,
  });

  const qas = [
    {
      q: "Q1. 「これでKR②の『1週間以内リリース』は達成できるのか？」",
      a: "FY26で20%短縮 → FY28末に50%短縮が目標。機能を小さく分割して1スプリント以内の単位にすることで、KR②の本質（高速に仮説検証を回す）は実現できます。1Q中にベースライン計測を完了し、具体的な目標数値を設定します。",
    },
    {
      q: "Q3. 「内製化チームを増やす方が先ではないか？」",
      a: "増やすべきときは来ます。ただし今のプロセスのまま人を増やしても、手戻りと判断待ちが比例して増えるだけです。FY26でプロセスの品質を上げ（KR1・KR2）、同時にチーフ育成（基盤KR2）を進めることで、FY27以降の組織拡大に耐えうる基盤を作ります。",
    },
    {
      q: "Q4. 「3年計画は長すぎないか？スピード感がない」",
      a: "3年は最終ターゲットであり、FY26だけでもサイクルタイム20%短縮＋手戻り30%削減という具体的な成果を出します。1Qごとにマイルストーンを設定しており、効果が出ない場合はQごとに施策を修正します。遅い投資ではなく、確実に効く投資です。",
    },
  ];

  let y = 1.3;
  qas.forEach((qa) => {
    // Q
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.4,
      y,
      w: 9.2,
      h: 0.3,
      fill: { color: theme.P },
      line: { color: theme.P, width: 0 },
      rectRadius: 0.03,
    });
    slide.addText(qa.q, {
      x: 0.55,
      y,
      w: 9.0,
      h: 0.3,
      fontSize: 11,
      bold: true,
      color: "FFFFFF",
      fontFace: font.jp,
      align: "left",
      valign: "middle",
      margin: 0,
    });
    y += 0.3;

    // A
    slide.addText("A: " + qa.a, {
      x: 0.55,
      y,
      w: 9.0,
      h: 0.64,
      fontSize: 10,
      color: theme.DT,
      fontFace: font.jp,
      align: "left",
      valign: "top",
      margin: [2, 0, 2, 0],
      lineSpacingMultiple: 1.4,
    });
    y += 0.7;
  });
}

// ============================================================
// S9: ネクストアクション（まとめ）
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addBottomBar(slide, pres, theme);
  parts.addHeader(slide, pres, theme, {
    breadcrumb: "ネクストアクション",
    font,
  });
  parts.addSlideTitle(slide, pres, theme, {
    title: "FY26 1Q中に計測基盤を立ち上げ、今日から仕組みを動かし始める",
    font,
  });

  // まとめカード（P色ライン）
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4,
    y: 1.28,
    w: 9.2,
    h: 0.8,
    fill: { color: theme.CB },
    line: { color: theme.P, width: 2 },
    rectRadius: 0.03,
  });
  slide.addText(
    "このOKRにご承認・ご納得いただいた後、以下3点をQ1中に立ち上げます",
    {
      x: 0.55,
      y: 1.28,
      w: 9.0,
      h: 0.8,
      fontSize: 13,
      bold: true,
      color: theme.P,
      fontFace: font.jp,
      align: "center",
      valign: "middle",
      margin: 0,
    },
  );

  parts.addStyledTable(slide, pres, theme, {
    x: 0.4,
    y: 2.15,
    w: 9.2,
    headers: ["アクション", "担い手", "期限"],
    colW: [5.2, 2.2, 1.8],
    fontSize: 11,
    rowH: 0.48,
    rows: [
      [
        "サイクルタイム・手戻り率の計測ダッシュボード構築開始",
        "SM",
        "2026-04末",
      ],
      ["Ready定義（受入条件テンプレ）の全チーム標準化", "PO", "2026-04末"],
      [
        "スプリントレビューへの価値検証アジェンダ追加",
        "PO+SM",
        "次スプリントから",
      ],
    ],
    font,
  });

  parts.addAlertBox(slide, pres, theme, {
    x: 0.4,
    y: 3.73,
    w: 9.2,
    h: 0.52,
    type: "info",
    text: "本OKRはDPG挑戦KR②「高速プロダクト開発の型」の現場実行計画です。及川GMのOKRをデリバリーチームが「仕組みとして動かす」ことをコミットします。",
    font,
  });

  // 承認依頼
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4,
    y: 4.33,
    w: 9.2,
    h: 0.7,
    fill: { color: theme.P },
    line: { color: theme.P, width: 0 },
    rectRadius: 0.03,
  });
  slide.addText(
    "✔ 本OKRの方向性への承認をいただけますか？\n確認後、1Q計画の詳細を別途共有します",
    {
      x: 0.55,
      y: 4.33,
      w: 9.0,
      h: 0.7,
      fontSize: 13,
      color: "FFFFFF",
      fontFace: font.jp,
      align: "center",
      valign: "middle",
      margin: 0,
      lineSpacingMultiple: 1.5,
    },
  );
}

// ============================================================
// 出力
// ============================================================
pres
  .writeFile({ fileName: "outputs/pptx/delivery_okr_exec.pptx" })
  .then(() => {
    console.log("✅  Generated: outputs/pptx/delivery_okr_exec.pptx");
  })
  .catch((e) => {
    console.error("❌  Error:", e.message);
    process.exit(1);
  });
