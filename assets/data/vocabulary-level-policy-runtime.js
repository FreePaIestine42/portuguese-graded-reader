(function () {
  const policies = window.VOCABULARY_LEVEL_POLICIES || {};
  const basicB2Keys = new Set([
    'ter',
    'hábito',
    'pequeno-almoço',
    'fim',
    'tarde',
    'pouco',
    'depois',
    'confirmar',
    'discussão',
    'nem pensar'
  ]);

  function applyPolicy(story) {
    if (!story?.level) return;

    const levelPolicy = policies[story.level];
    if (levelPolicy) story.vocabularySelectionPolicy = levelPolicy;

    if (story.level !== 'B2' || !story.vocabulary) return;

    basicB2Keys.forEach(key => {
      const entry = story.vocabulary[key];
      if (!entry) return;
      entry.forms = [];
      entry.phraseForms = [];
      entry.isMeaningDependentPhrase = false;
    });
  }

  (window.SITE_DATA?.stories || []).forEach(applyPolicy);
  Object.values(window.STORY_CONTENT?.stories || {}).forEach(applyPolicy);
})();
