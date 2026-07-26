(function () {
  const STORAGE_KEY = 'portugueseStoriesProgressV1';
  const STORIES = window.STORY_CONTENT?.stories || {};
  const APP = document.getElementById('app');

  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[character]));

  function normalize(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLocaleLowerCase('pt-PT')
      .replace(/[.,!?;:«»“”"'()]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {};
    } catch {
      return {};
    }
  }

  function storyProgress(storyId) {
    return loadProgress()[storyId] || {};
  }

  function patchProgress(storyId, changes) {
    const allProgress = loadProgress();
    allProgress[storyId] = {
      ...(allProgress[storyId] || {}),
      ...changes,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
    return allProgress[storyId];
  }

  function currentStory() {
    const match = window.location.hash.match(/^#\/story\/([^/]+)\/?$/);
    return match ? STORIES[match[1]] : null;
  }

  function questionElement(questionId) {
    return document.querySelector(`[data-question="${CSS.escape(questionId)}"]`);
  }

  function selectedRadio(question) {
    return question.querySelector('input:checked')?.value || '';
  }

  function collectQuestionAnswer(questionData, question) {
    if (!question) return '';

    if (questionData.type === 'choice' || questionData.type === 'truefalse') {
      return selectedRadio(question);
    }

    if (questionData.type === 'select') {
      return question.querySelector('[data-quiz-select]')?.value || '';
    }

    if (questionData.type === 'text') {
      return question.querySelector('[data-quiz-text]')?.value || '';
    }

    if (questionData.type === 'multiselect') {
      return [...question.querySelectorAll('input[type="checkbox"]:checked')].map(input => input.value);
    }

    if (questionData.type === 'matching') {
      const answer = {};
      question.querySelectorAll('[data-match]').forEach(select => {
        answer[select.dataset.match] = select.value;
      });
      return answer;
    }

    if (questionData.type === 'order') {
      const answer = Array(questionData.items.length).fill('');
      question.querySelectorAll('[data-order]').forEach(input => {
        answer[Number(input.dataset.order)] = Number(input.value) || '';
      });
      return answer;
    }

    return '';
  }

  function collectAllAnswers(story) {
    const answers = {};
    story.quiz.forEach(questionData => {
      answers[questionData.id] = collectQuestionAnswer(questionData, questionElement(questionData.id));
    });
    return answers;
  }

  function isAnswered(questionData, answer) {
    if (questionData.type === 'matching') {
      return questionData.items.every(item => answer?.[item.key]);
    }

    if (questionData.type === 'order') {
      return Array.isArray(answer) &&
        answer.length === questionData.items.length &&
        answer.every(Boolean) &&
        new Set(answer).size === questionData.items.length;
    }

    if (questionData.type === 'multiselect') {
      return Array.isArray(answer) && answer.length > 0;
    }

    return String(answer || '').trim() !== '';
  }

  function gradeQuestion(questionData, answer) {
    const maximum = questionData.type === 'matching'
      ? questionData.items.length
      : Number(questionData.points || 1);

    if (questionData.type === 'matching') {
      const earned = questionData.items.filter(item => answer?.[item.key] === item.answer).length;
      return { earned, maximum, correct: earned === maximum };
    }

    if (questionData.type === 'order') {
      const correct = questionData.answer.every((position, index) => Number(answer?.[index]) === Number(position));
      return { earned: correct ? maximum : 0, maximum, correct };
    }

    if (questionData.type === 'multiselect') {
      const received = [...(answer || [])].sort();
      const expected = [...questionData.answer].sort();
      const correct = JSON.stringify(received) === JSON.stringify(expected);
      return { earned: correct ? maximum : 0, maximum, correct };
    }

    if (questionData.type === 'text') {
      const correct = (questionData.answers || []).some(expected => normalize(expected) === normalize(answer));
      return { earned: correct ? maximum : 0, maximum, correct };
    }

    const correct = answer === questionData.answer;
    return { earned: correct ? maximum : 0, maximum, correct };
  }

  function correctAnswerText(questionData) {
    if (questionData.type === 'matching') {
      return questionData.items.map(item => `${item.key}: ${item.answer}`).join(' · ');
    }

    if (questionData.type === 'order') {
      return questionData.items.map((item, index) => `${index + 1}. ${item}`).join(' ');
    }

    if (questionData.type === 'multiselect') {
      return questionData.answer.join(' · ');
    }

    if (questionData.type === 'text') {
      return questionData.answers[0];
    }

    if (questionData.type === 'truefalse') {
      return questionData.answer === 'true' ? 'Verdadeiro' : 'Falso';
    }

    return questionData.answer;
  }

  function explanationText(questionData) {
    if (questionData.type !== 'truefalse') return questionData.explanation;
    return String(questionData.explanation || '').replace(/^(Verdadeiro|Falso)\.\s*/i, '');
  }

  function feedbackHtml(questionData, result) {
    let heading = 'Resposta incorreta.';

    if (result.correct) {
      heading = questionData.type === 'truefalse'
        ? `A afirmação é ${questionData.answer === 'true' ? 'verdadeira' : 'falsa'}.`
        : 'Resposta correta.';
    } else if (result.earned > 0) {
      heading = `${result.earned} de ${result.maximum} partes corretas.`;
    }

    const correctAnswer = result.correct
      ? ''
      : `<p><b>Resposta correta:</b> ${escapeHtml(correctAnswerText(questionData))}</p>`;

    return `<strong>${escapeHtml(heading)}</strong><p>${escapeHtml(explanationText(questionData))}</p>${correctAnswer}`;
  }

  function clearQuestionState(question) {
    if (!question) return;
    question.classList.remove('is-correct', 'is-incorrect', 'is-partial', 'is-missing');
    const feedback = question.querySelector('.quiz-question-feedback');
    if (feedback) feedback.innerHTML = '';
  }

  function applyQuestionState(questionData, answer, checkState) {
    const question = questionElement(questionData.id);
    if (!question) return;

    clearQuestionState(question);
    if (!checkState?.checked) return;

    const result = gradeQuestion(questionData, answer);
    question.classList.add(result.correct ? 'is-correct' : result.earned > 0 ? 'is-partial' : 'is-incorrect');

    const feedback = question.querySelector('.quiz-question-feedback');
    if (feedback) feedback.innerHTML = feedbackHtml(questionData, result);
  }

  function checkedTotals(story, progress) {
    const checks = progress.quizChecks || {};
    let checkedCount = 0;
    let earned = 0;
    let checkedMaximum = 0;
    let totalMaximum = 0;

    story.quiz.forEach(questionData => {
      const maximum = questionData.type === 'matching'
        ? questionData.items.length
        : Number(questionData.points || 1);
      totalMaximum += maximum;

      if (!checks[questionData.id]?.checked) return;
      const result = gradeQuestion(questionData, progress.quizAnswers?.[questionData.id]);
      checkedCount += 1;
      earned += result.earned;
      checkedMaximum += result.maximum;
    });

    return { checkedCount, earned, checkedMaximum, totalMaximum };
  }

  function refreshStatusPanel(story, progress) {
    const panel = document.getElementById('story-status-card');
    if (!panel) return;

    const heading = panel.querySelector('h3');
    if (heading) heading.textContent = progress.completed ? 'Completed' : 'Started';

    [...panel.querySelectorAll('dl > div')].forEach(row => {
      if (row.querySelector('dt')?.textContent.trim() !== 'Best score') return;
      const value = row.querySelector('dd');
      if (value) value.textContent = Number.isFinite(progress.bestScore) ? `${progress.bestScore}%` : 'Not scored yet';
    });
  }

  function renderScore(story, saveFinalResult) {
    let progress = storyProgress(story.id);
    const totals = checkedTotals(story, progress);
    const resultBox = document.getElementById('quiz-result');
    if (!resultBox) return;

    const allChecked = totals.checkedCount === story.quiz.length;

    if (!allChecked) {
      if (progress.quizSubmitted) {
        progress = patchProgress(story.id, { quizSubmitted: false, lastPoints: null, totalPoints: null });
      }

      resultBox.hidden = false;
      resultBox.className = 'quiz-result quiz-progress-result is-in-progress';
      resultBox.innerHTML = `
        <span class="result-label">Quiz progress</span>
        <h3>${totals.checkedCount} of ${story.quiz.length} checked</h3>
        <p>${totals.earned} of ${totals.totalMaximum} possible points earned so far. Check each answer to complete the quiz.</p>
      `;
      refreshStatusPanel(story, progress);
      return;
    }

    const percentage = totals.totalMaximum
      ? Math.round((totals.earned / totals.totalMaximum) * 100)
      : 0;
    const passed = percentage >= story.passPercentage;

    if (saveFinalResult || !progress.quizSubmitted) {
      progress = patchProgress(story.id, {
        started: true,
        completed: Boolean(progress.completed || passed),
        quizSubmitted: true,
        lastScore: percentage,
        bestScore: Math.max(Number(progress.bestScore) || 0, percentage),
        lastPoints: totals.earned,
        totalPoints: totals.totalMaximum
      });
    }

    resultBox.hidden = false;
    resultBox.className = `quiz-result ${passed ? 'is-passed' : 'is-not-passed'}`;
    resultBox.innerHTML = `
      <span class="result-label">${passed ? 'Story completed' : 'Keep practising'}</span>
      <h3>${percentage}%</h3>
      <p>${totals.earned} out of ${totals.totalMaximum} points. ${passed ? 'You reached the 75% completion target.' : 'You need at least 75% for this story to count as completed.'}</p>
    `;
    refreshStatusPanel(story, progress);
  }

  function migrateSubmittedQuiz(story) {
    const progress = storyProgress(story.id);
    if (progress.quizChecks && Object.keys(progress.quizChecks).length) return progress;
    if (!progress.quizSubmitted || !progress.quizAnswers) return progress;

    const quizChecks = {};
    story.quiz.forEach(questionData => {
      if (!isAnswered(questionData, progress.quizAnswers[questionData.id])) return;
      const result = gradeQuestion(questionData, progress.quizAnswers[questionData.id]);
      quizChecks[questionData.id] = {
        checked: true,
        correct: result.correct,
        earned: result.earned,
        maximum: result.maximum
      };
    });

    return patchProgress(story.id, { quizChecks });
  }

  function restoreStates(story) {
    const progress = migrateSubmittedQuiz(story);
    story.quiz.forEach(questionData => {
      applyQuestionState(
        questionData,
        progress.quizAnswers?.[questionData.id],
        progress.quizChecks?.[questionData.id]
      );
    });
    renderScore(story, false);
  }

  function addQuestionButtons(story) {
    story.quiz.forEach(questionData => {
      const question = questionElement(questionData.id);
      const feedback = question?.querySelector('.quiz-question-feedback');
      if (!question || !feedback || question.querySelector('[data-check-quiz-question]')) return;

      const action = document.createElement('div');
      action.className = 'quiz-question-check-row';
      action.innerHTML = '<button class="quiz-check-button" type="button" data-check-quiz-question>Check answer</button>';
      feedback.before(action);
    });
  }

  function enhanceQuiz() {
    const story = currentStory();
    const quiz = document.getElementById('final-quiz');
    if (!story || !quiz || quiz.dataset.immediateGrading === 'true') return;

    quiz.dataset.immediateGrading = 'true';

    const introduction = quiz.querySelector('.quiz-heading p');
    if (introduction) {
      introduction.textContent = `Check each exercise as you go. You need at least ${story.passPercentage}% to complete the story.`;
    }

    addQuestionButtons(story);
    quiz.querySelector('button[type="submit"]')?.remove();
    quiz.querySelector('#quiz-validation')?.remove();

    const actions = quiz.querySelector('.quiz-actions');
    if (actions) actions.classList.add('quiz-actions-immediate');

    restoreStates(story);
  }

  function handleQuestionCheck(button) {
    const story = currentStory();
    const question = button.closest('.quiz-question');
    const questionId = question?.dataset.question;
    const questionData = story?.quiz.find(item => item.id === questionId);
    if (!story || !question || !questionData) return;

    const answers = collectAllAnswers(story);
    const answer = answers[questionId];
    const progress = storyProgress(story.id);
    const quizChecks = { ...(progress.quizChecks || {}) };

    if (!isAnswered(questionData, answer)) {
      delete quizChecks[questionId];
      patchProgress(story.id, {
        started: true,
        quizAnswers: answers,
        quizChecks,
        quizSubmitted: false,
        lastPoints: null,
        totalPoints: null
      });

      clearQuestionState(question);
      question.classList.add('is-missing');
      const feedback = question.querySelector('.quiz-question-feedback');
      if (feedback) feedback.innerHTML = '<strong>Escolhe uma resposta antes de confirmar.</strong>';
      renderScore(story, false);
      return;
    }

    const result = gradeQuestion(questionData, answer);
    quizChecks[questionId] = {
      checked: true,
      correct: result.correct,
      earned: result.earned,
      maximum: result.maximum
    };

    patchProgress(story.id, {
      started: true,
      quizAnswers: answers,
      quizChecks,
      quizSubmitted: false,
      lastPoints: null,
      totalPoints: null
    });

    applyQuestionState(questionData, answer, quizChecks[questionId]);
    renderScore(story, true);
  }

  function handleAnswerChange(event) {
    const form = event.target.closest('#story-quiz-form');
    const story = currentStory();
    const question = event.target.closest('.quiz-question');
    const questionId = question?.dataset.question;
    if (!form || !story || !questionId) return;

    event.stopPropagation();

    const progress = storyProgress(story.id);
    const quizChecks = { ...(progress.quizChecks || {}) };
    delete quizChecks[questionId];

    patchProgress(story.id, {
      started: true,
      quizAnswers: collectAllAnswers(story),
      quizChecks,
      quizSubmitted: false,
      lastPoints: null,
      totalPoints: null
    });

    clearQuestionState(question);
    renderScore(story, false);
  }

  document.addEventListener('click', event => {
    const checkButton = event.target.closest('[data-check-quiz-question]');
    if (checkButton) handleQuestionCheck(checkButton);
  });

  document.addEventListener('change', handleAnswerChange, true);
  document.addEventListener('input', event => {
    if (event.target.matches('[data-quiz-text]')) handleAnswerChange(event);
  }, true);

  document.addEventListener('submit', event => {
    if (!event.target.matches('#story-quiz-form')) return;
    event.preventDefault();
    event.stopPropagation();
  }, true);

  document.addEventListener('click', event => {
    if (!event.target.closest('[data-retake], [data-retake-result]')) return;
    const story = currentStory();
    if (!story) return;
    patchProgress(story.id, { quizChecks: {} });
  }, true);

  const observer = new MutationObserver(() => window.requestAnimationFrame(enhanceQuiz));
  if (APP) observer.observe(APP, { childList: true, subtree: true });

  window.addEventListener('hashchange', () => window.requestAnimationFrame(enhanceQuiz));
  window.requestAnimationFrame(enhanceQuiz);
})();
