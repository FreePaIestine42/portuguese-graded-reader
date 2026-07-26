(function () {
  window.VOCABULARY_LEVEL_POLICIES = Object.freeze({
    B1: Object.freeze({
      coverage: 'broad',
      guidance: 'Prioritize useful content words, less predictable meanings, European Portuguese terms and genuine expressions. Avoid filling the text with very basic standalone words.'
    }),
    B2: Object.freeze({
      coverage: 'broad',
      guidance: 'Cover a wide range of potentially unfamiliar content words because learners acquire vocabulary unevenly. Do not highlight obvious A1/A2 standalone words unless their contextual meaning is unusual or specifically European Portuguese.'
    })
  });

  const story = window.STORY_CONTENT?.stories?.['b2-o-que-ficou-por-dizer'];
  if (!story) return;

  story.vocabularySelectionPolicy = window.VOCABULARY_LEVEL_POLICIES.B2;

  const basicStandaloneKeys = [
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
  ];

  basicStandaloneKeys.forEach(key => {
    const entry = story.vocabulary?.[key];
    if (!entry) return;
    entry.forms = [];
    entry.phraseForms = [];
    entry.isMeaningDependentPhrase = false;
  });

  Object.assign(story.vocabulary, {
    'dona': {
      forms: ['dona'], translation: 'owner; Mrs', definition: 'Mulher que possui alguma coisa; também pode ser uma forma respeitosa de referência ou tratamento.', baseForm: 'dona', wordClass: 'noun', contextualMeaning: 'Refere-se à mulher responsável por Baltazar, a senhora Adelaide.', example: 'A dona do café conhece quase todos os clientes pelo nome.', examplesByForm: { 'dona': 'A dona do café conhece quase todos os clientes pelo nome.' }
    },
    'caminhar': {
      forms: ['caminhava'], translation: 'to walk', definition: 'Deslocar-se a pé, dando passos.', baseForm: 'caminhar', wordClass: 'verb', contextualMeaning: 'Baltazar deslocava-se lentamente por ser um cão idoso.', example: 'A mulher caminhava junto ao rio todas as manhãs.', examplesByForm: { 'caminhava': 'A mulher caminhava junto ao rio todas as manhãs.' }
    },
    'escada': {
      forms: ['escadas'], translation: 'stairs; staircase', definition: 'Conjunto de degraus que permite subir ou descer entre níveis diferentes.', baseForm: 'escada', wordClass: 'noun', contextualMeaning: 'Baltazar não devia subir os degraus do edifício.', example: 'As escadas estavam molhadas por causa da chuva.', examplesByForm: { 'escadas': 'As escadas estavam molhadas por causa da chuva.' }
    },
    'joelho': {
      forms: ['joelho'], translation: 'knee', definition: 'Articulação que liga a coxa à parte inferior da perna.', baseForm: 'joelho', wordClass: 'noun', contextualMeaning: 'Baltazar apoiou a cabeça na perna de Daniela, junto à articulação.', example: 'Bati com o joelho na esquina da mesa.', examplesByForm: { 'joelho': 'Bati com o joelho na esquina da mesa.' }
    },
    'lava-loiça': {
      forms: ['lava-loiça'], translation: 'kitchen sink', definition: 'Recipiente fixo da cozinha onde se lavam pratos, copos e utensílios.', baseForm: 'lava-loiça', wordClass: 'noun', contextualMeaning: 'Daniela encontrou uma chávena suja no recipiente da cozinha.', example: 'Deixei os pratos no lava-loiça antes de sair.', examplesByForm: { 'lava-loiça': 'Deixei os pratos no lava-loiça antes de sair.' }
    },
    'corredor': {
      forms: ['corredor'], translation: 'hallway; corridor', definition: 'Passagem comprida no interior de um edifício que liga várias divisões.', baseForm: 'corredor', wordClass: 'noun', contextualMeaning: 'Daniela parou na passagem interior do apartamento ao suspeitar que alguém estava lá.', example: 'A luz do corredor ficou acesa durante a noite.', examplesByForm: { 'corredor': 'A luz do corredor ficou acesa durante a noite.' }
    },
    'molhado': {
      forms: ['molhado'], translation: 'wet', definition: 'Coberto ou impregnado de água ou de outro líquido.', baseForm: 'molhado', wordClass: 'adjective', contextualMeaning: 'O cabelo da filha ainda tinha água depois do banho.', example: 'O casaco estava molhado quando cheguei a casa.', examplesByForm: { 'molhado': 'O casaco estava molhado quando cheguei a casa.' }
    },
    'agressivo': {
      forms: ['agressivo'], translation: 'aggressive; hostile', definition: 'Que demonstra hostilidade, violência ou intenção de atacar.', baseForm: 'agressivo', wordClass: 'adjective', contextualMeaning: 'O tom da filha não era hostil, embora também não fosse simpático.', example: 'O comentário pareceu agressivo, mas talvez tenha sido mal interpretado.', examplesByForm: { 'agressivo': 'O comentário pareceu agressivo, mas talvez tenha sido mal interpretado.' }
    },
    'desconfortável': {
      forms: ['desconfortável'], translation: 'uncomfortable; awkward', definition: 'Que provoca incómodo físico ou emocional.', baseForm: 'desconfortável', wordClass: 'adjective', contextualMeaning: 'O silêncio entre as duas mulheres criou tensão e embaraço.', example: 'A pergunta criou um momento desconfortável durante o jantar.', examplesByForm: { 'desconfortável': 'A pergunta criou um momento desconfortável durante o jantar.' }
    },
    'iniciar': {
      forms: ['iniciar'], translation: 'to begin; to initiate', definition: 'Dar início a uma ação, atividade ou processo.', baseForm: 'iniciar', wordClass: 'verb', contextualMeaning: 'Daniela não queria começar uma discussão naquele momento.', example: 'A diretora decidiu iniciar a reunião sem esperar mais.', examplesByForm: { 'iniciar': 'A diretora decidiu iniciar a reunião sem esperar mais.' }
    },
    'limão': {
      forms: ['limões'], translation: 'lemons', definition: 'Frutos amarelos e ácidos usados em bebidas e alimentos.', baseForm: 'limão', wordClass: 'noun', contextualMeaning: 'O roupão azul tinha um padrão de pequenos frutos amarelos.', example: 'Comprámos limões para preparar uma limonada.', examplesByForm: { 'limões': 'Comprámos limões para preparar uma limonada.' }
    },
    'cheirar': {
      forms: ['cheirou-a'], translation: 'to smell; to sniff', definition: 'Sentir ou examinar um odor com o nariz.', baseForm: 'cheirar', wordClass: 'verb', contextualMeaning: 'Baltazar aproximou o nariz da taça para examinar a comida.', example: 'A cadela cheirou-a antes de se afastar da manta.', examplesByForm: { 'cheirou-a': 'A cadela cheirou-a antes de se afastar da manta.' }
    },
    'misturar': {
      forms: ['misturarmos'], translation: 'to mix', definition: 'Juntar substâncias ou elementos diferentes até ficarem combinados.', baseForm: 'misturar', wordClass: 'verb', contextualMeaning: 'Daniela sugeriu juntar água morna à comida de Baltazar.', example: 'O molho fica mais suave se misturarmos um pouco de iogurte.', examplesByForm: { 'misturarmos': 'O molho fica mais suave se misturarmos um pouco de iogurte.' }
    },
    'expressão': {
      forms: ['expressão'], translation: 'expression; facial expression', definition: 'Aspeto do rosto que revela um sentimento ou estado emocional.', baseForm: 'expressão', wordClass: 'noun', contextualMeaning: 'A aparência do rosto da filha mudou quando Baltazar começou a comer.', example: 'A expressão do médico tornou-se mais tranquila depois dos resultados.', examplesByForm: { 'expressão': 'A expressão do médico tornou-se mais tranquila depois dos resultados.' }
    },
    'aquecer': {
      forms: ['aquecia'], translation: 'to heat; to warm up', definition: 'Fazer com que algo fique mais quente.', baseForm: 'aquecer', wordClass: 'verb', contextualMeaning: 'Daniela estava a tornar a sopa quente para almoçar.', example: 'Enquanto aquecia o jantar, ouvi as notícias na rádio.', examplesByForm: { 'aquecia': 'Enquanto aquecia o jantar, ouvi as notícias na rádio.' }
    },
    'sopa': {
      forms: ['sopa'], translation: 'soup', definition: 'Prato líquido preparado com água, legumes e outros ingredientes.', baseForm: 'sopa', wordClass: 'noun', contextualMeaning: 'Era a refeição que Daniela aqueceu quando chegou a casa.', example: 'A sopa de legumes ficou pronta antes do jantar.', examplesByForm: { 'sopa': 'A sopa de legumes ficou pronta antes do jantar.' }
    },
    'zangado': {
      forms: ['zangada'], translation: 'angry; upset', definition: 'Que sente irritação ou raiva.', baseForm: 'zangado', wordClass: 'adjective', contextualMeaning: 'Sofia pergunta se Daniela ainda estava irritada com a filha da cliente.', example: 'Ela continuava zangada porque ninguém lhe explicou a mudança.', examplesByForm: { 'zangada': 'Ela continuava zangada porque ninguém lhe explicou a mudança.' }
    },
    'atento': {
      forms: ['atenta'], translation: 'alert; attentive; watchful', definition: 'Que observa cuidadosamente o que acontece.', baseForm: 'atento', wordClass: 'adjective', contextualMeaning: 'Daniela evita dizer que está zangada e apresenta-se como vigilante.', example: 'A rececionista ficou atenta aos pedidos dos participantes.', examplesByForm: { 'atenta': 'A rececionista ficou atenta aos pedidos dos participantes.' }
    },
    'garfo': {
      forms: ['garfo'], translation: 'fork', definition: 'Utensílio de mesa com dentes, usado para levar alimentos à boca.', baseForm: 'garfo', wordClass: 'noun', contextualMeaning: 'Sofia colocou o utensílio de mesa em repouso antes de responder.', example: 'O garfo caiu no chão durante o almoço.', examplesByForm: { 'garfo': 'O garfo caiu no chão durante o almoço.' }
    },
    'recostar-se': {
      forms: ['Recostei-me'], translation: 'to lean back', definition: 'Inclinar e apoiar o corpo para trás.', baseForm: 'recostar-se', wordClass: 'pronominal verb', contextualMeaning: 'Daniela inclinou o corpo para trás na cadeira durante a conversa.', example: 'Recostei-me no sofá para descansar alguns minutos.', examplesByForm: { 'Recostei-me': 'Recostei-me no sofá para descansar alguns minutos.' }
    },
    'cansado': {
      forms: ['cansada'], translation: 'tired', definition: 'Que sente falta de energia ou necessidade de descansar.', baseForm: 'cansado', wordClass: 'adjective', contextualMeaning: 'Daniela admite que a filha podia estar fatigada, e não necessariamente a ser desagradável.', example: 'Depois da viagem, ela estava demasiado cansada para sair.', examplesByForm: { 'cansada': 'Depois da viagem, ela estava demasiado cansada para sair.' }
    },
    'acompanhar': {
      forms: ['acompanhar'], translation: 'to accompany; to go with', definition: 'Ir ou estar juntamente com alguém ou alguma coisa.', baseForm: 'acompanhar', wordClass: 'verb', contextualMeaning: 'Daniela imagina uma música associada às aparições dramáticas da filha.', example: 'Um pianista vai acompanhar a cantora durante o espetáculo.', examplesByForm: { 'acompanhar': 'Um pianista vai acompanhar a cantora durante o espetáculo.' }
    },
    'identificar': {
      forms: ['identificado'], translation: 'to identify', definition: 'Reconhecer, determinar ou indicar claramente o que alguma coisa é.', baseForm: 'identificar', wordClass: 'verb', contextualMeaning: 'Daniela julgava ter reconhecido uma falta de respeito.', example: 'O técnico tinha identificado a origem do problema antes da reunião.', examplesByForm: { 'identificado': 'O técnico tinha identificado a origem do problema antes da reunião.' }
    },
    'despedir-se': {
      forms: ['despedir'], translation: 'to say goodbye', definition: 'Expressar uma despedida antes de sair ou de se separar de alguém.', baseForm: 'despedir-se', wordClass: 'pronominal verb', contextualMeaning: 'Daniela baixou-se para dizer adeus a Baltazar.', example: 'Fui despedir-me dos meus avós antes da viagem.', examplesByForm: { 'despedir': 'Fui despedir-me dos meus avós antes da viagem.' }
    },
    'alternativo': {
      forms: ['alternativa'], translation: 'alternative', definition: 'Que oferece uma possibilidade diferente da principal ou habitual.', baseForm: 'alternativo', wordClass: 'adjective', contextualMeaning: 'Baltazar parecia considerar uma vida diferente fora do apartamento.', example: 'Procurámos uma rota alternativa por causa das obras.', examplesByForm: { 'alternativa': 'Procurámos uma rota alternativa por causa das obras.' }
    },
    'profundo': {
      forms: ['profunda'], translation: 'deep; profound', definition: 'Que tem grande intensidade, importância ou complexidade.', baseForm: 'profundo', wordClass: 'adjective', contextualMeaning: 'Daniela descreve ironicamente a reflexão sobre os próprios defeitos como muito séria.', example: 'A conversa provocou uma mudança profunda na equipa.', examplesByForm: { 'profunda': 'A conversa provocou uma mudança profunda na equipa.' }
    },
    'fugir': {
      forms: ['fugiu'], translation: 'to escape; to run away', definition: 'Sair rapidamente de um lugar para evitar ficar preso ou ser apanhado.', baseForm: 'fugir', wordClass: 'verb', contextualMeaning: 'Daniela brinca ao dizer que Baltazar quase saiu do apartamento com ela.', example: 'O gato fugiu pela porta aberta e escondeu-se no jardim.', examplesByForm: { 'fugiu': 'O gato fugiu pela porta aberta e escondeu-se no jardim.' }
    },
    'colo': {
      forms: ['colo'], translation: 'lap', definition: 'Parte formada pelas coxas de uma pessoa sentada, onde se pode apoiar algo.', baseForm: 'colo', wordClass: 'noun', contextualMeaning: 'Nori colocou o brinquedo sobre as pernas de Daniela enquanto ela estava sentada.', example: 'A criança adormeceu no colo da avó.', examplesByForm: { 'colo': 'A criança adormeceu no colo da avó.' }
    },
    'agarrar': {
      forms: ['agarrá-lo'], translation: 'to grab; to hold', definition: 'Segurar alguma coisa com firmeza usando as mãos.', baseForm: 'agarrar', wordClass: 'verb', contextualMeaning: 'Daniela tentou pegar no brinquedo que Nori tinha colocado no seu colo.', example: 'O saco começou a cair, mas consegui agarrá-lo a tempo.', examplesByForm: { 'agarrá-lo': 'O saco começou a cair, mas consegui agarrá-lo a tempo.' }
    },
    'sobretudo': {
      forms: ['sobretudo'], translation: 'especially; above all', definition: 'Usado para destacar o elemento mais importante entre vários.', baseForm: 'sobretudo', wordClass: 'adverb', contextualMeaning: 'A diferença era particularmente desconfortável para alguém que valorizava compreender os outros.', example: 'A zona é tranquila, sobretudo durante a semana.', examplesByForm: { 'sobretudo': 'A zona é tranquila, sobretudo durante a semana.' }
    }
  });

  const lexicalForms = new Set(Object.values(story.vocabulary || {})
    .flatMap(entry => [...(entry.forms || []), ...(entry.phraseForms || [])])
    .map(form => String(form).normalize('NFC').toLocaleLowerCase('pt-PT')));
  const text = story.sections.flatMap(section => section.paragraphs || []).join(' ').normalize('NFC').toLocaleLowerCase('pt-PT');
  const contentTokens = [...new Set(text.match(/[\p{L}]+(?:-[\p{L}]+)*/gu) || [])].filter(token => token.length >= 6);
  const coveredTokens = contentTokens.filter(token => lexicalForms.has(token));

  story.vocabularyCoverage = {
    strategy: 'broad-level-aware',
    coveredLongContentWords: coveredTokens.length,
    candidateLongContentWords: contentTokens.length
  };
})();
