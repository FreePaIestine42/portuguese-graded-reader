(function () {
  const data = window.SITE_DATA;
  const state = {
    route: parseHash(),
    menuOpen: false,
    expandedLevels: {},
    storyLengthFilter: 'all'
  };

  const app = document.getElementById('app');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const menuToggle = document.getElementById('menu-toggle');

  data.levels.forEach(level => {
    state.expandedLevels[level.id] = false;
  });

  function parseHash() {
    const hash = window.location.hash
      .replace(/^#/, '')
      .replace(/^\/+/ , '')
      .replace(/\/+$/, '');
    if (!hash) return { page: 'home' };

    const [page, partA, partB] = hash.split('/');
    if (page === 'library') return { page, level: partA, category: partB };
    if (page === 'story') return { page, id: partA };
    if (page === 'progress') return { page };
    return { page: 'home' };
  }

  function buildSidebar() {
    sidebar.innerHTML = `
      <div class="sidebar-inner">
        <div class="sidebar-top">
          <a class="brand" href="#/">${data.siteName}</a>
        </div>
        <nav class="sidebar-nav">
          <a class="sidebar-link ${state.route.page === 'home' ? 'active' : ''}" href="#/">Home</a>
          <a class="sidebar-link ${state.route.page === 'progress' ? 'active' : ''}" href="#/progress">My Progress</a>
          <div class="sidebar-section-title">Levels</div>
          ${data.levels.map(renderSidebarLevel).join('')}
        </nav>
      </div>
    `;

    sidebar.querySelectorAll('[data-level-toggle]').forEach(button => {
      button.addEventListener('click', () => {
        const levelId = button.getAttribute('data-level-toggle');
        state.expandedLevels[levelId] = !state.expandedLevels[levelId];
        buildSidebar();
      });
    });
  }

  function renderSidebarLevel(level) {
    const isExpanded = state.expandedLevels[level.id];
    const categoryLinks = data.categories.map(category => {
      const active = state.route.page === 'library' && state.route.level === level.id && state.route.category === category.id;
      return `<a class="sidebar-sublink ${active ? 'active' : ''}" href="#/library/${level.id}/${category.id}">${category.name}</a>`;
    }).join('');

    return `
      <section class="sidebar-level level-${level.id.toLowerCase()}">
        <button class="level-toggle ${isExpanded ? 'open' : ''}" type="button" data-level-toggle="${level.id}" aria-expanded="${isExpanded}">
          <span class="level-toggle-main">
            <span class="level-chip">${level.id}</span>
            <span>
              <span class="level-name">${level.id}</span>
              <span class="level-subtitle">${level.label}</span>
            </span>
          </span>
          <span class="level-arrow">▾</span>
        </button>
        <div class="level-panel ${isExpanded ? 'open' : ''}">
          ${categoryLinks}
        </div>
      </section>
    `;
  }

  function openMenu() {
    state.menuOpen = true;
    sidebar.classList.add('open');
    overlay.hidden = false;
    overlay.classList.add('visible');
    menuToggle.setAttribute('aria-expanded', 'true');
    sidebar.setAttribute('aria-hidden', 'false');
  }

  function closeMenu() {
    state.menuOpen = false;
    sidebar.classList.remove('open');
    overlay.hidden = true;
    overlay.classList.remove('visible');
    menuToggle.setAttribute('aria-expanded', 'false');
    sidebar.setAttribute('aria-hidden', 'true');
  }

  function getLevel(levelId) {
    return data.levels.find(level => level.id === levelId);
  }

  function getCategory(categoryId) {
    return data.categories.find(category => category.id === categoryId);
  }

  function getStory(storyId) {
    return data.stories.find(story => story.id === storyId);
  }

  function storyLengthBucket(wordCount) {
    if (wordCount <= 700) return 'short';
    if (wordCount <= 1200) return 'medium';
    return 'long';
  }

  function renderHome() {
    return `
      <section class="page page-home">
        <div class="hero">
          <div class="hero-copy">
            <span class="eyebrow">European Portuguese graded reader</span>
            <h1>${data.siteName}</h1>
            <p class="hero-text">A simple, clear place to read useful Portuguese, check unknown vocabulary, and practise your understanding afterwards.</p>
            <div class="hero-callout">
              <strong>How it works</strong>
              <p>Choose your level, open a category, pick a story, read it, and then complete the exercises.</p>
            </div>
          </div>
          <div class="hero-media">
            <img src="${data.homeHeroImage}" alt="Portuguese flag waving on a flagpole." />
          </div>
        </div>

        <section class="section-block">
          <div class="section-heading">
            <h2>Choose your level</h2>
            <p>These are broad reading guides to help you get started.</p>
          </div>
          <div class="level-card-grid">
            ${data.levels.map(level => `
              <article class="level-card prominent level-${level.id.toLowerCase()}">
                <div>
                  <span class="level-card-top">${level.id}</span>
                  <h3>${level.label}</h3>
                  <p>${data.levelBlurbs[level.id]}</p>
                </div>
                <a class="card-link-button" href="#/library/${level.id}/everyday">Open ${level.id}</a>
              </article>
            `).join('')}
          </div>
        </section>
      </section>
    `;
  }

  function renderLibrary(levelId, categoryId) {
    const level = getLevel(levelId);
    const category = getCategory(categoryId);
    if (!level || !category) return renderNotFound();

    const stories = data.stories.filter(story => story.level === levelId && story.category === categoryId)
      .filter(story => state.storyLengthFilter === 'all' || storyLengthBucket(story.wordCount) === state.storyLengthFilter)
      .sort((a, b) => a.title.localeCompare(b.title));

    return `
      <section class="page page-library level-theme level-${level.id.toLowerCase()}">
        <div class="page-banner">
          <div>
            <span class="eyebrow">${level.id} · ${level.label}</span>
            <h1>${category.name}</h1>
            <p>Browse stories for this level and category.</p>
          </div>
          <div class="page-banner-badge">${level.id}</div>
        </div>

        <section class="section-block compact">
          <div class="filter-row">
            <div>
              <h2>Story library</h2>
              <p>Alphabetical order.</p>
            </div>
            <label class="filter-control">
              <span>Filter by word count</span>
              <select id="length-filter">
                ${data.storyLengthFilters.map(filter => `<option value="${filter.id}" ${state.storyLengthFilter === filter.id ? 'selected' : ''}>${filter.label}</option>`).join('')}
              </select>
            </label>
          </div>

          ${stories.length ? `
            <div class="story-grid">
              ${stories.map(story => renderStoryCard(story, level)).join('')}
            </div>
          ` : `<div class="empty-state">No stories match the selected filter yet.</div>`}
        </section>
      </section>
    `;
  }

  function renderStoryCard(story, level) {
    return `
      <article class="story-card level-${level.id.toLowerCase()}">
        <a class="story-card-image" href="#/story/${story.id}">
          <img src="${story.image}" alt="${story.imageAlt}" />
          <span class="story-status ${story.status.toLowerCase().replace(/\s+/g, '-')}">${story.status}</span>
        </a>
        <div class="story-card-body">
          <div class="story-card-meta-row">
            <span class="level-badge">${story.level}</span>
            <span>${story.totalTime}</span>
          </div>
          <h3><a href="#/story/${story.id}">${story.title}</a></h3>
          <p>${story.summary}</p>
          <dl class="story-facts">
            <div><dt>Words</dt><dd>${story.wordCount}</dd></div>
            <div><dt>Time to complete</dt><dd>${story.totalTime}</dd></div>
          </dl>
        </div>
      </article>
    `;
  }

  function renderStoryPage(storyId) {
    const story = getStory(storyId);
    if (!story) return renderNotFound();
    const level = getLevel(story.level);
    const category = getCategory(story.category);

    return `
      <section class="page page-story level-theme level-${level.id.toLowerCase()}">
        <div class="page-banner story-banner">
          <div>
            <span class="eyebrow">${level.id} · ${category.name}</span>
            <h1>${story.title}</h1>
            <p>${story.instructions}</p>
          </div>
          <div class="story-banner-details">
            <div><strong>${story.wordCount}</strong><span>words</span></div>
            <div><strong>${story.totalTime}</strong><span>time to complete</span></div>
            <div><strong>75%</strong><span>required to complete</span></div>
          </div>
        </div>

        <div class="reader-layout">
          <article class="reader-panel">
            <div class="reader-image"><img src="${story.image}" alt="${story.imageAlt}" /></div>
            ${story.paragraphs.map(p => `<p>${p}</p>`).join('')}
            <div class="placeholder-block">
              <h2>Questions during reading</h2>
              <p>This space is ready for the small in-reading questions that will be added in Step 3.</p>
            </div>
            <div class="placeholder-block">
              <h2>Final quiz</h2>
              <p>This space is ready for the full interactive quiz that will be added in Step 3.</p>
            </div>
          </article>
          <aside class="tool-panel">
            <div class="tool-card">
              <h2>Vocabulary tools</h2>
              <p>When vocabulary is implemented, clicking a word will display its English translation, Portuguese definition, base form, word class, contextual meaning, and an example sentence here.</p>
            </div>
            <div class="tool-card subdued">
              <h3>Current status</h3>
              <p>This is still a structural placeholder page.</p>
            </div>
          </aside>
        </div>
      </section>
    `;
  }

  function renderProgress() {
    return `
      <section class="page page-progress">
        <div class="page-banner neutral">
          <div>
            <span class="eyebrow">Overview</span>
            <h1>My Progress</h1>
            <p>Progress saving is not active yet, but this page structure is ready.</p>
          </div>
        </div>
        <div class="progress-grid">
          <article class="stat-card"><strong>0</strong><span>Stories completed</span></article>
          <article class="stat-card"><strong>0</strong><span>Total words read</span></article>
          <article class="stat-card"><strong>0</strong><span>Stories started</span></article>
        </div>
      </section>
    `;
  }

  function renderNotFound() {
    return `
      <section class="page page-not-found">
        <div class="empty-state">
          <h1>Page not found</h1>
          <p>Go back to the homepage or choose a section from the menu.</p>
          <a class="card-link-button" href="#/">Return home</a>
        </div>
      </section>
    `;
  }

  function renderRoute() {
    state.route = parseHash();
    buildSidebar();

    if (state.route.page === 'home') {
      app.innerHTML = renderHome();
    } else if (state.route.page === 'library') {
      app.innerHTML = renderLibrary(state.route.level, state.route.category);
    } else if (state.route.page === 'story') {
      app.innerHTML = renderStoryPage(state.route.id);
    } else if (state.route.page === 'progress') {
      app.innerHTML = renderProgress();
    } else {
      app.innerHTML = renderNotFound();
    }

    const filter = document.getElementById('length-filter');
    if (filter) {
      filter.addEventListener('change', event => {
        state.storyLengthFilter = event.target.value;
        renderRoute();
      });
    }

    closeMenu();
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  menuToggle.addEventListener('click', () => {
    if (state.menuOpen) closeMenu();
    else openMenu();
  });

  overlay.addEventListener('click', closeMenu);
  window.addEventListener('hashchange', renderRoute);

  if (!window.location.hash) {
    window.location.hash = '#/';
  } else {
    renderRoute();
  }
})();
