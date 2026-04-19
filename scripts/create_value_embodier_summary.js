// ============================================================
// FY2025 Value体現者アンケート サマリーデッキ
// ============================================================

const PptxGenJS = require("pptxgenjs");
const {
  getTheme,
  getFontPreset,
  parts,
} = require("./lib");

const theme = getTheme("corporate");
const font = getFontPreset("corporate");

const pres = new PptxGenJS();
pres.title = "FY2025 Value体現者アンケート サマリー";

const TODAY = "2026-04-18";
const DECK_TITLE = "FY2025 Value体現者アンケート サマリー";
const BRAND = "デジタル/プロダクト開発";

// ─── Helper: 全スライド共通セットアップ ──────────
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

// ─── S1: 全体サマリー（KPI 3枚） ─────────────────
{
  const s = setupSlide(
    `${BRAND}  /  Value体現者サマリー`,
    "28名・82件のコメントが集まり、3つのValueは現場で確かに体現されていた"
  );

  const cardY = 1.7;
  const cardH = 2.4;
  const cardW = 2.9;
  const gap = 0.25;
  const startX = (10 - (cardW * 3 + gap * 2)) / 2;

  const metrics = [
    { number: "28", unit: "名", label: "体現者として名指しされたメンバー", accent: theme.P },
    { number: "82", unit: "件", label: "寄せられた称賛コメント総数", accent: theme.ACCENTS[1] },
    { number: "3", unit: "Value", label: "コメント分布にバランス偏りなし", accent: theme.ACCENTS[3] },
  ];

  metrics.forEach((m, i) => {
    parts.addMetricCard(s, pres, theme, {
      x: startX + i * (cardW + gap),
      y: cardY,
      w: cardW,
      h: cardH,
      number: m.number,
      unit: m.unit,
      label: m.label,
      accentColor: m.accent,
      columns: 3,
      font,
    });
  });

  s.addText(
    "データソース: FY2025 Value体現者アンケート（自由記述コメント）。重複コメントは人数カウントに含めず、総件数にのみ反映。",
    {
      x: 0.4, y: 5.15, w: 9.2, h: 0.3,
      fontSize: 9, color: theme.ST, fontFace: font.jp,
      align: "left", valign: "middle", margin: 0,
    }
  );
}

// ─── S2: コメント分布（横棒グラフ） ──────────────
{
  const s = setupSlide(
    "全体サマリー  /  Value別コメント分布",
    "3つのValueはほぼ均等に言及され、組織として偏りなく体現されている"
  );

  const data = [
    { label: "お客さま起点", count: 28, color: theme.ACCENTS[0] },
    { label: "圧倒的当事者意識", count: 26, color: theme.ACCENTS[1] },
    { label: "感謝と尊敬", count: 28, color: theme.ACCENTS[3] },
  ];
  const max = 30;
  const barAreaX = 2.5;
  const barAreaW = 5.5;
  const startY = 1.7;
  const rowH = 0.85;
  const gap = 0.35;

  data.forEach((d, i) => {
    const y = startY + i * (rowH + gap);

    // ラベル
    s.addText(d.label, {
      x: 0.4, y, w: 2.0, h: rowH,
      fontSize: 14, bold: true, color: theme.DT, fontFace: font.jp,
      align: "left", valign: "middle", margin: 0,
    });

    // バー背景
    s.addShape(pres.shapes.RECTANGLE, {
      x: barAreaX, y: y + rowH * 0.25, w: barAreaW, h: rowH * 0.5,
      fill: { color: theme.SF }, line: { color: theme.S, width: 0.5 },
    });

    // バー本体
    const barW = (d.count / max) * barAreaW;
    s.addShape(pres.shapes.RECTANGLE, {
      x: barAreaX, y: y + rowH * 0.25, w: barW, h: rowH * 0.5,
      fill: { color: d.color }, line: { color: d.color },
    });

    // 数値
    s.addText(`${d.count} 件`, {
      x: barAreaX + barAreaW + 0.15, y, w: 1.5, h: rowH,
      fontSize: 16, bold: true, color: d.color, fontFace: font.en,
      align: "left", valign: "middle", margin: 0,
    });
  });

  parts.addAlertBox(s, pres, theme, {
    x: 0.4, y: 5.00, w: 9.2, h: 0.4,
    type: "info",
    text: "3 Value が同水準で言及されたのは、単一の突出した強みではなく、組織文化として根付いている兆候",
    font,
  });
}

