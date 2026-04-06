const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.title = "施策投資判断ボード 説明資料";

// Color palette
const navy = "1E2761";
const blue = "4472C4";
const lightBlue = "C9D9F0";
const amber = "E8920A";
const green = "1B5E20";
const lightGreen = "E8F5E9";
const orange = "BF360C";
const lightOrange = "FBE9E7";
const white = "FFFFFF";
const dark = "1A1A2E";
const gray = "546E7A";
const lightGray = "F4F5F8";

const makeShadow = () => ({ type: "outer", blur: 4, offset: 2, angle: 135, color: "000000", opacity: 0.10 });

function addHeader(slide, title) {
  slide.background = { color: "FFFFFF" };
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.75,
    fill: { color: navy }, line: { color: navy }
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0.73, w: 10, h: 0.05,
    fill: { color: amber }, line: { color: amber }
  });
  slide.addText(title, {
    x: 0.45, y: 0, w: 9.1, h: 0.75,
    fontSize: 22, bold: true, color: white,
    fontFace: "Calibri", align: "left", valign: "middle", margin: 0
  });
}

// ==================== SLIDE 1: 表紙 ====================
{
  const s = pres.addSlide();
  s.background = { color: "FFFFFF" };

  // Large navy top area
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 2.5,
    fill: { color: navy }, line: { color: navy }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 2.47, w: 10, h: 0.07,
    fill: { color: amber }, line: { color: amber }
  });

  // Title text on navy shape
  s.addText("施策投資判断ボード", {
    x: 0.6, y: 0.3, w: 8.8, h: 0.9,
    fontSize: 36, bold: true, color: "FFFFFF",
    fontFace: "Calibri", align: "left", valign: "middle", margin: 0
  });
  s.addText("説明資料", {
    x: 0.6, y: 1.2, w: 8.8, h: 0.65,
    fontSize: 22, color: "CADCFC",
    fontFace: "Calibri", align: "left", valign: "middle", margin: 0
  });
  s.addText("開発チームとビジネス側の意思決定を接続するフレームワーク", {
    x: 0.6, y: 1.85, w: 8.8, h: 0.5,
    fontSize: 14, color: "B0C4DE",
    fontFace: "Calibri", align: "left", valign: "middle", margin: 0
  });

  // Tagline
  s.addText("「誰も言った・言わないの責任を負わない」\n根拠ある投資判断の仕組みをつくる", {
    x: 0.7, y: 2.75, w: 8.6, h: 1.2,
    fontSize: 20, bold: true, color: dark,
    fontFace: "Calibri", align: "center", valign: "middle"
  });

  // Three key concept cards
  const pills = [
    { label: "エンジニアを守る" },
    { label: "ビジネスが判断できる" },
    { label: "根拠が見える" }
  ];
  const pw = 2.6, ph = 0.6, py = 4.35, gap = 0.3;
  const startX = (10 - (pw * 3 + gap * 2)) / 2;

  pills.forEach((p, i) => {
    const px = startX + i * (pw + gap);
    s.addShape(pres.shapes.RECTANGLE, {
      x: px, y: py, w: pw, h: ph,
      fill: { color: lightBlue }, line: { color: blue, pt: 1 }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: px, y: py, w: 0.08, h: ph,
      fill: { color: amber }, line: { color: amber }
    });
    s.addText(p.label, {
      x: px + 0.15, y: py, w: pw - 0.15, h: ph,
      fontSize: 13, bold: true, color: navy,
      fontFace: "Calibri", align: "center", valign: "middle"
    });
  });

  // Date
  s.addText("2026年3月", {
    x: 7.8, y: 5.2, w: 1.8, h: 0.35,
    fontSize: 11, color: gray, align: "right", fontFace: "Calibri"
  });
}

