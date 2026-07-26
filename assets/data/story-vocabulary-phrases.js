(function () {
  const story = window.STORY_CONTENT?.stories?.['a2-o-pequeno-visitante'];
  if (!story) return;

  const around = story.vocabulary?.['à volta'];
  if (around) {
    around.forms = [];
    around.phraseForms = ['à volta do'];
    around.phraseExamples = {
      'à volta do': 'Os ciclistas reuniram-se à volta do mapa antes da partida.'
    };
  }

  const shrug = story.vocabulary?.['encolher os ombros'];
  if (shrug) {
    shrug.forms = [];
    shrug.phraseForms = ['encolheu os ombros'];
    shrug.phraseExamples = {
      'encolheu os ombros': 'Sem saber qual caminho escolher, o turista encolheu os ombros.'
    };
  }
})();
