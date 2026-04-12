/**
 * Infographic: AI時代に必要なプロダクトオーナーのスキル
 * SVG + CSS アニメーション形式
 *
 * Design: design.md に準拠（白背景、紺アクセント、Noto Sans JP）
 */

// ==================== Configuration ====================

const CONFIG = {
  colors: {
    bg: '#FFFFFF',
    accent: '#264AF4',
    textPrimary: '#212121',
    textSecondary: '#616161',
    gridLight: '#F5F5F5',
    success: '#00A92F',
    warning: '#FF7800',
    error: '#D41836',
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
  },
  animation: {
    duration: '0.3s',
    easing: 'cubic-bezier(0.23, 1, 0.320, 1)',
  },
};

// ==================== Data Model ====================

const infographicData = {
  sections: [
    // Cover
    {
      type: 'cover',
      title: 'AI時代に求められるプロダクトオーナー',
      subtitle: '3軸スキルフレームワーク',
    },
    // Section 1: 背景（市場変化）
    {
      type: 'market_change',
      heading: '背景：AI時代の市場構造変化',
      stats: [
        { label: 'AI検索のCTR', value: '61%↓', change: 'down', description: 'SGE導入で流入が構造的に変化' },
        { label: 'ゼロクリック検索', value: '増加中', change: 'up', description: 'ユーザーが直接結果を得るパターン' },
        { label: 'エージェント普及', value: '進行中', change: 'up', description: 'AI Overviewが新しいメディア化' },
      ],
      description: 'これまでの「Web流入 → コンバージョン」という単線的なマーケットは崩壊。POは複数チャネル・複数価値軸での判断が必須に。',
    },
    // Section 2: 3軸スキルフレームワーク
    {
      type: 'skill_wheel',
      heading: '3軸スキルフレームワーク',
      description: 'AI時代のPOに必要な3つの言語軸。中核で統合する能力がPOの価値。',
      axes: [
        {
          name: '事業言語',
          color: '#264AF4',
          details: 'AI検索・エージェント時代のマーケット読解、チャネル非依存の達成指標定義、顧客行動変化への解釈',
          relatedSkill: 'era',
        },
        {
          name: '技術言語',
          color: '#617FFF',
          details: 'API-first 思考、データ検証可能性、基盤チーム・認証基盤との協調、Kraken連携への判断',
          relatedSkill: 'team-pulse',
        },
        {
          name: '組織言語',
          color: '#8CA8FF',
          details: '複数視点の翻訳、施策Ready と開発Ready の分界、チーム間依存関係管理、負荷バランス判断',
          relatedSkill: 'ai-cos',
        },
      ],
    },
    // Section 3: スキル体系マトリクス
    {
      type: 'skill_matrix',
      heading: 'スキル体系マトリクス',
      description: '各スキルの習熟度と行動例。色の濃さで習熟段階を表現。',
      skills: [
        {
          name: 'マーケット構造読解',
          levels: [
            { level: '入門', description: 'AI検索・エージェント普及の基本を理解' },
            { level: '初級', description: '業界への影響を顧客視点で解釈できる' },
            { level: '中級', description: '複数業界トレンドから自社への示唆を導出' },
            { level: '上級', description: '新規チャネルの機会・脅威を定量的に判断' },
          ],
        },
        {
          name: 'API-First思考',
          levels: [
            { level: '入門', description: 'Kraken・Auth0・CRM等の基本を理解' },
            { level: '初級', description: '基盤チームの制約・可能性に基づいて判断可能' },
            { level: '中級', description: '複数基盤間の依存関係から施策の優先度を決定' },
            { level: '上級', description: 'API仕様から新しい価値創造の機会を発見' },
          ],
        },
        {
          name: '判断構造化',
          levels: [
            { level: '入門', description: '複数視点の論点を認識・列挙できる' },
            { level: '初級', description: '事業・技術・組織的な観点を整理できる' },
            { level: '中級', description: 'トレードオフを可視化し、根拠ある判断ができる' },
            { level: '上級', description: '新しい判断軸を発見し、組織の判断品質を向上' },
          ],
        },
        {
          name: 'チーム協調',
          levels: [
            { level: '入門', description: '基盤チーム・デザイン・PdMの役割を理解' },
            { level: '初級', description: '複数チーム間で相互理解を築ける' },
            { level: '中級', description: '依存関係を前提に、全体最適の提案が出来る' },
            { level: '上級', description: 'クロスPJの協調構造を自ら設計・推進' },
          ],
        },
        {
          name: '施策Ready定義',
          levels: [
            { level: '入門', description: '施策の前提（事業・技術・組織）を意識' },
            { level: '初級', description: '施策Readyチェックリストで漏れ防止' },
            { level: '中級', description: '不完全な前提を検出し、品質基準を上げられる' },
            { level: '上級', description: '組織全体の施策Ready成熟度を牽引' },
          ],
        },
        {
          name: '負荷・優先度判断',
          levels: [
            { level: '入門', description: 'チームのキャパシティを理解' },
            { level: '初級', description: 'リスク・価値・工数をバランスで判断可能' },
            { level: '中級', description: '基盤投資と機能開発の最適配分が出来る' },
            { level: '上級', description: 'ポートフォリオ全体の成熟度を管理' },
          ],
        },
      ],
    },
    // Section 4: PO配置シナリオ
    {
      type: 'organization_scenario',
      heading: 'PO配置シナリオ',
      description: '現状 vs 理想形。3軸が揃った配置に向けて組織設計を進行中。',
      current: {
        title: '現在：各軸が分散',
        roles: [
          { title: 'PO A', skills: ['事業言語'], note: 'PdM背景' },
          { title: 'PM B', skills: ['技術言語'], note: 'エンジニア背景' },
          { title: 'SM C', skills: ['組織言語'], note: 'スクラマス背景' },
        ],
      },
      ideal: {
        title: '理想形：3軸を統合するPO',
        roles: [
          { title: 'PO/PM', skills: ['事業言語', '技術言語', '組織言語'], note: '複合スキルPO配置' },
        ],
      },
    },
    // まとめ・次のステップ
    {
      type: 'closing',
      heading: '次のステップ',
      items: [
        {
          action: '★ PO採用基準・育成計画の策定',
          owner: '杉崎（デリバリー）',
          timeline: '2026-04-15',
          priority: 'critical',
        },
        {
          action: 'PO体制の段階的転換（フェーズ1 → 3軸PO1名配置）',
          owner: 'DPG組織会議',
          timeline: '2026-05-31',
          priority: 'high',
        },
        {
          action: 'スキル育成プログラム立案（現PO → 複合スキルへの成長パス）',
          owner: 'ai-cosスキル × team-pulse',
          timeline: '2026-06-30',
          priority: 'high',
        },
      ],
    },
  ],
};