// ==================== SLIDE 2: 目的 ====================
{
  const s = pres.addSlide();
  addHeader(s, "目的");

  // Main purpose box
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.0, w: 9, h: 1.2,
    fill: { color: lightBlue }, line: { color: blue, pt: 1 },
    shadow: makeShadow()
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.0, w: 0.1, h: 1.2,
    fill: { color: amber }, line: { color: amber }
  });
  s.addText("開発チームとビジネス側が、施策の優先順位を\n共通の根拠にもとづいて判断できる状態をつくる", {
    x: 0.75, y: 1.0, w: 8.6, h: 1.2,
    fontSize: 18, bold: true, color: navy,
    fontFace: "Calibri", align: "left", valign: "middle"
  });

  // Before / After columns
  const pts = [
    {
      title: "❌  これまで",
      body: "「誰の声が大きいか」「なんとなく重要そう」で\n優先順位が決まってしまっている",
      color: orange,
      lightColor: lightOrange
    },
    {
      title: "✅  これから",
      body: "不確実性の構造とコストの根拠が見える状態で\n意思決定ができるようにする",
      color: green,
      lightColor: lightGreen
    }
  ];

  pts.forEach((p, i) => {
    const x = 0.5 + i * 4.75;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 2.5, w: 4.4, h: 2.6,
      fill: { color: p.lightColor }, line: { color: p.color, pt: 1 },
      shadow: makeShadow()
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 2.5, w: 4.4, h: 0.5,
      fill: { color: p.color }, line: { color: p.color }
    });
    s.addText(p.title, {
      x: x + 0.1, y: 2.5, w: 4.2, h: 0.5,
      fontSize: 15, bold: true, color: white,
      fontFace: "Calibri", align: "left", valign: "middle", margin: 0
    });
    s.addText(p.body, {
      x: x + 0.15, y: 3.1, w: 4.1, h: 1.85,
      fontSize: 14, color: dark,
      fontFace: "Calibri", align: "left", valign: "middle"
    });
  });
}

// ==================== SLIDE 3: 現状の課題 ====================
{
  const s = pres.addSlide();
  addHeader(s, "現状の課題");

  const cols = [
    {
      title: "エンジニア側の課題",
      color: "3F51B5",
      lightColor: "E8EAF6",
      points: [
        "要件が固まっていない段階では\n「わからない」としか答えられない",
        "数字を出すと「試算」ではなく\n「約束」として扱われる",
        "要件変更でコストが増えると\n「見積もり違反」と言われる",
        "→ エンジニアは数字を出すこと自体を\n　 避けるようになる"
      ]
    },
    {
      title: "ビジネス側の課題",
      color: "E65100",
      lightColor: "FFF3E0",
      points: [
        "投資判断には「どのくらいかかるか」\nが必要な情報",
        "それが見えないと\nGO/NOGOの判断ができない",
        "「試算でいいから」と言っているのに\n出てこない理由がわからない",
        "→ 優先順位の判断が曖昧なまま\n　 進んでしまう"
      ]
    }
  ];

  cols.forEach((col, i) => {
    const x = 0.4 + i * 4.85;

    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 0.88, w: 4.5, h: 0.5,
      fill: { color: col.color }, line: { color: col.color }
    });
    s.addText(col.title, {
      x: x + 0.1, y: 0.88, w: 4.3, h: 0.5,
      fontSize: 15, bold: true, color: white,
      fontFace: "Calibri", align: "left", valign: "middle", margin: 0
    });

    col.points.forEach((pt, j) => {
      const py = 1.48 + j * 1.0;
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: py, w: 4.5, h: 0.9,
        fill: { color: col.lightColor }, line: { color: col.color, pt: 0.5 }
      });
      s.addShape(pres.shapes.OVAL, {
        x: x + 0.1, y: py + 0.31, w: 0.26, h: 0.26,
        fill: { color: col.color }, line: { color: col.color }
      });
      s.addText(pt, {
        x: x + 0.45, y: py, w: 3.95, h: 0.9,
        fontSize: 12, color: dark,
        fontFace: "Calibri", align: "left", valign: "middle"
      });
    });
  });
}

