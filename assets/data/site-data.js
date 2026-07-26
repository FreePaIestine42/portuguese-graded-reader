window.SITE_DATA = {
  siteName: 'Portuguese Stories',
  tagline: 'Read. Understand. Practise natural European Portuguese.',
  homeHeroImage: 'https://images.unsplash.com/photo-1735815813700-09c379f5261d?auto=format&fit=crop&fm=jpg&q=92&w=1800',
  levelBlurbs: {
    A2: 'You can understand common words and expressions about everyday topics such as family, shopping, local places and work. You can read short, simple texts and find useful information in things like notices, menus, advertisements, schedules and brief personal messages. You can also handle routine conversations and describe your background, surroundings and immediate needs in simple terms.',
    B1: 'You can understand the main points of clear language about familiar topics such as work, school, leisure and travel. You can read texts written mainly in common everyday or work-related language and follow descriptions of events, feelings and wishes. You can manage most situations while travelling, describe experiences, dreams and plans, and briefly explain your opinions.',
    B2: 'You can understand the main ideas of more complex texts on both concrete and abstract topics. You can read articles and reports about current issues, understand different viewpoints and follow contemporary fiction with reasonable independence. You can communicate fairly fluently and spontaneously, discuss a wide range of subjects in detail and explain or defend your opinions.'
  },
  categories: [
    { id: 'everyday', name: 'Everyday & Casual', icon: '☕' },
    { id: 'formal', name: 'Formal & Professional', icon: '✉️' },
    { id: 'news', name: 'News', icon: '📰' }
  ],
  levels: [
    { id: 'A2', name: 'A2', label: 'Elementary', color: '#397757', softColor: '#DFEBE4' },
    { id: 'B1', name: 'B1', label: 'Intermediate', color: '#D45257', softColor: '#F7DEDF' },
    { id: 'B2', name: 'B2', label: 'Upper Intermediate', color: '#DED153', softColor: '#F7F1C7' }
  ],
  storyLengthFilters: [
    { id: 'all', label: 'All lengths' },
    { id: 'short', label: 'Short (0–700 words)' },
    { id: 'medium', label: 'Medium (701–1200 words)' },
    { id: 'long', label: 'Long (1201+ words)' }
  ],
  stories: [
    {
      id: 'a2-o-pequeno-visitante',
      title: 'O Pequeno Visitante',
      level: 'A2',
      category: 'everyday',
      wordCount: 633,
      totalTime: '24 min',
      status: 'Not started',
      image: './assets/images/o-pequeno-visitante-card.svg',
      imageAlt: 'A small brown lizard on a pale classroom floor.',
      summary: 'Leonor and Tiago find a small lizard in their classroom and help it return safely outdoors.',
      instructions: 'Read the story first, use the vocabulary panel when needed, and then complete the comprehension activities.',
      characters: ['Leonor Batista', 'Tiago Matias', 'Professora Teresa'],
      characterIds: ['leonor-batista', 'tiago-matias', 'professora-teresa'],
      locations: ['Escola Básica da Ladeira', 'Jardim do Alto'],
      topics: ['school', 'animals', 'kindness', 'helping'],
      dialogue: true,
      pointOfView: 'third person',
      languageVariant: 'European Portuguese',
      vocabularyTheme: 'School, animals and careful actions',
      paragraphs: []
    },
    {
      id: 'b1-email-trabalho',
      title: 'Um Email Importante',
      level: 'B1',
      category: 'formal',
      wordCount: 920,
      totalTime: '24 min',
      status: 'Started',
      image: 'https://images.pexels.com/photos/6148830/pexels-photo-6148830.jpeg?auto=compress&cs=tinysrgb&w=1800',
      imageAlt: 'Fruit displayed in baskets at a market.',
      summary: 'Um texto formal provisório sobre uma mensagem importante no trabalho.',
      summaryPt: 'Um texto formal provisório sobre uma mensagem importante no trabalho.',
      descriptionLanguage: 'pt-PT',
      instructions: 'Leia primeiro o texto e depois faça os exercícios.',
      paragraphs: ['Placeholder content.']
    },
    {
      id: 'b2-o-que-ficou-por-dizer',
      title: 'O que ficou por dizer',
      level: 'B2',
      category: 'everyday',
      wordCount: 1229,
      totalTime: '36 min',
      status: 'Not started',
      image: './assets/images/o-que-ficou-por-dizer-card.svg',
      imageAlt: 'An elderly yellow Labrador looking towards the camera.',
      summary: 'Daniela tenta proteger os seus limites profissionais enquanto percebe que a preocupação e a falta de comunicação podem ter influenciado o conflito que imaginou.',
      summaryPt: 'Daniela tenta proteger os seus limites profissionais enquanto percebe que a preocupação e a falta de comunicação podem ter influenciado o conflito que imaginou.',
      descriptionLanguage: 'pt-PT',
      instructions: 'Leia primeiro a história, consulte o apoio de vocabulário quando necessário e complete depois as atividades de compreensão.',
      characters: ['Daniela Pires', 'Sofia Tavares', 'Leonor Martins', 'Nori', 'Baltazar'],
      characterIds: ['daniela-pires', 'sofia-tavares', 'leonor-martins', 'nori', 'baltazar'],
      locations: ['Bairro da Ladeira', 'Praça da Ladeira'],
      topics: ['pet sitting', 'professional boundaries', 'miscommunication', 'assumptions', 'friendship'],
      dialogue: true,
      pointOfView: 'first person',
      languageVariant: 'European Portuguese',
      vocabularyTheme: 'Work boundaries, interpretation and interpersonal tension',
      paragraphs: []
    }
  ]
};
