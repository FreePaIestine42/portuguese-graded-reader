(function () {
  const STORIES = window.STORY_CONTENT?.stories || {};
  const APP = document.getElementById('app');
  let draggedItem = null;

  function currentStory() {
    const match = window.location.hash.match(/^#\/story\/([^/]+)\/?$/);
    return match ? STORIES[match[1]] : null;
  }

  function validSavedOrder(items) {
    const positions = items.map(item => item.position);
    return positions.length > 0 &&
      positions.every(position => Number.isInteger(position) && position >= 1 && position <= items.length) &&
      new Set(positions).size === items.length;
  }

  function updateControls(list) {
    const rows = [...list.querySelectorAll('.reorder-item')];
    rows.forEach((row, index) => {
      row.querySelector('[data-move-up]').disabled = index === 0;
      row.querySelector('[data-move-down]').disabled = index === rows.length - 1;
      row.querySelector('.reorder-position').textContent = String(index + 1);
    });
  }

  function syncHiddenAnswers(exercise, notify) {
    const rows = [...exercise.querySelectorAll('.reorder-item')];
    rows.forEach((row, position) => {
      const originalIndex = row.dataset.originalIndex;
      const input = exercise.querySelector(`[data-order="${CSS.escape(originalIndex)}"]`);
      if (input) input.value = String(position + 1);
    });

    updateControls(exercise.querySelector('.reorder-list'));

    if (notify) {
      const firstInput = exercise.querySelector('[data-order]');
      firstInput?.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  function announce(exercise, row) {
    const status = exercise.querySelector('.reorder-status');
    const position = [...exercise.querySelectorAll('.reorder-item')].indexOf(row) + 1;
    if (status) status.textContent = `O acontecimento está agora na posição ${position}.`;
  }

  function moveRow(row, direction) {
    const list = row.closest('.reorder-list');
    const exercise = row.closest('.reorder-exercise');
    if (!list || !exercise) return;

    if (direction === 'up' && row.previousElementSibling) {
      list.insertBefore(row, row.previousElementSibling);
    } else if (direction === 'down' && row.nextElementSibling) {
      list.insertBefore(row.nextElementSibling, row);
    } else {
      return;
    }

    syncHiddenAnswers(exercise, true);
    announce(exercise, row);
    row.querySelector(direction === 'up' ? '[data-move-up]' : '[data-move-down]')?.focus();
  }

  function clearDropTargets(list) {
    list.querySelectorAll('.is-drop-target').forEach(row => row.classList.remove('is-drop-target'));
  }

  function enhanceQuestion(question, quizItem) {
    const grid = question.querySelector('.ordering-grid');
    if (!grid || question.querySelector('.reorder-exercise')) return;

    const items = [...grid.querySelectorAll('.ordering-row')].map(row => {
      const field = row.querySelector('[data-order]');
      const copy = row.querySelector('span');
      return {
        originalIndex: Number(field?.dataset.order),
        position: Number(field?.value),
        text: copy?.textContent?.trim() || ''
      };
    }).filter(item => Number.isInteger(item.originalIndex));

    if (!items.length) return;

    const orderedItems = validSavedOrder(items)
      ? [...items].sort((first, second) => first.position - second.position)
      : items;

    const exercise = document.createElement('div');
    exercise.className = 'reorder-exercise';
    exercise.innerHTML = `
      <p class="reorder-instructions">Arrasta os cartões para os ordenar. Também podes usar as setas para mover cada acontecimento para cima ou para baixo.</p>
      <ol class="reorder-list" aria-label="Acontecimentos para ordenar"></ol>
      <div class="reorder-hidden-inputs" hidden></div>
      <p class="reorder-status" aria-live="polite"></p>
    `;

    const list = exercise.querySelector('.reorder-list');
    const hiddenInputs = exercise.querySelector('.reorder-hidden-inputs');

    orderedItems.forEach(item => {
      const row = document.createElement('li');
      row.className = 'reorder-item';
      row.draggable = true;
      row.dataset.originalIndex = String(item.originalIndex);
      row.innerHTML = `
        <span class="reorder-position" aria-hidden="true"></span>
        <span class="reorder-copy">${item.text.replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[character]))}</span>
        <span class="reorder-controls">
          <button class="reorder-control" type="button" data-move-up aria-label="Mover este acontecimento para cima">↑</button>
          <button class="reorder-control" type="button" data-move-down aria-label="Mover este acontecimento para baixo">↓</button>
        </span>
      `;

      row.querySelector('[data-move-up]').addEventListener('click', () => moveRow(row, 'up'));
      row.querySelector('[data-move-down]').addEventListener('click', () => moveRow(row, 'down'));

      row.addEventListener('dragstart', event => {
        draggedItem = row;
        row.classList.add('is-dragging');
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', row.dataset.originalIndex);
      });

      row.addEventListener('dragend', () => {
        row.classList.remove('is-dragging');
        clearDropTargets(list);
        draggedItem = null;
      });

      row.addEventListener('dragover', event => {
        if (!draggedItem || draggedItem === row) return;
        event.preventDefault();
        clearDropTargets(list);
        row.classList.add('is-drop-target');
      });

      row.addEventListener('drop', event => {
        if (!draggedItem || draggedItem === row) return;
        event.preventDefault();
        const bounds = row.getBoundingClientRect();
        const placeAfter = event.clientY > bounds.top + bounds.height / 2;
        list.insertBefore(draggedItem, placeAfter ? row.nextElementSibling : row);
        clearDropTargets(list);
        syncHiddenAnswers(exercise, true);
        announce(exercise, draggedItem);
      });

      list.append(row);

      const hidden = document.createElement('input');
      hidden.type = 'hidden';
      hidden.dataset.order = String(item.originalIndex);
      hiddenInputs.append(hidden);
    });

    list.addEventListener('dragover', event => {
      if (draggedItem) event.preventDefault();
    });

    list.addEventListener('drop', event => {
      if (!draggedItem || event.target.closest('.reorder-item')) return;
      event.preventDefault();
      list.append(draggedItem);
      syncHiddenAnswers(exercise, true);
      announce(exercise, draggedItem);
    });

    grid.replaceWith(exercise);
    syncHiddenAnswers(exercise, false);

    const heading = question.querySelector('.quiz-question-heading h3');
    if (heading && quizItem?.prompt) {
      heading.textContent = 'Organiza os acontecimentos pela ordem em que aconteceram.';
    }
  }

  function enhanceAll() {
    const story = currentStory();
    if (!story) return;

    story.quiz
      .filter(item => item.type === 'order')
      .forEach(item => {
        const question = document.querySelector(`[data-question="${CSS.escape(item.id)}"]`);
        if (question) enhanceQuestion(question, item);
      });
  }

  const observer = new MutationObserver(() => window.requestAnimationFrame(enhanceAll));
  if (APP) observer.observe(APP, { childList: true, subtree: true });

  window.addEventListener('hashchange', () => window.requestAnimationFrame(enhanceAll));
  window.requestAnimationFrame(enhanceAll);
})();
