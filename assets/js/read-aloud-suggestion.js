(function () {
  const STORIES = window.STORY_CONTENT?.stories || {};
  const APP = document.getElementById('app');
  const ELIGIBLE_LEVELS = new Set(['B1', 'B2']);

  function currentStory() {
    const match = window.location.hash.match(/^#\/story\/([^/]+)\/?$/);
    return match ? STORIES[match[1]] : null;
  }

  function addSuggestion() {
    const story = currentStory();
    const readerPanel = document.querySelector('.page-story .reader-panel');
    const storyText = readerPanel?.querySelector('.story-text');
    const existing = document.querySelector('.read-aloud-suggestion');
    const isEligible = story && ELIGIBLE_LEVELS.has(String(story.level).toUpperCase());

    if (!isEligible || !readerPanel || !storyText) {
      existing?.remove();
      return;
    }

    if (existing) return;

    const box = document.createElement('aside');
    box.className = 'read-aloud-suggestion';
    box.setAttribute('aria-label', 'Optional reading challenge');
    box.innerHTML = `
      <span class="read-aloud-suggestion-icon" aria-hidden="true">A+</span>
      <div class="read-aloud-suggestion-copy">
        <strong>For an added challenge</strong>
        <p>Try reading the story out loud to practise your pronunciation, rhythm and fluency.</p>
      </div>
    `;

    readerPanel.insertBefore(box, storyText);
  }

  const observer = new MutationObserver(() => window.requestAnimationFrame(addSuggestion));
  if (APP) observer.observe(APP, { childList: true, subtree: true });

  window.addEventListener('hashchange', () => window.requestAnimationFrame(addSuggestion));
  window.requestAnimationFrame(addSuggestion);
})();