// ==================== SLIDE 4: 構造的な問題 ====================
{
  const s = pres.addSlide();
  addHeader(s, "構造的な問題");

  s.addText("双方とも正しいことを言っている。噛み合っていないのは「前提」だ。", {
    x: 0.5, y: 0.9, w: 9, h: 0.55,
    fontSize: 17, bold: true, color: navy,
    fontFace: "Calibri", align: "center", valign: "middle"
  });

  // Two opposing boxes
  const boxes = [
    {
      title: "ビジネスが求めていること",
      body: "投資判断のための材料\n「この施策にどのくらいかかるか」",
      color: "E65100",
      lightColor: "FFF3E0"
    },
    {
      title: "エンジニアが避けたいこと",
      body: "数字を出したことによる\nコミットメント化",
      color: "3F51B5",
      lightColor: "E8EAF6"
    }
  ];

  boxes.forEach((box, i) => {
    const x = i === 0 ? 0.5 : 5.7;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.7, w: 3.8, h: 1.9,
      fill: { color: box.lightColor }, line: { color: box.color, pt: 2 },
      shadow: makeShadow()
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.7, w: 3.8, h: 0.5,
      fill: { color: box.color }, line: { color: box.color }
    });
    s.addText(box.title, {
      x: x + 0.1, y: 1.7, w: 3.6, h: 0.5,
      fontSize: 13, bold: true, color: white,
      fontFace: "Calibri", align: "left", valign: "middle", margin: 0
    });
    s.addText(box.body, {
      x: x + 0.15, y: 2.25, w: 3.5, h: 1.25,
      fontSize: 14, color: dark,
      fontFace: "Calibri", align: "left", valign: "middle"
    });
  });

  // Mismatch label
  s.addShape(pres.shapes.LINE, {
    x: 4.4, y: 2.65, w: 1.2, h: 0,
    line: { color: gray, width: 2, dashType: "dash" }
  });
  s.addText("噛み合わない", {
    x: 4.2, y: 2.4, w: 1.6, h: 0.35,
    fontSize: 11, color: gray, fontFace: "Calibri", align: "center"
  });

  // Root cause
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.85, w: 9, h: 1.3,
    fill: { color: "FFF9C4" }, line: { color: "F9A825", pt: 1.5 }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.85, w: 0.1, h: 1.3,
    fill: { color: "F9A825" }, line: { color: "F9A825" }
  });
  s.addText("根本原因", {
    x: 0.75, y: 3.9, w: 8.65, h: 0.4,
    fontSize: 13, bold: true, color: "7B5900",
    fontFace: "Calibri", align: "left"
  });
  s.addText("「投資判断のための参考値」と「コミットメント」の区別がないまま議論が続いている", {
    x: 0.75, y: 4.32, w: 8.65, h: 0.75,
    fontSize: 14, color: dark,
    fontFace: "Calibri", align: "left", valign: "middle"
  });
}