// ─── S3: 上位体現者ランキング ────────────────────
{
  const s = setupSlide(
    "全体サマリー  /  上位体現者",
    "福田美桜さんが全Valueで突出、特に「感謝と尊敬」13件は組織の羅針盤的存在を示す"
  );

  parts.addStyledTable(s, pres, theme, {
    x: 0.4, y: 1.3, w: 9.2,
    headers: ["順位", "氏名", "お客さま起点", "当事者意識", "感謝と尊敬", "合計"],
    rows: [
      ["1", "福田美桜さん", "7", "5", "13", "25"],
      ["2", "磯野祐輝さん", "5", "0", "0", "5"],
      ["3", "長友理桜さん", "4", "0", "0", "4"],
      ["3", "西田恵美さん", "2", "1", "1", "4"],
      ["3", "相川さん", "0", "4", "0", "4"],
      ["3", "中道礼香さん", "0", "1", "3", "4"],
    ],
    colW: [0.8, 2.4, 1.5, 1.5, 1.5, 1.5],
    rowH: 0.45,
    fontSize: 12,
    font,
  });

  parts.addAlertBox(s, pres, theme, {
    x: 0.4, y: 4.7, w: 9.2, h: 0.65,
    type: "ok",
    text: "福田さんは25件のうち「感謝と尊敬」が13件と過半。多くのステークホルダーを束ねるPO職として、尊重と言語化を軸に組織を動かしていることが可視化された",
    font,
  });
}

// ─── S4: お客さま起点 の体現パターン ─────────────
{
  const s = setupSlide(
    "Value別の体現パターン  /  お客さま起点",
    "「お客さま起点」は〈声を聞く→価値を定義する→段階的に届ける〉の3ステップで体現されている"
  );

  parts.addFlowHorizontal(s, pres, theme, {
    x: 0.4, y: 1.4, w: 9.2, h: 1.8,
    steps: [
      {
        title: "1. 声を聞く",
        body: "ユーザーインタビュー・問い合わせ・行動データを起点に課題を発見する",
      },
      {
        title: "2. 価値を定義する",
        body: "社内要望を並べるだけで終わらず、顧客価値と優先順位を考え抜く",
      },
      {
        title: "3. 段階的に届ける",
        body: "分割提供・段階リリースで小さく速く価値を届ける仕組みを作る",
      },
    ],
    font,
  });

  // 代表引用
  s.addText("代表コメント", {
    x: 0.4, y: 3.55, w: 9.2, h: 0.3,
    fontSize: 11, bold: true, color: theme.P, fontFace: font.jp,
    align: "left", valign: "middle", margin: 0,
  });
  parts.addAlertBox(s, pres, theme, {
    x: 0.4, y: 3.9, w: 9.2, h: 1.1,
    type: "info",
    text: "「Kraken直連携では、当社都合で移行を完了することにとどまらず、その先のお客さま体験まで見据えて、ステークホルダーとの調整や発信をされている」— 福田さんへのコメントより",
    font,
  });
}

// ─── S5: 圧倒的当事者意識 の体現パターン ──────────
{
  const s = setupSlide(
    "Value別の体現パターン  /  圧倒的当事者意識",
    "「圧倒的当事者意識」は〈役割越境・忖度なき意見・率先対応〉の3本柱で現れている"
  );

  const cardW = 2.9;
  const cardH = 2.1;
  const gap = 0.25;
  const startX = (10 - (cardW * 3 + gap * 2)) / 2;
  const cardY = 1.4;

  const pillars = [
    {
      title: "役割越境",
      body: "POが技術に踏み込み、Engがビジネスに染み出す。自分の役割以上にチームのために動く姿勢",
      accent: theme.ACCENTS[0],
    },
    {
      title: "忖度なき意見",
      body: "入社直後でも遠慮せず発言。理想に近づけるために、1つの解に固執せず全力で選択肢を出し切る",
      accent: theme.ACCENTS[1],
    },
    {
      title: "率先対応",
      body: "インシデント・障害時に真っ先に動き、PBIの「なぜやるのか」を追求してより良い実現方法を提案する",
      accent: theme.ACCENTS[3],
    },
  ];

  pillars.forEach((p, i) => {
    parts.addCard(s, pres, theme, {
      x: startX + i * (cardW + gap),
      y: cardY,
      w: cardW,
      h: cardH,
      accentColor: p.accent,
      title: p.title,
      body: p.body,
      font,
    });
  });

  s.addText("代表コメント", {
    x: 0.4, y: 3.75, w: 9.2, h: 0.3,
    fontSize: 11, bold: true, color: theme.P, fontFace: font.jp,
    align: "left", valign: "middle", margin: 0,
  });
  parts.addAlertBox(s, pres, theme, {
    x: 0.4, y: 4.1, w: 9.2, h: 1.0,
    type: "info",
    text: "「POという立場でありながら、システム開発を強く自分事として捉え、技術的な内容にもご自身で目を向けながら進めていらっしゃる」— 福田さんへのコメントより",
    font,
  });
}