// ==================== SVG Rendering ====================

class InfographicRenderer {
  constructor(container) {
    this.container = container;
    this.svgNS = 'http://www.w3.org/2000/svg';
    this.sections = [];
  }

  render() {
    infographicData.sections.forEach((section, index) => {
      const sectionDiv = document.createElement('div');
      sectionDiv.className = 'section section-' + section.type;
      sectionDiv.id = 'section-' + index;

      const svg = this.createSection(section, index);
      sectionDiv.appendChild(svg);

      this.container.appendChild(sectionDiv);
    });
  }

  createSection(section, index) {
    const container = document.createElement('div');
    container.className = 'section-container';

    if (section.type === 'cover') {
      container.appendChild(this.renderCover(section));
    } else if (section.type === 'market_change') {
      container.appendChild(this.renderMarketChange(section));
    } else if (section.type === 'skill_wheel') {
      container.appendChild(this.renderSkillWheel(section));
    } else if (section.type === 'skill_matrix') {
      container.appendChild(this.renderSkillMatrix(section));
    } else if (section.type === 'organization_scenario') {
      container.appendChild(this.renderOrganizationScenario(section));
    } else if (section.type === 'closing') {
      container.appendChild(this.renderClosing(section));
    }

    return container;
  }

  // ====== Render Methods ======

