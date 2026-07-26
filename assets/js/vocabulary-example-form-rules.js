(function () {
  const stories = window.STORY_CONTENT?.stories || {};

  function normalize(value) {
    return String(value || '')
      .normalize('NFC')
      .toLocaleLowerCase('pt-PT')
      .trim();
  }

  function tokens(value) {
    return normalize(value).match(/[\p{L}]+(?:-[\p{L}]+)*/gu) || [];
  }

  function wordSequence(value) {
    return tokens(value).join(' ');
  }

  function usesExactForm(sentence, displayedWord) {
    const sentenceWords = wordSequence(sentence);
    const exactWords = wordSequence(displayedWord);
    return Boolean(exactWords) && ` ${sentenceWords} `.includes(` ${exactWords} `);
  }

  function currentStory() {
    const match = window.location.hash.match(/^#\/story\/([^/]+)\/?$/);
    return match ? stories[match[1]] : null;
  }

  function sourceSentence(button) {
    const paragraphText = button.closest('.story-paragraph')?.textContent?.trim();
    const displayedWord = button.textContent.trim();

    if (!paragraphText || !displayedWord) return '';

    const sentences = paragraphText.match(/[^.!?]+(?:[.!?]+|$)/g) || [paragraphText];
    return String(sentences.find(sentence => usesExactForm(sentence, displayedWord)) || paragraphText)
      .replace(/^\s*—\s*/, '')
      .trim();
  }

  function isSameSentence(first, second) {
    return normalize(first).replace(/[.!?]+$/g, '') === normalize(second).replace(/[.!?]+$/g, '');
  }

  function separateExample(entry, displayedWord, storySentence) {
    const exactForm = normalize(displayedWord);
    const formExamples = entry?.examplesByForm || {};
    const formExample = Object.entries(formExamples)
      .find(([form]) => normalize(form) === exactForm)?.[1];

    if (
      formExample &&
      usesExactForm(formExample, displayedWord) &&
      !isSameSentence(formExample, storySentence)
    ) {
      return formExample;
    }

    return '';
  }

  function updateExample(button) {
    const story = currentStory();
    const entry = story?.vocabulary?.[button.dataset.vocab];
    const exampleBox = document.querySelector('#vocabulary-card .vocabulary-example');
    const exampleText = exampleBox?.querySelector('p');

    if (!entry || !exampleBox || !exampleText) return;

    const displayedWord = button.textContent.trim();
    const storySentence = sourceSentence(button);
    const example = separateExample(entry, displayedWord, storySentence);

    if (!example) {
      exampleBox.remove();
      return;
    }

    exampleText.textContent = example;
  }

  document.addEventListener('click', event => {
    const button = event.target.closest('.vocab-word');
    if (!button) return;

    queueMicrotask(() => updateExample(button));
  });
})();
