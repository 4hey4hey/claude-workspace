const PptxGenJS = require("pptxgenjs");
const {
  getTheme,
  parts,
  getFontPreset,
  calcLayout,
} = require("./lib");

const theme = getTheme("corporate");
const font = getFontPreset("corporate");
const pres = new PptxGenJS();
pres.title = "デリバリーマネジメントチーム OKR 2026";

// ============================================================
// 表紙
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addCoverTitle(slide, pres, theme, {
    title: "デリバリーマネジメントチーム\nOKR 2026年度",
    subtitle:
      "開発投資のリターンを最大化するための挑戦目標",
    date: "2026-04-04",
    author: "デリバリーマネジメントチーム",
    font,
  });
  parts.addBottomBar(slide, pres, theme);
}

// ============================================================
// S1: OKR全体像（横フロー）
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addBottomBar(slide, pres, theme);
  parts.addHeader(slide, pres, theme, { breadcrumb: "OKR全体像", font });
  parts.addSlideTitle(slide, pres, theme, {
    title:
      "3つの挑戦KRでバリューチェーン全区間をカバーし投資リターンを最大化する",
    font,
  });

  // Objective ボックス
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4,
    y: 1.28,
    w: 9.2,
    h: 0.55,
    fill: { color: theme.CB },
    line: { color: theme.P, width: 1 },
    rectRadius: 0.03,
  });
  slide.addText(
    [
      { text: "Objective: ", options: { bold: true, color: theme.P, fontSize: 13, fontFace: font.jp } },
      {
        text: "投資が最短・最確実に顧客価値へ変換されるデリバリーラインを確立する",
        options: { color: theme.DT, fontSize: 13, fontFace: font.jp },
      },
    ],
    { x: 0.55, y: 1.28, w: 8.9, h: 0.55, valign: "middle", margin: 0 }
  );

  // 3つの挑戦KR 横フロー
  const flowY = 2.05;
  const flowH = 2.0;
  parts.addFlowHorizontal(slide, pres, theme, {
    x: 0.4,
    y: flowY,
    w: 9.2,
    h: flowH,
    steps: [
      {
        title: "KR1: 入口品質",
        body: "仕様起因の手戻りコストを\n2028年度末に80%削減\n\n見極める（PO主導）",
      },
      {
        title: "KR2: フロー効率",
        body: "サイクルタイム中央値を\n2028年度末に50%短縮\n\n速くする（SM主導）",
      },
      {
        title: "KR3: 学習ループ",
        body: "投資判断の学習サイクルを\n2028年度末に全チーム定着\n\n見極める（PO主導）",
      },
    ],
    font,
  });

  // 循環矢印（KR3→KR1）
  slide.addText("学習がKR1の入口品質をさらに改善", {
    x: 0.4,
    y: flowY + flowH + 0.12,
    w: 9.2,
    h: 0.3,
    fontSize: 11,
    color: theme.ST,
    fontFace: font.jp,
    align: "center",
    valign: "middle",
    margin: 0,
  });

  // 基盤KR帯
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4,
    y: 4.55,
    w: 9.2,
    h: 0.52,
    fill: { color: theme.SF },
    rectRadius: 0.03,
  });
  slide.addText(
    [
      { text: "基盤KR: ", options: { bold: true, color: theme.ST, fontSize: 11, fontFace: font.jp } },
      {
        text: "チーム健全性「良好」以上維持 ｜ チーフ育成マイルストーン達成率100%  — 全挑戦KRの前提条件",
        options: { color: theme.ST, fontSize: 11, fontFace: font.jp },
      },
    ],
    { x: 0.55, y: 4.55, w: 8.9, h: 0.52, valign: "middle", margin: 0 }
  );
}

