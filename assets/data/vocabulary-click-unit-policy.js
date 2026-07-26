(function () {
  const DETACHED_CLITIC_PATTERN = /(?:^|\s)(?:me|te|se|nos|vos|lhe|lhes)(?=\s|$)/iu;

  window.VOCABULARY_CLICK_UNIT_POLICY = Object.freeze({
    containsDetachedClitic(value) {
      return DETACHED_CLITIC_PATTERN.test(String(value || '').normalize('NFC'));
    },

    canRenderAsPhrase(entry, phrase) {
      return Boolean(
        entry?.isMeaningDependentPhrase === true &&
        phrase &&
        !this.containsDetachedClitic(phrase)
      );
    }
  });

  const story = window.STORY_CONTENT?.stories?.['b2-o-que-ficou-por-dizer'];
  if (!story) return;

  const takeAdvantage = story.vocabulary?.['aproveitar-se do facto de'];
  if (takeAdvantage) {
    takeAdvantage.forms = ['aproveitam'];
    takeAdvantage.phraseForms = [];
    takeAdvantage.isMeaningDependentPhrase = false;
    takeAdvantage.translation = 'to take advantage';
    takeAdvantage.definition = 'Usar uma pessoa ou situação em benefício próprio de forma injusta.';
    takeAdvantage.baseForm = 'aproveitar-se';
    takeAdvantage.wordClass = 'pronominal verb';
    takeAdvantage.contextualMeaning = 'Neste contexto, o verbo descreve pessoas que exploram injustamente a disponibilidade de quem trabalha com animais.';
    takeAdvantage.example = 'Algumas empresas se aproveitam da falta de informação dos clientes.';
    takeAdvantage.examplesByForm = {
      'aproveitam': 'Algumas empresas se aproveitam da falta de informação dos clientes.'
    };
  }

  const prideOneself = story.vocabulary?.['orgulhar-se de'];
  if (prideOneself) {
    prideOneself.forms = ['orgulhava'];
    prideOneself.phraseForms = [];
    prideOneself.isMeaningDependentPhrase = false;
    prideOneself.translation = 'to pride oneself on';
    prideOneself.definition = 'Sentir satisfação por uma qualidade ou realização própria.';
    prideOneself.baseForm = 'orgulhar-se';
    prideOneself.wordClass = 'pronominal verb';
    prideOneself.contextualMeaning = 'Daniela valorizava a sua capacidade de compreender as pessoas.';
    prideOneself.example = 'A atleta dizia que se orgulhava de nunca faltar aos treinos.';
    prideOneself.examplesByForm = {
      'orgulhava': 'A atleta dizia que se orgulhava de nunca faltar aos treinos.'
    };
  }
})();
