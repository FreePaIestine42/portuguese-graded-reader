(function () {
  const policy = Object.freeze({
    A2: 'en',
    B1: 'pt-PT',
    B2: 'pt-PT'
  });

  window.STORY_DESCRIPTION_LANGUAGE_POLICY = policy;

  const currentPortugueseSummaries = {
    'b1-email-trabalho': 'Um texto formal provisório sobre uma mensagem importante no trabalho.',
    'b2-o-que-ficou-por-dizer': 'Daniela tenta proteger os seus limites profissionais enquanto percebe que a preocupação e a falta de comunicação podem ter influenciado o conflito que imaginou.'
  };

  function looksPredominantlyEnglish(value) {
    const text = String(value || '').toLocaleLowerCase('en');
    const englishSignals = text.match(/\b(the|and|while|with|from|into|tries|realizes|story|work|client|conflict)\b/g) || [];
    const portugueseSignals = text.match(/\b(o|a|os|as|e|que|com|para|uma|um|enquanto|história|trabalho)\b/g) || [];
    return englishSignals.length > portugueseSignals.length;
  }

  function applyToStory(story) {
    if (!story?.level) return;

    const requiredLanguage = policy[story.level] || 'en';
    story.descriptionLanguage = requiredLanguage;

    if (requiredLanguage !== 'pt-PT') return;

    const portugueseSummary = story.summaryByLanguage?.['pt-PT'] || story.summaryPt || currentPortugueseSummaries[story.id];
    if (portugueseSummary) {
      story.summaryPt = portugueseSummary;
      story.summary = portugueseSummary;
      return;
    }

    if (looksPredominantlyEnglish(story.summary)) {
      console.warn(`A história ${story.id || story.title} precisa de uma descrição em português para o nível ${story.level}.`);
    }
  }

  (window.SITE_DATA?.stories || []).forEach(applyToStory);
  Object.values(window.STORY_CONTENT?.stories || {}).forEach(applyToStory);
})();
