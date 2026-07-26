(function () {
  const STORIES = window.STORY_CONTENT?.stories || {};
  const APP = document.getElementById('app');
  const DETACHED_CLITIC_PATTERN = /(?:^|\s)(?:me|te|se|nos|vos|lhe|lhes)(?=\s|$)/iu;

  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[character]));

  function currentStory() {
    const match = window.location.hash.match(/^#\/story\/([^/]+)\/?$/);
    return match ? STORIES[match[1]] : null;
  }

  function escapeRegExp(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function canRenderAsPhrase(entry, phrase) {
    const sharedPolicy = window.VOCABULARY_CLICK_UNIT_POLICY;
    if (sharedPolicy?.canRenderAsPhrase) {
      return sharedPolicy.canRenderAsPhrase(entry, phrase);
    }

    return Boolean(
      entry?.isMeaningDependentPhrase === true &&
      phrase &&
      !DETACHED_CLITIC_PATTERN.test(String(phrase).normalize('NFC'))
    );
  }

  function phraseEntries(story) {
    return Object.entries(story?.vocabulary || {})
      .flatMap(([key, entry]) => (entry.phraseForms || [])
        .filter(phrase => canRenderAsPhrase(entry, phrase))
        .map(phrase => ({ key, entry, phrase })))
      .sort((first, second) => second.phrase.length - first.phrase.length);
  }

  function replacePhraseInTextNode(node, item) {
    if (!node.nodeValue?.trim() || node.parentElement?.closest('.vocab-word')) return;

    const pattern = new RegExp(`(${escapeRegExp(item.phrase)})`, 'giu');
    if (!pattern.test(node.nodeValue)) return;
    pattern.lastIndex = 0;

    const fragment = document.createDocumentFragment();
    node.nodeValue.split(pattern).forEach(part => {
      if (!part) return;

      if (part.toLocaleLowerCase('pt-PT') === item.phrase.toLocaleLowerCase('pt-PT')) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'vocab-word vocab-phrase';
        button.dataset.vocab = item.key;
        button.textContent = part;
        fragment.append(button);
      } else {
        fragment.append(document.createTextNode(part));
      }
    });

    node.replaceWith(fragment);
  }

  function highlightPhrases() {
    const story = currentStory();
    if (!story) return;

    const entries = phraseEntries(story);
    if (!entries.length) return;

    document.querySelectorAll('.story-paragraph').forEach(paragraph => {
      entries.forEach(item => {
        const walker = document.createTreeWalker(paragraph, NodeFilter.SHOW_TEXT);
        const nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);
        nodes.forEach(node => replacePhraseInTextNode(node, item));
      });
    });
  }

  function displayPhrase(story, key, button) {
    const entry = story?.vocabulary?.[key];
    const card = document.getElementById('vocabulary-card');
    if (!entry || !card) return;

    document.querySelectorAll('.vocab-word.is-active').forEach(word => word.classList.remove('is-active'));
    button.classList.add('is-active');

    card.innerHTML = `
      <span class="tool-kicker">Vocabulary support</span>
      <h2>${escapeHtml(button.textContent)}</h2>
      <p class="vocabulary-translation">${escapeHtml(entry.translation)}</p>
      <dl class="vocabulary-details">
        <div><dt>Portuguese definition</dt><dd>${escapeHtml(entry.definition)}</dd></div>
        <div><dt>Base form</dt><dd>${escapeHtml(entry.baseForm)}</dd></div>
        <div><dt>Word class</dt><dd>${escapeHtml(entry.wordClass)}</dd></div>
        <div><dt>Meaning here</dt><dd>${escapeHtml(entry.contextualMeaning)}</dd></div>
      </dl>
      <div class="vocabulary-example"><span>Example sentence</span><p>${escapeHtml(entry.example || '')}</p></div>
    `;
  }

  document.addEventListener('click', event => {
    const button = event.target.closest('.vocab-phrase');
    if (!button) return;

    displayPhrase(currentStory(), button.dataset.vocab, button);
  });

  const observer = new MutationObserver(() => window.requestAnimationFrame(highlightPhrases));
  if (APP) observer.observe(APP, { childList: true, subtree: true });

  window.addEventListener('hashchange', () => window.requestAnimationFrame(highlightPhrases));
  window.requestAnimationFrame(highlightPhrases);
})();