// ==================== SLIDE 5: 解決したいこと ====================
{
  const s = pres.addSlide();
  addHeader(s, "解決したいこと");

  // Key statement
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.92, w: 9, h: 0.88,
    fill: { color: navy }, line: { color: navy }
  });
  s.addText("エンジニアに工数をコミットさせずに、ビジネスが投資判断できる情報を出す", {
    x: 0.6, y: 0.92, w: 8.8, h: 0.88,
    fontSize: 17, bold: true, color: white,
    fontFace: "Calibri", align: "center", valign: "middle", margin: 0
  });

  // Subtitle
  s.addText("→ 入力の責任を分離する", {
    x: 0.5, y: 1.95, w: 9, h: 0.42,
    fontSize: 16, bold: true, color: navy,
    fontFace: "Calibri", align: "left"
  });

  const inputs = [
    {
      who: "エンジニア",
      action: "リスクの構造を\nチェックリストで伝える",
      detail: "「何ヶ月かかるか」を\n言わなくていい。\n「こういうリスクがある」と\n答えるだけでいい。",
      color: "3F51B5",
      lightColor: "E8EAF6"
    },
    {
      who: "ビジネス",
      action: "期待効果と\n担当チームを入力する",
      detail: "施策の価値を定義する側として、\n価値の根拠を\n入力する。",
      color: "2E7D32",
      lightColor: "E8F5E9"
    },
    {
      who: "ツール",
      action: "コスト参考値と\n採択判定を自動で出す",
      detail: "誰も「言った・言わない」の\n責任を負わない。\n計算はツールが行う。",
      color: "E65100",
      lightColor: "FFF3E0"
    }
  ];

  inputs.forEach((inp, i) => {
    const x = 0.4 + i * 3.1;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 2.5, w: 2.9, h: 2.7,
      fill: { color: inp.lightColor }, line: { color: inp.color, pt: 1 },
      shadow: makeShadow()
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 2.5, w: 2.9, h: 0.52,
      fill: { color: inp.color }, line: { color: inp.color }
    });
    s.addText(inp.who, {
      x: x + 0.1, y: 2.5, w: 2.7, h: 0.52,
      fontSize: 15, bold: true, color: white,
      fontFace: "Calibri", align: "center", valign: "middle", margin: 0
    });
    s.addText(inp.action, {
      x: x + 0.12, y: 3.1, w: 2.65, h: 0.75,
      fontSize: 12, bold: true, color: inp.color,
      fontFace: "Calibri", align: "left", valign: "middle"
    });
    s.addText(inp.detail, {
      x: x + 0.12, y: 3.9, w: 2.65, h: 1.2,
      fontSize: 11, color: dark,
      fontFace: "Calibri", align: "left", valign: "top"
    });
  });
}

// ==================== SLIDE 6: チェックリスト2軸 ====================
{
  const s = pres.addSlide();
  addHeader(s, "ツールの仕組み①：チェックリスト2軸");

  const axes = [
    {
      title: "要件不確実性（17項目）",
      subtitle: "「何が起きるか読めないか」を測る",
      color: "6A1B9A",
      lightColor: "F3E5F5",
      items: [
        "決裁者が不明",
        "要件がまだ粗い",
        "外部依存が読めない",
        "ドメイン知識がない",
        "など..."
      ],
      effect: "スコアが高い → コストの振れ幅が大きくなる"
    },
    {
      title: "技術不確実性（15項目）",
      subtitle: "「確定している追加作業の重さ」を測る",
      color: "1565C0",
      lightColor: "E3F2FD",
      items: [
        "外部連携の実装（最低4週）",
        "データ移行",
        "性能テスト（最低4週）",
        "各項目に最低週数が設定済み",
        "など..."
      ],
      effect: "積み上げ → コストの下限（基準値）を計算する"
    }
  ];

  axes.forEach((ax, i) => {
    const x = 0.4 + i * 4.85;

    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 0.88, w: 4.5, h: 0.6,
      fill: { color: ax.color }, line: { color: ax.color }
    });
    s.addText(ax.title, {
      x: x + 0.1, y: 0.88, w: 4.3, h: 0.6,
      fontSize: 14, bold: true, color: white,
      fontFace: "Calibri", align: "left", valign: "middle", margin: 0
    });

    s.addText(ax.subtitle, {
      x: x + 0.1, y: 1.55, w: 4.3, h: 0.38,
      fontSize: 12, italic: true, color: ax.color,
      fontFace: "Calibri", align: "left"
    });

    ax.items.forEach((item, j) => {
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: 2.0 + j * 0.5, w: 4.5, h: 0.44,
        fill: { color: ax.lightColor }, line: { color: ax.color, pt: 0.3 }
      });
      s.addShape(pres.shapes.OVAL, {
        x: x + 0.1, y: 2.07 + j * 0.5, w: 0.28, h: 0.28,
        fill: { color: ax.color }, line: { color: ax.color }
      });
      s.addText(item, {
        x: x + 0.47, y: 2.0 + j * 0.5, w: 3.93, h: 0.44,
        fontSize: 12, color: dark,
        fontFace: "Calibri", align: "left", valign: "middle"
      });
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 4.65, w: 4.5, h: 0.65,
      fill: { color: ax.color }, line: { color: ax.color }
    });
    s.addText(ax.effect, {
      x: x + 0.1, y: 4.65, w: 4.3, h: 0.65,
      fontSize: 12, bold: true, color: white,
      fontFace: "Calibri", align: "left", valign: "middle", margin: 0
    });
  });
}

