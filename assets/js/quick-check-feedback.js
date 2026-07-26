(function () {
  const STORIES = window.STORY_CONTENT?.stories || {};
  const STATE_CLASSES = ['is-correct', 'is-incorrect', 'is-unanswered'];

  function currentStory() {
    const match = window.location.hash.match(/^#\/story\/([^/]+)\/?$/);
    return match ? STORIES[match[1]] : null;
  }

  function findCheck(box) {
    const story = currentStory();
    const checkId = box?.dataset.readingCheck;
    if (!story || !checkId) return null;

    return story.sections
      .map(section => section.check)
      .find(check => check?.id === checkId) || null;
  }

  function cleanExplanation(value) {
    return String(value || '')
      .replace(/^\s*(?:Correto|Ainda não|Falso|Verdadeiro|Resposta correta|Resposta incorreta)\.\s*/i, '')
      .trim();
  }

  function feedbackText(check, answer, state) {
    if (state === 'unanswered') {
      return 'Escolhe uma resposta antes de verificar.';
    }

    const explanation = cleanExplanation(check?.explanation);

    if (check?.type === 'truefalse') {
      const statementResult = check.answer === 'true'
        ? 'A afirmação é verdadeira.'
        : 'A afirmação é falsa.';

      if (state === 'correct') {
        return explanation
          ? `${statementResult} ${explanation}`
          : statementResult;
      }

      return explanation
        ? `Resposta incorreta. ${statementResult} ${explanation}`
        : `Resposta incorreta. ${statementResult}`;
    }

    if (state === 'correct') {
      return explanation
        ? `Resposta correta. ${explanation}`
        : 'Resposta correta.';
    }

    return explanation
      ? `Resposta incorreta. ${explanation}`
      : 'Resposta incorreta. Revê esta parte da história e tenta novamente.';
  }

  function removeState(box) {
    box.classList.remove(...STATE_CLASSES);
    box.querySelector('.quick-check-result-badge')?.remove();
  }

  function setState(box, state) {
    removeState(box);
    if (!state) return;

    const labels = {
      correct: '✓ Resposta correta',
      incorrect: '✕ Resposta incorreta',
      unanswered: 'Escolhe uma resposta'
    };

    box.classList.add(`is-${state}`);

    const badge = document.createElement('span');
    badge.className = 'quick-check-result-badge';
    badge.textContent = labels[state];
    badge.setAttribute('aria-hidden', 'true');

    const kicker = box.querySelector('.activity-kicker');
    if (kicker) kicker.insertAdjacentElement('afterend', badge);
    else box.prepend(badge);
  }

  function syncBox(box) {
    const feedback = box.querySelector('.activity-feedback');
    if (!feedback) return;

    const answer = box.querySelector('input:checked')?.value || '';
    const check = findCheck(box);

    if (feedback.classList.contains('is-correct')) {
      feedback.textContent = feedbackText(check, answer, 'correct');
      setState(box, 'correct');
      return;
    }

    if (feedback.classList.contains('is-incorrect') && feedback.textContent.trim()) {
      const state = answer ? 'incorrect' : 'unanswered';
      feedback.textContent = feedbackText(check, answer, state);
      setState(box, state);
      return;
    }

    removeState(box);
  }

  function syncAll() {
    document.querySelectorAll('[data-reading-check]').forEach(syncBox);
  }

  document.addEventListener('click', event => {
    const button = event.target.closest('[data-check-reading]');
    if (!button) return;

    const box = button.closest('[data-reading-check]');
    if (!box) return;

    queueMicrotask(() => syncBox(box));
  });

  document.addEventListener('change', event => {
    const input = event.target.closest('[data-reading-check] input');
    if (!input) return;

    const box = input.closest('[data-reading-check]');
    const feedback = box?.querySelector('.activity-feedback');
    if (!box || !feedback) return;

    removeState(box);
    feedback.className = 'activity-feedback';
    feedback.textContent = '';
  });

  window.addEventListener('hashchange', () => {
    window.requestAnimationFrame(syncAll);
  });

  window.requestAnimationFrame(syncAll);
})();
