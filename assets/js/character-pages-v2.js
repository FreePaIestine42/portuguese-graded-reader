(function () {
  const data = window.SITE_DATA;
  const characterData = window.CHARACTER_DATA || {};
  const app = document.getElementById('app');

  if (!data || !app) return;

  const UNIVERSE = {
    title: 'Welcome to Bairro da Ladeira',
    paragraphs: [
      'All fictional stories on Portuguese Stories take place in Bairro da Ladeira, a small Lisbon neighbourhood imagined between Arroios and Penha de França. It has older apartment buildings, local shops, a school, a café, a bakery, a park, a square, a pharmacy and a neighbourhood association.',
      'Each reading level follows its own group of eight recurring characters. The groups share the neighbourhood, but you do not need to know characters from another level, and the stories can be read in any order.'
    ],
    places: [
      'Praça da Ladeira',
      'Café O Degrau',
      'Jardim do Alto',
      'Padaria Flor da Ladeira',
      'Papelaria Horizonte',
      'Escola Básica da Ladeira'
    ]
  };

  const LEVEL_INTROS = {
    A2: 'The A2 stories follow eight recurring people of different ages, including two close school friends, working adults and a retired carpenter. The map below shows the family, friendship and neighbour relationships that connect them.',
    B1: 'The B1 stories follow eight recurring adults whose lives overlap through friendship, family, work and the neighbourhood. The map below shows exactly how those connections fit together.',
    B2: 'The B2 stories follow eight recurring adults in three separate family and friendship groups. The map below makes those groups and their relationships easy to see.'
  };

  const MAPS = {
    A2: {
      groups: [
        { title: 'School & family', x: 35, y: 35, width: 590, height: 455 },
        { title: 'Neighbours & cousins', x: 665, y: 35, width: 300, height: 395 }
      ],
      nodes: [
        { id: 'leonor', profile: 'Leonor Batista', label: 'Leonor', x: 145, y: 125 },
        { id: 'tiago', profile: 'Tiago Matias', label: 'Tiago', x: 385, y: 125 },
        { id: 'paula', profile: 'Paula Matias', label: 'Paula', x: 535, y: 65 },
        { id: 'carolina', profile: 'Carolina “Carol” Neves', label: 'Carolina', x: 245, y: 315 },
        { id: 'quim', profile: 'Joaquim “Quim” Neves', label: 'Quim', x: 500, y: 405 },
        { id: 'mafalda', profile: 'Mafalda Sousa', label: 'Mafalda', x: 765, y: 180 },
        { id: 'andre', profile: 'André Ferreira', label: 'André', x: 890, y: 80 },
        { id: 'rita', profile: 'Rita Alves', label: 'Rita', x: 890, y: 330 }
      ],
      links: [
        { from: 'leonor', to: 'tiago', label: 'closest friends', labelX: 265, labelY: 92, bend: -20 },
        { from: 'tiago', to: 'paula', label: 'mother & son', labelX: 468, labelY: 70, bend: -14 },
        { from: 'leonor', to: 'carolina', label: 'babysitting', labelX: 175, labelY: 225, bend: 18 },
        { from: 'carolina', to: 'quim', label: 'granddaughter & grandfather', labelX: 382, labelY: 372, bend: 18 },
        { from: 'mafalda', to: 'andre', label: 'first cousins', labelX: 835, labelY: 118, bend: -16 },
        { from: 'mafalda', to: 'rita', label: 'neighbours', labelX: 835, labelY: 258, bend: 16 }
      ]
    },
    B1: {
      groups: [
        { title: 'Friends, family & neighbours', x: 35, y: 35, width: 545, height: 455 },
        { title: 'Papelaria Horizonte', x: 615, y: 35, width: 350, height: 455 }
      ],
      nodes: [
        { id: 'joana', profile: 'Joana Faria', label: 'Joana', x: 135, y: 110 },
        { id: 'catia', profile: 'Cátia Lopes', label: 'Cátia', x: 340, y: 90 },
        { id: 'pedro', profile: 'Pedro Neves', label: 'Pedro', x: 510, y: 60 },
        { id: 'miguel', profile: 'Miguel Costa', label: 'Miguel', x: 235, y: 285 },
        { id: 'emilia', profile: 'Emília Duarte', label: 'Emília', x: 480, y: 410 },
        { id: 'ines', profile: 'Inês Rodrigues', label: 'Inês', x: 700, y: 105 },
        { id: 'teresa', profile: 'Teresa Cabral', label: 'Teresa', x: 870, y: 245 },
        { id: 'nuno', profile: 'Nuno Vaz', label: 'Nuno', x: 700, y: 405 }
      ],
      links: [
        { from: 'joana', to: 'catia', label: 'close friends', labelX: 238, labelY: 68, bend: -18 },
        { from: 'catia', to: 'pedro', label: 'sister & brother', labelX: 425, labelY: 42, bend: -12 },
        { from: 'joana', to: 'miguel', label: 'neighbours', labelX: 168, labelY: 202, bend: 14 },
        { from: 'miguel', to: 'emilia', label: 'nephew & aunt', labelX: 355, labelY: 350, bend: 18 },
        { from: 'ines', to: 'teresa', label: 'employee & employer', labelX: 795, labelY: 166, bend: -18 },
        { from: 'teresa', to: 'nuno', label: 'aunt & nephew', labelX: 795, labelY: 340, bend: 18 },
        { from: 'ines', to: 'nuno', label: 'friends since school', labelX: 665, labelY: 260, bend: 24 },
        { from: 'teresa', to: 'emilia', label: 'casual acquaintances', labelX: 675, labelY: 385, bend: -28, type: 'casual' }
      ]
    },
    B2: {
      groups: [
        { title: 'Co-parenting & friendship', x: 30, y: 35, width: 395, height: 430 },
        { title: 'Siblings & grandfather', x: 455, y: 35, width: 315, height: 430 },
        { title: 'Close cousins', x: 800, y: 95, width: 170, height: 315 }
      ],
      nodes: [
        { id: 'sofia', profile: 'Sofia Tavares', label: 'Sofia', x: 120, y: 115 },
        { id: 'ricardo', profile: 'Ricardo Matos', label: 'Ricardo', x: 330, y: 115 },
        { id: 'daniela', profile: 'Daniela Pires', label: 'Daniela', x: 225, y: 340 },
        { id: 'carla', profile: 'Carla Vicente', label: 'Carla', x: 525, y: 105 },
        { id: 'vasco', profile: 'Vasco Correia', label: 'Vasco', x: 700, y: 105 },
        { id: 'manel', profile: 'Manuel “Manel” Leal', label: 'Manel', x: 615, y: 355 },
        { id: 'isabel', profile: 'Isabel Ramos', label: 'Isabel', x: 885, y: 170 },
        { id: 'helena', profile: 'Helena Duarte', label: 'Helena', x: 885, y: 335 }
      ],
      links: [
        { from: 'sofia', to: 'ricardo', label: 'former partners & co-parents', labelX: 225, labelY: 78, bend: -20 },
        { from: 'sofia', to: 'daniela', label: 'long-time friends', labelX: 145, labelY: 235, bend: 22 },
        { from: 'daniela', to: 'ricardo', label: 'acquaintances through Sofia', labelX: 308, labelY: 240, bend: 22, type: 'casual' },
        { from: 'carla', to: 'vasco', label: 'sister & brother', labelX: 613, labelY: 68, bend: -16 },
        { from: 'carla', to: 'manel', label: 'granddaughter & grandfather', labelX: 525, labelY: 248, bend: 26 },
        { from: 'vasco', to: 'manel', label: 'grandson & grandfather', labelX: 700, labelY: 248, bend: -26 },
        { from: 'isabel', to: 'helena', label: 'close cousins', labelX: 885, labelY: 252, bend: 0 }
      ]
    }
  };

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function getLevel(levelId) {
    return data.levels.find(level => level.id === levelId);
  }

  function getCharacterSet(levelId) {
    return characterData[levelId];
  }

  function nodeById(map, id) {
    return map.nodes.find(node => node.id === id);
  }

  function connectionPath(from, to, bend) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.sqrt((dx * dx) + (dy * dy)) || 1;
    const normalX = -dy / length;
    const normalY = dx / length;
    const midpointX = (from.x + to.x) / 2;
    const midpointY = (from.y + to.y) / 2;
    const controlX = midpointX + (normalX * (bend || 0));
    const controlY = midpointY + (normalY * (bend || 0));
    return `M ${from.x} ${from.y} Q ${controlX} ${controlY} ${to.x} ${to.y}`;
  }

  function renderMap(levelId, characterSet) {
    const map = MAPS[levelId];
    const profileByName = Object.fromEntries(characterSet.characters.map(character => [character.name, character]));

    const groups = map.groups.map(group => `
      <g class="map-cluster-group">
        <rect class="map-cluster" x="${group.x}" y="${group.y}" width="${group.width}" height="${group.height}" rx="28"></rect>
        <text class="map-cluster-title" x="${group.x + 24}" y="${group.y + 34}">${escapeHtml(group.title)}</text>
      </g>
    `).join('');

    const links = map.links.map(link => {
      const from = nodeById(map, link.from);
      const to = nodeById(map, link.to);
      const labelWidth = Math.max(96, Math.min(225, (link.label.length * 6.3) + 26));
      const lineClass = link.type === 'casual' ? 'relationship-connection is-casual' : 'relationship-connection';

      return `
        <g class="map-link-group">
          <path class="${lineClass}" d="${connectionPath(from, to, link.bend)}"></path>
          <g class="relationship-label" transform="translate(${link.labelX} ${link.labelY})">
            <rect x="${-labelWidth / 2}" y="-13" width="${labelWidth}" height="26" rx="13"></rect>
            <text x="0" y="4" text-anchor="middle">${escapeHtml(link.label)}</text>
          </g>
        </g>
      `;
    }).join('');

    const nodes = map.nodes.map(node => {
      const profile = profileByName[node.profile];
      const initials = profile ? profile.initials : node.label.slice(0, 2).toUpperCase();
      const role = profile ? profile.role : '';

      return `
        <foreignObject x="${node.x - 78}" y="${node.y - 39}" width="156" height="78">
          <div xmlns="http://www.w3.org/1999/xhtml" class="relationship-node">
            <span class="relationship-node-initials">${escapeHtml(initials)}</span>
            <span class="relationship-node-copy">
              <strong>${escapeHtml(node.label)}</strong>
              <small>${escapeHtml(role)}</small>
            </span>
          </div>
        </foreignObject>
      `;
    }).join('');

    const accessibleRelationships = map.links.map(link => {
      const from = nodeById(map, link.from);
      const to = nodeById(map, link.to);
      return `<li>${escapeHtml(from.label)} and ${escapeHtml(to.label)}: ${escapeHtml(link.label)}.</li>`;
    }).join('');

    return `
      <div class="relationship-map-frame">
        <svg class="relationship-map-svg" viewBox="0 0 1000 540" role="img" aria-labelledby="relationship-map-title-${levelId} relationship-map-desc-${levelId}">
          <title id="relationship-map-title-${levelId}">${levelId} character relationship map</title>
          <desc id="relationship-map-desc-${levelId}">A visual map showing the established family, friendship, neighbour and work relationships between the eight ${levelId} characters.</desc>
          ${groups}
          ${links}
          ${nodes}
        </svg>
        <ul class="visually-hidden">${accessibleRelationships}</ul>
      </div>
    `;
  }

  function renderCharacterCard(character) {
    return `
      <article class="character-card">
        <div class="character-card-heading">
          <span class="character-initials" aria-hidden="true">${escapeHtml(character.initials)}</span>
          <div>
            <h3>${escapeHtml(character.name)}</h3>
            <p>Age ${escapeHtml(character.age)} · ${escapeHtml(character.role)}</p>
          </div>
        </div>
        <p class="character-description">${escapeHtml(character.description)}</p>
        <div class="character-connections">
          <strong>How they are connected</strong>
          <span>${escapeHtml(character.connections)}</span>
        </div>
      </article>
    `;
  }

  function renderUniverseIntro() {
    return `
      <section class="section-block story-universe-section">
        <div class="story-universe-copy">
          <span class="section-kicker">The shared story world</span>
          <h1>${escapeHtml(UNIVERSE.title)}</h1>
          ${UNIVERSE.paragraphs.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('')}
        </div>
        <aside class="story-universe-places" aria-label="Recurring places in Bairro da Ladeira">
          <span>Places you may see in the stories</span>
          <div>
            ${UNIVERSE.places.map(place => `<span>${escapeHtml(place)}</span>`).join('')}
          </div>
        </aside>
      </section>
    `;
  }

  function renderCharactersPage(levelId) {
    const level = getLevel(levelId);
    const characterSet = getCharacterSet(levelId);
    const map = MAPS[levelId];
    if (!level || !characterSet || !map) return null;

    return `
      <section class="page page-characters level-theme level-${level.id.toLowerCase()}">
        ${renderUniverseIntro()}

        <div class="page-banner character-page-banner">
          <div>
            <span class="eyebrow">${level.id} · ${level.label}</span>
            <h2>Meet the ${level.id} characters</h2>
            <p>${escapeHtml(LEVEL_INTROS[level.id])}</p>
            <a class="character-banner-link" href="#/library/${level.id}/everyday">
              Browse ${level.id} stories
              <span aria-hidden="true">→</span>
            </a>
          </div>
          <div class="page-banner-badge">${level.id}</div>
        </div>

        <section class="section-block relationship-map-section">
          <div class="character-section-heading map-heading">
            <div>
              <span class="section-kicker">Who is connected to whom</span>
              <h2>How the characters know each other</h2>
            </div>
            <p>Each card is one recurring character. The label on a line explains their relationship.</p>
          </div>

          <div class="relationship-map-legend" aria-label="Relationship map legend">
            <span><i class="legend-line"></i> Close or regular relationship</span>
            <span><i class="legend-line is-casual"></i> Looser acquaintance</span>
          </div>

          ${renderMap(level.id, characterSet)}

          <p class="relationship-map-explanation">No connecting line means the character guide does not establish a personal relationship between those two people. They may still pass one another in the neighbourhood.</p>
        </section>

        <section class="section-block character-list-section">
          <div class="character-section-heading">
            <div>
              <span class="section-kicker">The recurring cast</span>
              <h2>Character profiles</h2>
            </div>
            <p>Meet the eight people who may return across stories at this level.</p>
          </div>

          <div class="character-card-grid">
            ${characterSet.characters.map(renderCharacterCard).join('')}
          </div>
        </section>
      </section>
    `;
  }

  function getCharacterRoute() {
    const match = window.location.hash.match(/^#\/characters\/(A2|B1|B2)\/?$/i);
    return match ? match[1].toUpperCase() : null;
  }

  function renderWhenNeeded() {
    const levelId = getCharacterRoute();
    if (!levelId) return;
    const html = renderCharactersPage(levelId);
    if (html) {
      app.innerHTML = html;
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }

  window.addEventListener('hashchange', renderWhenNeeded);
  renderWhenNeeded();
})();