// ==================== SLIDE 7: コスト参考値の計算 ====================
{
  const s = pres.addSlide();
  addHeader(s, "ツールの仕組み②：コスト参考値の計算方法");

  // Formulas
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.95, w: 9, h: 1.1,
    fill: { color: lightBlue }, line: { color: blue, pt: 1 }
  });
  s.addText([
    { text: "基準コスト", options: { bold: true, color: navy } },
    { text: " ＝ 確定作業の最低チーム週数 × 1週間のチームコスト", options: { color: dark } }
  ], {
    x: 0.7, y: 0.95, w: 8.6, h: 0.5,
    fontSize: 16, fontFace: "Calibri", align: "left", valign: "middle"
  });
  s.addText([
    { text: "コストレンジ", options: { bold: true, color: navy } },
    { text: " ＝ 基準コスト × ", options: { color: dark } },
    { text: "振れ幅係数（要件不確実性レベルで変動）", options: { color: amber, bold: true } }
  ], {
    x: 0.7, y: 1.48, w: 8.6, h: 0.5,
    fontSize: 16, fontFace: "Calibri", align: "left", valign: "middle"
  });

  // Example
  s.addText("計算例", {
    x: 0.5, y: 2.2, w: 9, h: 0.42,
    fontSize: 14, bold: true, color: navy,
    fontFace: "Calibri", align: "left"
  });

  const exItems = [
    { label: "技術不確実性：外部連携の実装", weeks: "4週", color: "1565C0" },
    { label: "技術不確実性：性能テスト", weeks: "4週", color: "1565C0" },
    { label: "要件不確実性：Lv2（成長期）", weeks: "× 0.8〜1.5", color: "6A1B9A" }
  ];

  exItems.forEach((item, i) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 2.7 + i * 0.56, w: 7.5, h: 0.5,
      fill: { color: lightGray }, line: { color: item.color, pt: 0.5 }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 2.7 + i * 0.56, w: 0.08, h: 0.5,
      fill: { color: item.color }, line: { color: item.color }
    });
    s.addText(item.label, {
      x: 0.7, y: 2.7 + i * 0.56, w: 6.0, h: 0.5,
      fontSize: 13, color: dark, fontFace: "Calibri", align: "left", valign: "middle"
    });
    s.addText(item.weeks, {
      x: 6.8, y: 2.7 + i * 0.56, w: 1.2, h: 0.5,
      fontSize: 13, bold: true, color: item.color, fontFace: "Calibri", align: "right", valign: "middle"
    });
  });

  // Result
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.35, w: 9, h: 0.95,
    fill: { color: lightGreen }, line: { color: green, pt: 1.5 },
    shadow: makeShadow()
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.35, w: 0.1, h: 0.95,
    fill: { color: green }, line: { color: green }
  });
  s.addText("→ コストレンジ：「基準値の 0.8〜1.5倍」\n　 チェックリストの内訳で「なぜこの数字か」が説明できる", {
    x: 0.75, y: 4.35, w: 8.6, h: 0.95,
    fontSize: 14, bold: true, color: green,
    fontFace: "Calibri", align: "left", valign: "middle"
  });
}

