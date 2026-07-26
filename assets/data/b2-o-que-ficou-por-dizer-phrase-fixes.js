(function () {
  const story = window.STORY_CONTENT?.stories?.['b2-o-que-ficou-por-dizer'];
  if (!story) return;

  const poorlyInformed = story.vocabulary?.['mal informado'];
  if (poorlyInformed) {
    poorlyInformed.forms = [];
    poorlyInformed.phraseForms = ['mal informada'];
  }

  const takeAdvantage = story.vocabulary?.['aproveitar-se do facto de'];
  if (takeAdvantage) {
    const example = 'Há vendedores que se aproveitam do facto de os clientes terem pressa.';
    takeAdvantage.example = example;
    takeAdvantage.examplesByForm = {
      ...(takeAdvantage.examplesByForm || {}),
      'se aproveitam do facto de': example
    };
  }
})();
