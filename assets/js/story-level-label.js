(function () {
  const stories = window.STORY_CONTENT?.stories || {};
  const app = document.getElementById('app');

  function updateLabel() {
    const match = window.location.hash.match(/^#\/story\/([^/]+)\/?$/);
    const story = match ? stories[match[1]] : null;
    const label = document.querySelector('.page-story .reading-introduction .section-kicker');

    if (!story || !label) return;

    const expectedLabel = `${story.level} reading`;
    if (label.textContent !== expectedLabel) label.textContent = expectedLabel;
  }

  const observer = new MutationObserver(() => window.requestAnimationFrame(updateLabel));
  if (app) observer.observe(app, { childList: true, subtree: true });

  window.addEventListener('hashchange', () => window.requestAnimationFrame(updateLabel));
  window.requestAnimationFrame(updateLabel);
})();