// ==================== SLIDE 8: 採択判定 ====================
{
  const s = pres.addSlide();
  addHeader(s, "ツールの仕組み③：採択判定");

  s.addText("要件不確実性 × 技術不確実性の組み合わせから、案件の進め方を自動判定する", {
    x: 0.5, y: 0.9, w: 9, h: 0.48,
    fontSize: 14, color: gray, fontFace: "Calibri", align: "left"
  });

  const judgments = [
    {
      icon: "✅",
      label: "着手可",
      condition: "不確実性が低い",
      desc: "通常のスプリント計画で進められる。\nそのまま開発を開始してよい。",
      color: "2E7D32",
      lightColor: "E8F5E9"
    },
    {
      icon: "⚠️",
      label: "要件詰め先行",
      condition: "期限固定 かつ 複雑度高",
      desc: "まず要件を固める。\n期限が決まっている場合は特に重要。\n不確実なまま実装しない。",
      color: "E65100",
      lightColor: "FFF3E0"
    },
    {
      icon: "🔍",
      label: "PoC先行",
      condition: "不確実性が非常に高い",
      desc: "実装見積もりが困難な状態。\n探索から始め、不確実性を下げてから\n実装計画を立てる。",
      color: "6A1B9A",
      lightColor: "F3E5F5"
    }
  ];

  judgments.forEach((j, i) => {
    const x = 0.4 + i * 3.1;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.55, w: 2.9, h: 3.6,
      fill: { color: j.lightColor }, line: { color: j.color, pt: 1.5 },
      shadow: makeShadow()
    });

    // Icon circle
    s.addShape(pres.shapes.OVAL, {
      x: x + 1.1, y: 1.65, w: 0.7, h: 0.7,
      fill: { color: j.color }, line: { color: j.color }
    });
    s.addText(j.icon, {
      x: x + 1.1, y: 1.65, w: 0.7, h: 0.7,
      fontSize: 20, align: "center", valign: "middle", margin: 0
    });

    s.addText(j.label, {
      x: x + 0.1, y: 2.5, w: 2.7, h: 0.5,
      fontSize: 16, bold: true, color: j.color,
      fontFace: "Calibri", align: "center"
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.1, y: 3.05, w: 2.7, h: 0.4,
      fill: { color: j.color }, line: { color: j.color }
    });
    s.addText(j.condition, {
      x: x + 0.1, y: 3.05, w: 2.7, h: 0.4,
      fontSize: 11, bold: true, color: white,
      fontFace: "Calibri", align: "center", valign: "middle", margin: 0
    });

    s.addText(j.desc, {
      x: x + 0.15, y: 3.52, w: 2.6, h: 1.5,
      fontSize: 12, color: dark,
      fontFace: "Calibri", align: "left", valign: "top"
    });
  });
}

// ==================== SLIDE 9: わからないは認める ====================
{
  const s = pres.addSlide();
  addHeader(s, "ツールの仕組み④：「わからない」は答えとして認める");

  s.addText("チェックリストは  ON  /  ？  /  OFF  の3値で答える", {
    x: 0.5, y: 0.9, w: 9, h: 0.5,
    fontSize: 18, bold: true, color: navy,
    fontFace: "Calibri", align: "center"
  });

  const values = [
    {
      val: "ON",
      label: "該当する",
      desc: "リスクあり・追加作業あり\n→ スコアに加算",
      color: orange,
      lightColor: lightOrange
    },
    {
      val: "？",
      label: "わからない",
      desc: "ON扱いで保守的に計上\n→ 確認が取れたらOFFに変える",
      color: "E65100",
      lightColor: "FFF3E0"
    },
    {
      val: "OFF",
      label: "該当しない",
      desc: "リスクなし・追加作業なし\n→ 計上しない",
      color: green,
      lightColor: lightGreen
    }
  ];

  values.forEach((v, i) => {
    const x = 0.5 + i * 3.1;

    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.6, w: 2.85, h: 2.3,
      fill: { color: v.lightColor }, line: { color: v.color, pt: 1.5 },
      shadow: makeShadow()
    });

    s.addShape(pres.shapes.OVAL, {
      x: x + 1.0, y: 1.7, w: 0.85, h: 0.85,
      fill: { color: v.color }, line: { color: v.color }
    });
    s.addText(v.val, {
      x: x + 1.0, y: 1.7, w: 0.85, h: 0.85,
      fontSize: 22, bold: true, color: white,
      fontFace: "Calibri", align: "center", valign: "middle", margin: 0
    });

    s.addText(v.label, {
      x: x + 0.1, y: 2.68, w: 2.65, h: 0.4,
      fontSize: 14, bold: true, color: v.color,
      fontFace: "Calibri", align: "center"
    });

    s.addText(v.desc, {
      x: x + 0.1, y: 3.12, w: 2.65, h: 0.7,
      fontSize: 12, color: dark,
      fontFace: "Calibri", align: "left"
    });
  });

  // Key insight
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.1, w: 9, h: 1.1,
    fill: { color: lightBlue }, line: { color: blue, pt: 1 }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.1, w: 0.1, h: 1.1,
    fill: { color: blue }, line: { color: blue }
  });
  s.addText("「わからない」を正直に言える構造をつくる\n→ 不確実性が解消されるにつれてコスト参考値が絞られていく", {
    x: 0.75, y: 4.1, w: 8.6, h: 1.1,
    fontSize: 14, color: navy, fontFace: "Calibri", align: "left", valign: "middle"
  });
}