// ============================================================
// S2: 挑戦KR1 — 入口品質
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addBottomBar(slide, pres, theme);
  parts.addHeader(slide, pres, theme, {
    breadcrumb: "挑戦KR1 / 入口品質 / 見極める",
    font,
  });
  parts.addSlideTitle(slide, pres, theme, {
    title:
      "入口品質を確立し、仕様起因の手戻りコストを2028年度末にゼロに近づける",
    font,
  });

  // バッジ
  parts.addBadge(slide, pres, theme, {
    x: 0.4,
    y: 1.22,
    label: "挑戦KR",
    color: theme.A,
    w: 0.9,
    h: 0.26,
    font,
  });

  // なぜ挑戦か
  slide.addText(
    "仕様起因の手戻りが恒常的に発生しているが、原因分析の仕組みすら存在しない。Ready定義→手戻り原因可視化→仕様精度改善→PO判断高速化の因果チェーンを全チームに定着させること自体が未経験の挑戦。",
    {
      x: 1.45,
      y: 1.22,
      w: 8.15,
      h: 0.45,
      fontSize: 11,
      color: theme.ST,
      fontFace: font.jp,
      align: "left",
      valign: "middle",
      margin: 0,
      lineSpacingMultiple: 1.3,
    }
  );

  // タイムライン
  parts.addTimeline(slide, pres, theme, {
    x: 0.4,
    y: 1.75,
    w: 9.2,
    h: 1.40,
    events: [
      {
        date: "2026年度末",
        title: "基盤構築",
        body: "Ready比率80%以上\n手戻り30%削減\n原因分類開始",
      },
      {
        date: "2027年度末",
        title: "改善加速",
        body: "手戻り50%削減\nPO判断LT 2営業日以内",
      },
      {
        date: "2028年度末",
        title: "定着",
        body: "手戻り80%削減\nスコープ変更率\n計測・制御運用",
      },
    ],
    font,
  });

  // 2026年度施策テーブル
  slide.addText("2026年度の重点施策", {
    x: 0.4,
    y: 3.20,
    w: 9.2,
    h: 0.28,
    fontSize: 13,
    bold: true,
    color: theme.P,
    fontFace: font.jp,
    align: "left",
    valign: "middle",
    margin: 0,
  });

  parts.addStyledTable(slide, pres, theme, {
    x: 0.4,
    y: 3.50,
    w: 9.2,
    headers: ["施策", "担い手", "完了条件"],
    colW: [3.2, 0.8, 5.2],
    fontSize: 10,
    rowH: 0.32,
    rows: [
      [
        "Ready定義（受入条件テンプレ+Done定義）の標準化",
        "PO",
        "全チームで「Ready未達PBIは着手しない」が徹底",
      ],
      [
        "手戻り原因分類プロセス導入（仕様/技術/外部）",
        "PO+SM",
        "スプリントレトロでトレンドレビューが運用",
      ],
      [
        "PO判断プロセス可視化・権限委譲ルール整備",
        "PO",
        "判断待ち日数の計測開始、委譲基準が運用",
      ],
      [
        "スプリント中スコープ変更ルールの明文化",
        "PO+SM",
        "スコープ追加=PO承認+代替外し決定がルール化",
      ],
    ],
    font,
  });
}

// ============================================================
// S3: 挑戦KR2 — フロー効率
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addBottomBar(slide, pres, theme);
  parts.addHeader(slide, pres, theme, {
    breadcrumb: "挑戦KR2 / フロー効率 / 速くする",
    font,
  });
  parts.addSlideTitle(slide, pres, theme, {
    title:
      "サイクルタイム中央値を2028年度末までに現状比50%短縮する",
    font,
  });

  parts.addBadge(slide, pres, theme, {
    x: 0.4,
    y: 1.22,
    label: "挑戦KR",
    color: theme.A,
    w: 0.9,
    h: 0.26,
    font,
  });

  slide.addText(
    "KR1の入口品質改善（手戻り削減）が前提条件として効く。ボトルネック解消・PBI粒度の最適化・スプリント計画精度の向上を複合的に進めないと達成できない。",
    {
      x: 1.45,
      y: 1.22,
      w: 8.15,
      h: 0.45,
      fontSize: 11,
      color: theme.ST,
      fontFace: font.jp,
      align: "left",
      valign: "middle",
      margin: 0,
      lineSpacingMultiple: 1.3,
    }
  );

  parts.addTimeline(slide, pres, theme, {
    x: 0.4,
    y: 1.75,
    w: 9.2,
    h: 1.40,
    events: [
      {
        date: "2026年度末",
        title: "計測+初期改善",
        body: "ベースライン確立\n20%短縮\nゴール達成率80%以上",
      },
      {
        date: "2027年度末",
        title: "加速",
        body: "35%短縮\n予測精度±3日以内\nゴール達成率85%以上",
      },
      {
        date: "2028年度末",
        title: "達成",
        body: "50%短縮達成",
      },
    ],
    font,
  });

  slide.addText("2026年度の重点施策", {
    x: 0.4,
    y: 3.20,
    w: 9.2,
    h: 0.28,
    fontSize: 13,
    bold: true,
    color: theme.P,
    fontFace: font.jp,
    align: "left",
    valign: "middle",
    margin: 0,
  });

  parts.addStyledTable(slide, pres, theme, {
    x: 0.4,
    y: 3.50,
    w: 9.2,
    headers: ["施策", "担い手", "完了条件"],
    colW: [3.2, 0.8, 5.2],
    fontSize: 10,
    rowH: 0.32,
    rows: [
      [
        "サイクルタイム計測導入・レトロでトレンドレビュー",
        "SM",
        "全チームのダッシュボード稼働、レトロで毎回確認",
      ],
      [
        "PBI粒度ガイドライン整備・小さく分割して流す習慣定着",
        "SM+PO",
        "1スプリントで完了可能なサイズが全チームの標準に",
      ],
      [
        "スプリントゴール達成率80%の全チーム目標設定",
        "SM",
        "達成率が全チーム平均80%以上で推移",
      ],
      [
        "ボトルネック可視化（サイクルタイム工程別内訳）",
        "SM",
        "滞留工程がダッシュボードで判別可能",
      ],
    ],
    font,
  });
}

