(function () {
  function normalize(value) {
    return String(value || '')
      .normalize('NFC')
      .toLocaleLowerCase('pt-PT')
      .trim();
  }

  function tokens(value) {
    return normalize(value).match(/[\p{L}]+(?:-[\p{L}]+)*/gu) || [];
  }

  function usesExactForm(sentence, displayedWord) {
    const exactWord = normalize(displayedWord);
    return Boolean(exactWord) && tokens(sentence).includes(exactWord);
  }

  function sentenceContainingClickedWord(button) {
    const paragraph = button.closest('.story-paragraph');
    const paragraphText = paragraph?.textContent?.trim();
    const displayedWord = button.textContent.trim();

    if (!paragraphText || !displayedWord) return '';

    const sentences = paragraphText.match(/[^.!?]+(?:[.!?]+|$)/g) || [paragraphText];
    const matchingSentence = sentences.find(sentence => usesExactForm(sentence, displayedWord));

    return String(matchingSentence || paragraphText)
      .replace(/^\s*—\s*/, '')
      .trim();
  }

  function enforceExactExampleForm(button) {
    const example = document.querySelector('#vocabulary-card .vocabulary-example p');
    if (!example) return;

    const displayedWord = button.textContent.trim();
    if (usesExactForm(example.textContent, displayedWord)) return;

    const storySentence = sentenceContainingClickedWord(button);
    if (storySentence) example.textContent = storySentence;
  }

  document.addEventListener('click', event => {
    const button = event.target.closest('.vocab-word');
    if (!button) return;

    queueMicrotask(() => enforceExactExampleForm(button));
  });
})();
