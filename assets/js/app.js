(() => {
  "use strict";

  const data = window.PT_STORIES_DATA;
  const app = document.getElementById("app");

  if (!data || !app) {
    throw new Error("PT Stories could not load its site data.");
  }

  const iconPaths = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9 21v-7h6v7"/>',
    chat: '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/>',
    newspaper: '<path d="M4 5h13v15H4z"/><path d="M17 8h3v10a2 2 0 0 1-2 2h-1"/><path d="M7 9h7M7 13h7M7 17h4"/>',
    document: '<path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5M9 12h6M9 16h6"/>',
    book: '<path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v17H7.5A3.5 3.5 0 0 0 4 22z"/><path d="M20 5.5A3.5 3.5 0 0 0 16.5 2H13v17h3.5A3.5 3.5 0 0 1 20 22z"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    words: '<path d="M4 5h16M8 5v14M5 19h6M14 9h6M14 14h6M14 19h6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  };

  function icon(name, size = 20) {
    const paths = iconPaths[name] || iconPaths.book;
    return `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  }

  function normaliseRoute() {
    const raw = window.location.hash.replace(/^#/, "") || "/";
    const parts = raw.split("/").filter(Boolean);

    if (parts.length === 0 || parts[0] === "home") {
      return { page: "home" };
    }

    if (parts[0] === "library" && parts[1] && parts[2]) {
      return { page: "library", levelId: parts[1], categoryId: parts[2] };
    }

    if (parts[0] === "story" && parts[1]) {
      return { page: "story", storyId: parts[1] };
    }

    if (parts[0] === "progress") {
      return { page: "progress" };
    }

    return { page: "not-found" };
  }

  function href(path) {
    return `#${path}`;
  }

  function getLevel(levelId) {
    return data.levels.find((level) => level.id === levelId);
  }

  function getCategory(categoryId) {
    return data.categories.find((category) => category.id === categoryId);
  }

  function getStory(storyId) {
    return data.stories.find((story) => story.id === storyId);
  }

  function buildSidebar(route) {
    const levelGroups = data.levels
      .map((level) => {
        const isCurrentLevel = route.levelId === level.id || getStory(route.storyId)?.level === level.id;
        const links = data.categories
          .map((category) => {
            const isActive =
              route.page === "library" &&
              route.levelId === level.id &&
              route.categoryId === category.id;

            return `
              <a class="sidebar-link ${isActive ? "is-active" : ""}"
                 href="${href(`/library/${level.id}/${category.id}`)}">
                ${icon(category.icon, 17)}
                <span>${category.shortLabel}</span>
              </a>`;
          })
          .join("");

        return `
          <section class="sidebar-level ${isCurrentLevel ? "is-open" : ""}" data-level-group>
            <button class="sidebar-level-button" type="button" aria-expanded="${isCurrentLevel}" data-level-toggle>
              <span class="level-pill level-${level.id}">${level.label}</span>
              <span class="sidebar-level-name">${level.descriptor}</span>
              <span class="sidebar-chevron">${icon("chevron", 16)}</span>
            </button>
            <div class="sidebar-level-links">${links}</div>
          </section>`;
      })
      .join("");

    return `
      <aside class="sidebar" id="site-sidebar">
        <div class="sidebar-header">
          <a class="brand" href="${href("/")}" aria-label="Return to homepage">
            <span class="brand-mark">PT</span>
            <span class="brand-text">
              <strong>${data.site.name}</strong>
              <small>European Portuguese</small>
            </span>
          </a>
          <button class="icon-button sidebar-collapse" type="button" aria-label="Collapse sidebar" data-sidebar-collapse>
            ${icon("menu", 20)}
          </button>
        </div>

        <nav class="sidebar-nav" aria-label="Main navigation">
          <a class="sidebar-link sidebar-primary ${route.page === "home" ? "is-active" : ""}" href="${href("/")}">
            ${icon("home", 18)}<span>Home</span>
          </a>

          <p class="sidebar-heading">Browse by level</p>
          <div class="sidebar-levels">${levelGroups}</div>

          <a class="sidebar-link sidebar-primary sidebar-progress ${route.page === "progress" ? "is-active" : ""}" href="${href("/progress")}">
            ${icon("chart", 18)}<span>My progress</span>
          </a>
        </nav>

        <div class="sidebar-footer">
          <span>Free learning project</span>
          <span aria-hidden="true">•</span>
          <span>EU Portuguese only</span>
        </div>
      </aside>`;
  }

  function pageHeader({ eyebrow, title, description }) {
    return `
      <header class="page-header">
        ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ""}
        <h1>${title}</h1>
        ${description ? `<p>${description}</p>` : ""}
      </header>`;
  }

  function homePage() {
    const levelCards = data.levels
      .map(
        (level) => `
          <article class="level-card level-card-${level.id}">
            <div class="level-card-top">
              <span class="level-badge level-${level.id}">${level.label}</span>
              <span>${level.descriptor}</span>
            </div>
            <p>${level.description}</p>
            <a href="${href(`/library/${level.id}/everyday`)}">Browse ${level.label} stories ${icon("arrow", 17)}</a>
          </article>`
      )
      .join("");

    return `
      <main class="main-content home-page" id="main-content">
        <section class="hero-card">
          <div class="hero-copy">
            <p class="eyebrow">Interactive graded reading</p>
            <h1>Read useful European Portuguese with support when you need it.</h1>
            <p class="hero-description">
              Read natural Portuguese, check unfamiliar vocabulary in context, and complete varied activities to confirm what you understood.
            </p>
            <div class="hero-actions">
              <a class="button button-primary" href="${href("/library/a2/everyday")}">Start with A2 ${icon("arrow", 18)}</a>
              <a class="button button-secondary" href="#levels">Compare levels</a>
            </div>
          </div>
          <div class="hero-visual" aria-hidden="true">
            <div class="book-shape book-shape-back"></div>
            <div class="book-shape book-shape-front">
              ${icon("book", 54)}
              <span>ler • compreender • praticar</span>
            </div>
          </div>
        </section>

        <section class="how-it-works" aria-labelledby="how-title">
          <div class="section-heading">
            <p class="eyebrow">A simple process</p>
            <h2 id="how-title">How it works</h2>
          </div>
          <div class="steps-grid">
            <article><span>1</span><h3>Choose</h3><p>Select a level and a reading category from the sidebar.</p></article>
            <article><span>2</span><h3>Read</h3><p>Read at your own pace and click selected vocabulary for help.</p></article>
            <article><span>3</span><h3>Practise</h3><p>Complete comprehension and language exercises based on the text.</p></article>
          </div>
        </section>

        <section class="levels-section" id="levels" aria-labelledby="levels-title">
          <div class="section-heading">
            <p class="eyebrow">Don’t know your level?</p>
            <h2 id="levels-title">Choose a comfortable starting point</h2>
            <p>A1, C1 and C2 material is not included in the first version of the website.</p>
          </div>
          <div class="level-grid">${levelCards}</div>
        </section>
      </main>`;
  }

  function statusLabel(status) {
    const labels = {
      "not-started": "Not started",
      started: "Started",
      completed: "Completed",
    };
    return labels[status] || labels["not-started"];
  }

  function storyCard(story) {
    const level = getLevel(story.level);
    return `
      <article class="story-card">
        <div class="story-icon level-surface-${story.level}">${icon(story.icon, 24)}</div>
        <div class="story-card-content">
          <div class="story-card-heading">
            <div>
              <span class="level-badge level-${story.level}">${level.label}</span>
              <span class="status-badge status-${story.status}">${statusLabel(story.status)}</span>
            </div>
            <h2>${story.title}</h2>
            <p>${story.summary}</p>
          </div>
          <div class="story-meta">
            <span>${icon("words", 17)} ${story.wordCount || "—"} words</span>
            <span>${icon("clock", 17)} ${story.completionMinutes || "—"} min total</span>
          </div>
        </div>
        <a class="story-card-action" href="${href(`/story/${story.id}`)}" aria-label="Open ${story.title}">
          ${icon("arrow", 21)}
        </a>
      </article>`;
  }

  function libraryPage(route) {
    const level = getLevel(route.levelId);
    const category = getCategory(route.categoryId);

    if (!level || !category) {
      return notFoundPage();
    }

    const stories = data.stories
      .filter((story) => story.level === level.id && story.category === category.id)
      .sort((a, b) => a.title.localeCompare(b.title));

    return `
      <main class="main-content library-page" id="main-content">
        ${pageHeader({
          eyebrow: `${level.label} · ${level.descriptor}`,
          title: category.label,
          description: category.description,
        })}

        <div class="library-summary">
          <span>${stories.length} ${stories.length === 1 ? "story" : "stories"}</span>
          <span>Alphabetical order</span>
        </div>

        <section class="story-list" aria-label="Story list">
          ${
            stories.length
              ? stories.map(storyCard).join("")
              : `<div class="empty-state">${icon(category.icon, 32)}<h2>No stories here yet</h2><p>This category is ready for stories to be added later.</p></div>`
          }
        </section>
      </main>`;
  }

  function storyPage(route) {
    const story = getStory(route.storyId);
    if (!story) return notFoundPage();

    const level = getLevel(story.level);
    const category = getCategory(story.category);

    return `
      <main class="main-content story-page" id="main-content">
        <a class="back-link" href="${href(`/library/${story.level}/${story.category}`)}">← Back to ${category.label}</a>

        <header class="story-header-card">
          <div>
            <div class="story-label-row">
              <span class="level-badge level-${story.level}">${level.label}</span>
              <span>${category.label}</span>
            </div>
            <h1>${story.title}</h1>
            <p>First read the text, using the vocabulary panel when needed. Then complete the activities to check your understanding.</p>
          </div>
          <dl class="story-facts">
            <div><dt>Words</dt><dd>${story.wordCount || "—"}</dd></div>
            <div><dt>Total time</dt><dd>${story.completionMinutes ? `${story.completionMinutes} min` : "—"}</dd></div>
            <div><dt>Completion</dt><dd>75% required</dd></div>
          </dl>
        </header>

        <div class="reader-layout">
          <article class="reading-card">
            <div class="reading-placeholder">
              <span class="reading-placeholder-icon">${icon("book", 34)}</span>
              <p class="eyebrow">Foundation preview</p>
              <h2>The reading text will be added in Step 3.</h2>
              <p>
                This column is the reusable reading area. It is intentionally displaying placeholder content so the first real story is not started before the structural foundation is approved.
              </p>
              <p class="sample-paragraph">
                Future story paragraphs will appear here at a comfortable reading width. Selected words will be subtly marked and will open their contextual information in the panel on the right.
              </p>
            </div>

            <section class="inline-question-placeholder" aria-label="Example question position">
              <span>Question during reading</span>
              <p>A small number of interactive questions can appear between story sections here.</p>
            </section>

            <section class="quiz-placeholder">
              <p class="eyebrow">After reading</p>
              <h2>Comprehension and practice activities</h2>
              <p>The full quiz system, answer feedback and scoring will be built after the first story content is ready.</p>
              <button class="button button-disabled" type="button" disabled>Activities not added yet</button>
            </section>
          </article>

          <aside class="vocabulary-panel" aria-label="Vocabulary tools">
            <div class="vocabulary-panel-header">
              ${icon("book", 21)}
              <div><span>Learning tools</span><strong>Vocabulary</strong></div>
            </div>
            <div class="vocabulary-empty">
              <span class="vocabulary-empty-icon">Aa</span>
              <h2>Select a vocabulary word</h2>
              <p>The selected word’s English translation, Portuguese definition, base form, word class, contextual meaning and example sentence will appear here.</p>
            </div>
          </aside>
        </div>
      </main>`;
  }

  function progressPage() {
    return `
      <main class="main-content progress-page" id="main-content">
        ${pageHeader({
          eyebrow: "Saved in this browser",
          title: "My progress",
          description: "A simple overview of reading activity will appear here without requiring an account.",
        })}

        <section class="stats-grid" aria-label="Progress summary">
          <article><span>${icon("book", 24)}</span><strong>0</strong><p>Stories started</p></article>
          <article><span>${icon("chart", 24)}</span><strong>0</strong><p>Stories completed</p></article>
          <article><span>${icon("words", 24)}</span><strong>0</strong><p>Words read</p></article>
        </section>

        <section class="progress-placeholder-card">
          <h2>Progress tracking comes after the reading system</h2>
          <p>This page is structurally ready. In a later stage it will show started and completed stories, saved scores and the total words-read counter.</p>
        </section>
      </main>`;
  }

  function notFoundPage() {
    return `
      <main class="main-content not-found-page" id="main-content">
        ${pageHeader({
          eyebrow: "Page not found",
          title: "This page does not exist.",
          description: "Use the sidebar to return to the homepage or choose a reading category.",
        })}
        <a class="button button-primary" href="${href("/")}">Return home</a>
      </main>`;
  }

  function buildMain(route) {
    switch (route.page) {
      case "home":
        return homePage();
      case "library":
        return libraryPage(route);
      case "story":
        return storyPage(route);
      case "progress":
        return progressPage();
      default:
        return notFoundPage();
    }
  }

  function bindInteractions() {
    document.querySelectorAll("[data-level-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        const group = button.closest("[data-level-group]");
        const willOpen = !group.classList.contains("is-open");
        group.classList.toggle("is-open", willOpen);
        button.setAttribute("aria-expanded", String(willOpen));
      });
    });

    const collapseButton = document.querySelector("[data-sidebar-collapse]");
    collapseButton?.addEventListener("click", () => {
      const shell = document.getElementById("app");
      const collapsed = shell.classList.toggle("sidebar-is-collapsed");
      collapseButton.setAttribute(
        "aria-label",
        collapsed ? "Expand sidebar" : "Collapse sidebar"
      );
    });
  }

  function render() {
    const route = normaliseRoute();
    app.innerHTML = `${buildSidebar(route)}${buildMain(route)}`;
    bindInteractions();
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  window.addEventListener("hashchange", render);
  render();
})();