// ============================================================
// S4: KR間の因果関係（KR1・KR2の後、KR3の前に配置）
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addBottomBar(slide, pres, theme);
  parts.addHeader(slide, pres, theme, {
    breadcrumb: "KR間の因果関係",
    font,
  });
  parts.addSlideTitle(slide, pres, theme, {
    title: "入口→フロー→学習の循環で投資判断の精度が向上し続ける",
    font,
  });

  const colors = [theme.ACCENTS[0], theme.ACCENTS[1], theme.ACCENTS[2]];
  const labels = [
    { tag: "KR1: 入口品質", desc: "良質な仕事を\nフローに投入する" },
    { tag: "KR2: フロー効率", desc: "投入された仕事を\n速く流して届ける" },
    { tag: "KR3: 学習ループ", desc: "届けた結果を検証し\n次の投資判断に活かす" },
  ];

  const boxW = 2.5;
  const boxH = 1.75;
  const startX = 0.7;
  const boxY = 1.45;
  const gapX = 0.55;

  labels.forEach((l, i) => {
    const bx = startX + i * (boxW + gapX + 0.3);
    const c = colors[i];

    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: bx,
      y: boxY,
      w: boxW,
      h: boxH,
      fill: { color: theme.CB },
      line: { color: c, width: 2 },
      rectRadius: 0.03,
    });

    slide.addText(l.tag, {
      x: bx + 0.1,
      y: boxY + 0.12,
      w: boxW - 0.2,
      h: 0.40,
      fontSize: 14,
      bold: true,
      color: c,
      fontFace: font.jp,
      align: "center",
      valign: "middle",
      margin: 0,
    });

    slide.addText(l.desc, {
      x: bx + 0.1,
      y: boxY + 0.55,
      w: boxW - 0.2,
      h: 1.05,
      fontSize: 12,
      color: theme.DT,
      fontFace: font.jp,
      align: "center",
      valign: "middle",
      margin: 0,
      lineSpacingMultiple: 1.5,
    });

    if (i < 2) {
      const ax = bx + boxW + 0.05;
      slide.addText("\u25B6", {
        x: ax,
        y: boxY + boxH * 0.35,
        w: 0.5,
        h: 0.5,
        fontSize: 18,
        color: theme.ST,
        fontFace: "Arial",
        align: "center",
        valign: "middle",
        margin: 0,
      });
    }
  });

  const noteY = boxY + boxH + 0.20;

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4,
    y: noteY,
    w: 9.2,
    h: 0.40,
    fill: { color: theme.SF },
    rectRadius: 0.03,
  });
  slide.addText(
    "KR3の学習結果 → PdMへフィードバック → 仮説精度向上 → バックログ品質向上 → KR1の入口品質がさらに改善（循環構造）",
    {
      x: 0.55,
      y: noteY,
      w: 8.9,
      h: 0.40,
      fontSize: 11,
      color: theme.P,
      fontFace: font.jp,
      align: "center",
      valign: "middle",
      margin: 0,
    }
  );

  parts.addStyledTable(slide, pres, theme, {
    x: 0.4,
    y: noteY + 0.48,
    w: 9.2,
    headers: ["接続", "因果関係"],
    colW: [2.0, 7.2],
    fontSize: 10,
    rowH: 0.30,
    rows: [
      ["KR1 → KR2", "入口品質↑（手戻り↓）がフロー効率改善を加速する"],
      ["KR2 → KR3", "速く届く → レビュー頻度↑ → 学習サイクルが速く回る"],
      ["KR3 → KR1", "学習結果がPdM経由で仮説精度を上げ、入口品質がさらに改善"],
    ],
    font,
  });
}