// ─── S6: 感謝と尊敬 の体現パターン ────────────────
{
  const s = setupSlide(
    "Value別の体現パターン  /  感謝と尊敬",
    "「感謝と尊敬」は〈意見対立時の尊重〉と〈言語化されたフィードバック〉として静かに効いている"
  );

  const cardW = 4.4;
  const cardH = 2.1;
  const gap = 0.4;
  const startX = (10 - (cardW * 2 + gap)) / 2;
  const cardY = 1.4;

  const patterns = [
    {
      title: "意見対立時の尊重",
      body: "異なる意見に反発せず、一人ひとりの話を聞き、感謝を述べてから自分の意見を話し始める。利害が違う相手の考えを理解しようとする姿勢",
      accent: theme.ACCENTS[0],
    },
    {
      title: "言語化されたフィードバック",
      body: "「言わなくても伝わる」で済ませず、褒めも含めて相手へ積極的に言葉で伝える。先人や関係部署にも敬意を払う",
      accent: theme.ACCENTS[3],
    },
  ];

  patterns.forEach((p, i) => {
    parts.addCard(s, pres, theme, {
      x: startX + i * (cardW + gap),
      y: cardY,
      w: cardW,
      h: cardH,
      accentColor: p.accent,
      title: p.title,
      body: p.body,
      font,
    });
  });

  s.addText("代表コメント", {
    x: 0.4, y: 3.75, w: 9.2, h: 0.3,
    fontSize: 11, bold: true, color: theme.P, fontFace: font.jp,
    align: "left", valign: "middle", margin: 0,
  });
  parts.addAlertBox(s, pres, theme, {
    x: 0.4, y: 4.1, w: 9.2, h: 1.0,
    type: "info",
    text: "「EKS脱却PJは、先人にも敬意を払いつつ事業としてベストな選択をする必要があり、感謝と尊敬がないと成しえなかった」— 高野さん・荒井さんへのコメントより",
    font,
  });
}

// ─── S7: 横断する体現者像（三位一体） ───────────
{
  const s = setupSlide(
    "インサイト  /  Valueを横断する体現者像",
    "3つのValueを横断する体現者像は「越境 × 顧客起点 × 対話」の3点セットである"
  );

  const cardW = 2.9;
  const cardH = 2.3;
  const gap = 0.25;
  const startX = (10 - (cardW * 3 + gap * 2)) / 2;
  const cardY = 1.45;

  const axes = [
    {
      title: "越境",
      sub: "= 当事者意識",
      body: "役割・職種・立場を越えて、事業成果のために自分ごと化する",
      accent: theme.ACCENTS[0],
    },
    {
      title: "顧客起点",
      sub: "= お客さま起点",
      body: "声を聞き、価値を定義し、段階的に届ける型を持っている",
      accent: theme.ACCENTS[1],
    },
    {
      title: "対話",
      sub: "= 感謝と尊敬",
      body: "意見対立を尊重で解き、フィードバックを言葉にして渡す",
      accent: theme.ACCENTS[3],
    },
  ];

  axes.forEach((a, i) => {
    const x = startX + i * (cardW + gap);
    // カード
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: cardY, w: cardW, h: cardH,
      fill: { color: theme.CB },
      line: { color: a.accent, width: 1.5 },
      rectRadius: 0.03,
    });
    // 大タイトル
    s.addText(a.title, {
      x: x + 0.1, y: cardY + 0.2, w: cardW - 0.2, h: 0.65,
      fontSize: 26, bold: true, color: a.accent, fontFace: font.jp,
      align: "center", valign: "middle", margin: 0,
    });
    // サブ
    s.addText(a.sub, {
      x: x + 0.1, y: cardY + 0.9, w: cardW - 0.2, h: 0.35,
      fontSize: 11, color: theme.ST, fontFace: font.jp,
      align: "center", valign: "middle", margin: 0,
    });
    // 本文
    s.addText(a.body, {
      x: x + 0.2, y: cardY + 1.3, w: cardW - 0.4, h: 0.9,
      fontSize: 12, color: theme.DT, fontFace: font.jp,
      align: "left", valign: "top", margin: 0,
      lineSpacingMultiple: 1.4,
    });
  });

  parts.addAlertBox(s, pres, theme, {
    x: 0.4, y: 4.1, w: 9.2, h: 1.0,
    type: "ok",
    text: "福田さんが3軸すべてで評価された事実が、この仮説の強い裏付け。Value体現は「どれか1つ」ではなく「3つ同時」に現れる",
    font,
  });
}

// ─── S8: 次の一手 ───────────────────────────────
{
  const s = setupSlide(
    "まとめ  /  次の一手",
    "体現パターンを型化し、来期のValueブック・評価・1on1の実運用に組み込む"
  );

  parts.addStepProcess(s, pres, theme, {
    x: 0.4, y: 1.35, w: 9.2, h: 3.5,
    steps: [
      {
        title: "体現パターンの型化",
        body: "各Valueの「型」（声を聞く→価値定義→段階提供／越境×意見×率先／尊重×言語化）を1ページにまとめてValueブック化する　[担当: デジタル/プロダクト開発  期限: 2026-05-31]",
      },
      {
        title: "1on1・評価での活用",
        body: "期末評価とマネージャー1on1で「Valueの型」をチェックリスト化。体現者のエピソードを社内で語り継げる仕組みにする　[担当: マネジメント層  期限: 来期 Q1 中]",
      },
      {
        title: "トップ体現者ヒアリング",
        body: "福田さんほか全Value型を体現するメンバーに、行動原理・判断基準・失敗談をヒアリング。型を「暗黙知→形式知」に変換する　[担当: 要決定  期限: 2026-06-30]",
      },
    ],
    font,
  });
}

// ─── 出力 ───────────────────────────────────────
pres.writeFile({
  fileName: "outputs/pptx/2026-04-18_value-embodier-summary.pptx",
}).then((name) => {
  console.log(`Generated: ${name}`);
});