// ==================== SLIDE 10: Before / After ====================
{
  const s = pres.addSlide();
  addHeader(s, "現状との変更点：Before / After 比較");

  const rows = [
    { item: "エンジニアが\n言うこと", before: "「○ヶ月かかります」（工数）", after: "「このリスクが読めません」（チェックリスト）" },
    { item: "コスト根拠", before: "エンジニアの経験と勘", after: "チェック項目の積み上げ（誰でも確認できる）" },
    { item: "数字の性質", before: "コミットメント", after: "参考値（根拠あり・幅あり）" },
    { item: "わからない\nとき", before: "曖昧なまま数字を出す", after: "「？」として保守的に計上し、要確認として記録" },
    { item: "優先順位の\n決め方", before: "声の大きさ・印象", after: "期待効果・不確実性・採択判定が並んで見える" },
    { item: "コスト増加\n時の説明", before: "「見積もり違反」", after: "「Lv3の悲観シナリオに近づいた」と説明できる" }
  ];

  const headerY = 0.88;
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: headerY, w: 2.2, h: 0.45,
    fill: { color: navy }, line: { color: navy }
  });
  s.addText("比較項目", {
    x: 0.3, y: headerY, w: 2.2, h: 0.45,
    fontSize: 13, bold: true, color: white,
    fontFace: "Calibri", align: "center", valign: "middle", margin: 0
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 2.55, y: headerY, w: 3.3, h: 0.45,
    fill: { color: orange }, line: { color: orange }
  });
  s.addText("今まで", {
    x: 2.55, y: headerY, w: 3.3, h: 0.45,
    fontSize: 13, bold: true, color: white,
    fontFace: "Calibri", align: "center", valign: "middle", margin: 0
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.9, y: headerY, w: 3.8, h: 0.45,
    fill: { color: green }, line: { color: green }
  });
  s.addText("このツールを使うと", {
    x: 5.9, y: headerY, w: 3.8, h: 0.45,
    fontSize: 13, bold: true, color: white,
    fontFace: "Calibri", align: "center", valign: "middle", margin: 0
  });

  rows.forEach((row, i) => {
    const rowY = 1.4 + i * 0.67;
    const rowH = 0.62;
    const isOdd = i % 2 === 0;
    const bgBefore = isOdd ? "FBE9E7" : "FFF3E0";
    const bgAfter = isOdd ? "E8F5E9" : "F1F8E9";
    const bgItem = isOdd ? "EEF2FF" : "F4F5F8";

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.3, y: rowY, w: 2.2, h: rowH,
      fill: { color: bgItem }, line: { color: "90A4AE", pt: 0.3 }
    });
    s.addText(row.item, {
      x: 0.35, y: rowY, w: 2.1, h: rowH,
      fontSize: 11, bold: true, color: navy,
      fontFace: "Calibri", align: "left", valign: "middle"
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 2.55, y: rowY, w: 3.3, h: rowH,
      fill: { color: bgBefore }, line: { color: "90A4AE", pt: 0.3 }
    });
    s.addText(row.before, {
      x: 2.6, y: rowY, w: 3.2, h: rowH,
      fontSize: 11, color: orange,
      fontFace: "Calibri", align: "left", valign: "middle"
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.9, y: rowY, w: 3.8, h: rowH,
      fill: { color: bgAfter }, line: { color: "90A4AE", pt: 0.3 }
    });
    s.addText(row.after, {
      x: 5.95, y: rowY, w: 3.7, h: rowH,
      fontSize: 11, color: green,
      fontFace: "Calibri", align: "left", valign: "middle"
    });
  });
}