// ============================================================
// S5: 挑戦KR3 — 学習ループ（因果関係の後に配置）
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addBottomBar(slide, pres, theme);
  parts.addHeader(slide, pres, theme, {
    breadcrumb: "挑戦KR3 / 学習ループ / 見極める",
    font,
  });
  parts.addSlideTitle(slide, pres, theme, {
    title:
      "投資判断の学習サイクルを2028年度末までに全チームで定着させる",
    font,
  });

  parts.addBadge(slide, pres, theme, {
    x: 0.4,
    y: 1.22,
    label: "挑戦KR",
    color: theme.A,
    w: 0.9,
    h: 0.26,
    font,
  });

  slide.addText(
    "スプリントレビューが「デモを見せて終わり」になりがち。「価値仮説を検証できたか？学びを次の優先順位にどう反映するか？」を構造的に扱う文化変革が必要。",
    {
      x: 1.45,
      y: 1.22,
      w: 8.15,
      h: 0.45,
      fontSize: 11,
      color: theme.ST,
      fontFace: font.jp,
      align: "left",
      valign: "middle",
      margin: 0,
      lineSpacingMultiple: 1.3,
    }
  );

  parts.addTimeline(slide, pres, theme, {
    x: 0.4,
    y: 1.75,
    w: 9.2,
    h: 1.40,
    events: [
      {
        date: "2026年度末",
        title: "仕組み構築",
        body: "レビュー価値検証導入\n学習ログ運用\nPdM月次FB開始",
      },
      {
        date: "2027年度末",
        title: "定量化",
        body: "価値仮説検証率80%以上\n四半期計画に\n学習レポート標準組込",
      },
      {
        date: "2028年度末",
        title: "自律運用",
        body: "バックログ優先順位変更の\n検証起因50%以上",
      },
    ],
    font,
  });

  slide.addText("2026年度の重点施策", {
    x: 0.4,
    y: 3.20,
    w: 9.2,
    h: 0.28,
    fontSize: 13,
    bold: true,
    color: theme.P,
    fontFace: font.jp,
    align: "left",
    valign: "middle",
    margin: 0,
  });

  parts.addStyledTable(slide, pres, theme, {
    x: 0.4,
    y: 3.50,
    w: 9.2,
    headers: ["施策", "担い手", "完了条件"],
    colW: [3.2, 0.8, 5.2],
    fontSize: 10,
    rowH: 0.32,
    rows: [
      [
        "スプリントレビューに「価値仮説の検証」枠を追加",
        "PO",
        "全チームで仮説→結果の議題が含まれている",
      ],
      [
        "学習ログテンプレート作成・レビューごとに記録",
        "PO",
        "仮説→結果→学び→次のアクションが蓄積",
      ],
      [
        "PdMへの月次フィードバックMTG設計・開始",
        "PO",
        "月次「学びTop3+バックログ示唆」の共有が稼働",
      ],
      [
        "接続点（週次同期・レビュー・四半期計画）の運用品質計測",
        "PO+SM",
        "実施率・フィードバック件数が可視化",
      ],
    ],
    font,
  });
}

