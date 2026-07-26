(function () {
  const stories = window.STORY_CONTENT?.stories || {};

  function normalize(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLocaleLowerCase('pt-PT')
      .trim();
  }

  function currentStory() {
    const match = window.location.hash.match(/^#\/story\/([^/]+)\/?$/);
    return match ? stories[match[1]] : null;
  }

  function isGenderVariant(word, baseForm) {
    const used = normalize(word);
    const base = normalize(baseForm);

    if (!used || !base || used.includes(' ') || base.includes(' ')) return false;

    const pairs = [
      [/a$/, 'o'],
      [/as$/, 'os'],
      [/o$/, 'a'],
      [/os$/, 'as']
    ];

    return pairs.some(([ending, replacement]) => ending.test(used) && used.replace(ending, replacement) === base);
  }

  function shouldHideBaseForm(entry, displayedWord) {
    if (!entry?.baseForm) return true;

    const used = normalize(displayedWord);
    const base = normalize(entry.baseForm);
    const wordClass = normalize(entry.wordClass);

    if (!used || !base || used === base) return true;
    if (wordClass.includes('adjective') || wordClass.includes('adjetivo')) return true;
    if (isGenderVariant(used, base)) return true;

    return false;
  }

  function updateEmptyPanelText() {
    const empty = document.querySelector('#vocabulary-card .vocabulary-empty');
    if (!empty) return;

    empty.textContent = 'Its English translation, Portuguese definition, word class, meaning here and an example will appear in this panel. A base form is shown only when it is useful.';
  }

  function refineVocabularyPanel(button) {
    const story = currentStory();
    const entry = story?.vocabulary?.[button.dataset.vocab];
    const card = document.getElementById('vocabulary-card');

    if (!entry || !card) return;

    const baseFormRow = [...card.querySelectorAll('.vocabulary-details > div')]
      .find(row => normalize(row.querySelector('dt')?.textContent) === 'base form');

    if (baseFormRow && shouldHideBaseForm(entry, button.textContent)) {
      baseFormRow.remove();
    }
  }

  document.addEventListener('click', event => {
    const button = event.target.closest('.vocab-word');
    if (!button) return;

    queueMicrotask(() => refineVocabularyPanel(button));
  });

  window.addEventListener('hashchange', () => {
    window.requestAnimationFrame(updateEmptyPanelText);
  });

  window.requestAnimationFrame(updateEmptyPanelText);
})();
