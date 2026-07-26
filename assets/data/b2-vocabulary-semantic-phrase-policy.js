(function () {
  const story = window.STORY_CONTENT?.stories?.['b2-o-que-ficou-por-dizer'];
  if (!story) return;

  const meaningDependentKeys = new Set([
    'diante de',
    'nada de',
    'além disso',
    'uma espécie de',
    'não ter culpa nenhuma',
    'ir ter com',
    'fazer-se silêncio',
    'junto de',
    'ainda assim',
    'cair no extremo oposto',
    'aproveitar-se do facto de',
    'de graça',
    'entradas em cena',
    'nem pensar',
    'orgulhar-se de',
    'na verdade',
    'de repente',
    'pedir desculpa',
    'ter razão',
    'dar uma volta',
    'como de costume',
    'ao lado de',
    'desde que',
    'por isso'
  ]);

  Object.entries(story.vocabulary || {}).forEach(([key, entry]) => {
    const isMeaningDependent = meaningDependentKeys.has(key);
    entry.isMeaningDependentPhrase = isMeaningDependent;

    if (!isMeaningDependent && Array.isArray(entry.phraseForms)) {
      entry.phraseForms = [];
    }
  });

  const silence = story.vocabulary?.['fazer-se silêncio'];
  if (silence) {
    silence.phraseForms = ['Fez-se um silêncio'];
    silence.translation = 'a silence fell';
    silence.definition = 'Expressão usada para indicar que todas as pessoas ficaram caladas.';
    silence.baseForm = 'fazer-se silêncio';
    silence.contextualMeaning = 'Daniela e a filha ficaram caladas num momento desconfortável.';
    silence.example = 'Fez-se um silêncio na sala quando a diretora entrou.';
    silence.examplesByForm = {
      'Fez-se um silêncio': 'Fez-se um silêncio na sala quando a diretora entrou.'
    };
  }

  const takeAdvantage = story.vocabulary?.['aproveitar-se do facto de'];
  if (takeAdvantage) {
    takeAdvantage.phraseForms = ['se aproveitam'];
    takeAdvantage.translation = 'to take advantage';
    takeAdvantage.definition = 'Usar uma pessoa ou situação em benefício próprio de forma injusta.';
    takeAdvantage.baseForm = 'aproveitar-se';
    takeAdvantage.wordClass = 'pronominal verb';
    takeAdvantage.contextualMeaning = 'Daniela diz que algumas pessoas exploram a disponibilidade de quem trabalha com animais.';
    takeAdvantage.example = 'Algumas empresas se aproveitam da falta de informação dos clientes.';
    takeAdvantage.examplesByForm = {
      'se aproveitam': 'Algumas empresas se aproveitam da falta de informação dos clientes.'
    };
  }

  const serious = story.vocabulary?.['levar a sério'];
  if (serious) {
    serious.phraseForms = [];
    serious.isMeaningDependentPhrase = false;
  }

  function add(key, entry) {
    if (!story.vocabulary[key]) story.vocabulary[key] = entry;
  }

  add('a sério', {
    forms: [],
    phraseForms: ['a sério'],
    isMeaningDependentPhrase: true,
    translation: 'seriously',
    definition: 'De maneira séria, responsável ou verdadeira.',
    baseForm: 'a sério',
    wordClass: 'expression',
    contextualMeaning: 'Daniela imagina que a filha pensava que ela não tratava o trabalho com responsabilidade.',
    example: 'A equipa começou finalmente a levar o prazo a sério.',
    examplesByForm: {
      'a sério': 'A equipa começou finalmente a levar o prazo a sério.'
    }
  });

  const standaloneEntries = {
    'ter': {
      forms: ['tinha'], translation: 'to have', definition: 'Possuir, apresentar ou experimentar alguma coisa.', baseForm: 'ter', wordClass: 'verb', contextualMeaning: 'Baltazar apresentava regularmente um determinado comportamento.', example: 'A loja tinha uma entrada muito estreita.', examplesByForm: { 'tinha': 'A loja tinha uma entrada muito estreita.' }
    },
    'hábito': {
      forms: ['hábito'], translation: 'habit', definition: 'Comportamento que se repete regularmente.', baseForm: 'hábito', wordClass: 'noun', contextualMeaning: 'Baltazar costumava parar diante das portas.', example: 'Ela tem o hábito de preparar a roupa na noite anterior.', examplesByForm: { 'hábito': 'Ela tem o hábito de preparar a roupa na noite anterior.' }
    },
    'instrução': {
      forms: ['instruções'], translation: 'instruction', definition: 'Indicação que explica o que deve ser feito.', baseForm: 'instrução', wordClass: 'noun', contextualMeaning: 'A senhora Adelaide deixou orientações sobre os cuidados do cão.', example: 'Li as instruções antes de ligar o aparelho.', examplesByForm: { 'instruções': 'Li as instruções antes de ligar o aparelho.' }
    },
    'detalhado': {
      forms: ['detalhadas'], translation: 'detailed', definition: 'Que contém muitos pormenores ou informações específicas.', baseForm: 'detalhado', wordClass: 'adjective', contextualMeaning: 'As instruções explicavam os cuidados com precisão.', example: 'A arquiteta apresentou plantas detalhadas do edifício.', examplesByForm: { 'detalhadas': 'A arquiteta apresentou plantas detalhadas do edifício.' }
    },
    'pequeno-almoço': {
      forms: ['pequeno-almoço'], translation: 'breakfast', definition: 'Primeira refeição do dia.', baseForm: 'pequeno-almoço', wordClass: 'noun', contextualMeaning: 'Os comprimidos deviam ser dados durante a refeição da manhã.', example: 'O pequeno-almoço é servido a partir das sete.', examplesByForm: { 'pequeno-almoço': 'O pequeno-almoço é servido a partir das sete.' }
    },
    'fim': {
      forms: ['fim'], translation: 'end', definition: 'Parte final de um período, acontecimento ou objeto.', baseForm: 'fim', wordClass: 'noun', contextualMeaning: 'O segundo passeio devia acontecer perto do final da tarde.', example: 'No fim da reunião, todos receberam uma cópia do plano.', examplesByForm: { 'fim': 'No fim da reunião, todos receberam uma cópia do plano.' }
    },
    'tarde': {
      forms: ['tarde'], translation: 'afternoon', definition: 'Período do dia entre o meio-dia e a noite.', baseForm: 'tarde', wordClass: 'noun', contextualMeaning: 'Baltazar devia passear novamente nesse período do dia.', example: 'A tarde estava quente, mas havia vento.', examplesByForm: { 'tarde': 'A tarde estava quente, mas havia vento.' }
    },
    'pouco': {
      forms: ['pouco'], translation: 'little; not much', definition: 'Em pequena quantidade ou intensidade.', baseForm: 'pouco', wordClass: 'adverb', contextualMeaning: 'Passou pouco tempo antes de Daniela receber a mensagem.', example: 'Dormimos pouco durante a viagem.', examplesByForm: { 'pouco': 'Dormimos pouco durante a viagem.' }
    },
    'depois': {
      forms: ['depois'], translation: 'afterwards; later', definition: 'Num momento posterior.', baseForm: 'depois', wordClass: 'adverb', contextualMeaning: 'A mensagem chegou após Daniela entrar no apartamento.', example: 'Primeiro terminamos o trabalho e depois vamos jantar.', examplesByForm: { 'depois': 'Primeiro terminamos o trabalho e depois vamos jantar.' }
    },
    'cuidado': {
      forms: ['cuidado'], translation: 'care; caution', definition: 'Atenção usada para evitar erros, riscos ou problemas.', baseForm: 'cuidado', wordClass: 'noun', contextualMeaning: 'Daniela respondeu de maneira prudente e atenta.', example: 'Transportaram o espelho com muito cuidado.', examplesByForm: { 'cuidado': 'Transportaram o espelho com muito cuidado.' }
    },
    'fora': {
      forms: ['Fora'], translation: 'outside; apart from', definition: 'Numa posição ou situação exterior ao que foi referido.', baseForm: 'fora', wordClass: 'adverb', contextualMeaning: 'Daniela refere-se aos momentos que não faziam parte das visitas.', example: 'Fora do horário de atendimento, a porta permanece fechada.', examplesByForm: { 'Fora': 'Fora do horário de atendimento, a porta permanece fechada.' }
    },
    'período': {
      forms: ['períodos'], translation: 'period; time span', definition: 'Intervalo de tempo com início e fim.', baseForm: 'período', wordClass: 'noun', contextualMeaning: 'Os períodos eram os horários das visitas combinadas.', example: 'A biblioteca fecha durante alguns períodos do verão.', examplesByForm: { 'períodos': 'A biblioteca fecha durante alguns períodos do verão.' }
    },
    'caso': {
      forms: ['caso'], translation: 'if; in case', definition: 'Palavra que introduz uma condição possível.', baseForm: 'caso', wordClass: 'conjunction', contextualMeaning: 'Daniela apresenta a possibilidade de surgir um problema.', example: 'Caso precises de ajuda, liga-me antes das seis.', examplesByForm: { 'caso': 'Caso precises de ajuda, liga-me antes das seis.' }
    },
    'acontecer': {
      forms: ['aconteça'], translation: 'to happen', definition: 'Ocorrer ou passar-se.', baseForm: 'acontecer', wordClass: 'verb', contextualMeaning: 'Daniela refere-se à possibilidade de ocorrer um imprevisto.', example: 'Espero que nada de grave aconteça durante a viagem.', examplesByForm: { 'aconteça': 'Espero que nada de grave aconteça durante a viagem.' }
    },
    'algum': {
      forms: ['alguma'], translation: 'some; any', definition: 'Quantidade ou identidade não especificada.', baseForm: 'algum', wordClass: 'determiner', contextualMeaning: 'Daniela não identifica antecipadamente qual poderia ser o problema.', example: 'Há alguma cadeira livre junto à janela?', examplesByForm: { 'alguma': 'Há alguma cadeira livre junto à janela?' }
    },
    'coisa': {
      forms: ['coisa'], translation: 'thing; something', definition: 'Objeto, facto, situação ou assunto não identificado de forma específica.', baseForm: 'coisa', wordClass: 'noun', contextualMeaning: 'Refere-se a qualquer imprevisto que pudesse ocorrer.', example: 'Tenho uma coisa importante para te contar.', examplesByForm: { 'coisa': 'Tenho uma coisa importante para te contar.' }
    },
    'instante': {
      forms: ['instante'], translation: 'moment; instant', definition: 'Período de tempo muito breve.', baseForm: 'instante', wordClass: 'noun', contextualMeaning: 'A filha fechou os olhos durante um momento curto.', example: 'Esperei um instante antes de responder.', examplesByForm: { 'instante': 'Esperei um instante antes de responder.' }
    },
    'soltar': {
      forms: ['soltou'], translation: 'to let out; to release', definition: 'Deixar sair ou libertar alguma coisa.', baseForm: 'soltar', wordClass: 'verb', contextualMeaning: 'A filha deixou escapar uma gargalhada breve.', example: 'O rapaz soltou um grito quando viu a aranha.', examplesByForm: { 'soltou': 'O rapaz soltou um grito quando viu a aranha.' }
    },
    'gargalhada': {
      forms: ['gargalhada'], translation: 'laugh; burst of laughter', definition: 'Riso forte e audível.', baseForm: 'gargalhada', wordClass: 'noun', contextualMeaning: 'A filha riu brevemente com o comentário de Daniela.', example: 'A história provocou uma gargalhada inesperada.', examplesByForm: { 'gargalhada': 'A história provocou uma gargalhada inesperada.' }
    },
    'meio-dia': {
      forms: ['meio-dia'], translation: 'noon', definition: 'Doze horas do dia.', baseForm: 'meio-dia', wordClass: 'noun', contextualMeaning: 'Daniela chegou a casa por volta das doze horas.', example: 'A consulta está marcada para o meio-dia.', examplesByForm: { 'meio-dia': 'A consulta está marcada para o meio-dia.' }
    },
    'orgulho': {
      forms: ['orgulho'], translation: 'pride', definition: 'Satisfação sentida por algo que se fez, possui ou representa.', baseForm: 'orgulho', wordClass: 'noun', contextualMeaning: 'Nori apresentava o brinquedo como se fosse algo importante.', example: 'A avó falou com orgulho do trabalho da neta.', examplesByForm: { 'orgulho': 'A avó falou com orgulho do trabalho da neta.' }
    },
    'véspera': {
      forms: ['véspera'], translation: 'the previous day; eve', definition: 'Dia imediatamente anterior a outro.', baseForm: 'véspera', wordClass: 'noun', contextualMeaning: 'Daniela estava irritada desde o dia anterior.', example: 'Preparámos as malas na véspera da viagem.', examplesByForm: { 'véspera': 'Preparámos as malas na véspera da viagem.' }
    },
    'perder': {
      forms: ['perdeu'], translation: 'to lose', definition: 'Deixar de ter, manter ou sentir alguma coisa.', baseForm: 'perder', wordClass: 'verb', contextualMeaning: 'A irritação de Daniela diminuiu.', example: 'O sinal perdeu intensidade dentro do túnel.', examplesByForm: { 'perdeu': 'O sinal perdeu intensidade dentro do túnel.' }
    },
    'força': {
      forms: ['força'], translation: 'strength; force', definition: 'Intensidade, energia ou poder.', baseForm: 'força', wordClass: 'noun', contextualMeaning: 'A intensidade da irritação diminuiu.', example: 'A tempestade ganhou força durante a noite.', examplesByForm: { 'força': 'A tempestade ganhou força durante a noite.' }
    },
    'pior': {
      forms: ['pior'], translation: 'worse; worst', definition: 'Mais negativo, difícil ou desfavorável.', baseForm: 'pior', wordClass: 'adjective', contextualMeaning: 'Daniela escolheu a interpretação mais negativa.', example: 'O segundo atraso foi pior do que o primeiro.', examplesByForm: { 'pior': 'O segundo atraso foi pior do que o primeiro.' }
    },
    'possível': {
      forms: ['possível'], translation: 'possible', definition: 'Que pode acontecer, existir ou ser realizado.', baseForm: 'possível', wordClass: 'adjective', contextualMeaning: 'A interpretação era a mais negativa que Daniela conseguia imaginar.', example: 'Tentámos chegar o mais cedo possível.', examplesByForm: { 'possível': 'Tentámos chegar o mais cedo possível.' }
    },
    'facto': {
      forms: ['facto'], translation: 'fact', definition: 'Acontecimento ou realidade que pode ser comprovada.', baseForm: 'facto', wordClass: 'noun', contextualMeaning: 'Daniela refere-se à circunstância de os profissionais gostarem dos animais.', example: 'O facto foi confirmado por duas testemunhas.', examplesByForm: { 'facto': 'O facto foi confirmado por duas testemunhas.' }
    },
    'estabelecer': {
      forms: ['estabelecer'], translation: 'to establish; to set', definition: 'Definir, criar ou tornar claro.', baseForm: 'estabelecer', wordClass: 'verb', contextualMeaning: 'Sofia diz que Daniela pode definir regras profissionais claras.', example: 'Precisamos de estabelecer uma data para a reunião.', examplesByForm: { 'estabelecer': 'Precisamos de estabelecer uma data para a reunião.' }
    },
    'antecedência': {
      forms: ['antecedência'], translation: 'advance notice; prior time', definition: 'Tempo anterior a um acontecimento que permite preparação.', baseForm: 'antecedência', wordClass: 'noun', contextualMeaning: 'O serviço noturno deve ser combinado antes do dia em que será necessário.', example: 'A empresa pediu uma semana de antecedência.', examplesByForm: { 'antecedência': 'A empresa pediu uma semana de antecedência.' }
    },
    'conclusão': {
      forms: ['conclusão'], translation: 'conclusion', definition: 'Ideia ou decisão formada depois de analisar uma situação.', baseForm: 'conclusão', wordClass: 'noun', contextualMeaning: 'Daniela reconhece que formou uma opinião antes de conhecer todos os factos.', example: 'Chegámos à conclusão de que era melhor esperar.', examplesByForm: { 'conclusão': 'Chegámos à conclusão de que era melhor esperar.' }
    },
    'precipitado': {
      forms: ['precipitada'], translation: 'hasty; rushed', definition: 'Feito demasiado depressa e sem reflexão suficiente.', baseForm: 'precipitado', wordClass: 'adjective', contextualMeaning: 'A conclusão de Daniela foi formada sem informação suficiente.', example: 'Foi uma decisão precipitada que depois tiveram de corrigir.', examplesByForm: { 'precipitada': 'Foi uma decisão precipitada que depois tiveram de corrigir.' }
    },
    'enganado': {
      forms: ['enganada'], translation: 'mistaken; wrong', definition: 'Que tem uma ideia que não corresponde à realidade.', baseForm: 'enganado', wordClass: 'adjective', contextualMeaning: 'Daniela admite que a sua interpretação podia estar errada.', example: 'Eu estava enganada sobre a data da consulta.', examplesByForm: { 'enganada': 'Eu estava enganada sobre a data da consulta.' }
    },
    'transformação': {
      forms: ['transformação'], translation: 'transformation; change', definition: 'Mudança importante de forma, estado ou comportamento.', baseForm: 'transformação', wordClass: 'noun', contextualMeaning: 'Daniela reconhece que a experiência não mudou completamente a sua personalidade.', example: 'A praça passou por uma grande transformação.', examplesByForm: { 'transformação': 'A praça passou por uma grande transformação.' }
    },
    'extraordinário': {
      forms: ['extraordinária'], translation: 'extraordinary', definition: 'Muito invulgar, impressionante ou fora do comum.', baseForm: 'extraordinário', wordClass: 'adjective', contextualMeaning: 'Daniela diz que a mudança não foi enorme nem excecional.', example: 'A equipa conseguiu uma recuperação extraordinária.', examplesByForm: { 'extraordinária': 'A equipa conseguiu uma recuperação extraordinária.' }
    },
    'construir': {
      forms: ['construir'], translation: 'to build; to construct', definition: 'Criar ou formar algo através de várias partes.', baseForm: 'construir', wordClass: 'verb', contextualMeaning: 'Daniela usa o verbo de forma figurada para descrever a narrativa mental que cria.', example: 'É preciso construir um argumento com provas claras.', examplesByForm: { 'construir': 'É preciso construir um argumento com provas claras.' }
    },
    'história': {
      forms: ['história'], translation: 'story', definition: 'Narrativa de acontecimentos reais ou imaginados.', baseForm: 'história', wordClass: 'noun', contextualMeaning: 'Daniela refere-se à explicação completa que inventa mentalmente.', example: 'A criança inventou uma história sobre um barco perdido.', examplesByForm: { 'história': 'A criança inventou uma história sobre um barco perdido.' }
    },
    'inteiro': {
      forms: ['inteira'], translation: 'whole; entire', definition: 'Completo, sem faltar nenhuma parte.', baseForm: 'inteiro', wordClass: 'adjective', contextualMeaning: 'Daniela imagina todos os elementos da situação antes de confirmar os factos.', example: 'Passei a manhã inteira a organizar os documentos.', examplesByForm: { 'inteira': 'Passei a manhã inteira a organizar os documentos.' }
    },
    'pergunta': {
      forms: ['pergunta'], translation: 'question', definition: 'Frase ou pedido usado para obter informação.', baseForm: 'pergunta', wordClass: 'noun', contextualMeaning: 'Daniela considera pedir informação antes de tirar conclusões.', example: 'A jornalista fez uma pergunta sobre o novo projeto.', examplesByForm: { 'pergunta': 'A jornalista fez uma pergunta sobre o novo projeto.' }
    },
    'mal': {
      forms: ['mal'], translation: 'badly; poorly', definition: 'De forma insuficiente, incorreta ou negativa.', baseForm: 'mal', wordClass: 'adverb', contextualMeaning: 'A filha podia ter recebido informação insuficiente ou incorreta.', example: 'O aviso estava mal escrito e causou confusão.', examplesByForm: { 'mal': 'O aviso estava mal escrito e causou confusão.' }
    },
    'informado': {
      forms: ['informada'], translation: 'informed', definition: 'Que recebeu ou possui determinada informação.', baseForm: 'informado', wordClass: 'adjective', contextualMeaning: 'A filha podia não conhecer bem o acordo feito pela mãe.', example: 'A equipa foi informada da alteração esta manhã.', examplesByForm: { 'informada': 'A equipa foi informada da alteração esta manhã.' }
    },
    'facilidade': {
      forms: ['facilidade'], translation: 'ease; facility', definition: 'Ausência de grande dificuldade ao fazer alguma coisa.', baseForm: 'facilidade', wordClass: 'noun', contextualMeaning: 'Daniela percebe rapidamente os estados emocionais dos outros.', example: 'Ela aprende novas ferramentas com facilidade.', examplesByForm: { 'facilidade': 'Ela aprende novas ferramentas com facilidade.' }
    },
    'respeito': {
      forms: ['respeito'], translation: 'respect', definition: 'Consideração demonstrada por uma pessoa, regra ou situação.', baseForm: 'respeito', wordClass: 'noun', contextualMeaning: 'Daniela pensava ter identificado uma atitude que desvalorizava o seu trabalho.', example: 'O debate decorreu com respeito entre todos.', examplesByForm: { 'respeito': 'O debate decorreu com respeito entre todos.' }
    }
  };

  Object.entries(standaloneEntries).forEach(([key, entry]) => add(key, entry));
})();
