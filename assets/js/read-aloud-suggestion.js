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

    document.querySelectorAll('.read-aloud-suggestion').forEach(box => box.remove());

    if (!story || !readerPanel || !storyText || !ELIGIBLE_LEVELS.has(String(story.level).toUpperCase())) {
      return;
    }

    const box = document.createElement('aside');
    box.className = 'read-aloud-suggestion';
    box.setAttribute('aria-label', 'Optional reading challenge');
    box.innerHTML = `
      <span class="read-aloud-suggestion-icon" aria-hidden="true">◖</span>
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