// ==================== SLIDE 11: まとめ ====================
{
  const s = pres.addSlide();
  s.background = { color: "FFFFFF" };

  // Top navy area
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.9,
    fill: { color: navy }, line: { color: navy }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 1.88, w: 10, h: 0.06,
    fill: { color: amber }, line: { color: amber }
  });

  // Title on navy shape - dark-colored text is for slide background, but here it's on a shape
  s.addText("まとめ", {
    x: 0.6, y: 0.1, w: 8.8, h: 0.8,
    fontSize: 32, bold: true, color: "FFFFFF",
    fontFace: "Calibri", align: "left", margin: 0
  });
  s.addText("このツールはエンジニアを守るためのものでもある", {
    x: 0.6, y: 0.9, w: 8.8, h: 0.75,
    fontSize: 15, color: "CADCFC",
    fontFace: "Calibri", align: "left", margin: 0
  });

  // Three takeaways
  const takeaways = [
    {
      num: "01",
      title: "「わからない」を正直に言える構造",
      body: "根拠なくコミットさせられる状況をなくす。\nエンジニアが安心して関われる現場をつくる。",
      color: "3F51B5"
    },
    {
      num: "02",
      title: "入力責任の分離",
      body: "エンジニア：リスク構造\nビジネス：期待効果\nツール：コスト計算",
      color: "1565C0"
    },
    {
      num: "03",
      title: "コストは「参考値・根拠あり・幅あり」",
      body: "「言った・言わない」の責任構造をなくす。\n長期的にはビジネス側にとっても\n正確な意思決定につながる。",
      color: "00838F"
    }
  ];

  takeaways.forEach((t, i) => {
    const x = 0.4 + i * 3.1;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 2.1, w: 2.9, h: 2.9,
      fill: { color: lightGray }, line: { color: t.color, pt: 1.5 },
      shadow: makeShadow()
    });

    s.addShape(pres.shapes.OVAL, {
      x: x + 0.1, y: 2.2, w: 0.65, h: 0.65,
      fill: { color: t.color }, line: { color: t.color }
    });
    s.addText(t.num, {
      x: x + 0.1, y: 2.2, w: 0.65, h: 0.65,
      fontSize: 14, bold: true, color: white,
      fontFace: "Calibri", align: "center", valign: "middle", margin: 0
    });

    s.addText(t.title, {
      x: x + 0.12, y: 2.95, w: 2.65, h: 0.6,
      fontSize: 12, bold: true, color: t.color,
      fontFace: "Calibri", align: "left"
    });

    s.addText(t.body, {
      x: x + 0.12, y: 3.6, w: 2.65, h: 1.3,
      fontSize: 11, color: dark,
      fontFace: "Calibri", align: "left", valign: "top"
    });
  });

  // Bottom message
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 5.15, w: 9.2, h: 0.4,
    fill: { color: "FFF9C4" }, line: { color: "F9A825", pt: 1 }
  });
  s.addText("長期的にはビジネス側にとっても、正確な意思決定につながる", {
    x: 0.5, y: 5.15, w: 9.0, h: 0.4,
    fontSize: 13, bold: true, color: "7B5900",
    fontFace: "Calibri", align: "center", valign: "middle"
  });
}

// Save
pres.writeFile({ fileName: "outputs/pptx/施策投資判断ボード_説明資料_v2.pptx" }).then(() => {
  console.log("Done: outputs/pptx/施策投資判断ボード_説明資料_v2.pptx");
});
