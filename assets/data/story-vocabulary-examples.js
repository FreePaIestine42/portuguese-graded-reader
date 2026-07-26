(function () {
  const story = window.STORY_CONTENT?.stories?.['a2-o-pequeno-visitante'];
  if (!story) return;

  const examples = {
    'acordado': {
      'acordada': 'A Marta ficou acordada para esperar pela irmã.'
    },
    'acabar': {
      'acabar': 'Quero acabar este livro antes do fim de semana.'
    },
    'desenho': {
      'desenho': 'O Rui pôs um desenho na porta do frigorífico.'
    },
    'quase': {
      'quase': 'Ela quase esqueceu as chaves em casa.'
    },
    'perder': {
      'perdeu': 'O Pedro perdeu o bilhete do cinema.'
    },
    'autocarro': {
      'autocarro': 'O autocarro para Sintra passa de meia em meia hora.'
    },
    'entrar': {
      'entrou': 'A gata entrou na cozinha sem ninguém ver.',
      'entraram': 'Os convidados entraram pela porta principal.'
    },
    'sala': {
      'sala': 'Deixámos os casacos na sala.'
    },
    'sentado': {
      'sentado': 'O avô ficou sentado no banco enquanto esperava.',
      'sentaram-se': 'Quando chegaram ao café, sentaram-se junto à porta.'
    },
    'ciências': {
      'ciências': 'A Inês gosta de Ciências porque adora fazer experiências.'
    },
    'olhar': {
      'olhava': 'O bebé olhava para as luzes da árvore.',
      'olhou': 'A mulher olhou para o relógio e levantou-se.'
    },
    'chão': {
      'chão': 'O telefone caiu no chão da cozinha.'
    },
    'janela': {
      'janela': 'O gato dorme junto à janela da sala.'
    },
    'enquanto': {
      'enquanto': 'O pai preparou o jantar enquanto eu punha a mesa.'
    },
    'caderno': {
      'caderno': 'Escrevi o número de telefone no caderno.',
      'cadernos': 'Os cadernos novos estão em cima da secretária.'
    },
    'mochila': {
      'mochila': 'Levei uma garrafa de água na mochila.'
    },
    'aproximar-se': {
      'aproximou-se': 'O empregado aproximou-se da mesa para anotar o pedido.',
      'aproximaram-se': 'As crianças aproximaram-se do músico para ouvir melhor.'
    },
    'apontar': {
      'apontou': 'A guia apontou para o castelo ao longe.'
    },
    'canto': {
      'canto': 'Há uma planta grande no canto da varanda.'
    },
    'parede': {
      'parede': 'Pintámos a parede da sala de azul claro.'
    },
    'armário': {
      'armário': 'Guardei as toalhas no armário do corredor.'
    },
    'lagarto': {
      'lagarto': 'No verão, vimos um lagarto numa pedra perto da praia.'
    },
    'castanho': {
      'castanho': 'Ele escolheu um casaco castanho para o inverno.'
    },
    'mexer-se': {
      'mexia': 'A cortina mexia com o vento.',
      'mexeu': 'O bebé mexeu quando ouviu a voz da mãe.'
    },
    'assustado': {
      'assustado': 'O menino ficou assustado com o som do alarme.',
      'assustem': 'Fechem a porta devagar para que os gatos não se assustem.'
    },
    'baixar-se': {
      'baixou-se': 'A Ana baixou-se para apertar os atacadores.'
    },
    'cauda': {
      'cauda': 'O cão abanou a cauda quando viu o dono.'
    },
    'comprido': {
      'comprida': 'A fila para o concerto era muito comprida.'
    },
    'talvez': {
      'talvez': 'Talvez façamos um piquenique no domingo.'
    },
    'durante': {
      'durante': 'Choveu durante toda a tarde.'
    },
    'aula': {
      'aula': 'A aula de música termina ao meio-dia.'
    },
    'colega': {
      'colegas': 'Os meus colegas organizaram um almoço de despedida.'
    },
    'bicho': {
      'bicho': 'A Sofia encontrou um bicho pequeno numa folha.'
    },
    'à volta': {
      'volta': 'Pusemos as cadeiras à volta da mesa.'
    },
    'fotografia': {
      'fotografias': 'Mostrei as fotografias das férias aos meus avós.'
    },
    'tocar': {
      'toquem': 'Não toquem nos bolos antes da festa.'
    },
    'régua': {
      'régua': 'Usei a régua para fazer uma linha direita.'
    },
    'empurrar': {
      'empurrá-lo': 'O sofá bloqueava a porta, por isso decidimos empurrá-lo para o lado.'
    },
    'magoar': {
      'magoá-lo': 'O rapaz não queria magoá-lo com aquela brincadeira.'
    },
    'encolher os ombros': {
      'encolheu': 'Sem saber a resposta, ele encolheu os ombros.',
      'ombros': 'Sem saber a resposta, ele encolheu os ombros.'
    },
    'reparar': {
      'reparou': 'A Marta reparou numa mancha no casaco.'
    },
    'sério': {
      'sério': 'O diretor ficou sério quando ouviu a pergunta.'
    },
    'discutir': {
      'discutir': 'Eles começaram a discutir sobre onde passar as férias.'
    },
    'porém': {
      'porém': 'O quarto era pequeno; porém, tinha muita luz.'
    },
    'situação': {
      'situação': 'A gerente resolveu a situação com calma.'
    },
    'apanhar': {
      'apanhar': 'Vamos sair cedo para apanhar o primeiro comboio.'
    },
    'barulho': {
      'barulho': 'O barulho das obras acordou o bebé.'
    },
    'levar': {
      'levá-lo': 'O bolo estava pronto e a Ana decidiu levá-lo para a festa.',
      'levar': 'Não te esqueças de levar um casaco.'
    },
    'cuidado': {
      'cuidado': 'Tem cuidado com o chão molhado.'
    },
    'buscar': {
      'buscar': 'A Joana foi buscar o irmão à estação.'
    },
    'caixa': {
      'caixa': 'As fotografias antigas estão guardadas numa caixa azul.'
    },
    'vazio': {
      'vazia': 'Quando chegámos, a praia estava quase vazia.'
    },
    'cartão': {
      'cartão': 'Escrevi os parabéns num cartão colorido.'
    },
    'afastar': {
      'afastou': 'O homem afastou a cadeira para deixar passar o carrinho.'
    },
    'papelão': {
      'papelão': 'O cenário da peça foi feito de papelão.'
    },
    'devagar': {
      'devagar': 'O carro avançou devagar por causa do nevoeiro.'
    },
    'parado': {
      'parado': 'O elevador ficou parado entre dois andares.'
    },
    'correr': {
      'correu': 'A Rita correu para atender o telefone.'
    },
    'tampa': {
      'tampa': 'A tampa do frasco estava muito apertada.'
    },
    'abertura': {
      'abertura': 'Havia uma pequena abertura na vedação.'
    },
    'intervalo': {
      'intervalo': 'No intervalo, fui beber água ao bar.'
    },
    'caminhar': {
      'caminharam': 'Os turistas caminharam junto ao rio ao fim da tarde.'
    },
    'zona': {
      'zona': 'Procuramos uma casa numa zona com bons transportes.'
    },
    'imediatamente': {
      'imediatamente': 'O alarme tocou e todos saíram imediatamente.'
    },
    'silêncio': {
      'silêncio': 'Depois da notícia, houve alguns segundos de silêncio.'
    },
    'desaparecer': {
      'desapareceu': 'O sol desapareceu atrás das nuvens.'
    },
    'preocupado': {
      'preocupado': 'O pai ficou preocupado porque o filho não telefonou.'
    },
    'gritar': {
      'gritar': 'Não precisas de gritar; eu consigo ouvir-te.'
    },
    'quadro': {
      'quadro': 'Na reunião, a coordenadora desenhou o plano no quadro.'
    },
    'acrescentar': {
      'acrescentou': 'A cozinheira provou a sopa e acrescentou um pouco de sal.'
    },
    'assentir': {
      'assentiu': 'O cliente ouviu o preço e assentiu com a cabeça.'
    },
    'desenhar': {
      'desenhou': 'O arquiteto desenhou uma casa com um grande terraço.'
    },
    'página': {
      'página': 'A receita está na última página do livro.'
    },
    'demasiado': {
      'demasiado': 'Esta mala é demasiado pesada para mim.'
    },
    'apagar': {
      'apagou-a': 'A vela estava acesa, mas o vento apagou-a.'
    },
    'polegar': {
      'polegar': 'Cortei o polegar enquanto preparava o jantar.'
    }
  };

  Object.entries(examples).forEach(([key, examplesByForm]) => {
    if (story.vocabulary[key]) story.vocabulary[key].examplesByForm = examplesByForm;
  });
})();
