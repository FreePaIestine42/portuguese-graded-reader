(function () {
  const STORAGE_KEY = 'portugueseStoriesProgressV1';

  function currentStoryId() {
    const match = window.location.hash.match(/^#\/story\/([^/]+)\/?$/);
    return match?.[1] || '';
  }

  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {};
    } catch {
      return {};
    }
  }

  function clearSavedResponses() {
    const storyId = currentStoryId();
    if (!storyId) return;

    const allProgress = loadProgress();
    const current = allProgress[storyId];
    if (!current) return;

    allProgress[storyId] = {
      ...current,
      readingChecks: {},
      quizAnswers: {},
      quizSubmitted: false,
      lastPoints: null,
      totalPoints: null,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
  }

  document.addEventListener('click', event => {
    const resetButton = event.target.closest('[data-retake], [data-retake-result]');
    if (!resetButton) return;

    /*
     * Run during capture so the existing story reset handler immediately
     * re-renders from fully cleared Quick Check and final-quiz data.
     */
    clearSavedResponses();
  }, true);
})();
