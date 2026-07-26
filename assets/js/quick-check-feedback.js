(function () {
  const STATE_CLASSES = ['is-correct', 'is-incorrect', 'is-unanswered'];

  function removeState(box) {
    box.classList.remove(...STATE_CLASSES);
    box.querySelector('.quick-check-result-badge')?.remove();
  }

  function setState(box, state) {
    removeState(box);
    if (!state) return;

    const labels = {
      correct: '✓ Correct',
      incorrect: '✕ Try again',
      unanswered: 'Choose an answer'
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

    if (feedback.classList.contains('is-correct')) {
      setState(box, 'correct');
      return;
    }

    if (feedback.classList.contains('is-incorrect') && feedback.textContent.trim()) {
      const hasAnswer = Boolean(box.querySelector('input:checked'));
      setState(box, hasAnswer ? 'incorrect' : 'unanswered');
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