// ============================================================
// S6: 基盤KR
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addBottomBar(slide, pres, theme);
  parts.addHeader(slide, pres, theme, {
    breadcrumb: "基盤KR / サステナビリティ / 守る・強くする",
    font,
  });
  parts.addSlideTitle(slide, pres, theme, {
    title:
      "チーム健全性と育成基盤は全挑戦KRの前提条件として必達で守る",
    font,
  });

  const ly = calcLayout({ columns: 2 });
  const cardH = 3.45; // ly.cells[0].h (4.11) だとAlertBoxと重なるため制限

  // 基盤KR1
  const c0 = ly.cells[0];
  parts.addCard(slide, pres, theme, {
    x: c0.x,
    y: c0.y,
    w: c0.w,
    h: cardH,
    accentColor: theme.ACCENTS[2],
    title: "基盤KR1: チーム健全性「良好」以上で通年維持",
    body:
      "【指標】\n" +
      "  チーム健全性スコア: 全チーム「良好」以上（月次）\n" +
      "  メンタル不調起因の離脱: 0件（月次）\n" +
      "  負荷集中度: 特定メンバーへの偏り20%以内\n\n" +
      "【施策】\n" +
      "  月次1on1で負荷・モチベーション・キャリアを確認\n" +
      "  負荷分散ダッシュボード構築\n" +
      "  チーム間の負荷調整ルール明文化",
    font,
  });

  // 基盤KR2
  const c1 = ly.cells[1];
  parts.addCard(slide, pres, theme, {
    x: c1.x,
    y: c1.y,
    w: c1.w,
    h: cardH,
    accentColor: theme.ACCENTS[3],
    title: "基盤KR2: チーフ育成マイルストーン達成率100%",
    body:
      "【指標】\n" +
      "  育成マイルストーン達成率: 100%（四半期）\n" +
      "  リーダー実践機会: 年2回以上のリード経験\n\n" +
      "【施策】\n" +
      "  Q1に育成計画（スキルマップ+マイルストーン）策定\n" +
      "  スプリントリード・レトロファシリ等を計画的に委譲\n" +
      "  四半期ごとに候補者・上長と3者レビュー",
    font,
  });

  // 注釈
  parts.addAlertBox(slide, pres, theme, {
    x: 0.4,
    y: 4.85,
    w: 9.2,
    h: 0.4,
    type: "info",
    text: "チームが健全でなければ改善活動自体が回らない。基盤KRは全挑戦KR（KR1-3）の前提条件として位置づける。",
    font,
  });
}

// ============================================================
// S7: 2026年度マイルストーン一覧
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  parts.addBottomBar(slide, pres, theme);
  parts.addHeader(slide, pres, theme, {
    breadcrumb: "2026年度 アクションプラン",
    font,
  });
  parts.addSlideTitle(slide, pres, theme, {
    title:
      "2026年度は計測基盤とプロセスの仕組みを構築し、改善サイクルの土台を作る",
    font,
  });

  parts.addStyledTable(slide, pres, theme, {
    x: 0.4,
    y: 1.3,
    w: 9.2,
    headers: ["KR", "2026年度末の到達目標", "重点施策（抜粋）"],
    colW: [1.5, 3.35, 4.35],
    fontSize: 9,
    rowH: 0.55,
    rows: [
      [
        "挑戦KR1\n入口品質",
        "バックログ健全性80%以上\n仕様起因手戻り30%削減\n原因分類プロセス稼働",
        "Ready定義標準化\n手戻り原因分類（仕様/技術/外部）\nPO判断プロセス可視化",
      ],
      [
        "挑戦KR2\nフロー効率",
        "サイクルタイム計測+20%短縮\nスプリントゴール達成率80%以上",
        "サイクルタイム・ボトルネック計測導入\nPBI粒度ガイドライン整備\nゴール達成率の全チーム目標化",
      ],
      [
        "挑戦KR3\n学習ループ",
        "レビュー価値検証アジェンダ導入\n学習ログ運用開始\nPdM月次FB稼働",
        "スプリントレビュー価値検証枠追加\n学習ログテンプレート運用\n接続点の運用品質計測",
      ],
      [
        "基盤KR1\n健全性",
        "全チーム「良好」以上で通年維持\nメンタル不調離脱ゼロ",
        "月次1on1の質向上\n負荷分散ダッシュボード構築",
      ],
      [
        "基盤KR2\n育成",
        "チーフ育成マイルストーン達成率100%",
        "育成計画策定（Q1）\nリーダー業務の計画的委譲",
      ],
    ],
    font,
  });

  // 注釈
  parts.addAlertBox(slide, pres, theme, {
    x: 0.4,
    y: 4.85,
    w: 9.2,
    h: 0.55,
    type: "info",
    text: "2026年度は「仕組みを作る年」。2027年度以降に改善が加速し、2028年度末に挑戦KRの成果を刈り取る。短期的な数字の達成より、計測・改善のサイクルが回り始めることを最優先する。",
    font,
  });
}

// ============================================================
// 出力
// ============================================================
pres
  .writeFile({ fileName: "outputs/pptx/dm_okr_2026.pptx" })
  .then(() => {
    console.log("✅  Generated: outputs/pptx/dm_okr_2026.pptx");
  })
  .catch((e) => {
    console.error("❌  Error:", e.message);
    process.exit(1);
  });