  renderCover(section) {
    const svg = document.createElementNS(this.svgNS, 'svg');
    svg.setAttribute('class', 'cover-svg');
    svg.setAttribute('viewBox', '0 0 1200 800');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    // Background
    const bg = document.createElementNS(this.svgNS, 'rect');
    bg.setAttribute('width', '1200');
    bg.setAttribute('height', '800');
    bg.setAttribute('fill', CONFIG.colors.bg);
    svg.appendChild(bg);

    // Accent Band (bottom, thin)
    const band = document.createElementNS(this.svgNS, 'rect');
    band.setAttribute('y', '720');
    band.setAttribute('width', '1200');
    band.setAttribute('height', '80');
    band.setAttribute('fill', CONFIG.colors.accent);
    svg.appendChild(band);

    // Title
    const titleText = document.createElementNS(this.svgNS, 'text');
    titleText.setAttribute('x', '600');
    titleText.setAttribute('y', '300');
    titleText.setAttribute('text-anchor', 'middle');
    titleText.setAttribute('class', 'cover-title');
    titleText.setAttribute('fill', CONFIG.colors.textPrimary);
    titleText.textContent = section.title;
    svg.appendChild(titleText);

    // Subtitle
    const subtitleText = document.createElementNS(this.svgNS, 'text');
    subtitleText.setAttribute('x', '600');
    subtitleText.setAttribute('y', '400');
    subtitleText.setAttribute('text-anchor', 'middle');
    subtitleText.setAttribute('class', 'cover-subtitle');
    subtitleText.setAttribute('fill', CONFIG.colors.textSecondary);
    subtitleText.textContent = section.subtitle;
    svg.appendChild(subtitleText);

    // Footer text (white on accent band)
    const footerText = document.createElementNS(this.svgNS, 'text');
    footerText.setAttribute('x', '600');
    footerText.setAttribute('y', '760');
    footerText.setAttribute('text-anchor', 'middle');
    footerText.setAttribute('class', 'footer-text');
    footerText.setAttribute('fill', '#FFFFFF');
    footerText.textContent = 'Tokyo Gas Digital / DPG組織設計';
    svg.appendChild(footerText);

    return svg;
  }

  renderMarketChange(section) {
    const container = document.createElement('div');
    container.innerHTML = `
      <div class="section-header">
        <h2>${section.heading}</h2>
      </div>
      <div class="market-change-content">
        <div class="stats-grid">
          ${section.stats
            .map(
              (stat) => `
            <div class="stat-card stat-${stat.change}">
              <div class="stat-value">${stat.value}</div>
              <div class="stat-label">${stat.label}</div>
              <div class="stat-description">${stat.description}</div>
            </div>
          `
            )
            .join('')}
        </div>
        <div class="market-description">
          <p>${section.description}</p>
        </div>
      </div>
    `;
    return container;
  }

  renderSkillWheel(section) {
    const svg = document.createElementNS(this.svgNS, 'svg');
    svg.setAttribute('class', 'skill-wheel-svg');
    svg.setAttribute('viewBox', '0 0 1200 800');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    const container = document.createElement('div');
    container.innerHTML = `
      <div class="section-header">
        <h2>${section.heading}</h2>
        <p class="section-description">${section.description}</p>
      </div>
    `;

    // Render 3-axis wheel (triangle)
    const centerX = 600;
    const centerY = 450;
    const radius = 150;

    // Calculate triangle vertices
    const angles = [-Math.PI / 2, (Math.PI / 2) * 1.5, (Math.PI / 2) * 0.5]; // top, bottom-left, bottom-right
    const vertices = angles.map((angle) => [centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle)]);

    // Background circle
    const bgCircle = document.createElementNS(this.svgNS, 'circle');
    bgCircle.setAttribute('cx', centerX);
    bgCircle.setAttribute('cy', centerY);
    bgCircle.setAttribute('r', radius + 50);
    bgCircle.setAttribute('fill', CONFIG.colors.gridLight);
    svg.appendChild(bgCircle);

    // Draw triangle
    const triangle = document.createElementNS(this.svgNS, 'polygon');
    const pointsStr = vertices.map((v) => v.join(',')).join(' ');
    triangle.setAttribute('points', pointsStr);
    triangle.setAttribute('fill', 'none');
    triangle.setAttribute('stroke', CONFIG.colors.accent);
    triangle.setAttribute('stroke-width', '3');
    svg.appendChild(triangle);

    // Draw axis circles and labels
    section.axes.forEach((axis, i) => {
      const [x, y] = vertices[i];

      // Outer circle
      const circle = document.createElementNS(this.svgNS, 'circle');
      circle.setAttribute('cx', x);
      circle.setAttribute('cy', y);
      circle.setAttribute('r', '50');
      circle.setAttribute('fill', axis.color);
      circle.setAttribute('class', 'axis-node');
      svg.appendChild(circle);

      // Label
      const label = document.createElementNS(this.svgNS, 'text');
      label.setAttribute('x', x);
      label.setAttribute('y', y);
      label.setAttribute('text-anchor', 'middle');
      label.setAttribute('dy', '.35em');
      label.setAttribute('fill', '#FFFFFF');
      label.setAttribute('font-weight', 'bold');
      label.setAttribute('font-size', '16');
      label.textContent = axis.name;
      svg.appendChild(label);
    });

    // Center point
    const centerPoint = document.createElementNS(this.svgNS, 'circle');
    centerPoint.setAttribute('cx', centerX);
    centerPoint.setAttribute('cy', centerY);
    centerPoint.setAttribute('r', '40');
    centerPoint.setAttribute('fill', CONFIG.colors.textPrimary);
    svg.appendChild(centerPoint);

    const centerLabel = document.createElementNS(this.svgNS, 'text');
    centerLabel.setAttribute('x', centerX);
    centerLabel.setAttribute('y', centerY + 8);
    centerLabel.setAttribute('text-anchor', 'middle');
    centerLabel.setAttribute('fill', '#FFFFFF');
    centerLabel.setAttribute('font-weight', 'bold');
    centerLabel.setAttribute('font-size', '12');
    centerLabel.textContent = 'PO\n統合';
    svg.appendChild(centerLabel);

    // Append SVG to container
    const svgContainer = document.createElement('div');
    svgContainer.appendChild(svg);

    // Add axis details cards below
    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'axis-details';
    section.axes.forEach((axis) => {
      const card = document.createElement('div');
      card.className = 'axis-card';
      card.innerHTML = `
        <div class="axis-card-header" style="border-left: 4px solid ${axis.color};">
          <h4>${axis.name}</h4>
        </div>
        <div class="axis-card-body">
          <p>${axis.details}</p>
          <p class="axis-related"><strong>関連スキル:</strong> ${axis.relatedSkill}</p>
        </div>
      `;
      detailsDiv.appendChild(card);
    });

    container.appendChild(svgContainer);
    container.appendChild(detailsDiv);

    return container;
  }

  renderSkillMatrix(section) {
    const container = document.createElement('div');
    container.innerHTML = `
      <div class="section-header">
        <h2>${section.heading}</h2>
        <p class="section-description">${section.description}</p>
      </div>
      <div class="skill-matrix">
        <table class="matrix-table">
          <thead>
            <tr>
              <th>スキル領域</th>
              <th>入門</th>
              <th>初級</th>
              <th>中級</th>
              <th>上級</th>
            </tr>
          </thead>
          <tbody>
            ${section.skills
              .map(
                (skill) => `
              <tr class="skill-row">
                <td class="skill-name">${skill.name}</td>
                ${skill.levels
                  .map(
                    (lv, idx) => `
                  <td class="skill-cell level-${idx}" title="${lv.description}">
                    <span class="level-label">${lv.level}</span>
                    <span class="level-description">${lv.description}</span>
                  </td>
                `
                  )
                  .join('')}
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
      </div>
    `;
    return container;
  }

  renderOrganizationScenario(section) {
    const container = document.createElement('div');
    container.innerHTML = `
      <div class="section-header">
        <h2>${section.heading}</h2>
        <p class="section-description">${section.description}</p>
      </div>
      <div class="org-scenario">
        <div class="scenario-column">
          <h3>${section.current.title}</h3>
          <div class="org-diagram">
            ${section.current.roles
              .map(
                (role) => `
              <div class="org-role">
                <div class="role-title">${role.title}</div>
                <div class="role-skills">
                  ${role.skills.map((s) => `<span class="skill-tag">${s}</span>`).join('')}
                </div>
                <div class="role-note">${role.note}</div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
        <div class="scenario-arrow">→</div>
        <div class="scenario-column">
          <h3>${section.ideal.title}</h3>
          <div class="org-diagram ideal">
            ${section.ideal.roles
              .map(
                (role) => `
              <div class="org-role highlight">
                <div class="role-title">${role.title}</div>
                <div class="role-skills">
                  ${role.skills.map((s) => `<span class="skill-tag">${s}</span>`).join('')}
                </div>
                <div class="role-note">${role.note}</div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      </div>
    `;
    return container;
  }

  renderClosing(section) {
    const container = document.createElement('div');
    container.innerHTML = `
      <div class="section-header">
        <h2>${section.heading}</h2>
      </div>
      <div class="closing-content">
        <div class="action-list">
          ${section.items
            .map(
              (item) => `
            <div class="action-item priority-${item.priority}">
              <div class="action-icon">
                ${item.priority === 'critical' ? '★' : '→'}
              </div>
              <div class="action-body">
                <div class="action-title">${item.action}</div>
                <div class="action-meta">
                  <span class="action-owner">${item.owner}</span>
                  <span class="action-timeline">締切: ${item.timeline}</span>
                </div>
              </div>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    `;
    return container;
  }
}

// ==================== Initialization ====================

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('infographic-container');
  if (container) {
    const renderer = new InfographicRenderer(container);
    renderer.render();
  }
});

// Export for modular usage if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { InfographicRenderer, infographicData, CONFIG };
}
